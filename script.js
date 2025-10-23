// AgriFarm - Weather-Based Crop Management System
// Main JavaScript functionality

class AgriFarmApp {
    constructor() {
        this.weatherData = null;
        this.soilData = null;
        this.currentLocation = null;
        this.selectedLocation = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        // Restore persisted location if available
        try {
            const saved = localStorage.getItem('agrifarm_selected_location');
            if (saved) {
                this.selectedLocation = JSON.parse(saved);
            }
        } catch(e) {}
        this.loadWeatherData();
        this.setupNavigation();
        this.setupIndiaHierarchy();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection(link.getAttribute('href').substring(1));
            });
        });

        // Form submissions
        document.getElementById('soil-type')?.addEventListener('change', () => this.updateRecommendations());
        document.getElementById('ph-level')?.addEventListener('input', () => this.updateRecommendations());
        document.getElementById('nutrients')?.addEventListener('change', () => this.updateRecommendations());
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.showSection(targetSection);
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.classList.add('fade-in');
            // When navigating to Weather section, ensure panels are populated
            if (sectionId === 'weather') {
                this.renderCurrentWeatherPanel();
                this.updateWeatherForecast();
            }
        }
    }

    // Weather Data Management
    async loadWeatherData() {
        try {
            // Get user's location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.currentLocation = {
                            lat: position.coords.latitude,
                            lon: position.coords.longitude
                        };
                        this.fetchWeatherData();
                    },
                    () => {
                        // Fallback to default location (New York)
                        this.currentLocation = { lat: 40.7128, lon: -74.0060 };
                        this.fetchWeatherData();
                    }
                );
            } else {
                this.currentLocation = { lat: 40.7128, lon: -74.0060 };
                this.fetchWeatherData();
            }
        } catch (error) {
            console.error('Error loading weather data:', error);
            this.showMockWeatherData();
        }
    }

    async fetchWeatherData() {
        try {
            // Using OpenWeatherMap API (you'll need to get a free API key)
            const API_KEY = 'your_api_key_here'; // Replace with actual API key
            
            // Use selected location if available, otherwise use current location
            const location = this.selectedLocation || this.currentLocation;
            
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`
            );
            
            if (response.ok) {
                this.weatherData = await response.json();
                // Fetch 7-day forecast via One Call API
                const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`);
                if (forecastRes.ok) {
                    const forecastJson = await forecastRes.json();
                    this.forecastData = forecastJson.daily || [];
                } else {
                    this.forecastData = this.generateWeatherForecast(); // fallback mock
                }
                this.updateWeatherDisplay();
            } else {
                throw new Error('Weather API request failed');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            this.showMockWeatherData();
        }
    }

    showMockWeatherData() {
        // Mock weather data for demonstration with location-specific variations
        const locationName = this.selectedLocation ? this.selectedLocation.name : 'Sample Location';
        
        // Generate location-specific weather based on coordinates
        const lat = this.selectedLocation ? this.selectedLocation.lat : 28.6139;
        const lon = this.selectedLocation ? this.selectedLocation.lon : 77.2090;
        
        // Create realistic weather variations based on location
        const baseTemp = 20 + Math.sin(lat * Math.PI / 180) * 15; // Temperature varies with latitude
        const humidity = 40 + Math.abs(Math.cos(lon * Math.PI / 180)) * 40; // Humidity varies with longitude
        const windSpeed = 5 + Math.abs(Math.sin(lat * lon * Math.PI / 18000)) * 15; // Wind varies with position
        const rainfall = Math.random() * 10; // Random rainfall
        
        // Seasonal adjustments (simplified)
        const month = new Date().getMonth();
        const seasonalTemp = baseTemp + Math.sin((month - 2) * Math.PI / 6) * 8;
        
        this.weatherData = {
            main: {
                temp: Math.round(seasonalTemp + (Math.random() - 0.5) * 6),
                humidity: Math.round(humidity + (Math.random() - 0.5) * 20),
                pressure: 1013 + Math.round((Math.random() - 0.5) * 20)
            },
            wind: {
                speed: Math.round(windSpeed + (Math.random() - 0.5) * 8)
            },
            rain: {
                '1h': Math.round(rainfall * 10) / 10
            },
            name: locationName,
            weather: [{ 
                description: this.getWeatherDescription(seasonalTemp, humidity, rainfall),
                main: this.getWeatherMain(seasonalTemp, humidity, rainfall)
            }],
            coord: { lat, lon }
        };
        
        // Generate location-specific forecast
        this.forecastData = this.generateLocationSpecificForecast(lat, lon);
        this.updateWeatherDisplay();
    }
    
    getWeatherDescription(temp, humidity, rain) {
        if (rain > 5) return 'Heavy rain';
        if (rain > 2) return 'Light rain';
        if (temp > 35) return 'Hot and sunny';
        if (temp > 30) return 'Warm and sunny';
        if (temp < 15) return 'Cool and cloudy';
        if (humidity > 80) return 'Humid and cloudy';
        return 'Partly cloudy';
    }
    
    getWeatherMain(temp, humidity, rain) {
        if (rain > 2) return 'Rain';
        if (temp > 30) return 'Clear';
        if (humidity > 80) return 'Clouds';
        return 'Clouds';
    }
    
    generateLocationSpecificForecast(lat, lon) {
        const forecast = [];
        const today = new Date();
        
        for (let i = 1; i <= 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            // Location-based weather patterns
            const baseTemp = 20 + Math.sin(lat * Math.PI / 180) * 15;
            const humidity = 40 + Math.abs(Math.cos(lon * Math.PI / 180)) * 40;
            const windSpeed = 5 + Math.abs(Math.sin(lat * lon * Math.PI / 18000)) * 15;
            
            // Add daily variation
            const dailyVariation = Math.sin(i * Math.PI / 4) * 5;
            const temp = baseTemp + dailyVariation + (Math.random() - 0.5) * 8;
            const rain = Math.random() * 15;
            
            forecast.push({
                temp: { day: Math.round(temp) },
                humidity: Math.round(humidity + (Math.random() - 0.5) * 20),
                wind_speed: Math.round(windSpeed + (Math.random() - 0.5) * 8),
                rain: Math.round(rain * 10) / 10,
                weather: [{
                    main: this.getWeatherMain(temp, humidity, rain),
                    description: this.getWeatherDescription(temp, humidity, rain)
                }]
            });
        }
        
        return forecast;
    }

    updateWeatherDisplay() {
        if (!this.weatherData) return;

        document.getElementById('temperature').textContent = Math.round(this.weatherData.main.temp);
        document.getElementById('humidity').textContent = this.weatherData.main.humidity;
        document.getElementById('wind-speed').textContent = Math.round(this.weatherData.wind.speed * 3.6); // Convert m/s to km/h
        document.getElementById('rainfall').textContent = this.weatherData.rain ? this.weatherData.rain['1h'] || 0 : 0;
        document.getElementById('location').textContent = this.weatherData.name;

        // Update irrigation recommendations based on weather
        this.updateIrrigationRecommendations();

        // Populate Weather page panels
        this.renderCurrentWeatherPanel();
        this.updateWeatherForecast();
    }

    // Render Current Conditions panel on Weather page
    renderCurrentWeatherPanel() {
        const dashboard = document.getElementById('weather-dashboard');
        if (!dashboard) return;

        const hasData = !!this.weatherData;
        const temp = hasData ? Math.round(this.weatherData.main.temp) : '--';
        const humidity = hasData ? this.weatherData.main.humidity : '--';
        const wind = hasData ? Math.round(this.weatherData.wind.speed * 3.6) : '--';
        const rainfall = hasData ? (this.weatherData.rain ? this.weatherData.rain['1h'] || 0 : 0) : '--';
        const desc = hasData && this.weatherData.weather && this.weatherData.weather[0] ? this.weatherData.weather[0].description : '—';
        const pressure = hasData ? this.weatherData.main.pressure : '--';

        dashboard.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h3><i class="fas fa-thermometer-half"></i> Current Conditions</h3>
                </div>
                <div class="weather-details">
                    <div class="detail"><i class="fas fa-temperature-high"></i><span>Temperature: ${temp}°C</span></div>
                    <div class="detail"><i class="fas fa-tint"></i><span>Humidity: ${humidity}%</span></div>
                    <div class="detail"><i class="fas fa-wind"></i><span>Wind: ${wind} km/h</span></div>
                    <div class="detail"><i class="fas fa-cloud-rain"></i><span>Rain (1h): ${rainfall} mm</span></div>
                    <div class="detail"><i class="fas fa-compress-arrows-alt"></i><span>Pressure: ${pressure} hPa</span></div>
                    <div class="detail"><i class="fas fa-cloud"></i><span>Conditions: ${desc}</span></div>
                </div>
            </div>
        `;
    }

    // India hierarchical selection
    setupIndiaHierarchy() {
        const stateSelect = document.getElementById('stateSelect');
        if (!stateSelect) return;

        const states = [
            'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman and Nicobar Islands','Chandigarh','Dadra and Nagar Haveli and Daman and Diu','Delhi','Jammu and Kashmir','Ladakh','Lakshadweep','Puducherry'
        ];

        stateSelect.innerHTML = '<option value="">Select State/UT</option>' + states.map(s => `<option value="${s}">${s}</option>`).join('');

        // If a saved location contains state in name, preselect
        if (this.selectedLocation && this.selectedLocation.name && this.selectedLocation.name.includes(', IN')) {
            // no reliable state from name; leave unselected
        }
    }

    async searchAdministrative(query, level) {
        const resultsContainer = document.getElementById('hierarchyResults');
        resultsContainer.innerHTML = '<div style="text-align:center;padding:1rem;">Searching...</div>';
        try {
            // Use Nominatim to search administrative areas within India
            const url = `https://nominatim.openstreetmap.org/search?format=json&country=India&addressdetails=1&limit=10&polygon_geojson=0&q=${encodeURIComponent(query)}`;
            const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
            if (!res.ok) throw new Error('Nominatim search failed');
            const data = await res.json();
            if (!Array.isArray(data) || data.length === 0) {
                resultsContainer.innerHTML = '<div style="text-align:center;padding:1rem;color:#666;">No results found.</div>';
                return;
            }
            resultsContainer.innerHTML = data.map(place => {
                const name = place.display_name.split(',')[0];
                const lat = place.lat;
                const lon = place.lon;
                const addr = place.address || {};
                const subtitle = [addr.state_district || addr.district, addr.state, addr.country].filter(Boolean).join(' • ');
                return `
                    <div class="location-result-item" onclick="selectLocation('${name.replace(/'/g, "\'")}', ${lat}, ${lon})">
                        <div class="location-result-name">${name}</div>
                        <div class="location-result-country">${subtitle}</div>
                    </div>
                `;
            }).join('');
        } catch (e) {
            console.error(e);
            resultsContainer.innerHTML = '<div style="text-align:center;padding:1rem;color:#dc3545;">Search failed. Try again.</div>';
        }
    }

    // Exposed handlers used by modal buttons
    searchDistricts() {
        const state = document.getElementById('stateSelect')?.value || '';
        const q = document.getElementById('districtInput')?.value || '';
        const query = `${q} district, ${state}`.trim();
        this.searchAdministrative(query, 'district');
    }

    searchMandals() {
        const state = document.getElementById('stateSelect')?.value || '';
        const dist = document.getElementById('districtInput')?.value || '';
        const q = document.getElementById('mandalInput')?.value || '';
        const query = `${q} tehsil, ${dist}, ${state}`.trim();
        this.searchAdministrative(query, 'mandal');
    }

    searchVillages() {
        const state = document.getElementById('stateSelect')?.value || '';
        const dist = document.getElementById('districtInput')?.value || '';
        const mandal = document.getElementById('mandalInput')?.value || '';
        const q = document.getElementById('villageInput')?.value || '';
        const query = `${q}, ${mandal}, ${dist}, ${state}`.trim();
        this.searchAdministrative(query, 'village');
    }

    // Soil Analysis Functions
    analyzeSoil() {
        const soilType = document.getElementById('soil-type').value;
        const phLevel = parseFloat(document.getElementById('ph-level').value);
        const nutrients = document.getElementById('nutrients').value;

        if (!soilType || !phLevel || !nutrients) {
            alert('Please fill in all soil analysis fields');
            return;
        }

        this.soilData = { soilType, phLevel, nutrients };
        this.updateCropRecommendations();
        this.updateFertilizerRecommendations();
        this.updateNutrientAnalysis();
    }

    detailedSoilAnalysis() {
        const soilType = document.getElementById('detailed-soil-type').value;
        const phLevel = parseFloat(document.getElementById('detailed-ph').value);
        const nitrogen = parseFloat(document.getElementById('nitrogen').value);
        const phosphorus = parseFloat(document.getElementById('phosphorus').value);
        const potassium = parseFloat(document.getElementById('potassium').value);
        const organicMatter = parseFloat(document.getElementById('organic-matter').value);

        if (!soilType || !phLevel || !nitrogen || !phosphorus || !potassium || !organicMatter) {
            alert('Please fill in all soil analysis parameters');
            return;
        }

        this.soilData = {
            soilType,
            phLevel,
            nitrogen,
            phosphorus,
            potassium,
            organicMatter
        };

        this.displayDetailedResults();
    }

    displayDetailedResults() {
        const resultsContainer = document.getElementById('detailed-results');
        const results = this.generateDetailedSoilAnalysis();
        
        resultsContainer.innerHTML = `
            <h3>Analysis Results</h3>
            <div class="results-content">
                ${results}
            </div>
        `;
    }

    generateDetailedSoilAnalysis() {
        const { soilType, phLevel, nitrogen, phosphorus, potassium, organicMatter } = this.soilData;
        
        let analysis = '<div class="analysis-summary">';
        
        // pH Analysis
        let phStatus = 'Optimal';
        let phColor = '#28a745';
        if (phLevel < 6.0) {
            phStatus = 'Acidic - Add lime';
            phColor = '#dc3545';
        } else if (phLevel > 7.5) {
            phStatus = 'Alkaline - Add sulfur';
            phColor = '#ffc107';
        }
        
        analysis += `
            <div class="analysis-item">
                <h4>pH Level: ${phLevel}</h4>
                <p style="color: ${phColor}">Status: ${phStatus}</p>
            </div>
        `;

        // Nutrient Analysis
        const nutrientAnalysis = this.analyzeNutrients(nitrogen, phosphorus, potassium);
        analysis += nutrientAnalysis;

        // Organic Matter Analysis
        let omStatus = 'Good';
        let omColor = '#28a745';
        if (organicMatter < 2.0) {
            omStatus = 'Low - Add compost';
            omColor = '#dc3545';
        } else if (organicMatter > 5.0) {
            omStatus = 'High - Monitor drainage';
            omColor = '#ffc107';
        }

        analysis += `
            <div class="analysis-item">
                <h4>Organic Matter: ${organicMatter}%</h4>
                <p style="color: ${omColor}">Status: ${omStatus}</p>
            </div>
        `;

        analysis += '</div>';
        return analysis;
    }

    analyzeNutrients(nitrogen, phosphorus, potassium) {
        let analysis = '<div class="nutrient-analysis">';
        
        const nutrients = [
            { name: 'Nitrogen (N)', value: nitrogen, optimal: [40, 80] },
            { name: 'Phosphorus (P)', value: phosphorus, optimal: [20, 50] },
            { name: 'Potassium (K)', value: potassium, optimal: [30, 60] }
        ];

        nutrients.forEach(nutrient => {
            let status = 'Optimal';
            let color = '#28a745';
            
            if (nutrient.value < nutrient.optimal[0]) {
                status = 'Deficient';
                color = '#dc3545';
            } else if (nutrient.value > nutrient.optimal[1]) {
                status = 'Excessive';
                color = '#ffc107';
            }

            analysis += `
                <div class="analysis-item">
                    <h4>${nutrient.name}: ${nutrient.value} ppm</h4>
                    <p style="color: ${color}">Status: ${status}</p>
                </div>
            `;
        });

        analysis += '</div>';
        return analysis;
    }

    // Crop Recommendation System
    updateCropRecommendations() {
        if (!this.soilData) return;

        const recommendations = this.generateCropRecommendations();
        const container = document.getElementById('crop-recommendations');
        
        container.innerHTML = recommendations;
    }

    generateCropRecommendations() {
        const { soilType, phLevel, nutrients } = this.soilData;
        
        const cropDatabase = {
            clay: [
                { name: 'Rice', suitability: 'Excellent', reason: 'Clay soil retains water well' },
                { name: 'Corn', suitability: 'Good', reason: 'Deep roots can penetrate clay' },
                { name: 'Wheat', suitability: 'Good', reason: 'Tolerates heavy soil' }
            ],
            sandy: [
                { name: 'Carrots', suitability: 'Excellent', reason: 'Sandy soil allows root development' },
                { name: 'Potatoes', suitability: 'Good', reason: 'Well-draining soil prevents rot' },
                { name: 'Tomatoes', suitability: 'Good', reason: 'Good drainage prevents diseases' }
            ],
            loamy: [
                { name: 'Tomatoes', suitability: 'Excellent', reason: 'Perfect soil structure' },
                { name: 'Lettuce', suitability: 'Excellent', reason: 'Ideal moisture retention' },
                { name: 'Peppers', suitability: 'Excellent', reason: 'Balanced soil properties' }
            ],
            silty: [
                { name: 'Corn', suitability: 'Excellent', reason: 'Silty soil holds nutrients well' },
                { name: 'Soybeans', suitability: 'Good', reason: 'Good for legume crops' },
                { name: 'Wheat', suitability: 'Good', reason: 'Stable soil structure' }
            ]
        };

        let recommendations = '<div class="crop-recommendations-list">';
        const crops = cropDatabase[soilType] || [];

        crops.forEach(crop => {
            recommendations += `
                <div class="crop-item">
                    <h4>${crop.name}</h4>
                    <p><strong>Suitability:</strong> ${crop.suitability}</p>
                    <p><strong>Reason:</strong> ${crop.reason}</p>
                </div>
            `;
        });

        recommendations += '</div>';
        return recommendations;
    }

    // Irrigation Management
    updateIrrigationRecommendations() {
        if (!this.weatherData) return;

        const temp = this.weatherData.main.temp;
        const humidity = this.weatherData.main.humidity;
        const rainfall = this.weatherData.rain ? this.weatherData.rain['1h'] || 0 : 0;

        let recommendation = '';
        let nextWatering = '';

        if (rainfall > 5) {
            recommendation = 'No irrigation needed - sufficient rainfall';
            nextWatering = 'Check again in 24 hours';
        } else if (temp > 30 && humidity < 50) {
            recommendation = 'High irrigation needed - hot and dry conditions';
            nextWatering = 'Water immediately and again in 12 hours';
        } else if (temp > 25) {
            recommendation = 'Moderate irrigation needed - warm conditions';
            nextWatering = 'Water in 6 hours';
        } else {
            recommendation = 'Low irrigation needed - mild conditions';
            nextWatering = 'Water in 24 hours';
        }

        document.getElementById('irrigation-info').innerHTML = `
            <div class="irrigation-status">
                <i class="fas fa-check-circle"></i>
                <span>${recommendation}</span>
            </div>
            <div class="next-watering">
                <p>Next watering: <span id="watering-time">${nextWatering}</span></p>
            </div>
        `;
    }

    calculateIrrigation() {
        const cropType = document.getElementById('crop-type-irrigation').value;
        const growthStage = document.getElementById('growth-stage').value;

        if (!cropType || !growthStage) {
            alert('Please select both crop type and growth stage');
            return;
        }

        const schedule = this.generateIrrigationSchedule(cropType, growthStage);
        const displayCrop = cropType.charAt(0).toUpperCase() + cropType.slice(1);
        const displayStage = growthStage.charAt(0).toUpperCase() + growthStage.slice(1);
        document.getElementById('irrigation-schedule').innerHTML = `
            <h3>Recommended Irrigation Schedule - ${displayCrop} (${displayStage})</h3>
            <div class="schedule-content">
                ${schedule}
            </div>
        `;
    }

    generateIrrigationSchedule(cropType, growthStage) {
        const irrigationDatabase = {
            tomato: {
                seedling: { frequency: 'Daily', amount: '0.5 inches', duration: '15 minutes' },
                vegetative: { frequency: 'Every 2 days', amount: '1 inch', duration: '30 minutes' },
                flowering: { frequency: 'Every 2 days', amount: '1.5 inches', duration: '45 minutes' },
                fruiting: { frequency: 'Every 3 days', amount: '2 inches', duration: '60 minutes' },
                maturity: { frequency: 'Every 4 days', amount: '1 inch', duration: '30 minutes' }
            },
            corn: {
                seedling: { frequency: 'Every 2 days', amount: '0.6 inches', duration: '20 minutes' },
                vegetative: { frequency: 'Every 3 days', amount: '1.6 inches', duration: '45 minutes' },
                flowering: { frequency: 'Every 2 days', amount: '2.1 inches', duration: '60 minutes' },
                fruiting: { frequency: 'Every 3 days', amount: '1.4 inches', duration: '45 minutes' },
                maturity: { frequency: 'Every 5 days', amount: '0.9 inches', duration: '30 minutes' }
            },
            wheat: {
                seedling: { frequency: 'Every 3 days', amount: '0.4 inches', duration: '15 minutes' },
                vegetative: { frequency: 'Every 4 days', amount: '0.9 inches', duration: '30 minutes' },
                flowering: { frequency: 'Every 3 days', amount: '1.3 inches', duration: '40 minutes' },
                fruiting: { frequency: 'Every 4 days', amount: '0.9 inches', duration: '30 minutes' },
                maturity: { frequency: 'Every 5 days', amount: '0.4 inches', duration: '15 minutes' }
            },
            rice: {
                seedling: { frequency: 'Daily', amount: 'Maintain 2–3 cm standing water', duration: 'Flooded' },
                vegetative: { frequency: 'Every 1–2 days', amount: 'Maintain 3–5 cm standing water', duration: 'Flooded' },
                flowering: { frequency: 'Daily', amount: 'Maintain 5–7 cm standing water', duration: 'Flooded' },
                fruiting: { frequency: 'Every 2 days', amount: 'Maintain 3–5 cm standing water', duration: 'Flooded' },
                maturity: { frequency: 'Every 3 days', amount: 'Reduce water; drain 7–10 days before harvest', duration: 'Drain gradually' }
            },
            potato: {
                seedling: { frequency: 'Every 3 days', amount: '0.6 inches', duration: '20 minutes' },
                vegetative: { frequency: 'Every 2–3 days', amount: '1.2 inches', duration: '35 minutes' },
                flowering: { frequency: 'Every 2 days', amount: '1.6 inches', duration: '50 minutes' },
                fruiting: { frequency: 'Every 3 days', amount: '1.2 inches', duration: '35 minutes' },
                maturity: { frequency: 'Every 4 days', amount: '0.8 inches', duration: '25 minutes' }
            }
        };

        const cropSchedules = irrigationDatabase[cropType];
        const schedule = cropSchedules ? cropSchedules[growthStage] : undefined;
        if (!schedule) {
            return '<p>Schedule not available for this crop/stage combination</p>';
        }

        return `
            <div class="irrigation-details">
                <div class="detail-item">
                    <h4>Frequency</h4>
                    <p>${schedule.frequency}</p>
                </div>
                <div class="detail-item">
                    <h4>Amount</h4>
                    <p>${schedule.amount}</p>
                </div>
                <div class="detail-item">
                    <h4>Duration</h4>
                    <p>${schedule.duration}</p>
                </div>
                <div class="weather-adjustment">
                    <h4>Weather Adjustments</h4>
                    <p>Reduce watering by 50% if rainfall > 0.5 inches</p>
                    <p>Increase watering by 25% if temperature > 30°C</p>
                </div>
            </div>
        `;
    }

    // Fertilizer Management
    updateFertilizerRecommendations() {
        if (!this.soilData) return;

        const recommendations = this.generateFertilizerRecommendations();
        document.getElementById('fertilizer-info').innerHTML = recommendations;
    }

    generateFertilizerRecommendations() {
        const { soilType, phLevel, nutrients } = this.soilData;
        
        let recommendations = '<div class="fertilizer-recommendations-list">';
        
        // General recommendations based on soil type
        const fertilizerDatabase = {
            clay: [
                { name: 'Compost', amount: '2-3 inches', timing: 'Before planting', reason: 'Improves drainage and structure' },
                { name: 'NPK 10-10-10', amount: '1 lb per 100 sq ft', timing: 'Monthly during growing season', reason: 'Balanced nutrition' }
            ],
            sandy: [
                { name: 'Organic Matter', amount: '3-4 inches', timing: 'Before planting', reason: 'Improves water retention' },
                { name: 'NPK 15-5-10', amount: '1.5 lbs per 100 sq ft', timing: 'Every 6 weeks', reason: 'Higher nitrogen for sandy soil' }
            ],
            loamy: [
                { name: 'NPK 12-12-12', amount: '1 lb per 100 sq ft', timing: 'Monthly', reason: 'Maintains soil balance' },
                { name: 'Compost', amount: '1-2 inches', timing: 'Annually', reason: 'Maintains organic matter' }
            ],
            silty: [
                { name: 'NPK 8-12-8', amount: '1 lb per 100 sq ft', timing: 'Every 6 weeks', reason: 'Higher phosphorus for silty soil' },
                { name: 'Lime', amount: 'As needed', timing: 'Based on pH test', reason: 'Maintains pH balance' }
            ]
        };

        const fertilizers = fertilizerDatabase[soilType] || [];
        fertilizers.forEach(fertilizer => {
            recommendations += `
                <div class="fertilizer-item">
                    <h4>${fertilizer.name}</h4>
                    <p><strong>Amount:</strong> ${fertilizer.amount}</p>
                    <p><strong>Timing:</strong> ${fertilizer.timing}</p>
                    <p><strong>Reason:</strong> ${fertilizer.reason}</p>
                </div>
            `;
        });

        recommendations += '</div>';
        return recommendations;
    }

    calculateFertilizer() {
        const cropType = document.getElementById('selected-crop').value;
        const fieldSize = parseFloat(document.getElementById('field-size').value);
        const soilFertility = document.getElementById('soil-fertility').value;

        if (!cropType || !fieldSize || !soilFertility) {
            alert('Please fill in all fertilizer calculation fields');
            return;
        }

        const recommendations = this.generateDetailedFertilizerRecommendations(cropType, fieldSize, soilFertility);
        document.getElementById('fertilizer-results').innerHTML = `
            <h3>Fertilizer Recommendations</h3>
            <div class="results-content">
                ${recommendations}
            </div>
        `;
    }

    generateDetailedFertilizerRecommendations(cropType, fieldSize, soilFertility) {
        const cropRequirements = {
            tomato: { nitrogen: 150, phosphorus: 80, potassium: 200 },
            corn: { nitrogen: 200, phosphorus: 100, potassium: 150 },
            wheat: { nitrogen: 120, phosphorus: 60, potassium: 100 },
            rice: { nitrogen: 100, phosphorus: 50, potassium: 80 },
            potato: { nitrogen: 80, phosphorus: 120, potassium: 180 },
            lettuce: { nitrogen: 60, phosphorus: 40, potassium: 80 },
            carrot: { nitrogen: 40, phosphorus: 80, potassium: 120 }
        };

        const fertilityMultiplier = {
            low: 1.5,
            medium: 1.0,
            high: 0.7
        };

        const requirements = cropRequirements[cropType];
        const multiplier = fertilityMultiplier[soilFertility];

        const totalNitrogen = Math.round(requirements.nitrogen * fieldSize * multiplier);
        const totalPhosphorus = Math.round(requirements.phosphorus * fieldSize * multiplier);
        const totalPotassium = Math.round(requirements.potassium * fieldSize * multiplier);

        return `
            <div class="fertilizer-calculation">
                <h4>For ${fieldSize} acres of ${cropType}</h4>
                <div class="nutrient-requirements">
                    <div class="nutrient-item">
                        <h5>Nitrogen (N)</h5>
                        <p>${totalNitrogen} lbs needed</p>
                    </div>
                    <div class="nutrient-item">
                        <h5>Phosphorus (P)</h5>
                        <p>${totalPhosphorus} lbs needed</p>
                    </div>
                    <div class="nutrient-item">
                        <h5>Potassium (K)</h5>
                        <p>${totalPotassium} lbs needed</p>
                    </div>
                </div>
                <div class="fertilizer-sources">
                    <h5>Recommended Fertilizer Sources:</h5>
                    <ul>
                        <li>NPK 15-15-15: ${Math.round(totalNitrogen / 15)} lbs</li>
                        <li>Urea (46-0-0): ${Math.round(totalNitrogen * 0.3 / 0.46)} lbs</li>
                        <li>Triple Superphosphate (0-46-0): ${Math.round(totalPhosphorus / 0.46)} lbs</li>
                        <li>Muriate of Potash (0-0-60): ${Math.round(totalPotassium / 0.60)} lbs</li>
                    </ul>
                </div>
            </div>
        `;
    }

    // Nutrient Deficiency Detection
    updateNutrientAnalysis() {
        if (!this.soilData) return;

        const analysis = this.generateNutrientDeficiencyAnalysis();
        document.getElementById('nutrient-info').innerHTML = analysis;
    }

    generateNutrientDeficiencyAnalysis() {
        const { nitrogen, phosphorus, potassium } = this.soilData;
        
        let analysis = '<div class="nutrient-deficiency-analysis">';
        
        // Check for deficiencies
        const deficiencies = [];
        
        if (nitrogen < 30) {
            deficiencies.push({
                nutrient: 'Nitrogen',
                symptoms: 'Yellowing leaves, stunted growth',
                solution: 'Apply nitrogen-rich fertilizer or compost',
                urgency: 'High'
            });
        }
        
        if (phosphorus < 15) {
            deficiencies.push({
                nutrient: 'Phosphorus',
                symptoms: 'Purple leaves, poor root development',
                solution: 'Apply phosphorus fertilizer or bone meal',
                urgency: 'Medium'
            });
        }
        
        if (potassium < 20) {
            deficiencies.push({
                nutrient: 'Potassium',
                symptoms: 'Brown leaf edges, weak stems',
                solution: 'Apply potassium fertilizer or wood ash',
                urgency: 'Medium'
            });
        }

        if (deficiencies.length === 0) {
            analysis += '<div class="no-deficiency"><p>No nutrient deficiencies detected. Soil is healthy!</p></div>';
        } else {
            deficiencies.forEach(deficiency => {
                const urgencyClass = deficiency.urgency === 'High' ? 'nutrient-alert' : 'fertilizer-item';
                analysis += `
                    <div class="${urgencyClass}">
                        <h4>${deficiency.nutrient} Deficiency</h4>
                        <p><strong>Symptoms:</strong> ${deficiency.symptoms}</p>
                        <p><strong>Solution:</strong> ${deficiency.solution}</p>
                        <p><strong>Urgency:</strong> ${deficiency.urgency}</p>
                    </div>
                `;
            });
        }

        analysis += '</div>';
        return analysis;
    }

    // Utility Functions
    updateRecommendations() {
        this.updateCropRecommendations();
        this.updateFertilizerRecommendations();
        this.updateNutrientAnalysis();
    }

    // Weather Forecast (Mock data for demonstration)
    generateWeatherForecast() {
        const forecast = [];
        const today = new Date();
        
        for (let i = 1; i <= 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            forecast.push({
                date: date.toLocaleDateString('en-IN', { weekday: 'short' }),
                temp: Math.round(20 + Math.random() * 15),
                condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
                humidity: Math.round(40 + Math.random() * 40),
                rainfall: Math.round(Math.random() * 10)
            });
        }
        
        return forecast;
    }

    updateWeatherForecast() {
        const forecast = this.forecastData && this.forecastData.length
            ? this.forecastData.map((d, idx) => ({
                date: new Date(Date.now() + (idx + 1) * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'short' }),
                temp: Math.round(d.temp?.day ?? (20 + Math.random() * 15)),
                condition: (d.weather && d.weather[0] && d.weather[0].description) || '—',
                humidity: d.humidity ?? Math.round(40 + Math.random() * 40),
                rainfall: Math.round((d.rain || 0) * 10) / 10,
                wind: d.wind_speed ?? Math.round(5 + Math.random() * 15)
            }))
            : this.generateWeatherForecast();
        const container = document.getElementById('forecast-grid');
        
        let forecastHTML = '';
        forecast.forEach(day => {
            forecastHTML += `
                <div class="forecast-day">
                    <h4>${day.date}</h4>
                    <p>${day.condition}</p>
                    <div class="forecast-temp">${day.temp}°C</div>
                    <p>Humidity: ${day.humidity}%</p>
                    <p>Wind: ${day.wind} km/h</p>
                    <p>Rain: ${day.rainfall}mm</p>
                </div>
            `;
        });
        
        container.innerHTML = forecastHTML;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication first
    checkAuthentication();
    window.agriFarm = new AgriFarmApp();
});

