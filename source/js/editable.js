// ######### Make All content Editable ########
// Global variables
let editModeEnabled = false;

let currentHistoryIndex = -1;

document.getElementById('edit').addEventListener('click', function () {
    // Toggle edit mode
    editModeEnabled = !editModeEnabled;

    if (editModeEnabled) {
        this.textContent = 'Disable Editing';
        enableEditing();
    } else {
        this.textContent = 'Enable Editing';
        disableEditing();
    }
});

document.getElementById('undo').addEventListener('click', undoEdit);
document.getElementById('redo').addEventListener('click', redoEdit);

function enableEditing() {
    // Make elements editable
    document.querySelectorAll('p,strong,div:not(#editpdf), h1, h2, h3, h4, h5, h6, span:not(.color-sample),th,td').forEach(element => {
        if (!element.closest('form') && !element.querySelector('img') && !element.classList.contains('color-sample')) {
            element.addEventListener('dblclick', handleTextEdit);
            element.style.cursor = 'pointer';
            element.title = 'Double-click to edit';
        }
    });

    // Make images editable
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dblclick', handleImageEdit);
        img.style.cursor = 'pointer';
        img.title = 'Double-click to replace image';
    });

    // Make color samples editable
    document.querySelectorAll('.color-sample').forEach(colorSample => {
        colorSample.addEventListener('dblclick', handleColorEdit);
        colorSample.style.cursor = 'pointer';
        color.title = 'Double-click to edit color';
    });
}

function disableEditing() {
    // Remove all edit-related event listeners
    document.querySelectorAll('p,strong,div, h1, h2, h3, h4, h5, h6, span,th,td').forEach(element => {
        element.removeEventListener('dblclick', handleTextEdit);
        element.style.cursor = '';
        element.title = '';
    });

    document.querySelectorAll('img').forEach(img => {
        img.removeEventListener('dblclick', handleImageEdit);
        img.style.cursor = '';
        img.title = '';
    });

    document.querySelectorAll('.color-sample').forEach(colorSample => {
        colorSample.removeEventListener('dblclick', handleColorEdit);
        colorSample.style.cursor = '';
        color.title = '';
    });
}

