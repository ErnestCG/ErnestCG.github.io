document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll(".bouncing-element");
    const colors = [
        "#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8B00FF",
        "#FF1493", "#00CED1", "#FFD700", "#ADFF2F", "#FF4500", "#DA70D6", "#7FFF00",
        "#DC143C", "#00BFFF", "#FF6347", "#40E0D0", "#EE82EE", "#8A2BE2", "#5F9EA0",
        "#D2691E", "#FF69B4", "#CD5C5C", "#4B0082", "#8B0000", "#556B2F", "#FF8C00",
        "#9932CC", "#8FBC8F", "#483D8B", "#2F4F4F", "#00FA9A", "#FF00FF", "#1E90FF"
    ];
    const initialSpeed = 1; // Initial speed of movement
    const speedIncrement = 0.5; // Speed increment on each bounce
    const rightEdgeAdjustment = 10; // Adjust this value as needed
    const bottomEdgeAdjustment = 0; // Adjust this value as needed

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function getRandomPosition(max, elementSize) {
        return Math.floor(Math.random() * (max - elementSize));
    }

    function getRandomDirection() {
        return Math.random() < 0.5 ? -1 : 1;
    }

    function moveElement(element) {
        const rect = element.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        let dx = element.dx;
        let dy = element.dy;

        // Check for collision with the right or left edge
        if (rect.right >= windowWidth - rightEdgeAdjustment || rect.left <= 0) {
            dx = -dx;
            dx += Math.random()*(dx > 0 ? speedIncrement : -speedIncrement); // Increment speed
            element.querySelector('a').style.color = getRandomColor(); // Change color on horizontal collision
        }
        // Check for collision with the bottom or top edge
        if (rect.bottom >= windowHeight - bottomEdgeAdjustment || rect.top <= 0) {
            dy = -dy;
            dy += Math.random()*(dy > 0 ? speedIncrement : -speedIncrement); // Increment speed
            element.querySelector('a').style.color = getRandomColor(); // Change color on vertical collision
        }


        // Update the position of the element
        element.style.left = (rect.left + dx) + "px";
        element.style.top = (rect.top + dy) + "px";
        element.dx = dx;
        element.dy = dy;
        requestAnimationFrame(() => moveElement(element));
    }

    elements.forEach(element => {
        // Initialize the position of the element with random values
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const elementWidth = element.offsetWidth;
        const elementHeight = element.offsetHeight;
        element.style.left = getRandomPosition(windowWidth - rightEdgeAdjustment, elementWidth) + "px";
        element.style.top = getRandomPosition(windowHeight - bottomEdgeAdjustment, elementHeight) + "px";
        element.querySelector('a').style.color = getRandomColor();
        element.dx = initialSpeed * getRandomDirection();
        element.dy = initialSpeed * getRandomDirection();
        moveElement(element);
    });
});