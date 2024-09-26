$(document).ready(function () {
    // Function to save the workspace content
    $('#saveWorkspaceBtn').on('click', function () {
        // Function to get the computed styles of an element and inline them
        function getInlineStyles(element) {
            let computedStyles = window.getComputedStyle(element);
            let inlineStyle = '';
            for (let i = 0; i < computedStyles.length; i++) {
                let key = computedStyles[i];
                let value = computedStyles.getPropertyValue(key);
                inlineStyle += `${key}:${value};`;
            }
            return inlineStyle;
        }

        // Iterate over all elements in the workspace and apply inline styles
        $('#workspaceArea *').each(function () {
            let inlineStyles = getInlineStyles(this);
            $(this).attr('style', inlineStyles);  // Add inline styles to the element
        });

        // Get the modified HTML content of the workspace (with inline styles)
        let workspaceContent = $('#workspaceArea').html();

        // Wrap the workspace content in a full HTML structure
        let fullHtmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Saved Workspace</title>
        </head>
        <body>
            ${workspaceContent}
        </body>
        </html>`;

        // Send the full HTML content to PHP via AJAX
        $.ajax({
            url: 'save_workspace.php', // The PHP script that will handle saving
            type: 'POST',
            data: {
                workspaceHtml: fullHtmlContent // Send the complete HTML content with inline styles
            },
            success: function (response) {
                alert('Workspace saved successfully with inline styles!');
            },
            error: function (xhr, status, error) {
                alert('Failed to save workspace.');
            }
        });
    });
});
