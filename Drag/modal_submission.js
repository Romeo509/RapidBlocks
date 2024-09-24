$(document).ready(function() {
    $('#saveComponentBtn').on('click', function() {
        const componentName = $('#componentName').val(); // Ensure you have an input for this
        const htmlCode = $('#htmlInput').val();
        const cssCode = $('#cssInput').val();

        $.post('save_component.php', {
            componentName: componentName,
            htmlCode: htmlCode,
            cssCode: cssCode
        }, function(response) {
            const res = JSON.parse(response);
            if (res.success) {
                alert('Component saved successfully!');
                // Optionally, refresh the sidebar or add the component to the sidebar here
            } else {
                alert('Failed to save component: ' + res.message);
            }
        }).fail(function() {
            alert('Error in submission.');
        });
    });
});