// Authentication check
function checkAuthentication() {
    const session = sessionStorage.getItem('agrifarm_session');
    if (!session) {
        window.location.href = 'login.html';
        return;
    }
    
    // Display welcome message with user name
    const user = JSON.parse(session);
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'welcome-message';
    welcomeMessage.innerHTML = `
        <div style="background: linear-gradient(135deg, #4a7c59 0%, #2c5530 100%); color: white; padding: 1rem; border-radius: 12px; margin-bottom: 2rem; text-align: center;">
            <h3 style="margin: 0; font-size: 1.2rem;">Welcome back, ${user.name}! 🌱</h3>
            <p style="margin: 0.5rem 0 0 0; opacity: 0.9; font-size: 0.9rem;">Ready to optimize your farming today?</p>
        </div>
    `;
    
    const mainContent = document.querySelector('.main-content');
    mainContent.insertBefore(welcomeMessage, mainContent.firstChild);
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('agrifarm_session');
        window.location.href = 'login.html';
    }
}

// Global functions for HTML onclick events
function analyzeSoil() {
    window.agriFarm.analyzeSoil();
}

function detailedSoilAnalysis() {
    window.agriFarm.detailedSoilAnalysis();
}

function calculateIrrigation() {
    window.agriFarm.calculateIrrigation();
}