// Function to Edit TextBox
function handleTextEdit(e) {
    e.stopPropagation();
    const element = this;

    // Prevent multiple editors
    if (element.getAttribute('data-editor-active') === 'true') return;
    element.setAttribute('data-editor-active', 'true');

    const originalHTML = element.innerHTML;
    const originalDisplay = element.style.display;
    const originalVisibility = element.style.visibility;
    const originalTransform = element.style.transform || '';
    const originalPosition = element.style.position || '';
    const originalZIndex = element.style.zIndex || '';
    const rect = element.getBoundingClientRect();

    // Store original parent and next sibling
    const originalParent = element.parentNode;
    const originalNextSibling = element.nextSibling;

    // Create placeholder to maintain layout
    const placeholder = document.createElement('div');
    placeholder.style.width = `${rect.width}px`;
    placeholder.style.height = `${rect.height}px`;
    placeholder.style.display = originalDisplay;
    placeholder.style.visibility = 'hidden';
    originalParent.insertBefore(placeholder, element);
    // Calculate centered position
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const editorWidth = Math.max(rect.width, 300);
    const editorHeight = Math.max(rect.height, 200);

    // Create editor container - fixed positioning
    const editorContainer = document.createElement('div');
    editorContainer.style.position = 'fixed';
    editorContainer.style.left = `${centerX - (editorWidth / 2)}px`;
    editorContainer.style.top = `${centerY - (editorHeight / 2)}px`;
    editorContainer.style.width = `${editorWidth}px`;
    editorContainer.style.minHeight = `${editorHeight}px`;
    editorContainer.style.border = '1px solid #ddd';
    editorContainer.style.borderRadius = '4px';
    editorContainer.style.overflow = 'hidden';
    editorContainer.style.backgroundColor = '#fff';
    editorContainer.style.zIndex = '2147483647';
    // editorContainer.style.width = `${Math.max(rect.width, 300)}px`;
    // editorContainer.style.minHeight = `${Math.max(rect.height, 200)}px`;
    editorContainer.style.transform = 'none !important';
    editorContainer.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    editorContainer.style.transition = 'all 0.2s ease-out';
    editorContainer.style.opacity = '0';
    setTimeout(() => {
        editorContainer.style.opacity = '1';
    }, 10);
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '8px';
    closeButton.style.right = '8px';
    closeButton.style.width = '24px';
    closeButton.style.height = '24px';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '50%';
    closeButton.style.backgroundColor = '#f0f0f0';
    closeButton.style.cursor = 'pointer';
    closeButton.style.display = 'flex';
    closeButton.style.alignItems = 'center';
    closeButton.style.justifyContent = 'center';
    closeButton.style.fontSize = '16px';

    // Create toolbar with multiple rows
    const toolbar = document.createElement('div');
    toolbar.style.display = 'flex';
    toolbar.style.flexDirection = 'column';
    toolbar.style.gap = '4px';
    toolbar.style.padding = '4px';
    toolbar.style.backgroundColor = '#f5f5f5';
    toolbar.style.borderBottom = '1px solid #ddd';

    // Toolbar rows
    const row1 = document.createElement('div');
    row1.style.display = 'flex';
    row1.style.gap = '4px';
    row1.style.flexWrap = 'wrap';

    const row2 = document.createElement('div');
    row2.style.display = 'flex';
    row2.style.gap = '4px';
    row2.style.flexWrap = 'wrap';

    const row3 = document.createElement('div');
    row3.style.display = 'flex';
    row3.style.gap = '4px';
    row3.style.flexWrap = 'wrap';

    toolbar.appendChild(row1);
    toolbar.appendChild(row2);
    toolbar.appendChild(row3);

    // Helper function to create toolbar buttons
    const createToolbarButton = (icon, command, value = null, title = '') => {
        const btn = document.createElement('button');
        btn.innerHTML = icon;
        btn.style.padding = '6px 8px';
        btn.style.border = 'none';
        btn.style.borderRadius = '4px';
        btn.style.backgroundColor = '#fff';
        btn.style.cursor = 'pointer';
        btn.title = title;

        btn.addEventListener('click', () => {
            document.execCommand(command, false, value);
            designView.focus();
        });

        return btn;
    };

    // Helper function to create toolbar dropdowns
    const createToolbarDropdown = (options, onChange) => {
        const select = document.createElement('select');
        select.style.padding = '4px';
        select.style.borderRadius = '4px';
        select.style.border = '1px solid #ccc';
        select.style.backgroundColor = '#fff';

        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.label;
            select.appendChild(opt);
        });

        select.addEventListener('change', () => {
            onChange(select.value);
            designView.focus();
        });

        return select;
    };

    // Basic formatting buttons (row 1)
    row1.appendChild(createToolbarButton('<b>B</b>', 'bold', null, 'Bold (Ctrl+B)'));
    row1.appendChild(createToolbarButton('<i>I</i>', 'italic', null, 'Italic (Ctrl+I)'));
    row1.appendChild(createToolbarButton('<u>U</u>', 'underline', null, 'Underline (Ctrl+U)'));
    row1.appendChild(createToolbarButton('<s>S</s>', 'strikeThrough', null, 'Strikethrough'));
    row1.appendChild(createToolbarButton('H1', 'formatBlock', '<h1>', 'Heading 1'));
    row1.appendChild(createToolbarButton('H2', 'formatBlock', '<h2>', 'Heading 2'));
    row1.appendChild(createToolbarButton('H3', 'formatBlock', '<h3>', 'Heading 3'));
    row1.appendChild(createToolbarButton('P', 'formatBlock', '<p>', 'Paragraph'));

    // Text color and background color (row 2)
    const textColorBtn = createToolbarButton(
        '<span style="color:#000;background:linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);padding:0 8px;">A</span>',
        'foreColor', null, 'Text Color'
    );

    const bgColorBtn = createToolbarButton(
        '<span style="background:#000;color:#fff;padding:0 8px;">A</span>',
        'hiliteColor', null, 'Background Color'
    );

    row2.appendChild(textColorBtn);
    row2.appendChild(bgColorBtn);

    // Font family dropdown (row 2)
    const fontFamilySelect = createToolbarDropdown(
        [
            { value: '', label: 'Font' },
            { value: 'Arial', label: 'Arial' },
            { value: 'Verdana', label: 'Verdana' },
            { value: 'Georgia', label: 'Georgia' },
            { value: 'Courier New', label: 'Courier' },
            { value: 'Times New Roman', label: 'Times' },
            { value: 'Comic Sans MS', label: 'Comic Sans' }
        ],
        (value) => document.execCommand('fontName', false, value)
    );
    row2.appendChild(fontFamilySelect);

    // Font size dropdown (row 2)
    const fontSizeSelect = createToolbarDropdown(
        [
            { value: '1', label: 'Size' },
            { value: '1', label: 'Small' },
            { value: '3', label: 'Normal' },
            { value: '6', label: 'Large' },
            { value: '7', label: 'Huge' }
        ],
        (value) => document.execCommand('fontSize', false, value)
    );
    row2.appendChild(fontSizeSelect);

    // Alignment buttons (row 3)
    row3.appendChild(createToolbarButton(
        '<svg width="16" height="16" viewBox="0 0 24 24"><path d="M3 3h18v2H3zm0 4h12v2H3zm0 4h18v2H3zm0 4h12v2H3z"/></svg>',
        'justifyLeft', null, 'Align Left'
    ));
    row3.appendChild(createToolbarButton(
        '<svg width="16" height="16" viewBox="0 0 24 24"><path d="M3 3h18v2H3zm4 4h10v2H7zm-4 4h18v2H3zm4 4h10v2H7z"/></svg>',
        'justifyCenter', null, 'Align Center'
    ));
    row3.appendChild(createToolbarButton(
        '<svg width="16" height="16" viewBox="0 0 24 24"><path d="M3 3h18v2H3zm6 4h12v2H9zm-6 4h18v2H3zm6 4h12v2H9z"/></svg>',
        'justifyRight', null, 'Align Right'
    ));
    row3.appendChild(createToolbarButton(
        '<svg width="16" height="16" viewBox="0 0 24 24"><path d="M3 3h18v2H3zm2 4h14v2H5zm-2 4h18v2H3zm2 4h14v2H5z"/></svg>',
        'justifyFull', null, 'Justify'
    ));

    // List buttons (row 3)
    row3.appendChild(createToolbarButton(
        '<svg width="16" height="16" viewBox="0 0 24 24"><path d="M3 12h18v2H3zm0-6h18v2H3zm0 12h18v2H3z"/></svg>',
        'insertUnorderedList', null, 'Bullet List'
    ));
    row3.appendChild(createToolbarButton(
        '<svg width="16" height="16" viewBox="0 0 24 24"><path d="M2 6h2v2H2zm4-2h16v2H6zm-4 6h2v2H2zm4-2h16v2H6zm-4 6h2v2H2zm4-2h16v2H6z"/></svg>',
        'insertOrderedList', null, 'Numbered List'
    ));

    // Link button (row 3)
    const linkButton = createToolbarButton(
        '<svg width="16" height="16" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
        'createLink', null, 'Insert Link'
    );

    linkButton.addEventListener('click', () => {
        const url = prompt('Enter the URL:', 'https://');
        if (url) {
            document.execCommand('createLink', false, url);
        }
    });
    row3.appendChild(linkButton);

    // Create tab buttons
    const tabContainer = document.createElement('div');
    tabContainer.style.display = 'flex';
    tabContainer.style.backgroundColor = '#f5f5f5';
    tabContainer.style.borderBottom = '1px solid #ddd';

    const designTab = document.createElement('button');
    designTab.textContent = 'Design';
    designTab.style.padding = '8px 16px';
    designTab.style.border = 'none';
    designTab.style.backgroundColor = '#fff';
    designTab.style.cursor = 'pointer';

    const htmlTab = document.createElement('button');
    htmlTab.textContent = 'HTML';
    htmlTab.style.padding = '8px 16px';
    htmlTab.style.border = 'none';
    htmlTab.style.backgroundColor = 'transparent';
    htmlTab.style.cursor = 'pointer';

    tabContainer.appendChild(designTab);
    tabContainer.appendChild(htmlTab);

    // Create content area
    const contentArea = document.createElement('div');
    contentArea.style.padding = '10px';
    contentArea.style.minHeight = '150px';
    contentArea.style.backgroundColor = '#fff';

    // Create design view (contentEditable div)
    const designView = document.createElement('div');
    designView.contentEditable = true;
    designView.style.minHeight = '150px';
    designView.style.outline = 'none';
    designView.style.fontFamily = 'Arial, sans-serif';
    designView.style.fontSize = '14px';
    designView.innerHTML = originalHTML;

    // Create HTML view (textarea)
    const htmlView = document.createElement('textarea');
    htmlView.style.width = '100%';
    htmlView.style.minHeight = '150px';
    htmlView.style.padding = '8px';
    htmlView.style.border = '1px solid #ddd';
    htmlView.style.borderRadius = '4px';
    htmlView.style.fontFamily = 'monospace';
    htmlView.value = originalHTML;
    htmlView.style.display = 'none';

    contentArea.appendChild(designView);
    contentArea.appendChild(htmlView);

    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'space-between';
    buttonContainer.style.padding = '8px';
    buttonContainer.style.backgroundColor = '#f5f5f5';
    buttonContainer.style.borderTop = '1px solid #ddd';

    // Element controls (hide/delete)
    const elementControls = document.createElement('div');

    const hideButton = document.createElement('button');
    hideButton.textContent = element.style.display === 'none' || element.getAttribute('data-hidden') === 'true'
        ? 'Show'
        : 'Hide';
    hideButton.style.marginRight = '8px';
    hideButton.style.padding = '6px 12px';
    hideButton.style.backgroundColor = '#f0f0f0';
    hideButton.style.border = '1px solid #ccc';
    hideButton.style.borderRadius = '4px';
    hideButton.style.cursor = 'pointer';

 

    elementControls.appendChild(hideButton);


    // Editor controls (cancel/save)
    const editorControls = document.createElement('div');

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.style.marginRight = '8px';
    cancelButton.style.padding = '6px 12px';
    cancelButton.style.backgroundColor = '#f0f0f0';
    cancelButton.style.border = '1px solid #ccc';
    cancelButton.style.borderRadius = '4px';
    cancelButton.style.cursor = 'pointer';

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.style.padding = '6px 12px';
    saveButton.style.backgroundColor = '#4285f4';
    saveButton.style.color = 'white';
    saveButton.style.border = 'none';
    saveButton.style.borderRadius = '4px';
    saveButton.style.cursor = 'pointer';

    editorControls.appendChild(cancelButton);
    editorControls.appendChild(saveButton);

    buttonContainer.appendChild(elementControls);
    buttonContainer.appendChild(editorControls);

    // Build editor container
    editorContainer.appendChild(closeButton);
    editorContainer.appendChild(toolbar);
    editorContainer.appendChild(tabContainer);
    editorContainer.appendChild(contentArea);
    editorContainer.appendChild(buttonContainer);

    // Add editor to body
    document.body.appendChild(editorContainer);
    designView.focus();

    // Tab switching functionality
    let currentView = 'design';

    designTab.addEventListener('click', () => {
        if (currentView === 'html') {
            designView.innerHTML = htmlView.value;
        }
        designView.style.display = 'block';
        htmlView.style.display = 'none';
        designTab.style.backgroundColor = '#fff';
        htmlTab.style.backgroundColor = 'transparent';
        currentView = 'design';
        designView.focus();
    });

    htmlTab.addEventListener('click', () => {
        if (currentView === 'design') {
            htmlView.value = designView.innerHTML;
        }
        designView.style.display = 'none';
        htmlView.style.display = 'block';
        designTab.style.backgroundColor = 'transparent';
        htmlTab.style.backgroundColor = '#fff';
        currentView = 'html';
        htmlView.focus();
    });

    // Setup element controls
   hideButton.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Capture state before change
        const beforeState = {
            display: element.style.display,
            visibility: element.style.visibility,
            wasHidden: element.style.display === 'none' || element.getAttribute('data-hidden') === 'true'
        };
        
        if (element.style.display === 'none') {
            element.style.display = originalDisplay || '';
            element.style.visibility = originalVisibility || '';
            element.removeAttribute('data-hidden');
            hideButton.textContent = 'Hide';
        } else {
            element.style.display = 'none';
            element.setAttribute('data-hidden', 'true');
            hideButton.textContent = 'Show';
        }
        
        // Add to history
        editHistory.addEntry(element, beforeState, 'visibility-change');
    });

 


    // Editor controls functionality
    cancelButton.addEventListener('click', () => {
        cleanup();
        element.innerHTML = originalHTML;
        element.style.display = originalDisplay || '';
        element.style.visibility = originalVisibility || '';
        element.style.transform = originalTransform;
        element.style.position = originalPosition;
        element.style.zIndex = originalZIndex;
        element.removeAttribute('data-hidden');
    });

    saveButton.addEventListener('click', () => {
        const newContent = currentView === 'design' ? designView.innerHTML : htmlView.value;
        
        // Only add to history if content actually changed
        if (newContent !== originalHTML || 
            element.style.display !== originalDisplay || 
            element.style.visibility !== originalVisibility) {
            
            // Begin a batch operation in case multiple properties change
            editHistory.beginBatch();
            
            // Add the HTML/content change
            editHistory.addEntry(element, {
                type: 'content',
                html: originalHTML,
                text: element.textContent,
                style: {
                    display: originalDisplay,
                    visibility: originalVisibility
                }
            }, 'content-edit');
            
            // Add visibility/display changes if they occurred
            if (element.getAttribute('data-hidden') === 'true') {
                editHistory.addEntry(element, {
                    type: 'visibility',
                    display: originalDisplay || '',
                    visibility: originalVisibility || '',
                    wasHidden: false
                }, 'visibility-change');
            }
            
            // End the batch operation
            editHistory.endBatch();
        }

        // Apply the new content
        element.innerHTML = newContent;

        if (element.getAttribute('data-hidden') === 'true') {
            element.style.display = 'none';
        } else {
            element.style.display = originalDisplay || '';
            element.style.visibility = originalVisibility || '';
        }

        element.style.transform = originalTransform;
        element.style.position = originalPosition;
        element.style.zIndex = originalZIndex;

        cleanup();
    });

    // Close button functionality
    closeButton.addEventListener('click', () => {
        cancelButton.click();
    });

    // Save on Ctrl+Enter in HTML view
    htmlView.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            saveButton.click();
        }
    });

    // Add keyboard shortcuts for common commands
    designView.addEventListener('keydown', function (e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'b':
                    e.preventDefault();
                    document.execCommand('bold', false, null);
                    break;
                case 'i':
                    e.preventDefault();
                    document.execCommand('italic', false, null);
                    break;
                case 'u':
                    e.preventDefault();
                    document.execCommand('underline', false, null);
                    break;
            }
        }
    });

    // Handle color pickers
    textColorBtn.addEventListener('click', () => {
        const color = prompt('Enter hex color (e.g., #ff0000):', '#000000');
        if (color) {
            document.execCommand('foreColor', false, color);
            designView.focus();
        }
    });

    bgColorBtn.addEventListener('click', () => {
        const color = prompt('Enter hex color (e.g., #ffff00):', '#ffffff');
        if (color) {
            document.execCommand('hiliteColor', false, color);
            designView.focus();
        }
    });

    //Handle clicks outside the editor to save
    const handleClickOutside = (event) => {
        if (!editorContainer.contains(event.target)) {
            cancelButton.click();
        }
    };

    setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    // Handle window resize
    const handleResize = () => {
        const newRect = placeholder.getBoundingClientRect();
        editorContainer.style.left = `${newRect.left + window.scrollX}px`;
        editorContainer.style.top = `${newRect.top + window.scrollY}px`;
    };

    window.addEventListener('resize', handleResize);

    // Clean up when editor closes
    const cleanup = () => {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('resize', handleResize);

        if (editorContainer.parentNode) {
            editorContainer.parentNode.removeChild(editorContainer);
        }

        if (placeholder.parentNode) {
            placeholder.parentNode.removeChild(placeholder);
        }

        if (originalNextSibling) {
            originalParent.insertBefore(element, originalNextSibling);
        } else {
            originalParent.appendChild(element);
        }

        element.removeAttribute('data-editor-active');
    };

    cancelButton.addEventListener('click', cleanup);
    saveButton.addEventListener('click', cleanup);
}
// To handle image editing with complete history management
function handleImageEdit(e) {
    e.stopPropagation();
    const imgElement = this;

    // Capture complete original state
    // const originalState = {
    //     type: 'image',
    //     src: imgElement.src,
    //     alt: imgElement.alt,
    //     width: imgElement.width,
    //     height: imgElement.height,
    //     className: imgElement.className,
    //     style: {
    //         objectFit: imgElement.style.objectFit,
    //         borderRadius: imgElement.style.borderRadius
    //     }
    // };

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';

    // Create preview modal outside to access in multiple handlers
    let previewModal = null;
    let newImageSrc = null;

    const cleanup = () => {
        if (previewModal && previewModal.parentNode) {
            document.body.removeChild(previewModal);
        }
        if (input.parentNode) {
            document.body.removeChild(input);
        }
        window.removeEventListener('focus', onWindowFocus);
    };

    const onWindowFocus = () => {
        setTimeout(() => {
            if (!input.files || input.files.length === 0) {
                cleanup();
            }
        }, 300);
    };

    input.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file) {
            cleanup();
            return;
        }

        // Create preview modal
        previewModal = document.createElement('div');
        previewModal.style.position = 'fixed';
        previewModal.style.top = '0';
        previewModal.style.left = '0';
        previewModal.style.width = '100%';
        previewModal.style.height = '100%';
        previewModal.style.backgroundColor = 'rgba(0,0,0,0.8)';
        previewModal.style.zIndex = '10000';
        previewModal.style.display = 'flex';
        previewModal.style.flexDirection = 'column';
        previewModal.style.alignItems = 'center';
        previewModal.style.justifyContent = 'center';

        const previewImg = document.createElement('img');
        previewImg.style.maxWidth = '80%';
        previewImg.style.maxHeight = '80%';
        previewImg.style.objectFit = 'contain';

        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginTop = '20px';

        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = 'Confirm';
        confirmBtn.style.marginRight = '10px';
        confirmBtn.style.padding = '8px 16px';
        confirmBtn.style.backgroundColor = '#4CAF50';
        confirmBtn.style.color = 'white';
        confirmBtn.style.border = 'none';
        confirmBtn.style.borderRadius = '4px';

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.style.padding = '8px 16px';
        cancelBtn.style.backgroundColor = '#f44336';
        cancelBtn.style.color = 'white';
        cancelBtn.style.border = 'none';
        cancelBtn.style.borderRadius = '4px';

        buttonContainer.append(confirmBtn, cancelBtn);
        previewModal.append(previewImg, buttonContainer);
        document.body.appendChild(previewModal);

        const reader = new FileReader();
        reader.onload = function (event) {
            newImageSrc = event.target.result;
            previewImg.src = newImageSrc;

            confirmBtn.onclick = function () {
                // Capture state before changing
                const beforeChangeState = {
                    type: 'image',
                    src: imgElement.src,
                    alt: imgElement.alt,
                    width: imgElement.width,
                    height: imgElement.height,
                    className: imgElement.className,
                    style: {
                        objectFit: imgElement.style.objectFit,
                        borderRadius: imgElement.style.borderRadius
                    }
                };

                // Apply changes
                imgElement.src = newImageSrc;

                // Add to history with proper state objects
                editHistory.addEntry(imgElement, beforeChangeState, 'image-edit');

                cleanup();
            };

            cancelBtn.onclick = function () {
                cleanup();
            };
        };

        reader.onerror = function () {
            console.error('Error loading image file');
            cleanup();
        };

        reader.readAsDataURL(file);
    });

    // Add cancel handler for the file dialog
    window.addEventListener('focus', onWindowFocus, { once: true });

    document.body.appendChild(input);
    input.click();
}
// To make colorBox Editable
/**
 * Handles color sample editing with full history integration
 * @param {Event} e - The triggering event
 */
