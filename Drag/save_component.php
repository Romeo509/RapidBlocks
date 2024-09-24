<?php
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