function calculateFertilizer() {
    window.agriFarm.calculateFertilizer();
}

// Additional utility functions
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getWeatherIcon(condition) {
    const icons = {
        'sunny': 'fas fa-sun',
        'cloudy': 'fas fa-cloud',
        'rainy': 'fas fa-cloud-rain',
        'partly-cloudy': 'fas fa-cloud-sun'
    };
    return icons[condition.toLowerCase()] || 'fas fa-cloud';
}

// Location Management Functions
function showLocationModal() {
    document.getElementById('locationModal').style.display = 'block';
}

function hideLocationModal() {
    document.getElementById('locationModal').style.display = 'none';
    document.getElementById('locationResults').innerHTML = '';
    document.getElementById('locationSearch').value = '';
}

function selectQuickLocation(name, lat, lon) {
    window.agriFarm.selectedLocation = { name, lat, lon };
    try { localStorage.setItem('agrifarm_selected_location', JSON.stringify(window.agriFarm.selectedLocation)); } catch(e) {}
    window.agriFarm.fetchWeatherData();
    hideLocationModal();
}

async function searchLocation() {
    const query = document.getElementById('locationSearch').value.trim();
    if (!query) return;

    const resultsContainer = document.getElementById('locationResults');
    resultsContainer.innerHTML = '<div style="text-align: center; padding: 1rem;">Searching...</div>';

    try {
        // Using OpenWeatherMap Geocoding API
        const API_KEY = 'your_api_key_here'; // Replace with actual API key
        // Bias searches to India if no country specified
        const q = /,\s*[A-Za-z]{2}$/i.test(query) ? query : `${query}, IN`;
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=8&appid=${API_KEY}`
        );

        if (response.ok) {
            const locations = await response.json();
            displayLocationResults(locations);
        } else {
            throw new Error('Location search failed');
        }
    } catch (error) {
        console.error('Error searching locations:', error);
        resultsContainer.innerHTML = '<div style="text-align: center; padding: 1rem; color: #dc3545;">Search failed. Please try again.</div>';
    }
}

function displayLocationResults(locations) {
    const resultsContainer = document.getElementById('locationResults');
    
    if (locations.length === 0) {
        resultsContainer.innerHTML = '<div style="text-align: center; padding: 1rem; color: #666;">No locations found.</div>';
        return;
    }

    let html = '';
    locations.forEach(location => {
        const name = location.name;
        const country = location.country;
        const state = location.state ? `, ${location.state}` : '';
        
        html += `
            <div class="location-result-item" onclick="selectLocation('${name}', ${location.lat}, ${location.lon})">
                <div class="location-result-name">${name}${state}</div>
                <div class="location-result-country">${country}</div>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = html;
}

function selectLocation(name, lat, lon) {
    window.agriFarm.selectedLocation = { name, lat, lon };
    try { localStorage.setItem('agrifarm_selected_location', JSON.stringify(window.agriFarm.selectedLocation)); } catch(e) {}
    window.agriFarm.fetchWeatherData();
    hideLocationModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('locationModal');
    if (event.target === modal) {
        hideLocationModal();
    }
}

// Handle Enter key in location search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('locationSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchLocation();
            }
        });
    }
    // Wire hierarchy search buttons to class methods
    window.searchDistricts = () => window.agriFarm.searchDistricts();
    window.searchMandals = () => window.agriFarm.searchMandals();
    window.searchVillages = () => window.agriFarm.searchVillages();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AgriFarmApp;
}