// Global history manager instance

// To make colorBox Editable - WORKING VERSION
function handleColorEdit(e) {
    e.stopPropagation();

    const colorSample = this;
    const originalText = colorSample.textContent.trim();
    const originalBg = window.getComputedStyle(colorSample).backgroundColor;
    const rect = colorSample.getBoundingClientRect();

    // Remove any existing editor
    const existing = document.querySelector('#floating-color-editor');
    if (existing) existing.remove();

    // Create floating editor
    const editor = document.createElement('div');
    editor.id = 'floating-color-editor';
    editor.style.position = 'absolute';
    editor.style.left = `${rect.left + window.scrollX}px`;
    editor.style.top = `${rect.bottom + window.scrollY + 4}px`;
    editor.style.zIndex = 1000;
    editor.style.background = '#fff';
    editor.style.border = '1px solid #ccc';
    editor.style.borderRadius = '5px';
    editor.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    editor.style.padding = '10px';
    editor.style.display = 'flex';
    editor.style.gap = '10px';
    editor.style.alignItems = 'center';

    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.value = originalText;
    textInput.style.padding = '5px';

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = rgbToHex(originalBg);
    colorInput.style.width = '40px';
    colorInput.style.height = '30px';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = '✓';
    saveBtn.style.background = '#4CAF50';
    saveBtn.style.color = '#fff';
    saveBtn.style.border = 'none';
    saveBtn.style.borderRadius = '3px';
    saveBtn.style.padding = '5px 8px';
    saveBtn.style.cursor = 'pointer';

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = '✕';
    cancelBtn.style.background = '#f44336';
    cancelBtn.style.color = '#fff';
    cancelBtn.style.border = 'none';
    cancelBtn.style.borderRadius = '3px';
    cancelBtn.style.padding = '5px 8px';
    cancelBtn.style.cursor = 'pointer';

    editor.append(textInput, colorInput, saveBtn, cancelBtn);
    document.body.appendChild(editor);

    // Capture original state for history
    const originalState = {
        text: originalText,
        backgroundColor: originalBg,
        html: colorSample.innerHTML,
        style: {
            backgroundColor: colorSample.style.backgroundColor,
            color: colorSample.style.color
        }
    };

    // Events
    saveBtn.onclick = () => {
        // Capture state before changes
        const beforeChangeState = {
            text: colorSample.textContent,
            backgroundColor: window.getComputedStyle(colorSample).backgroundColor,
            html: colorSample.innerHTML,
            style: {
                backgroundColor: colorSample.style.backgroundColor,
                color: colorSample.style.color
            }
        };

        // Apply changes
        colorSample.textContent = textInput.value;
        colorSample.style.backgroundColor = colorInput.value;

        // Add to history
        editHistory.addEntry(colorSample, beforeChangeState, 'color-edit');

        editor.remove();
        document.removeEventListener('mousedown', onClickOutside);
    };

    cancelBtn.onclick = () => {
        editor.remove();
        document.removeEventListener('mousedown', onClickOutside);
    };

    textInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveBtn.click();
        if (e.key === 'Escape') cancelBtn.click();
    });

    // Handle click outside
    const onClickOutside = (e) => {
        if (!editor.contains(e.target) && e.target !== colorSample) {
            const hasChanges = textInput.value !== originalText ||
                colorInput.value !== rgbToHex(originalBg);

            if (hasChanges && confirm('Discard changes?')) {
                cancelBtn.click();
            } else if (!hasChanges) {
                cancelBtn.click();
            }
        }
    };

    setTimeout(() => {
        document.addEventListener('mousedown', onClickOutside);
    }, 0);

    textInput.focus();
}

