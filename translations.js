// AgriFarm Translation System
class TranslationManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {
            en: {
                // Login Page
                'welcome_back': 'Welcome Back!',
                'join_agrifarm': 'Join AgriFarm',
                'full_name': 'Full Name',
                'enter_full_name': 'Enter your full name',
                'mobile_number': 'Mobile Number',
                'enter_mobile': 'Enter your mobile number',
                'password': 'Password',
                'enter_password': 'Enter your password',
                'login': 'Login',
                'register': 'Register',
                'send_otp': 'Send OTP',
                'verify_otp': 'Verify OTP',
                'enter_6_digit_code': 'Enter the 6-digit code sent to your mobile',
                'set_password': 'Set Password',
                'create_secure_password': 'Create a secure password for your account',
                'confirm_password': 'Confirm Password',
                'create_account': 'Create Account',
                'resend_otp': 'Resend OTP',
                
                // Dashboard
                'smart_crop_management': 'Smart Crop Management Dashboard',
                'optimize_farming': 'Optimize your farming with AI-powered weather and soil analysis',
                'current_weather': 'Current Weather',
                'soil_analysis': 'Soil Analysis',
                'recommended_crops': 'Recommended Crops',
                'irrigation_schedule': 'Irrigation Schedule',
                'fertilizer_recommendations': 'Fertilizer Recommendations',
                'nutrient_deficiency': 'Nutrient Deficiency Detection',
                'dashboard': 'Dashboard',
                'weather': 'Weather',
                'irrigation': 'Irrigation',
                'fertilizer': 'Fertilizer',
                'logout': 'Logout',
                'welcome_user': 'Welcome back, {name}! 🌱',
                'ready_to_optimize': 'Ready to optimize your farming today?',
                
                // Weather
                'humidity': 'Humidity',
                'wind': 'Wind',
                'rain': 'Rain',
                'temperature': 'Temperature',
                'change_location': 'Change Location',
                'select_location': 'Select Location',
                'enter_city_name': 'Enter city name (e.g., New York, London)',
                'search': 'Search',
                'india_hierarchical': 'India Hierarchical Selection',
                'state_ut': 'State/UT',
                'quick_select': 'Quick Select (India):',
                
                // Soil Analysis
                'soil_type': 'Soil Type',
                'select_soil_type': 'Select Soil Type',
                'clay': 'Clay',
                'sandy': 'Sandy',
                'loamy': 'Loamy',
                'silty': 'Silty',
                'ph_level': 'pH Level',
                'nutrient_level': 'Nutrient Level',
                'select_level': 'Select Level',
                'low': 'Low',
                'medium': 'Medium',
                'high': 'High',
                'analyze_soil': 'Analyze Soil',
                'complete_soil_analysis': 'Complete soil analysis to get crop recommendations',
                
                // Irrigation
                'smart_irrigation': 'Smart irrigation monitoring active',
                'next_watering': 'Next watering',
                'calculating': 'Calculating...',
                'irrigation_settings': 'Irrigation Settings',
                'crop_type': 'Crop Type',
                'select_crop': 'Select Crop',
                'tomato': 'Tomato',
                'corn': 'Corn',
                'wheat': 'Wheat',
                'rice': 'Rice',
                'potato': 'Potato',
                'growth_stage': 'Growth Stage',
                'select_stage': 'Select Stage',
                'seedling': 'Seedling',
                'vegetative': 'Vegetative',
                'flowering': 'Flowering',
                'fruiting': 'Fruiting',
                'maturity': 'Maturity',
                'calculate_irrigation': 'Calculate Irrigation Schedule',
                'recommended_irrigation': 'Recommended Irrigation Schedule',
                'select_crop_stage': 'Select crop type and growth stage to get irrigation recommendations',
                
                // Fertilizer
                'fertilizer_management': 'Fertilizer Management',
                'optimized_fertilizer': 'Optimized fertilizer recommendations based on soil analysis and crop requirements',
                'fertilizer_calculator': 'Fertilizer Calculator',
                'crop_selection': 'Crop Selection',
                'field_size': 'Field Size (acres)',
                'soil_fertility': 'Soil Fertility Level',
                'calculate_fertilizer': 'Calculate Fertilizer Needs',
                'enter_crop_details': 'Enter crop details to get fertilizer recommendations',
                
                // Common
                'loading': 'Loading...',
                'error': 'Error',
                'success': 'Success',
                'cancel': 'Cancel',
                'save': 'Save',
                'edit': 'Edit',
                'delete': 'Delete',
                'close': 'Close',
                'yes': 'Yes',
                'no': 'No',
                
                // Tab buttons
                'login_tab': 'Login',
                'register_tab': 'Register',
                
                // OTP and Password
                'verify_otp_title': 'Verify OTP',
                'enter_6_digit_code': 'Enter the 6-digit code sent to your mobile',
                'set_password_title': 'Set Password',
                'create_secure_password': 'Create a secure password for your account',
                'confirm_password': 'Confirm Password',
                'create_account': 'Create Account',
                'resend_otp': 'Resend OTP',
                
                // Weather details
                'humidity_label': 'Humidity',
                'wind_label': 'Wind',
                'rain_label': 'Rain',
                'temperature_label': 'Temperature',
                'change_location': 'Change Location',
                'select_location': 'Select Location',
                'enter_city_name': 'Enter city name (e.g., New York, London)',
                'search': 'Search',
                'india_hierarchical': 'India Hierarchical Selection',
                'state_ut': 'State/UT',
                'quick_select': 'Quick Select (India):',
                
                // Soil Analysis
                'soil_type': 'Soil Type',
                'select_soil_type': 'Select Soil Type',
                'clay': 'Clay',
                'sandy': 'Sandy',
                'loamy': 'Loamy',
                'silty': 'Silty',
                'ph_level': 'pH Level',
                'nutrient_level': 'Nutrient Level',
                'select_level': 'Select Level',
                'low': 'Low',
                'medium': 'Medium',
                'high': 'High',
                'analyze_soil': 'Analyze Soil',
                'complete_soil_analysis': 'Complete soil analysis to get crop recommendations',
                
                // Irrigation
                'smart_irrigation': 'Smart irrigation monitoring active',
                'next_watering': 'Next watering',
                'calculating': 'Calculating...',
                'irrigation_settings': 'Irrigation Settings',
                'crop_type': 'Crop Type',
                'select_crop': 'Select Crop',
                'tomato': 'Tomato',
                'corn': 'Corn',
                'wheat': 'Wheat',
                'rice': 'Rice',
                'potato': 'Potato',
                'growth_stage': 'Growth Stage',
                'select_stage': 'Select Stage',
                'seedling': 'Seedling',
                'vegetative': 'Vegetative',
                'flowering': 'Flowering',
                'fruiting': 'Fruiting',
                'maturity': 'Maturity',
                'calculate_irrigation': 'Calculate Irrigation Schedule',
                'recommended_irrigation': 'Recommended Irrigation Schedule',
                'select_crop_stage': 'Select crop type and growth stage to get irrigation recommendations',
                
                // Fertilizer
                'fertilizer_management': 'Fertilizer Management',
                'optimized_fertilizer': 'Optimized fertilizer recommendations based on soil analysis and crop requirements',
                'fertilizer_calculator': 'Fertilizer Calculator',
                'crop_selection': 'Crop Selection',
                'field_size': 'Field Size (acres)',
                'soil_fertility': 'Soil Fertility Level',
                'calculate_fertilizer': 'Calculate Fertilizer Needs',
                'enter_crop_details': 'Enter crop details to get fertilizer recommendations',
                
                // Footer
                'footer_copyright': '© 2024 AgriFarm - Smart Agriculture Solutions',
                'footer_powered': 'Powered by AI and Weather Data',
                
                // Modal
                'modal_close': '×',
                'modal_select_location': 'Select Location',
                
                // Additional sections
                'comprehensive_soil_analysis': 'Comprehensive Soil Analysis',
                'detailed_soil_testing': 'Detailed soil testing and crop suitability analysis',
                'soil_test_parameters': 'Soil Test Parameters',
                'clay_soil': 'Clay Soil',
                'sandy_soil': 'Sandy Soil',
                'loamy_soil': 'Loamy Soil',
                'silty_soil': 'Silty Soil',
                'peaty_soil': 'Peaty Soil',
                'chalky_soil': 'Chalky Soil',
                'nitrogen_n': 'Nitrogen (N)',
                'phosphorus_p': 'Phosphorus (P)',
                'potassium_k': 'Potassium (K)',
                'organic_matter': 'Organic Matter (%)',
                'run_detailed_analysis': 'Run Detailed Analysis',
                'analysis_results': 'Analysis Results',
                'enter_soil_parameters': 'Enter soil parameters to get detailed analysis',
                
                'weather_monitoring': 'Weather Monitoring & Forecast',
                'real_time_weather': 'Real-time weather data and 7-day forecast for optimal farming decisions',
                'current_conditions': 'Current Conditions',
                'seven_day_forecast': '7-Day Forecast',
                
                'smart_irrigation_management': 'Smart Irrigation Management',
                'automated_watering': 'Automated watering schedule based on weather conditions and soil moisture',
                
                'recommended_crops': 'Recommended Crops',
                'irrigation_schedule': 'Irrigation Schedule',
                'fertilizer_recommendations': 'Fertilizer Recommendations',
                'nutrient_deficiency': 'Nutrient Deficiency Detection',
                
                'lettuce': 'Lettuce',
                'carrot': 'Carrot',
                'select_state_ut': 'Select State/UT'
            },
            
