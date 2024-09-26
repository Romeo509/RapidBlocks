<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the workspace HTML content sent via POST
    $workspaceHtml = $_POST['workspaceHtml'];

    // Define the path where the workspace will be saved
    $projectDir = 'project';
    $filePath = $projectDir . '/index.html';

    // Create the 'project' directory if it doesn't exist
    if (!is_dir($projectDir)) {
        mkdir($projectDir, 0755, true);
    }

    // Write the HTML content to the index.html file
    $htmlTemplate = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n" .
                    "<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" .
                    "<title>Workspace Project</title>\n" .
                    "<link rel=\"stylesheet\" href=\"../styles.css\">\n" .
                    "</head>\n<body>\n" .
                    $workspaceHtml . "\n" .
                    "</body>\n</html>";

    if (file_put_contents($filePath, $htmlTemplate)) {
        // Respond with success
        echo json_encode(['success' => true, 'message' => 'Workspace saved successfully!']);
    } else {
        // Respond with an error
        echo json_encode(['success' => false, 'message' => 'Failed to save workspace.']);
    }
} else {
    // Respond with an error if the request method is not POST
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