// History management functions
class EditHistoryManager {
    constructor(maxHistorySize = 100) {
        this.historyStack = [];
        this.currentIndex = -1;
        this.maxHistorySize = maxHistorySize;
        this.batchOperations = 0;
        this.batchQueue = [];
    }

    /**
     * Captures the current state of an element for history
     * @param {HTMLElement} element - The DOM element to track
     * @param {string} [actionType] - Optional action type identifier
     * @returns {object} History entry object
     */
    captureState(element, actionType = 'edit') {
        if (!element || !element.tagName) {
            console.warn('Invalid element provided for history capture');
            return null;
        }

        return {
            element,
            actionType,
            timestamp: Date.now(),
            state: this.getElementState(element),
            metadata: {
                tagName: element.tagName,
                id: element.id,
                classList: [...element.classList]
            }
        };
    }

    /**
     * Gets the current state of an element with enhanced color sample support
     * @param {HTMLElement} element - The DOM element
     * @returns {object} Element state representation
     */
    getElementState(element) {
        // Special handling for color samples
        if (element.classList.contains('color-sample')) {
            return {
                type: 'color-sample',
                text: element.textContent,
                // Capture both inline style and computed style
                backgroundColor: element.style.backgroundColor || window.getComputedStyle(element).backgroundColor,
                html: element.innerHTML,
                style: {
                    backgroundColor: element.style.backgroundColor,
                    color: element.style.color,
                    // Capture any other relevant styles
                    fontSize: element.style.fontSize,
                    fontWeight: element.style.fontWeight
                },
                // Preserve class list
                classList: [...element.classList]
            };
        }

        // Default element handling
        switch (element.tagName) {
            case 'IMG':
                return {
                    type: 'image',
                    src: element.src,
                    alt: element.alt,
                    width: element.width,
                    height: element.height
                };
            case 'INPUT':
            case 'TEXTAREA':
                return {
                    type: 'input',
                    value: element.value
                };
            default:
                return {
                    type: 'content',
                    html: element.innerHTML,
                    text: element.textContent,
                    style: {
                        display: element.style.display,
                        visibility: element.style.visibility,
                        backgroundColor: element.style.backgroundColor,
                        color: element.style.color
                    }
                };
        }
    }

