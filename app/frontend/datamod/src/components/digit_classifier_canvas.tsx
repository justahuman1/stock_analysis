import React from 'react';
import Button from '@material-ui/core/Button';
import Modeler from './requests/modelRequests';
import { any } from '@tensorflow/tfjs';


const createGestures = (canvas: any, ctx: CanvasRenderingContext2D) => {
    canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
    canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
    window.addEventListener('mouseup', sketchpad_mouseUp, false);

    canvas.addEventListener('touchstart', sketchpad_touchStart, false);
    canvas.addEventListener('touchend', sketchpad_touchEnd, false);
    canvas.addEventListener('touchmove', sketchpad_touchMove, false);

    ctx.lineCap = "round";
    ctx.lineWidth = 12;
    ctx.strokeStyle = `#FFFFFF`;


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

const runModel = async (canva_context: CanvasRenderingContext2D, canvas: any): Promise<number> => {
    const model = await Modeler.loader();
    const imageData = canva_context.getImageData(0,0,canvas.width, canvas.height);
    return await Modeler.predictor(imageData, model);
};

interface State {
    canvas ?: any;
    prediction ?: number;
}

class DigitCanvas extends React.Component {
    state: State = {
    }
    componentDidMount() {
      const canvas: any = this.refs.canvas;
      const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
      ctx.fillStyle = "#FFFFFF";
      this.setState({
        ...this.state,
        canvas: canvas,
      });
      createGestures(canvas, ctx);
    }
    clearCanvas(){
        const ctx: CanvasRenderingContext2D = this.state.canvas.getContext("2d");
        if (this.state.canvas)
          ctx.clearRect(1, 1, this.state.canvas.width, this.state.canvas.height);
    }
    async canvasPredictor(){
        const ctx: CanvasRenderingContext2D = this.state.canvas.getContext("2d");
        let res: number = 0;
        if (ctx)
            res = await runModel(ctx, this.state.canvas);
        this.setState({...this.state, prediction:res});
        console.log(res);
    }
    render() {
      return(
        <div>
          <canvas
            ref="canvas"
            style={{touchAction:"none", border:'2px solid green'}}
            width={640} height={425}
            />
            <p>{this.state.prediction}</p>
            <div>
                <Button
                variant="contained"
                color="secondary" style={{margin:'5px'}}
                onClick={()=>this.clearCanvas()}
                >
                    Clear
                </Button>
                <Button
                variant="contained"
                color="primary" style={{margin:'5px'}}
                onClick={()=>this.canvasPredictor()}
                >
                    Predict
                </Button>
            </div>
        </div>
      )
    }
}

export default DigitCanvas;
