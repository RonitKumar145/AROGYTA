// ===================================
// DOM Elements
// ===================================
const signinTab = document.getElementById('signinTab');
const signupTab = document.getElementById('signupTab');
const signinForm = document.getElementById('signinForm');
const signupForm = document.getElementById('signupForm');
const web3Btn = document.getElementById('web3Btn');

// ===================================
// Tab Switching
// ===================================
signinTab.addEventListener('click', () => {
    signinTab.classList.add('active');
    signupTab.classList.remove('active');
    signinForm.classList.add('active');
    signupForm.classList.remove('active');
});

signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    signinTab.classList.remove('active');
    signupForm.classList.add('active');
    signinForm.classList.remove('active');
});

// ===================================
// Form Submission Handlers
// ===================================

// Sign In Form
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    // Simulate authentication
    console.log('Sign In:', { email, password });

    // Store authentication state (simulated)
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('authMethod', 'traditional');

    // Mark for history logging
    sessionStorage.setItem('justSignedIn', 'true');

    // Show success message
    alert('Sign in successful! Please connect your wallet.');

    // Redirect to wallet selection
    window.location.href = 'wallet-select.html';
});

// Sign Up Form
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;

    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Simulate account creation
    console.log('Sign Up:', { name, email, password });

    // Store authentication state (simulated)
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('authMethod', 'traditional');

    // Mark for history logging
    sessionStorage.setItem('justSignedIn', 'true');

    // Show success message
    alert('Account created successfully! Please connect your wallet.');

    // Redirect to wallet selection
    window.location.href = 'wallet-select.html';
});

// ===================================
// Web3 Authentication
// ===================================
web3Btn.addEventListener('click', async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            const account = accounts[0];
            console.log('Connected to MetaMask:', account);

            // Store authentication state
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('walletAddress', account);
            localStorage.setItem('authMethod', 'web3');

            // Mark for history logging
            sessionStorage.setItem('justSignedIn', 'true');

            // Show success message
            alert(`Connected with wallet: ${account.substring(0, 6)}...${account.substring(38)}`);

            // Redirect to wallet selection (they can choose to use this wallet or create guest)
            window.location.href = 'wallet-select.html';

        } catch (error) {
            console.error('MetaMask connection error:', error);
            alert('Failed to connect to MetaMask. Please try again.');
        }
    } else {
        // MetaMask not installed - show simulated connection
        alert('MetaMask is not installed. For demo purposes, simulating Web3 connection...');

        // Simulate Web3 authentication
        const simulatedAddress = '0x' + Math.random().toString(16).substring(2, 42);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('walletAddress', simulatedAddress);
        localStorage.setItem('authMethod', 'web3-simulated');

        // Mark for history logging
        sessionStorage.setItem('justSignedIn', 'true');

        setTimeout(() => {
            window.location.href = 'wallet-select.html';
        }, 1000);
    }
});

// ===================================
// Check if already authenticated
// ===================================
window.addEventListener('load', () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (isAuthenticated === 'true') {
        // User is already logged in, redirect to dashboard
        const redirect = confirm('You are already signed in. Go to dashboard?');
        if (redirect) {
            window.location.href = 'dashboard.html';
        }
    }
});

// ===================================
// Input Animations
// ===================================
const inputs = document.querySelectorAll('.form-input');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
        input.parentElement.style.transition = 'transform 0.2s ease';
    });

    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});
