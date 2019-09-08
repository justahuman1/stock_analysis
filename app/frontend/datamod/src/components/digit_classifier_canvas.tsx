import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


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

const runModel = () => {
    const modelURL = 'http://127.0.0.1:5000/';

    // const predict = async (modelURL) => {
    //     if (!model) model = await tf.loadModel(modelURL);
    //     const files = fileInput.files;const predict = async (modelURL) => {
    //         if (!model) model = await tf.loadModel(modelURL);
    //         const files = fileInput.files;

    //         [...files].map(async (img) => {
    //             const data = new FormData();
    //             data.append('file', img);

    //             const processedImage = await fetch("/api/prepare",
    //                 {
    //                     method: 'POST',
    //                     body: data
    //                 }).then(response => {
    //                     return response.json();
    //                 }).then(result => {
    //                     return tf.tensor2d(result['image']);
    //                 });

    //         })
    //     };
    //     [...files].map(async (img) => {
    //         const data = new FormData();
    //         data.append('file', img);

    //         const processedImage = await fetch("/api/prepare",
    //             {
    //                 method: 'POST',
    //                 body: data
    //             }).then(response => {
    //                 return response.json();
    //             }).then(result => {
    //                 return tf.tensor2d(result['image']);
    //             });

    //     })
    // };
};

class DigitCanvas extends React.Component {
    // state = {
    //     canvas: this.refs.canvas
    // }
    componentDidMount() {
      const canvas: any = this.refs.canvas;
      const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
      ctx.fillStyle = "#FF0000";
      createGestures(canvas, ctx);
    }
    clearCanvas(){
        const canvas: any = this.refs.canvas;
        const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    render() {
      return(
        <div>
          <canvas
            ref="canvas"
            style={{touchAction:"none", border:'2px solid green'}}
            width={640} height={425}
            // function getFetcher(){
            //     return fetch(
            //         'http://127.0.0.1:5000/', {
            //             method:'GET',
            //             headers:{
            //                 'Accept':'application/json',
            //                 'Content-Type':'application/json'
            //             }
            //         }
            //     ).then((r) =>{return r.json()}).catch(e => console.log(e));
            // }
            />
            <div>
                <Button
                variant="contained"
                color="secondary" style={{margin:'5px'}}
                onClick={()=>this.clearCanvas()}
                >
                    Clear
                </Button>
                <Button variant="contained" color="primary" style={{margin:'5px'}}>
                    Predict
                </Button>
            </div>
        </div>
      )
    }
}

export default DigitCanvas;
