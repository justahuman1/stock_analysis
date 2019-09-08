import React from 'react';

const createGestures = (canvas: any, ctx: CanvasRenderingContext2D) => {
    canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
    canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
    window.addEventListener('mouseup', sketchpad_mouseUp, false);

    canvas.addEventListener('touchstart', sketchpad_touchStart, false);
    canvas.addEventListener('touchend', sketchpad_touchEnd, false);
    canvas.addEventListener('touchmove', sketchpad_touchMove, false);

    ctx.lineCap = "round";
    ctx.lineWidth = 12;
    ctx.strokeStyle = `rgba(0,0,0,1)`;

    let touchX: any,touchY: any;
    let mouseX: number,mouseY: number,mouseDown: number = 0;
    let lastX: number,lastY: number = -1;

    function drawLine(ctx: CanvasRenderingContext2D,x: number,y: number,size: number){
        if (lastX===-1) {
            lastX=x; lastY=y;
        }
        ctx.beginPath(); ctx.moveTo(lastX,lastY);
            ctx.lineTo(x,y);
        ctx.stroke(); ctx.closePath();

        lastX=x; lastY=y;
    }

    function sketchpad_mouseDown() {
        mouseDown=1;
        drawLine(ctx,mouseX,mouseY,12);
    }

    function sketchpad_mouseUp() {
        mouseDown=0;
        lastX = lastY = -1;
    }

    function sketchpad_mouseMove(e: any) {
        getMousePos(e);
        if (mouseDown===1) {
            drawLine(ctx,mouseX,mouseY,12);
        }
    }

    function getMousePos(e: any) {
        if (e.offsetX) {
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        }
        else if (e.layerX) {
            mouseX = e.layerX;
            mouseY = e.layerY;
        }
     }

    function sketchpad_touchStart(e: any) {
        getTouchPos(e);
        drawLine(ctx,touchX,touchY,12);
    }

    function sketchpad_touchEnd() {
        lastX = lastY = -1;
    }

    function sketchpad_touchMove(e: any) {
        getTouchPos(e);
        drawLine(ctx,touchX,touchY,12);
    }

    function getTouchPos(e: any) {
        if(e.touches) {
            if (e.touches.length === 1) { // Only deal with one finger
                let touch = e.touches[0]; // Get the information for finger #1
                touchX=touch.pageX-touch.target.offsetLeft;
                touchY=touch.pageY-touch.target.offsetTop;
            }
        }
    }
};

class DigitCanvas extends React.Component {
    componentDidMount() {
      const canvas: any = this.refs.canvas;
      const ctx: CanvasRenderingContext2D = canvas.getContext("2d")
      ctx.fillStyle = "#FF0000";
      createGestures(canvas, ctx);
    }
    clearCanvas(canvas: any, ctx: CanvasRenderingContext2D){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    render() {
      return(
        <div>
          <canvas
            ref="canvas"
            style={{touchAction:"none"}}
            width={640} height={425}/>
        </div>
      )
    }
}

export default DigitCanvas;