    /**
     * Applies a captured state to an element with color sample support
     * @param {HTMLElement} element - The DOM element
     * @param {object} state - The state to apply
     */
    applyElementState(element, state) {
        if (!element || !state) return;

        try {
            // Special handling for color samples
            if (state.type === 'color-sample' || element.classList.contains('color-sample')) {
                element.textContent = state.text || '';

                // Apply background color with priority to inline style
                if (state.style?.backgroundColor) {
                    element.style.backgroundColor = state.style.backgroundColor;
                } else if (state.backgroundColor) {
                    element.style.backgroundColor = state.backgroundColor;
                }

                // Apply other styles if they exist
                if (state.style) {
                    if (state.style.color) element.style.color = state.style.color;
                    if (state.style.fontSize) element.style.fontSize = state.style.fontSize;
                    if (state.style.fontWeight) element.style.fontWeight = state.style.fontWeight;
                }

                // Restore classes if they were captured
                if (state.classList) {
                    element.className = ''; // Clear existing classes
                    state.classList.forEach(className => {
                        element.classList.add(className);
                    });
                }
                return;
            }

            // Default element handling
            switch (state.type) {
                case 'image':
                    element.src = state.src;
                    if (state.alt) element.alt = state.alt;
                    if (state.width) element.width = state.width;
                    if (state.height) element.height = state.height;
                    break;
                case 'input':
                    element.value = state.value;
                    break;
                case 'content':
                    element.innerHTML = state.html;
                    if (state.style) {
                        Object.keys(state.style).forEach(prop => {
                            if (state.style[prop] !== undefined) {
                                element.style[prop] = state.style[prop];
                            }
                        });
                    }
                    break;
            }
        } catch (error) {
            console.error('Error applying history state:', error);
        }
    }

