<?php
// This script processes a POST request to delete a specified component from the 'components.json' file. 
// It checks if the component exists, removes it if found, and then saves the updated component list back to the JSON file. 
// The script returns a success message if the component was deleted or an error message if it wasn't found or the request method was invalid.

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $componentName = $_POST['componentName'];

    // Load the existing components from the JSON file
    $jsonFilePath = 'components.json';
    $jsonData = file_get_contents($jsonFilePath);
    $components = json_decode($jsonData, true);

    // Check if the component exists and delete it
    if (isset($components[$componentName])) {
        unset($components[$componentName]);

        // Save the updated components back to the JSON file
        file_put_contents($jsonFilePath, json_encode($components, JSON_PRETTY_PRINT));

        // Return success response
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Component not found.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
