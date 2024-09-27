<?php
// This script handles a POST request to save a new component's name, HTML, and CSS code to a JSON file. 
// It checks if the request method is POST, loads existing components from 'components.json', and saves the new component data. 
// If successful, it returns a success message; otherwise, it returns an error message for invalid requests.

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $componentName = $_POST['componentName'];
    $htmlCode = $_POST['htmlCode'];
    $cssCode = $_POST['cssCode'];

    $componentData = [
        'name' => $componentName,
        'html' => $htmlCode,
        'css' => $cssCode
    ];

    // Load existing components
    $componentsFile = 'components.json';
    $components = [];
    if (file_exists($componentsFile)) {
        $components = json_decode(file_get_contents($componentsFile), true);
    }

    // Save new component
    $components[$componentName] = $componentData;
    file_put_contents($componentsFile, json_encode($components));

    echo json_encode(['success' => true, 'name' => $componentName]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
?>
