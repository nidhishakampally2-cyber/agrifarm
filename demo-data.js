// Demo data for AgriFarm application
// This file contains sample data for testing and demonstration purposes

const DEMO_DATA = {
    // Sample weather data for different locations
    weather: {
        locations: [
            {
                name: "California Farm",
                lat: 36.7783,
                lon: -119.4179,
                current: {
                    temp: 28,
                    humidity: 45,
                    windSpeed: 8,
                    rainfall: 0,
                    condition: "Sunny"
                }
            },
            {
                name: "Texas Ranch",
                lat: 31.9686,
                lon: -99.9018,
                current: {
                    temp: 32,
                    humidity: 60,
                    windSpeed: 12,
                    rainfall: 0,
                    condition: "Hot"
                }
            },
            {
                name: "Iowa Fields",
                lat: 41.8781,
                lon: -93.0977,
                current: {
                    temp: 22,
                    humidity: 75,
                    windSpeed: 6,
                    rainfall: 5,
                    condition: "Rainy"
                }
            }
        ]
    },

    // Sample soil data
    soil: {
        types: {
            clay: {
                description: "Heavy soil with high water retention",
                crops: ["Rice", "Corn", "Wheat", "Soybeans"],
                phRange: [6.0, 7.5],
                drainage: "Poor",
                fertility: "High"
            },
            sandy: {
                description: "Light soil with excellent drainage",
                crops: ["Carrots", "Potatoes", "Tomatoes", "Peanuts"],
                phRange: [5.5, 7.0],
                drainage: "Excellent",
                fertility: "Low"
            },
            loamy: {
                description: "Balanced soil with good structure",
                crops: ["Tomatoes", "Lettuce", "Peppers", "Beans"],
                phRange: [6.0, 7.0],
                drainage: "Good",
                fertility: "High"
            },
            silty: {
                description: "Fine-textured soil with good fertility",
                crops: ["Corn", "Soybeans", "Wheat", "Barley"],
                phRange: [6.5, 7.5],
                drainage: "Moderate",
                fertility: "High"
            }
        }
    },

    // Sample crop data
    crops: {
        tomato: {
            name: "Tomato",
            scientificName: "Solanum lycopersicum",
            waterNeeds: "Moderate",
            phRange: [6.0, 6.8],
            temperatureRange: [18, 30],
            growthDays: 75,
            nutrients: {
                nitrogen: 150,
                phosphorus: 80,
                potassium: 200
            },
            irrigation: {
                seedling: { frequency: "Daily", amount: "0.5 inches" },
                vegetative: { frequency: "Every 2 days", amount: "1 inch" },
                flowering: { frequency: "Every 2 days", amount: "1.5 inches" },
                fruiting: { frequency: "Every 3 days", amount: "2 inches" }
            }
        },
        corn: {
            name: "Corn",
            scientificName: "Zea mays",
            waterNeeds: "High",
            phRange: [6.0, 7.0],
            temperatureRange: [15, 35],
            growthDays: 90,
            nutrients: {
                nitrogen: 200,
                phosphorus: 100,
                potassium: 150
            },
            irrigation: {
                seedling: { frequency: "Every 2 days", amount: "0.5 inches" },
                vegetative: { frequency: "Every 3 days", amount: "1.5 inches" },
                flowering: { frequency: "Every 2 days", amount: "2 inches" },
                fruiting: { frequency: "Every 3 days", amount: "1.5 inches" }
            }
        },
        wheat: {
            name: "Wheat",
            scientificName: "Triticum aestivum",
            waterNeeds: "Moderate",
            phRange: [6.0, 7.5],
            temperatureRange: [10, 25],
            growthDays: 120,
            nutrients: {
                nitrogen: 120,
                phosphorus: 60,
                potassium: 100
            },
            irrigation: {
                seedling: { frequency: "Every 3 days", amount: "0.5 inches" },
                vegetative: { frequency: "Every 4 days", amount: "1 inch" },
                flowering: { frequency: "Every 3 days", amount: "1.5 inches" },
                fruiting: { frequency: "Every 4 days", amount: "1 inch" }
            }
        }
    },

    // Sample fertilizer data
    fertilizers: {
        npk: {
            "15-15-15": {
                name: "Balanced NPK",
                nitrogen: 15,
                phosphorus: 15,
                potassium: 15,
                price: 2.50,
                application: "General purpose"
            },
            "10-10-10": {
                name: "Standard NPK",
                nitrogen: 10,
                phosphorus: 10,
                potassium: 10,
                price: 2.00,
                application: "General purpose"
            },
            "20-10-10": {
                name: "High Nitrogen",
                nitrogen: 20,
                phosphorus: 10,
                potassium: 10,
                price: 2.75,
                application: "Leafy crops"
            }
        },
        organic: {
            compost: {
                name: "Compost",
                nitrogen: 2,
                phosphorus: 1,
                potassium: 2,
                price: 0.50,
                application: "Soil improvement"
            },
            manure: {
                name: "Manure",
                nitrogen: 3,
                phosphorus: 2,
                potassium: 2,
                price: 0.75,
                application: "Nutrient boost"
            }
        }
    },

    // Sample nutrient deficiency data
    deficiencies: {
        nitrogen: {
            symptoms: [
                "Yellowing of older leaves",
                "Stunted growth",
                "Reduced yield",
                "Smaller leaves"
            ],
            solutions: [
                "Apply nitrogen-rich fertilizer",
                "Add compost or manure",
                "Use legume cover crops",
                "Apply urea or ammonium nitrate"
            ],
            urgency: "High"
        },
        phosphorus: {
            symptoms: [
                "Purple or reddish leaves",
                "Poor root development",
                "Delayed maturity",
                "Small fruits"
            ],
            solutions: [
                "Apply phosphorus fertilizer",
                "Use bone meal",
                "Apply rock phosphate",
                "Improve soil pH"
            ],
            urgency: "Medium"
        },
        potassium: {
            symptoms: [
                "Brown leaf edges",
                "Weak stems",
                "Poor fruit quality",
                "Increased disease susceptibility"
            ],
            solutions: [
                "Apply potassium fertilizer",
                "Use wood ash",
                "Apply muriate of potash",
                "Add potassium sulfate"
            ],
            urgency: "Medium"
        }
    },

    // Sample irrigation schedules
    irrigation: {
        schedules: {
            hot_dry: {
                name: "Hot and Dry Conditions",
                multiplier: 1.5,
                frequency: "Increase by 50%",
                timing: "Early morning or evening"
            },
            rainy: {
                name: "Rainy Conditions",
                multiplier: 0.5,
                frequency: "Reduce by 50%",
                timing: "Skip if rain > 0.5 inches"
            },
            normal: {
                name: "Normal Conditions",
                multiplier: 1.0,
                frequency: "Standard schedule",
                timing: "Morning"
            }
        }
    }
};

// Export for use in the main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DEMO_DATA;
} else if (typeof window !== 'undefined') {
    window.DEMO_DATA = DEMO_DATA;
}