    /**
     * Adds a new entry to the history stack with color sample awareness
     * @param {HTMLElement} element - The edited element
     * @param {string|object} previousState - Previous state of the element
     * @param {string} [actionType] - Type of action performed
     */
    addEntry(element, previousState, actionType = 'edit') {
        // If we're in the middle of the stack, truncate future history
        if (this.currentIndex < this.historyStack.length - 1) {
            this.historyStack = this.historyStack.slice(0, this.currentIndex + 1);
        }

        // If we're batching operations, queue this entry
        if (this.batchOperations > 0) {
            this.batchQueue.push({ element, previousState, actionType });
            return;
        }

        // Handle color samples specifically
        const isColorSample = element.classList.contains('color-sample');
        const entry = {
            element,
            actionType: isColorSample ? 'color-edit' : actionType,
            previousState: typeof previousState === 'string'
                ? {
                    type: isColorSample ? 'color-sample' : 'content',
                    text: element.textContent,
                    backgroundColor: window.getComputedStyle(element).backgroundColor,
                    html: previousState
                }
                : previousState,
            currentState: this.getElementState(element),
            timestamp: Date.now()
        };

        this.historyStack.push(entry);
        this.currentIndex = this.historyStack.length - 1;

        // Enforce maximum history size
        if (this.historyStack.length > this.maxHistorySize) {
            this.historyStack.shift();
            this.currentIndex--;
        }

        this.updateUI();
    }


