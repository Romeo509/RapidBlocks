document.getElementById("addComponentBtn").onclick = function() {
    document.getElementById("componentModal").style.display = "block";
};

document.getElementById("closeModal").onclick = function() {
    document.getElementById("componentModal").style.display = "none";
};

document.getElementById("saveComponentBtn").onclick = function() {
    const htmlCode = document.getElementById("htmlInput").value;
    const cssCode = document.getElementById("cssInput").value;
    const componentName = prompt("Enter component name:");

    if (componentName) {
        const componentData = {
            html: htmlCode,
            css: cssCode
        };

        // Send data to PHP script
        fetch("save_component.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: componentName, data: componentData })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Component saved successfully!");
                addToSidebar(componentName);
            } else {
                alert("Error saving component.");
            }
        });

        // Close modal after saving
        document.getElementById("componentModal").style.display = "none";
    }
};

function addToSidebar(componentName) {
    const componentList = document.getElementById("componentList");
    const newComponent = document.createElement("div");
    newComponent.innerText = componentName;
    newComponent.draggable = true;
    
    // Add drag functionality
    newComponent.ondragstart = function(event) {
        event.dataTransfer.setData("text/plain", componentName);
    };

    componentList.appendChild(newComponent);
}
