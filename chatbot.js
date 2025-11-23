class Chatbot {
    constructor() {
        this.isOpen = false;
        this.chatWindow = document.getElementById('chatWindow');
        this.chatMessages = document.getElementById('chatMessages');
        this.toggleBtn = document.getElementById('chatbotToggle');
        this.closeBtn = document.getElementById('chatCloseBtn');

        this.responses = {
            'upload': "To upload a document, click the 'Upload Document' button in the top right. You can drag and drop files or select them from your device. We support JPG, PDF, and text files.",
            'blockchain': "Your documents are secured using blockchain technology. We create a unique cryptographic hash of your file and store it on the blockchain. This ensures that your document's integrity can always be verified and has not been tampered with.",
            'privacy': "Privacy is our core commitment. Your actual files are encrypted and stored securely off-chain. Only the verification hash is public on the blockchain. You have complete control over who accesses your data.",
            'security': "We use industry-standard encryption and decentralized verification. Your data is protected by the immutable nature of the blockchain, meaning once a record is created, it cannot be altered by anyone, including us.",
            'default': "I can help you understand AROGYTA's features. Ask me about 'uploading', 'blockchain', 'privacy', or 'security'."
        };

        this.init();
    }

    init() {
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggleChat());
        }
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.toggleChat());
        }

        // Add initial greeting
        this.addMessage("Hello! I'm the AROGYTA Assistant. How can I help you today?", 'bot');
        this.addOptions();
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.chatWindow.classList.add('active');
            this.toggleBtn.classList.add('active');
        } else {
            this.chatWindow.classList.remove('active');
            this.toggleBtn.classList.remove('active');
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', sender);
        messageDiv.textContent = text;
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    addOptions() {
        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('chat-options');

        const topics = [
            { id: 'upload', label: 'How to Upload' },
            { id: 'blockchain', label: 'Blockchain Security' },
            { id: 'privacy', label: 'Data Privacy' },
            { id: 'security', label: 'Security Commitments' }
        ];

        topics.forEach(topic => {
            const btn = document.createElement('button');
            btn.classList.add('chat-option-btn');
            btn.textContent = topic.label;
            btn.addEventListener('click', () => this.handleOptionClick(topic));
            optionsDiv.appendChild(btn);
        });

        this.chatMessages.appendChild(optionsDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    handleOptionClick(topic) {
        this.addMessage(topic.label, 'user');

        // Simulate typing delay
        setTimeout(() => {
            this.addMessage(this.responses[topic.id], 'bot');

            // Re-show options after a delay
            setTimeout(() => {
                this.addOptions();
            }, 1000);
        }, 500);
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
