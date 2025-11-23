// ===================================
// Upload System - Instagram Style
// ===================================

// DOM Elements
const uploadBtn = document.getElementById('uploadBtn');
const uploadModal = document.getElementById('uploadModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const uploadCancelBtn = document.getElementById('uploadCancelBtn');
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const filePreviewContainer = document.getElementById('filePreviewContainer');
const documentTitle = document.getElementById('documentTitle');
const documentDescription = document.getElementById('documentDescription');
const uploadSubmitBtn = document.getElementById('uploadSubmitBtn');
const documentsGrid = document.getElementById('documentsGrid');
const emptyState = document.getElementById('emptyState');

// State
let selectedFiles = [];
let uploadedDocuments = JSON.parse(localStorage.getItem('uploadedDocuments')) || [];

// ===================================
// Modal Functions
// ===================================
function openUploadModal() {
    uploadModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeUploadModal() {
    uploadModal.classList.remove('active');
    document.body.style.overflow = '';
    resetUploadForm();
}

function resetUploadForm() {
    selectedFiles = [];
    fileInput.value = '';
    documentTitle.value = '';
    documentDescription.value = '';
    filePreviewContainer.innerHTML = '';
    filePreviewContainer.classList.remove('active');
    uploadSubmitBtn.disabled = true;
}

// ===================================
// Event Listeners
// ===================================
uploadBtn.addEventListener('click', openUploadModal);
modalCloseBtn.addEventListener('click', closeUploadModal);
uploadCancelBtn.addEventListener('click', closeUploadModal);

// Close modal on overlay click
uploadModal.addEventListener('click', (e) => {
    if (e.target === uploadModal) {
        closeUploadModal();
    }
});

// Drop zone click
dropZone.addEventListener('click', () => {
    fileInput.click();
});

// File input change
fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

// Drag and drop
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    handleFiles(e.dataTransfer.files);
});

// ===================================
// File Handling
// ===================================
function handleFiles(files) {
    selectedFiles = Array.from(files);

    if (selectedFiles.length === 0) return;

    // Enable upload button
    uploadSubmitBtn.disabled = false;

    // Show preview container
    filePreviewContainer.classList.add('active');
    filePreviewContainer.innerHTML = '';

    // Create previews for each file
    selectedFiles.forEach((file, index) => {
        createFilePreview(file, index);
    });

    // Auto-fill title if only one file
    if (selectedFiles.length === 1 && !documentTitle.value) {
        documentTitle.value = selectedFiles[0].name.replace(/\.[^/.]+$/, '');
    }
}

function createFilePreview(file, index) {
    const preview = document.createElement('div');
    preview.className = 'file-preview';

    const fileType = getFileType(file);
    const fileSize = formatFileSize(file.size);

    preview.innerHTML = `
        <div class="file-preview-header">
            <div class="file-info">
                <div class="file-icon">
                    ${getFileIcon(fileType)}
                </div>
                <div class="file-details">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${fileSize}</div>
                </div>
            </div>
            <button class="remove-file-btn" data-index="${index}">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    `;

    // Add image preview if it's an image
    if (fileType === 'image') {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'file-preview-img';
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }

    filePreviewContainer.appendChild(preview);

    // Add remove button listener
    preview.querySelector('.remove-file-btn').addEventListener('click', () => {
        removeFile(index);
    });
}

function removeFile(index) {
    selectedFiles.splice(index, 1);

    if (selectedFiles.length === 0) {
        filePreviewContainer.classList.remove('active');
        uploadSubmitBtn.disabled = true;
    } else {
        // Recreate previews
        filePreviewContainer.innerHTML = '';
        selectedFiles.forEach((file, i) => {
            createFilePreview(file, i);
        });
    }
}

function getFileType(file) {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type === 'application/pdf') return 'pdf';
    if (file.type.startsWith('text/')) return 'text';
    return 'document';
}

function getFileIcon(type) {
    const icons = {
        image: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        pdf: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        text: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        document: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 2V9H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    };
    return icons[type] || icons.document;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ===================================
// Upload Submit
// ===================================
uploadSubmitBtn.addEventListener('click', async () => {
    if (selectedFiles.length === 0) return;

    // Disable button during upload
    uploadSubmitBtn.disabled = true;
    uploadSubmitBtn.textContent = 'Uploading...';

    try {
        // Process each file
        for (const file of selectedFiles) {
            await uploadFile(file);
        }

        // Show success message
        alert('Documents uploaded successfully with blockchain verification!');

        // Close modal and refresh grid
        closeUploadModal();
        renderDocuments();

    } catch (error) {
        console.error('Upload error:', error);
        alert('Upload failed. Please try again.');
    } finally {
        uploadSubmitBtn.disabled = false;
        uploadSubmitBtn.textContent = 'Upload';
    }
});

async function uploadFile(file) {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate blockchain hash
    const hash = await generateBlockchainHash(file);

    // Create document object
    const document = {
        id: Date.now() + Math.random(),
        name: documentTitle.value || file.name.replace(/\.[^/.]+$/, ''),
        description: documentDescription.value,
        fileName: file.name,
        fileType: getFileType(file),
        fileSize: file.size,
        uploadDate: new Date().toISOString(),
        blockchainHash: hash,
        verified: true
    };

    // Store file data as base64 for preview (in real app, would upload to server)
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        await new Promise((resolve) => {
            reader.onload = (e) => {
                document.thumbnail = e.target.result;
                resolve();
            };
            reader.readAsDataURL(file);
        });
    }

    // Add to uploaded documents
    uploadedDocuments.push(document);
    localStorage.setItem('uploadedDocuments', JSON.stringify(uploadedDocuments));

    // Log action to history
    if (typeof logAction === 'function') {
        logAction(
            'Upload',
            'Document Uploaded',
            `Uploaded "${document.name}" (${formatFileSize(document.fileSize)}) with blockchain verification`,
            document.blockchainHash
        );
    }
}

// ===================================
// Render Documents Grid
// ===================================
function renderDocuments() {
    if (uploadedDocuments.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    documentsGrid.innerHTML = '';

    uploadedDocuments.reverse().forEach(doc => {
        const card = createDocumentCard(doc);
        documentsGrid.appendChild(card);
    });

    uploadedDocuments.reverse(); // Restore original order
}

function createDocumentCard(doc) {
    const card = document.createElement('div');
    card.className = 'document-card';

    const thumbnail = doc.thumbnail
        ? `<img src="${doc.thumbnail}" alt="${doc.name}">`
        : `<svg class="document-thumbnail-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">${getFileIcon(doc.fileType)}</svg>`;

    const uploadDate = new Date(doc.uploadDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    card.innerHTML = `
        <div class="document-thumbnail">
            ${thumbnail}
            ${doc.verified ? `
                <div class="blockchain-badge">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Verified
                </div>
            ` : ''}
        </div>
        <div class="document-info">
            <div class="document-title">${doc.name}</div>
            <div class="document-meta">
                <span>${uploadDate}</span>
                <span>${formatFileSize(doc.fileSize)}</span>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        showDocumentDetails(doc);
    });

    return card;
}

function showDocumentDetails(doc) {
    alert(`Document: ${doc.name}\nBlockchain Hash: ${doc.blockchainHash}\nUpload Date: ${new Date(doc.uploadDate).toLocaleString()}\n\n${doc.description || 'No description'}`);
}

// ===================================
// Initialize
// ===================================
renderDocuments();
