// ===================================
// Action History Logger
// ===================================

/**
 * Log user actions to history
 */
function logAction(type, action, details, blockchainHash = null) {
    const history = JSON.parse(localStorage.getItem('actionHistory') || '[]');

    const historyItem = {
        id: Date.now() + Math.random(),
        type: type,
        action: action,
        details: details,
        blockchainHash: blockchainHash,
        timestamp: new Date().toISOString()
    };

    history.push(historyItem);
    localStorage.setItem('actionHistory', JSON.stringify(history));

    console.log('Action logged:', historyItem);
}

// Log sign-in action
if (typeof window !== 'undefined') {
    // Check if this is a fresh sign-in
    const justSignedIn = sessionStorage.getItem('justSignedIn');
    if (justSignedIn === 'true') {
        const userEmail = localStorage.getItem('userEmail');
        const authMethod = localStorage.getItem('authMethod');

        logAction(
            'Sign In',
            'User Signed In',
            `Signed in with ${authMethod === 'web3' ? 'Web3 wallet' : 'email'}: ${userEmail || 'Web3 user'}`,
            null
        );

        sessionStorage.removeItem('justSignedIn');
    }

    // Check if wallet was just connected
    const justConnectedWallet = sessionStorage.getItem('justConnectedWallet');
    if (justConnectedWallet === 'true') {
        const walletAddress = localStorage.getItem('walletAddress');
        const walletType = localStorage.getItem('walletType');

        logAction(
            'Wallet',
            'Wallet Connected',
            `Connected ${walletType === 'metamask' ? 'MetaMask' : 'Guest'} wallet: ${walletAddress.substring(0, 10)}...${walletAddress.substring(32)}`,
            null
        );

        sessionStorage.removeItem('justConnectedWallet');
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { logAction };
}
