document.addEventListener('DOMContentLoaded', function() {
    const htmlTab = document.getElementById('htmlTab');
    const cssTab = document.getElementById('cssTab');
    const htmlEditor = document.getElementById('htmlEditor');
    const cssEditor = document.getElementById('cssEditor');
    const htmlInput = document.getElementById('htmlInput');
    const cssInput = document.getElementById('cssInput');
    const previewSection = document.querySelector('.preview-section');

    // Function to update the preview
    function updatePreview() {
        const htmlContent = htmlInput.value;
        const cssContent = cssInput.value;

        // Create a temporary iframe for rendering HTML and CSS
        const previewFrame = document.createElement('iframe');
        previewFrame.style.width = '100%';
        previewFrame.style.height = '100%';
        previewFrame.style.border = 'none';

        // Append the iframe to the preview section
        previewSection.innerHTML = ''; // Clear previous content
        previewSection.appendChild(previewFrame);

        // Write the content to the iframe
        const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
        previewDoc.open();
        previewDoc.write(`
            <html>
                <head>
                    <style>${cssContent}</style>
                </head>
                <body>${htmlContent}</body>
            </html>
        `);
        previewDoc.close();
    }

    // Switch between HTML and CSS editors
    htmlTab.addEventListener('click', function() {
        htmlEditor.classList.add('active');
        cssEditor.classList.remove('active');
        updatePreview(); // Update preview on tab switch
    });

    cssTab.addEventListener('click', function() {
        cssEditor.classList.add('active');
        htmlEditor.classList.remove('active');
        updatePreview(); // Update preview on tab switch
    });

    // Listen for input changes in both editors to update preview
    htmlInput.addEventListener('input', updatePreview);
    cssInput.addEventListener('input', updatePreview);
});