    /**
     * Starts a batch operation (multiple edits count as one undo step)
     */
    beginBatch() {
        this.batchOperations++;
    }

    /**
     * Ends a batch operation
     */
    endBatch() {
        this.batchOperations = Math.max(0, this.batchOperations - 1);

        if (this.batchOperations === 0 && this.batchQueue.length > 0) {
            if (this.batchQueue.length === 1) {
                const { element, previousState, actionType } = this.batchQueue[0];
                this.addEntry(element, previousState, actionType);
            } else {
                // Create a compound entry for batch operations
                const batchEntry = {
                    actionType: 'batch',
                    changes: this.batchQueue.map(item => ({
                        element: item.element,
                        previousState: item.previousState,
                        currentState: this.getElementState(item.element)
                    })),
                    timestamp: Date.now()
                };

                this.historyStack.push(batchEntry);
                this.currentIndex = this.historyStack.length - 1;
            }

            this.batchQueue = [];
            this.updateUI();
        }
    }

    /**
     * Undo the last operation
     */
    undo() {
        if (this.currentIndex < 0) return false;

        const entry = this.historyStack[this.currentIndex];

        try {
            if (entry.changes) {
                // Handle batch undo
                entry.changes.forEach(change => {
                    this.applyElementState(change.element, change.previousState);
                });
            } else {
                this.applyElementState(entry.element, entry.previousState);
            }

            this.currentIndex--;
            this.updateUI();
            return true;
        } catch (error) {
            console.error('Undo failed:', error);
            return false;
        }
    }

