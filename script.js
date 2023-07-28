
document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("artCanvas");
    const ctx = canvas.getContext("2d");

    const width = 800;
    const height = 600;
    const numShapes = 50;

    function randomColor() {
        return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    }

    function randomTexturePattern() {
        const patternChoices = [
            `url(${generateTexturePattern()})`,
            `url(${generateTexturePattern()})`,
            `url(${generateTexturePattern()})`,
            `url(${generateTexturePattern()})`,
        ];
        return patternChoices[Math.floor(Math.random() * patternChoices.length)];
    }

    function generateTexturePattern() {
        const patternCanvas = document.createElement("canvas");
        patternCanvas.width = 10;
        patternCanvas.height = 10;
        const patternCtx = patternCanvas.getContext("2d");
        patternCtx.fillStyle = randomColor();
        patternCtx.fillRect(0, 0, 10, 10);
        return patternCanvas.toDataURL();
    }

    function drawStar(centerX, centerY, outerRadius, innerRadius, numPoints) {
        ctx.beginPath();
        for (let i = 0; i < numPoints * 2; i++) {
            const angle = (Math.PI / numPoints) * i;
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.fillStyle = randomColor();
        ctx.fill();
    }

    function generateAbstractArt() {
        ctx.clearRect(0, 0, width, height); 

        for (let i = 0; i < numShapes; i++) {
            const shapeType = [
                "rectangle",
                "ellipse",
                "polygon",
                "line",
                "circle",
                "star",
                "triangle",
            ][Math.floor(Math.random() * 7)];
            const color = randomColor();
            const texture = randomTexturePattern();

            if (shapeType === "rectangle") {
                const x1 = Math.random() * width;
                const y1 = Math.random() * height;
                const x2 = Math.random() * width;
                const y2 = Math.random() * height;
                ctx.fillStyle = color;
                ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
                const textureImg = new Image();
                textureImg.src = texture;
                textureImg.onload = () => {
                    ctx.drawImage(textureImg, x1, y1, x2 - x1, y2 - y1);
                };
            } else if (shapeType === "ellipse") {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const radiusX = Math.random() * 100;
                const radiusY = Math.random() * 100;
                ctx.beginPath();
                ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
                const textureImg = new Image();
                textureImg.src = texture;
                textureImg.onload = () => {
                    ctx.drawImage(textureImg, x - radiusX, y - radiusY, 2 * radiusX, 2 * radiusY);
                };
            } else if (shapeType === "polygon") {
                const numPoints = Math.floor(Math.random() * 4) + 3;
                const points = [];
                for (let j = 0; j < numPoints; j++) {
                    points.push([Math.random() * width, Math.random() * height]);
                }
                ctx.beginPath();
                ctx.moveTo(points[0][0], points[0][1]);
                for (let j = 1; j < numPoints; j++) {
                    ctx.lineTo(points[j][0], points[j][1]);
                }
                ctx.closePath();
                ctx.fillStyle = color;
                ctx.fill();
            } else if (shapeType === "line") {
                const x1 = Math.random() * width;
                const y1 = Math.random() * height;
                const x2 = Math.random() * width;
                const y2 = Math.random() * height;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = color;
                ctx.lineWidth = Math.random() * 5 + 1;
                ctx.stroke();
            } else if (shapeType === "circle") {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const radius = Math.random() * 50 + 10;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
                const textureImg = new Image();
                textureImg.src = texture;
                textureImg.onload = () => {
                    ctx.drawImage(textureImg, x - radius, y - radius, 2 * radius, 2 * radius);
                };
            } else if (shapeType === "star") {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const outerRadius = Math.random() * 40 + 20;
                const innerRadius = Math.random() * 20 + 10;
                const numPoints = Math.floor(Math.random() * 8) + 5;
                drawStar(x, y, outerRadius, innerRadius, numPoints);
            } else if (shapeType === "triangle") {
                const x1 = Math.random() * width;
                const y1 = Math.random() * height;
                const x2 = Math.random() * width;
                const y2 = Math.random() * height;
                const x3 = Math.random() * width;
                const y3 = Math.random() * height;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.lineTo(x3, y3);
                ctx.closePath();
                ctx.fillStyle = color;
                ctx.fill();
            }
        }
    }

    generateAbstractArt();

    document.getElementById("generateButton").addEventListener("click", function() {
        generateAbstractArt();
    });

    document.getElementById("saveButton").addEventListener("click", function() {
        const link = document.createElement("a");
        link.download = "abstract_art.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
});