            te: {
                // Login Page
                'welcome_back': 'మళ్లీ స్వాగతం!',
                'join_agrifarm': 'AgriFarmలో చేరండి',
                'full_name': 'పూర్తి పేరు',
                'enter_full_name': 'మీ పూర్తి పేరును నమోదు చేయండి',
                'mobile_number': 'మొబైల్ నంబర్',
                'enter_mobile': 'మీ మొబైల్ నంబర్‌ను నమోదు చేయండి',
                'password': 'పాస్‌వర్డ్',
                'enter_password': 'మీ పాస్‌వర్డ్‌ను నమోదు చేయండి',
                'login': 'లాగిన్',
                'register': 'నమోదు',
                'send_otp': 'OTP పంపండి',
                'verify_otp': 'OTP ని ధృవీకరించండి',
                'enter_6_digit_code': 'మీ మొబైల్‌కు పంపిన 6-అంకెల కోడ్‌ను నమోదు చేయండి',
                'set_password': 'పాస్‌వర్డ్ సెట్ చేయండి',
                'create_secure_password': 'మీ ఖాతా కోసం సురక్షితమైన పాస్‌వర్డ్ సృష్టించండి',
                'confirm_password': 'పాస్‌వర్డ్‌ను నిర్ధారించండి',
                'create_account': 'ఖాతా సృష్టించండి',
                'resend_otp': 'OTP మళ్లీ పంపండి',
                
                // Dashboard
                'smart_crop_management': 'స్మార్ట్ పంట నిర్వహణ డాష్‌బోర్డ్',
                'optimize_farming': 'AI-ఆధారిత వాతావరణ మరియు నేల విశ్లేషణతో మీ వ్యవసాయాన్ని ఆప్టిమైజ్ చేయండి',
                'current_weather': 'ప్రస్తుత వాతావరణం',
                'soil_analysis': 'నేల విశ్లేషణ',
                'recommended_crops': 'సిఫారసు చేసిన పంటలు',
                'irrigation_schedule': 'నీటిపారుదల షెడ్యూల్',
                'fertilizer_recommendations': 'ఎరువు సిఫారసులు',
                'nutrient_deficiency': 'పోషక లోపం గుర్తింపు',
                'dashboard': 'డాష్‌బోర్డ్',
                'weather': 'వాతావరణం',
                'irrigation': 'నీటిపారుదల',
                'fertilizer': 'ఎరువు',
                'logout': 'లాగ్‌అవుట్',
                'welcome_user': 'మళ్లీ స్వాగతం, {name}! 🌱',
                'ready_to_optimize': 'ఈరోజు మీ వ్యవసాయాన్ని ఆప్టిమైజ్ చేయడానికి సిద్ధంగా ఉన్నారా?',
                
                // Weather
                'humidity': 'తేమ',
                'wind': 'గాలి',
                'rain': 'వర్షం',
                'temperature': 'ఉష్ణోగ్రత',
                'change_location': 'స్థానాన్ని మార్చండి',
                'select_location': 'స్థానాన్ని ఎంచుకోండి',
                'enter_city_name': 'నగర పేరును నమోదు చేయండి (ఉదా: హైదరాబాద్, విజయవాడ)',
                'search': 'వెతకండి',
                'india_hierarchical': 'భారత హైరార్కికల్ ఎంపిక',
                'state_ut': 'రాష్ట్రం/కేంద్రపాలిత ప్రాంతం',
                'quick_select': 'త్వరిత ఎంపిక (భారతదేశం):',
                
                // Soil Analysis
                'soil_type': 'నేల రకం',
                'select_soil_type': 'నేల రకాన్ని ఎంచుకోండి',
                'clay': 'మట్టి',
                'sandy': 'ఇసుక',
                'loamy': 'మట్టి-ఇసుక',
                'silty': 'ఇసుక-మట్టి',
                'ph_level': 'pH స్థాయి',
                'nutrient_level': 'పోషక స్థాయి',
                'select_level': 'స్థాయిని ఎంచుకోండి',
                'low': 'తక్కువ',
                'medium': 'మధ్యస్థ',
                'high': 'ఎక్కువ',
                'analyze_soil': 'నేలను విశ్లేషించండి',
                'complete_soil_analysis': 'పంట సిఫారసులను పొందడానికి నేల విశ్లేషణను పూర్తి చేయండి',
                
                // Irrigation
                'smart_irrigation': 'స్మార్ట్ నీటిపారుదల పర్యవేక్షణ చురుకుగా ఉంది',
                'next_watering': 'తదుపరి నీటిపారుదల',
                'calculating': 'లెక్కిస్తోంది...',
                'irrigation_settings': 'నీటిపారుదల సెట్టింగ్‌లు',
                'crop_type': 'పంట రకం',
                'select_crop': 'పంటను ఎంచుకోండి',
                'tomato': 'టమాట',
                'corn': 'మొక్కజొన్న',
                'wheat': 'గోధుమలు',
                'rice': 'వరి',
                'potato': 'బంగాళాదుంప',
                'growth_stage': 'వృద్ధి దశ',
                'select_stage': 'దశను ఎంచుకోండి',
                'seedling': 'మొలక',
                'vegetative': 'సస్య',
                'flowering': 'పుష్పించే',
                'fruiting': 'పండే',
                'maturity': 'పరిపక్వత',
                'calculate_irrigation': 'నీటిపారుదల షెడ్యూల్‌ను లెక్కించండి',
                'recommended_irrigation': 'సిఫారసు చేసిన నీటిపారుదల షెడ్యూల్',
                'select_crop_stage': 'నీటిపారుదల సిఫారసులను పొందడానికి పంట రకం మరియు వృద్ధి దశను ఎంచుకోండి',
                
                // Fertilizer
                'fertilizer_management': 'ఎరువు నిర్వహణ',
                'optimized_fertilizer': 'నేల విశ్లేషణ మరియు పంట అవసరాల ఆధారంగా ఆప్టిమైజ్ చేసిన ఎరువు సిఫారసులు',
                'fertilizer_calculator': 'ఎరువు కాలిక్యులేటర్',
                'crop_selection': 'పంట ఎంపిక',
                'field_size': 'క్షేత్ర పరిమాణం (ఎకరాలు)',
                'soil_fertility': 'నేల సారవంతత స్థాయి',
                'calculate_fertilizer': 'ఎరువు అవసరాలను లెక్కించండి',
                'enter_crop_details': 'ఎరువు సిఫారసులను పొందడానికి పంట వివరాలను నమోదు చేయండి',
                
                // Common
                'loading': 'లోడ్ అవుతోంది...',
                'error': 'లోపం',
                'success': 'విజయం',
                'cancel': 'రద్దు చేయండి',
                'save': 'సేవ్ చేయండి',
                'edit': 'సవరించండి',
                'delete': 'తొలగించండి',
                'close': 'మూసివేయండి',
                'yes': 'అవును',
                'no': 'కాదు',
                
                // Tab buttons
                'login_tab': 'లాగిన్',
                'register_tab': 'నమోదు',
                
                // OTP and Password
                'verify_otp_title': 'OTP ని ధృవీకరించండి',
                'enter_6_digit_code': 'మీ మొబైల్‌కు పంపిన 6-అంకెల కోడ్‌ను నమోదు చేయండి',
                'set_password_title': 'పాస్‌వర్డ్ సెట్ చేయండి',
                'create_secure_password': 'మీ ఖాతా కోసం సురక్షితమైన పాస్‌వర్డ్ సృష్టించండి',
                'confirm_password': 'పాస్‌వర్డ్‌ను నిర్ధారించండి',
                'create_account': 'ఖాతా సృష్టించండి',
                'resend_otp': 'OTP మళ్లీ పంపండి',
                
                // Weather details
                'humidity_label': 'తేమ',
                'wind_label': 'గాలి',
                'rain_label': 'వర్షం',
                'temperature_label': 'ఉష్ణోగ్రత',
                'change_location': 'స్థానాన్ని మార్చండి',
                'select_location': 'స్థానాన్ని ఎంచుకోండి',
                'enter_city_name': 'నగర పేరును నమోదు చేయండి (ఉదా: హైదరాబాద్, విజయవాడ)',
                'search': 'వెతకండి',
                'india_hierarchical': 'భారత హైరార్కికల్ ఎంపిక',
                'state_ut': 'రాష్ట్రం/కేంద్రపాలిత ప్రాంతం',
                'quick_select': 'త్వరిత ఎంపిక (భారతదేశం):',
                
                // Soil Analysis
                'soil_type': 'నేల రకం',
                'select_soil_type': 'నేల రకాన్ని ఎంచుకోండి',
                'clay': 'మట్టి',
                'sandy': 'ఇసుక',
                'loamy': 'మట్టి-ఇసుక',
                'silty': 'ఇసుక-మట్టి',
                'ph_level': 'pH స్థాయి',
                'nutrient_level': 'పోషక స్థాయి',
                'select_level': 'స్థాయిని ఎంచుకోండి',
                'low': 'తక్కువ',
                'medium': 'మధ్యస్థ',
                'high': 'ఎక్కువ',
                'analyze_soil': 'నేలను విశ్లేషించండి',
                'complete_soil_analysis': 'పంట సిఫారసులను పొందడానికి నేల విశ్లేషణను పూర్తి చేయండి',
                
                // Irrigation
                'smart_irrigation': 'స్మార్ట్ నీటిపారుదల పర్యవేక్షణ చురుకుగా ఉంది',
                'next_watering': 'తదుపరి నీటిపారుదల',
                'calculating': 'లెక్కిస్తోంది...',
                'irrigation_settings': 'నీటిపారుదల సెట్టింగ్‌లు',
                'crop_type': 'పంట రకం',
                'select_crop': 'పంటను ఎంచుకోండి',
                'tomato': 'టమాట',
                'corn': 'మొక్కజొన్న',
                'wheat': 'గోధుమలు',
                'rice': 'వరి',
                'potato': 'బంగాళాదుంప',
                'growth_stage': 'వృద్ధి దశ',
                'select_stage': 'దశను ఎంచుకోండి',
                'seedling': 'మొలక',
                'vegetative': 'సస్య',
                'flowering': 'పుష్పించే',
                'fruiting': 'పండే',
                'maturity': 'పరిపక్వత',
                'calculate_irrigation': 'నీటిపారుదల షెడ్యూల్‌ను లెక్కించండి',
                'recommended_irrigation': 'సిఫారసు చేసిన నీటిపారుదల షెడ్యూల్',
                'select_crop_stage': 'నీటిపారుదల సిఫారసులను పొందడానికి పంట రకం మరియు వృద్ధి దశను ఎంచుకోండి',
                
                // Fertilizer
                'fertilizer_management': 'ఎరువు నిర్వహణ',
                'optimized_fertilizer': 'నేల విశ్లేషణ మరియు పంట అవసరాల ఆధారంగా ఆప్టిమైజ్ చేసిన ఎరువు సిఫారసులు',
                'fertilizer_calculator': 'ఎరువు కాలిక్యులేటర్',
                'crop_selection': 'పంట ఎంపిక',
                'field_size': 'క్షేత్ర పరిమాణం (ఎకరాలు)',
                'soil_fertility': 'నేల సారవంతత స్థాయి',
                'calculate_fertilizer': 'ఎరువు అవసరాలను లెక్కించండి',
                'enter_crop_details': 'ఎరువు సిఫారసులను పొందడానికి పంట వివరాలను నమోదు చేయండి',
                
                // Footer
                'footer_copyright': '© 2024 AgriFarm - స్మార్ట్ వ్యవసాయ పరిష్కారాలు',
                'footer_powered': 'AI మరియు వాతావరణ డేటా ద్వారా శక్తివంతం',
                
                // Modal
                'modal_close': '×',
                'modal_select_location': 'స్థానాన్ని ఎంచుకోండి',
                
                // Additional sections
                'comprehensive_soil_analysis': 'సమగ్ర నేల విశ్లేషణ',
                'detailed_soil_testing': 'వివరణాత్మక నేల పరీక్ష మరియు పంట అనుకూలత విశ్లేషణ',
                'soil_test_parameters': 'నేల పరీక్ష పారామితులు',
                'clay_soil': 'మట్టి నేల',
                'sandy_soil': 'ఇసుక నేల',
                'loamy_soil': 'మట్టి-ఇసుక నేల',
                'silty_soil': 'ఇసుక-మట్టి నేల',
                'peaty_soil': 'పీట్ నేల',
                'chalky_soil': 'చాక్ నేల',
                'nitrogen_n': 'నైట్రోజన్ (N)',
                'phosphorus_p': 'ఫాస్ఫరస్ (P)',
                'potassium_k': 'పొటాషియం (K)',
                'organic_matter': 'సేంద్రీయ పదార్థం (%)',
                'run_detailed_analysis': 'వివరణాత్మక విశ్లేషణను అమలు చేయండి',
                'analysis_results': 'విశ్లేషణ ఫలితాలు',
                'enter_soil_parameters': 'వివరణాత్మక విశ్లేషణ పొందడానికి నేల పారామితులను నమోదు చేయండి',
                
                'weather_monitoring': 'వాతావరణ పర్యవేక్షణ మరియు అంచనా',
                'real_time_weather': 'అనుకూల వ్యవసాయ నిర్ణయాల కోసం రియల్-టైమ్ వాతావరణ డేటా మరియు 7-రోజుల అంచనా',
                'current_conditions': 'ప్రస్తుత పరిస్థితులు',
                'seven_day_forecast': '7-రోజుల అంచనా',
                
                'smart_irrigation_management': 'స్మార్ట్ నీటిపారుదల నిర్వహణ',
                'automated_watering': 'వాతావరణ పరిస్థితులు మరియు నేల తేమ ఆధారంగా ఆటోమేటెడ్ నీటిపారుదల షెడ్యూల్',
                
                'recommended_crops': 'సిఫారసు చేసిన పంటలు',
                'irrigation_schedule': 'నీటిపారుదల షెడ్యూల్',
                'fertilizer_recommendations': 'ఎరువు సిఫారసులు',
                'nutrient_deficiency': 'పోషక లోపం గుర్తింపు',
                
                'lettuce': 'లెట్యూస్',
                'carrot': 'క్యారెట్',
                'select_state_ut': 'రాష్ట్రం/కేంద్రపాలిత ప్రాంతాన్ని ఎంచుకోండి'
            },
            
