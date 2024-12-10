const canvas_width = 2000;
const canvas_height = 2000;

let canvas = document.querySelector("#tree");
canvas.setAttribute("width", canvas_width);
canvas.setAttribute("height", canvas_height);
const ctx = canvas.getContext("2d");

let circles = [
    {
        id: 1,
        x: canvas_width / 2,
        y: 50,
        radius: 30,
        value: "5"
    },
    {
        id: 2,
        x: canvas_width / 2 - 100,
        y: 75 * 2,
        radius: 30,
        value: "10",
        parent: 1,
    },
    {
        id: 3,
        x: canvas_width / 2 + 100,
        y: 75 * 2,
        radius: 30,
        value: "15",
        parent: 1
    },
    {
        id: 4,
        x: canvas_width / 2 - 200,
        y: 75 * 3,
        radius: 30,
        value: "20",
        parent: 2,
    },
];

let initial_config = {
    x: canvas_width / 2,
    y: 75,
    radius: 30,
};

function drawTree(nodes){
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the previous frame
    drawNodes(initial_config, nodes)
}

function drawNodes(initial_config, nodes, level = 1, position=0){

    if(nodes == null){
        return
    }

    drawCircle(initial_config, nodes, level, position)

    level++
    let left_config = {...initial_config};
    left_config.x = left_config.x - (left_config.x / 2)
    drawNodes(left_config, nodes.left, level, 0)

    let right_config = {...initial_config};
    right_config.x = right_config.x + (right_config.x / 2)
    drawNodes(right_config, nodes.right, level, 1)
}

function drawCircle(config, circle, level, postition) {

    // ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the previous frame
    // circles.forEach((circ) => {
        // let x;
        // if(postition == 0){
        //     x = config.x - (100 * (level - 1))
        // }else{
        //     x = config.x + (100 * (level - 1))
        // }
        ctx.beginPath();
        ctx.arc(config.x, config.y * level, config.radius, 0, 2 * Math.PI); // Draw circle
        ctx.fillStyle = "rgb(0 255 0 / 25%)";
        ctx.strokeStyle = "rgb(0 0 0)";
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "rgb(0 0 0)";
        ctx.font = "16px serif";
        ctx.textAlign = "center";
        ctx.fillText(circle.data, config.x, config.y * level); // Draw text

        if(circle.parent){
            // const targetCircle = circles.find(function(circle){
            //     return circle.id === this.parent
            // }, {...circ});
            // console.log(targetCircle)
            // ctx.beginPath();
            // ctx.moveTo(circ.x, circ.y - circ.radius);
            // ctx.lineTo(targetCircle.x, targetCircle.y + targetCircle.radius)
            // ctx.strokeStyle = "black";
            // ctx.stroke();
        }

    // });
    // drawCircle(circles.left, level++)
    // drawCircle(circles.right, level++)

    // window.requestAnimationFrame(() => drawCircle(circles))
}

function animateCircle(circleId, targetX, targetY) {
    // Find the specific circle by id
    const targetCircle = circles.find((circ) => circ.id === circleId);

    gsap.to(targetCircle, {
        x: targetX,
        y: targetY,
        duration: 1,
        onUpdate: function() {
            drawCircle(circles); // Call drawCircle to update canvas
        },
        onComplete: function(){
            targetCircle.parent = 4,
            drawCircle(circles)
        }
    });
}

// window.requestAnimationFrame(() => drawCircle(circles));
// animateCircle(3, 500, 500);
