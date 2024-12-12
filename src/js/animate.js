const canvas_width = 2000;
const canvas_height = 2000;

let canvas = document.querySelector("#tree");
canvas.setAttribute("width", canvas_width);
canvas.setAttribute("height", canvas_height);
const ctx = canvas.getContext("2d");

let initial_config = {
    x: 500,
    y: 100,
    radius: 30,
};

function drawTree(nodes){
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the previous frame
    console.log("---------------------")
    drawNodes(initial_config, nodes, 1, initial_config.x)
    console.log("---------------------")
}

function drawNodes(config, nodes, level = 1, start_position){

    if(nodes == null){
        return
    }

    drawCircle(config, nodes, level, 0)
    console.log("draw: ", nodes.data, config.x, start_position)

    level++
    start_position /= 2

    if(nodes.left){
        let left_config = {...config};
        left_config.x = left_config.x - start_position
        console.log("going left: ", nodes.left)
        ctx.beginPath();
        ctx.moveTo(config.x, config.y * (level-1) + config.radius);
        ctx.lineTo(left_config.x, config.y * level - config.radius)
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath()
        drawNodes(left_config, nodes.left, level, start_position)
    }

    if(nodes.right){
        let right_config = {...config};
        right_config.x = right_config.x + start_position
        ctx.beginPath();
        ctx.moveTo(config.x, config.y * (level-1) + config.radius);
        ctx.lineTo(right_config.x, config.y * level - config.radius)
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath()
        console.log("going right: ", nodes.right)
        drawNodes(right_config, nodes.right, level, start_position)
    }

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
