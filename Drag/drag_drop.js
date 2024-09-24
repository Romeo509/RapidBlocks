$(document).ready(function() {
    // Enable dragging for component items
    $('#componentList').on('dragstart', '.component-item', function(event) {
        const componentName = $(this).text(); // Get the component name
        event.originalEvent.dataTransfer.setData('text/plain', componentName); // Set the data to be dragged
    });

    // Allow dropping in the workspace area
    $('#workspaceArea').on('dragover', function(event) {
        event.preventDefault(); // Prevent default to allow drop
    });

    // Handle the drop event
    $('#workspaceArea').on('drop', function(event) {
        event.preventDefault(); // Prevent default behavior
        const componentName = event.originalEvent.dataTransfer.getData('text/plain'); // Get the dragged data

        // Load the corresponding component's HTML from components.json
        $.getJSON('components.json', function(data) {
            for (const key in data) {
                if (data[key].name === componentName) {
                    // Create a new element for the dropped component
                    const newElement = $(data[key].html);

                    // Create a style element and append CSS to it
                    const styleElement = $('<style></style>').text(data[key].css);
                    $('head').append(styleElement); // Append the style to the document head

                    newElement.css({
                        position: 'absolute',
                        top: event.offsetY + 'px',
                        left: event.offsetX + 'px',
                        cursor: 'move'
                    });
                    $('#workspaceArea').append(newElement);
                    makeDraggable(newElement); // Make the new element draggable
                    addContextMenu(newElement); // Add context menu for right-click delete
                    break;
                }
            }
        });
    });

    // Function to make elements draggable
    function makeDraggable(element) {
        let offsetX, offsetY;

        element.on('mousedown', function(event) {
            offsetX = event.clientX - element.position().left;
            offsetY = event.clientY - element.position().top;

            $(document).on('mousemove.drag', function(event) {
                // Calculate new position
                let newTop = event.clientY - offsetY;
                let newLeft = event.clientX - offsetX;

                // Get workspace boundaries
                const workspace = $('#workspaceArea');
                const workspaceWidth = workspace.width();
                const workspaceHeight = workspace.height();

                // Ensure the new position is within bounds
                if (newTop < 0) newTop = 0; // Top boundary
                if (newLeft < 0) newLeft = 0; // Left boundary
                if (newTop + element.outerHeight() > workspaceHeight) {
                    newTop = workspaceHeight - element.outerHeight(); // Bottom boundary
                }
                if (newLeft + element.outerWidth() > workspaceWidth) {
                    newLeft = workspaceWidth - element.outerWidth(); // Right boundary
                }

                // Apply the new position
                element.css({
                    top: newTop + 'px',
                    left: newLeft + 'px'
                });
            });

            $(document).on('mouseup.drag', function() {
                $(document).off('mousemove.drag');
                $(document).off('mouseup.drag');
            });

            return false; // Prevent text selection
        });
    }

    // Function to add context menu for delete option
    function addContextMenu(element) {
        element.on('contextmenu', function(e) {
            e.preventDefault();

            // Create the custom context menu
            const contextMenu = $('<div class="context-menu"></div>');
            const deleteOption = $('<ul><li>Delete</li></ul>');

            // Append the delete option to the context menu
            contextMenu.append(deleteOption);

            // Append the context menu to the body
            $('body').append(contextMenu);

            // Position the context menu near the mouse pointer
            contextMenu.css({
                top: e.pageY + 'px',
                left: e.pageX + 'px',
                display: 'block'
            });

            // Delete component when delete option is clicked
            deleteOption.on('click', function() {
                element.remove(); // Remove the element from the workspace
                contextMenu.remove(); // Remove the context menu
            });

            // Hide context menu on click outside
            $(document).on('click', function() {
                contextMenu.remove();
            });
        });
    }
});
