// AgriFarm Authentication System
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.otpCode = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkExistingSession();
        this.setupOTPInputs();
    }

    setupEventListeners() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Register form
        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegistration();
        });

        // OTP verification
        document.getElementById('verifyOtpBtn').addEventListener('click', () => {
            this.verifyOTP();
        });

        // Password setup
        document.getElementById('setPasswordBtn').addEventListener('click', () => {
            this.setPassword();
        });

        // Mobile number formatting
        document.getElementById('registerMobile').addEventListener('input', (e) => {
            this.formatMobileNumber(e);
        });
    }

    setupOTPInputs() {
        const otpInputs = document.querySelectorAll('.otp-input');
        otpInputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                this.handleOTPInput(e, index, otpInputs);
            });
            
            input.addEventListener('keydown', (e) => {
                this.handleOTPKeydown(e, index, otpInputs);
            });
        });
    }

    handleOTPInput(e, currentIndex, inputs) {
        const value = e.target.value;
        
        // Only allow numbers
        if (!/^\d$/.test(value)) {
            e.target.value = '';
            return;
        }

        // Move to next input
        if (value && currentIndex < inputs.length - 1) {
            inputs[currentIndex + 1].focus();
        }
    }

    handleOTPKeydown(e, currentIndex, inputs) {
        // Handle backspace
        if (e.key === 'Backspace' && !e.target.value && currentIndex > 0) {
            inputs[currentIndex - 1].focus();
        }
    }

    formatMobileNumber(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        e.target.value = value;
    }

    showTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Remove active class from all buttons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected tab
        document.getElementById(tabName + 'Tab').classList.add('active');
        
        // Add active class to clicked button
        event.target.classList.add('active');
        
        // Clear all error messages
        this.clearErrors();
        
        // Reset forms
        if (tabName === 'register') {
            this.resetRegistrationForm();
        }
    }

    resetRegistrationForm() {
        document.getElementById('otpContainer').classList.remove('active');
        document.getElementById('passwordContainer').classList.remove('active');
        document.getElementById('registerForm').style.display = 'block';
    }

    clearErrors() {
        document.getElementById('loginError').textContent = '';
        document.getElementById('registerError').textContent = '';
        document.getElementById('otpError').textContent = '';
        document.getElementById('passwordError').textContent = '';
    }

    showError(elementId, message) {
        document.getElementById(elementId).textContent = message;
    }

    setLoading(buttonId, textId, isLoading, loadingText = 'Loading...') {
        const button = document.getElementById(buttonId);
        const text = document.getElementById(textId);
        
        if (isLoading) {
            button.disabled = true;
            text.innerHTML = `<span class="loading"></span>${loadingText}`;
        } else {
            button.disabled = false;
            text.textContent = text.textContent.replace(loadingText, '').replace(/<span class="loading"><\/span>/, '').trim();
        }
    }

    async handleLogin() {
        const name = document.getElementById('loginName').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (!name || !password) {
            this.showError('loginError', 'Please fill in all fields');
            return;
        }

        this.setLoading('loginBtn', 'loginBtnText', true, 'Logging in...');

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            const users = this.getStoredUsers();
            const user = users.find(u => u.name.toLowerCase() === name.toLowerCase() && u.password === password);

            if (user) {
                this.currentUser = user;
                this.saveSession(user);
                this.showError('loginError', '');
                this.redirectToDashboard();
            } else {
                this.showError('loginError', 'Invalid name or password');
            }
        } catch (error) {
            this.showError('loginError', 'Login failed. Please try again.');
        } finally {
            this.setLoading('loginBtn', 'loginBtnText', false);
        }
    }

    async handleRegistration() {
        const name = document.getElementById('registerName').value.trim();
        const mobile = document.getElementById('registerMobile').value.trim();

        if (!name || !mobile) {
            this.showError('registerError', 'Please fill in all fields');
            return;
        }

        if (mobile.length !== 10) {
            this.showError('registerError', 'Please enter a valid 10-digit mobile number');
            return;
        }

        // Check if user already exists
        const users = this.getStoredUsers();
        const existingUser = users.find(u => u.mobile === mobile);
        
        if (existingUser) {
            this.showError('registerError', 'An account with this mobile number already exists');
            return;
        }

        this.setLoading('registerBtn', 'registerBtnText', true, 'Sending OTP...');

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Generate OTP
            this.otpCode = this.generateOTP();
            
            // Store registration data temporarily
            sessionStorage.setItem('tempRegistration', JSON.stringify({ name, mobile }));
            
            // Show OTP container
            document.getElementById('otpContainer').classList.add('active');
            document.getElementById('registerForm').style.display = 'none';
            
            // In a real app, you would send OTP via SMS
            console.log(`OTP for ${mobile}: ${this.otpCode}`);
            alert(`OTP sent to ${mobile}. For demo purposes, OTP is: ${this.otpCode}`);
            
            this.showError('registerError', '');
        } catch (error) {
            this.showError('registerError', 'Failed to send OTP. Please try again.');
        } finally {
            this.setLoading('registerBtn', 'registerBtnText', false);
        }
    }

    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    verifyOTP() {
        const otpInputs = document.querySelectorAll('.otp-input');
        const enteredOTP = Array.from(otpInputs).map(input => input.value).join('');

        if (enteredOTP.length !== 6) {
            this.showError('otpError', 'Please enter the complete 6-digit OTP');
            return;
        }

        if (enteredOTP === this.otpCode) {
            // Hide OTP container and show password setup
            document.getElementById('otpContainer').classList.remove('active');
            document.getElementById('passwordContainer').classList.add('active');
            this.showError('otpError', '');
        } else {
            this.showError('otpError', 'Invalid OTP. Please try again.');
        }
    }

    setPassword() {
        const password = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!password || !confirmPassword) {
            this.showError('passwordError', 'Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            this.showError('passwordError', 'Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            this.showError('passwordError', 'Passwords do not match');
            return;
        }

        this.setLoading('setPasswordBtn', 'setPasswordBtnText', true, 'Creating account...');

        try {
            // Get temporary registration data
            const tempData = JSON.parse(sessionStorage.getItem('tempRegistration'));
            
            // Create new user
            const newUser = {
                id: Date.now().toString(),
                name: tempData.name,
                mobile: tempData.mobile,
                password: password,
                createdAt: new Date().toISOString()
            };

            // Save user
            this.saveUser(newUser);
            
            // Clear temporary data
            sessionStorage.removeItem('tempRegistration');
            
            // Set as current user and redirect
            this.currentUser = newUser;
            this.saveSession(newUser);
            
            this.showError('passwordError', '');
            this.redirectToDashboard();
        } catch (error) {
            this.showError('passwordError', 'Failed to create account. Please try again.');
        } finally {
            this.setLoading('setPasswordBtn', 'setPasswordBtnText', false);
        }
    }

    resendOTP() {
        this.otpCode = this.generateOTP();
        console.log(`New OTP: ${this.otpCode}`);
        alert(`New OTP sent! For demo purposes, OTP is: ${this.otpCode}`);
        
        // Clear OTP inputs
        document.querySelectorAll('.otp-input').forEach(input => {
            input.value = '';
        });
        document.querySelectorAll('.otp-input')[0].focus();
    }

    getStoredUsers() {
        const users = localStorage.getItem('agrifarm_users');
        return users ? JSON.parse(users) : [];
    }

    saveUser(user) {
        const users = this.getStoredUsers();
        users.push(user);
        localStorage.setItem('agrifarm_users', JSON.stringify(users));
    }

    saveSession(user) {
        sessionStorage.setItem('agrifarm_session', JSON.stringify(user));
    }

    checkExistingSession() {
        const session = sessionStorage.getItem('agrifarm_session');
        if (session) {
            this.currentUser = JSON.parse(session);
            this.redirectToDashboard();
        }
    }

    redirectToDashboard() {
        window.location.href = 'index.html';
    }

    logout() {
        sessionStorage.removeItem('agrifarm_session');
        this.currentUser = null;
        window.location.href = 'login.html';
    }
}

// Global functions for HTML onclick events
function showTab(tabName) {
    window.authManager.showTab(tabName);
}

function resendOTP() {
    window.authManager.resendOTP();
}

// Initialize authentication manager
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});