            hi: {
                // Login Page
                'welcome_back': 'वापस स्वागत है!',
                'join_agrifarm': 'AgriFarm में शामिल हों',
                'full_name': 'पूरा नाम',
                'enter_full_name': 'अपना पूरा नाम दर्ज करें',
                'mobile_number': 'मोबाइल नंबर',
                'enter_mobile': 'अपना मोबाइल नंबर दर्ज करें',
                'password': 'पासवर्ड',
                'enter_password': 'अपना पासवर्ड दर्ज करें',
                'login': 'लॉगिन',
                'register': 'रजिस्टर',
                'send_otp': 'OTP भेजें',
                'verify_otp': 'OTP सत्यापित करें',
                'enter_6_digit_code': 'अपने मोबाइल पर भेजे गए 6-अंकीय कोड को दर्ज करें',
                'set_password': 'पासवर्ड सेट करें',
                'create_secure_password': 'अपने खाते के लिए एक सुरक्षित पासवर्ड बनाएं',
                'confirm_password': 'पासवर्ड की पुष्टि करें',
                'create_account': 'खाता बनाएं',
                'resend_otp': 'OTP पुनः भेजें',
                
                // Dashboard
                'smart_crop_management': 'स्मार्ट फसल प्रबंधन डैशबोर्ड',
                'optimize_farming': 'AI-संचालित मौसम और मिट्टी विश्लेषण के साथ अपनी खेती को अनुकूलित करें',
                'current_weather': 'वर्तमान मौसम',
                'soil_analysis': 'मिट्टी विश्लेषण',
                'recommended_crops': 'अनुशंसित फसलें',
                'irrigation_schedule': 'सिंचाई अनुसूची',
                'fertilizer_recommendations': 'उर्वरक सिफारिशें',
                'nutrient_deficiency': 'पोषक तत्व की कमी का पता लगाना',
                'dashboard': 'डैशबोर्ड',
                'weather': 'मौसम',
                'irrigation': 'सिंचाई',
                'fertilizer': 'उर्वरक',
                'logout': 'लॉगआउट',
                'welcome_user': 'वापस स्वागत है, {name}! 🌱',
                'ready_to_optimize': 'आज अपनी खेती को अनुकूलित करने के लिए तैयार हैं?',
                
                // Weather
                'humidity': 'आर्द्रता',
                'wind': 'हवा',
                'rain': 'बारिश',
                'temperature': 'तापमान',
                'change_location': 'स्थान बदलें',
                'select_location': 'स्थान चुनें',
                'enter_city_name': 'शहर का नाम दर्ज करें (जैसे: दिल्ली, मुंबई)',
                'search': 'खोजें',
                'india_hierarchical': 'भारत पदानुक्रमिक चयन',
                'state_ut': 'राज्य/केंद्र शासित प्रदेश',
                'quick_select': 'त्वरित चयन (भारत):',
                
                // Soil Analysis
                'soil_type': 'मिट्टी का प्रकार',
                'select_soil_type': 'मिट्टी का प्रकार चुनें',
                'clay': 'चिकनी मिट्टी',
                'sandy': 'बलुई मिट्टी',
                'loamy': 'दोमट मिट्टी',
                'silty': 'गाद मिट्टी',
                'ph_level': 'pH स्तर',
                'nutrient_level': 'पोषक तत्व स्तर',
                'select_level': 'स्तर चुनें',
                'low': 'कम',
                'medium': 'मध्यम',
                'high': 'उच्च',
                'analyze_soil': 'मिट्टी का विश्लेषण करें',
                'complete_soil_analysis': 'फसल सिफारिशें प्राप्त करने के लिए मिट्टी विश्लेषण पूरा करें',
                
                // Irrigation
                'smart_irrigation': 'स्मार्ट सिंचाई निगरानी सक्रिय',
                'next_watering': 'अगली सिंचाई',
                'calculating': 'गणना कर रहे हैं...',
                'irrigation_settings': 'सिंचाई सेटिंग्स',
                'crop_type': 'फसल प्रकार',
                'select_crop': 'फसल चुनें',
                'tomato': 'टमाटर',
                'corn': 'मक्का',
                'wheat': 'गेहूं',
                'rice': 'चावल',
                'potato': 'आलू',
                'growth_stage': 'वृद्धि चरण',
                'select_stage': 'चरण चुनें',
                'seedling': 'अंकुर',
                'vegetative': 'वानस्पतिक',
                'flowering': 'फूल आना',
                'fruiting': 'फल आना',
                'maturity': 'परिपक्वता',
                'calculate_irrigation': 'सिंचाई अनुसूची की गणना करें',
                'recommended_irrigation': 'अनुशंसित सिंचाई अनुसूची',
                'select_crop_stage': 'सिंचाई सिफारिशें प्राप्त करने के लिए फसल प्रकार और वृद्धि चरण चुनें',
                
                // Fertilizer
                'fertilizer_management': 'उर्वरक प्रबंधन',
                'optimized_fertilizer': 'मिट्टी विश्लेषण और फसल आवश्यकताओं के आधार पर अनुकूलित उर्वरक सिफारिशें',
                'fertilizer_calculator': 'उर्वरक कैलकुलेटर',
                'crop_selection': 'फसल चयन',
                'field_size': 'खेत का आकार (एकड़)',
                'soil_fertility': 'मिट्टी की उर्वरता स्तर',
                'calculate_fertilizer': 'उर्वरक आवश्यकताओं की गणना करें',
                'enter_crop_details': 'उर्वरक सिफारिशें प्राप्त करने के लिए फसल विवरण दर्ज करें',
                
                // Common
                'loading': 'लोड हो रहा है...',
                'error': 'त्रुटि',
                'success': 'सफलता',
                'cancel': 'रद्द करें',
                'save': 'सहेजें',
                'edit': 'संपादित करें',
                'delete': 'हटाएं',
                'close': 'बंद करें',
                'yes': 'हां',
                'no': 'नहीं',
                
                // Tab buttons
                'login_tab': 'लॉगिन',
                'register_tab': 'रजिस्टर',
                
                // OTP and Password
                'verify_otp_title': 'OTP सत्यापित करें',
                'enter_6_digit_code': 'अपने मोबाइल पर भेजे गए 6-अंकीय कोड को दर्ज करें',
                'set_password_title': 'पासवर्ड सेट करें',
                'create_secure_password': 'अपने खाते के लिए एक सुरक्षित पासवर्ड बनाएं',
                'confirm_password': 'पासवर्ड की पुष्टि करें',
                'create_account': 'खाता बनाएं',
                'resend_otp': 'OTP पुनः भेजें',
                
                // Weather details
                'humidity_label': 'आर्द्रता',
                'wind_label': 'हवा',
                'rain_label': 'बारिश',
                'temperature_label': 'तापमान',
                'change_location': 'स्थान बदलें',
                'select_location': 'स्थान चुनें',
                'enter_city_name': 'शहर का नाम दर्ज करें (जैसे: दिल्ली, मुंबई)',
                'search': 'खोजें',
                'india_hierarchical': 'भारत पदानुक्रमिक चयन',
                'state_ut': 'राज्य/केंद्र शासित प्रदेश',
                'quick_select': 'त्वरित चयन (भारत):',
                
                // Soil Analysis
                'soil_type': 'मिट्टी का प्रकार',
                'select_soil_type': 'मिट्टी का प्रकार चुनें',
                'clay': 'चिकनी मिट्टी',
                'sandy': 'बलुई मिट्टी',
                'loamy': 'दोमट मिट्टी',
                'silty': 'गाद मिट्टी',
                'ph_level': 'pH स्तर',
                'nutrient_level': 'पोषक तत्व स्तर',
                'select_level': 'स्तर चुनें',
                'low': 'कम',
                'medium': 'मध्यम',
                'high': 'उच्च',
                'analyze_soil': 'मिट्टी का विश्लेषण करें',
                'complete_soil_analysis': 'फसल सिफारिशें प्राप्त करने के लिए मिट्टी विश्लेषण पूरा करें',
                
                // Irrigation
                'smart_irrigation': 'स्मार्ट सिंचाई निगरानी सक्रिय',
                'next_watering': 'अगली सिंचाई',
                'calculating': 'गणना कर रहे हैं...',
                'irrigation_settings': 'सिंचाई सेटिंग्स',
                'crop_type': 'फसल प्रकार',
                'select_crop': 'फसल चुनें',
                'tomato': 'टमाटर',
                'corn': 'मक्का',
                'wheat': 'गेहूं',
                'rice': 'चावल',
                'potato': 'आलू',
                'growth_stage': 'वृद्धि चरण',
                'select_stage': 'चरण चुनें',
                'seedling': 'अंकुर',
                'vegetative': 'वानस्पतिक',
                'flowering': 'फूल आना',
                'fruiting': 'फल आना',
                'maturity': 'परिपक्वता',
                'calculate_irrigation': 'सिंचाई अनुसूची की गणना करें',
                'recommended_irrigation': 'अनुशंसित सिंचाई अनुसूची',
                'select_crop_stage': 'सिंचाई सिफारिशें प्राप्त करने के लिए फसल प्रकार और वृद्धि चरण चुनें',
                
                // Fertilizer
                'fertilizer_management': 'उर्वरक प्रबंधन',
                'optimized_fertilizer': 'मिट्टी विश्लेषण और फसल आवश्यकताओं के आधार पर अनुकूलित उर्वरक सिफारिशें',
                'fertilizer_calculator': 'उर्वरक कैलकुलेटर',
                'crop_selection': 'फसल चयन',
                'field_size': 'खेत का आकार (एकड़)',
                'soil_fertility': 'मिट्टी की उर्वरता स्तर',
                'calculate_fertilizer': 'उर्वरक आवश्यकताओं की गणना करें',
                'enter_crop_details': 'उर्वरक सिफारिशें प्राप्त करने के लिए फसल विवरण दर्ज करें',
                
                // Footer
                'footer_copyright': '© 2024 AgriFarm - स्मार्ट कृषि समाधान',
                'footer_powered': 'AI और मौसम डेटा द्वारा संचालित',
                
                // Modal
                'modal_close': '×',
                'modal_select_location': 'स्थान चुनें',
                
                // Additional sections
                'comprehensive_soil_analysis': 'व्यापक मिट्टी विश्लेषण',
                'detailed_soil_testing': 'विस्तृत मिट्टी परीक्षण और फसल उपयुक्तता विश्लेषण',
                'soil_test_parameters': 'मिट्टी परीक्षण पैरामीटर',
                'clay_soil': 'चिकनी मिट्टी',
                'sandy_soil': 'बलुई मिट्टी',
                'loamy_soil': 'दोमट मिट्टी',
                'silty_soil': 'गाद मिट्टी',
                'peaty_soil': 'पीट मिट्टी',
                'chalky_soil': 'चाक मिट्टी',
                'nitrogen_n': 'नाइट्रोजन (N)',
                'phosphorus_p': 'फॉस्फोरस (P)',
                'potassium_k': 'पोटेशियम (K)',
                'organic_matter': 'कार्बनिक पदार्थ (%)',
                'run_detailed_analysis': 'विस्तृत विश्लेषण चलाएं',
                'analysis_results': 'विश्लेषण परिणाम',
                'enter_soil_parameters': 'विस्तृत विश्लेषण प्राप्त करने के लिए मिट्टी पैरामीटर दर्ज करें',
                
                'weather_monitoring': 'मौसम निगरानी और पूर्वानुमान',
                'real_time_weather': 'इष्टतम कृषि निर्णयों के लिए रियल-टाइम मौसम डेटा और 7-दिन का पूर्वानुमान',
                'current_conditions': 'वर्तमान स्थिति',
                'seven_day_forecast': '7-दिन का पूर्वानुमान',
                
                'smart_irrigation_management': 'स्मार्ट सिंचाई प्रबंधन',
                'automated_watering': 'मौसम की स्थिति और मिट्टी की नमी के आधार पर स्वचालित पानी देने का कार्यक्रम',
                
                'recommended_crops': 'अनुशंसित फसलें',
                'irrigation_schedule': 'सिंचाई अनुसूची',
                'fertilizer_recommendations': 'उर्वरक सिफारिशें',
                'nutrient_deficiency': 'पोषक तत्व की कमी का पता लगाना',
                
                'lettuce': 'लेट्यूस',
                'carrot': 'गाजर',
                'select_state_ut': 'राज्य/केंद्र शासित प्रदेश चुनें'
            }
        };
        
        this.init();
    }
    
    init() {
        this.createLanguageSelector();
        this.loadSavedLanguage();
    }
    
    createLanguageSelector() {
        const selector = document.createElement('div');
        selector.id = 'language_selector';
        selector.innerHTML = `
            <div class="language-dropdown">
                <button class="language-btn" onclick="toggleLanguageDropdown()">
                    <i class="fas fa-globe"></i>
                    <span id="current_lang">English</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="language-menu" id="language_menu">
                    <div class="language-option" onclick="changeLanguage('en')">
                        <span class="flag">🇺🇸</span>
                        <span>English</span>
                    </div>
                    <div class="language-option" onclick="changeLanguage('hi')">
                        <span class="flag">🇮🇳</span>
                        <span>हिंदी</span>
                    </div>
                    <div class="language-option" onclick="changeLanguage('te')">
                        <span class="flag">🇮🇳</span>
                        <span>తెలుగు</span>
                    </div>
                </div>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #language_selector {
                position: fixed;
                top: 80px;
                right: 20px;
                z-index: 9999;
            }
            
            .language-dropdown {
                position: relative;
            }
            
            .language-btn {
                background: linear-gradient(135deg, #4a7c59 0%, #2c5530 100%);
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 14px;
                font-weight: 500;
                box-shadow: 0 4px 15px rgba(74, 124, 89, 0.3);
                transition: all 0.3s ease;
            }
            
            .language-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(74, 124, 89, 0.4);
            }
            
            .language-menu {
                position: absolute;
                top: 100%;
                right: 0;
                background: white;
                border-radius: 8px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
                border: 1px solid #e0e0e0;
                min-width: 150px;
                display: none;
                overflow: hidden;
            }
            
            .language-menu.show {
                display: block;
            }
            
            .language-option {
                padding: 12px 15px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 10px;
                transition: background-color 0.3s ease;
                border-bottom: 1px solid #f0f0f0;
            }
            
            .language-option:hover {
                background: #f8f9fa;
            }
            
            .language-option:last-child {
                border-bottom: none;
            }
            
            .flag {
                font-size: 16px;
            }
            
            @media (max-width: 768px) {
                #language_selector {
                    top: 70px;
                    right: 10px;
                }
                
                .language-btn {
                    padding: 8px 12px;
                    font-size: 12px;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(selector);
    }
    
    loadSavedLanguage() {
        const saved = localStorage.getItem('agrifarm_language');
        if (saved && this.translations[saved]) {
            this.changeLanguage(saved);
        }
    }
    
    changeLanguage(langCode) {
        this.currentLanguage = langCode;
        localStorage.setItem('agrifarm_language', langCode);
        
        // Update button text
        const currentLangSpan = document.getElementById('current_lang');
        if (currentLangSpan) {
            const langNames = {
                'en': 'English',
                'hi': 'हिंदी',
                'te': 'తెలుగు'
            };
            currentLangSpan.textContent = langNames[langCode] || 'English';
        }
        
        // Hide dropdown
        const menu = document.getElementById('language_menu');
        if (menu) {
            menu.classList.remove('show');
        }
        
        // Translate all elements
        this.translatePage();
    }
    
    translatePage() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translations[this.currentLanguage][key];
            if (translation) {
                if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'password' || element.type === 'tel')) {
                    element.placeholder = translation;
                } else if (element.tagName === 'OPTION') {
                    element.textContent = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update welcome message if it exists
        const welcomeMessage = document.querySelector('.welcome-message h3');
        if (welcomeMessage) {
            const session = sessionStorage.getItem('agrifarm_session');
            if (session) {
                const user = JSON.parse(session);
                const welcomeText = this.translations[this.currentLanguage]['welcome_user'];
                if (welcomeText) {
                    welcomeMessage.textContent = welcomeText.replace('{name}', user.name);
                }
            }
        }
    }
    
    t(key, params = {}) {
        let translation = this.translations[this.currentLanguage][key] || this.translations['en'][key] || key;
        
        // Replace parameters
        Object.keys(params).forEach(param => {
            translation = translation.replace(`{${param}}`, params[param]);
        });
        
        return translation;
    }
}

// Global functions
function toggleLanguageDropdown() {
    const menu = document.getElementById('language_menu');
    if (menu) {
        menu.classList.toggle('show');
    }
}

function changeLanguage(langCode) {
    if (window.translationManager) {
        window.translationManager.changeLanguage(langCode);
    }
}

// Initialize translation manager
document.addEventListener('DOMContentLoaded', () => {
    window.translationManager = new TranslationManager();
});