    /**
     * Redo the last undone operation
     */
    redo() {
        if (this.currentIndex >= this.historyStack.length - 1) return false;

        this.currentIndex++;
        const entry = this.historyStack[this.currentIndex];

        try {
            if (entry.changes) {
                // Handle batch redo
                entry.changes.forEach(change => {
                    this.applyElementState(change.element, change.currentState);
                });
            } else {
                this.applyElementState(entry.element, entry.currentState);
            }

            this.updateUI();
            return true;
        } catch (error) {
            console.error('Redo failed:', error);
            return false;
        }
    }

    /**
     * Clears the history stack
     */
    clear() {
        this.historyStack = [];
        this.currentIndex = -1;
        this.updateUI();
    }

    /**
     * Updates UI controls based on current history state
     */
    updateUI() {
        const undoButton = document.getElementById('undo');
        const redoButton = document.getElementById('redo');

        if (undoButton) undoButton.disabled = this.currentIndex < 0;
        if (redoButton) redoButton.disabled = this.currentIndex >= this.historyStack.length - 1;
    }

    /**
     * Checks if undo is available
     * @returns {boolean}
     */
    canUndo() {
        return this.currentIndex >= 0;
    }

    /**
     * Checks if redo is available
     * @returns {boolean}
     */
    canRedo() {
        return this.currentIndex < this.historyStack.length - 1;
    }

    /**
     * Gets the count of undo steps available
     * @returns {number}
     */
    undoCount() {
        return this.currentIndex + 1;
    }

    /**
     * Gets the count of redo steps available
     * @returns {number}
     */
    redoCount() {
        return this.historyStack.length - this.currentIndex - 1;
    }

}


// Global history manager instance
const editHistory = new EditHistoryManager(200);

// Updated functions to use the new history manager
function addToHistory(element, previousContent) {
    editHistory.addEntry(element, previousContent);
}

function undoEdit() {
    editHistory.undo();
}

function redoEdit() {
    editHistory.redo();
}

function updateUndoRedoButtons() {
    editHistory.updateUI();
}
