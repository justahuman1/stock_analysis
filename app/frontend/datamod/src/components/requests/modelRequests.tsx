import * as tf from '@tensorflow/tfjs';
import { imag } from '@tensorflow/tfjs';


const Loader = async () => {
    let url = 'https://raw.githubusercontent.com/justahuman1/stock_analysis/master/app/backend/pyData/models/digit_classifier/out/ModelJS/model.json';
    return await tf.loadLayersModel(url);
};

const Predictor = async (imageData: ImageData, model: any): Promise<number> => {
    let img:any = tf.browser.fromPixels(imageData, 1);
    img = tf.image.resizeBilinear(img, [28,28]).reshape([1, 28, 28, 1]);
    img = tf.cast(img, 'float32');
    const output = model.predict(img);
    let predictions = Array.from(output.dataSync());
    return predictions.indexOf(1);
};

const Modeler = {
    'loader': Loader,
    'predictor': Predictor
};

export default Modeler;


/*
    // const pred = await tf.tidy(() => {
    //   let img: tf.Tensor<tf.Rank.R3> = tf.browser.fromPixels(imageData,1)
    //   let tfResizedImage: tf.Tensor = tf.image.resizeBilinear(img, [28,28]);
    //   tfResizedImage = tf.cast(tfResizedImage, 'float32');
    //   tfResizedImage = tf.abs(imageData
    //       tfResizedImage.sub(
    //         tf.scalar(255))
    //     ).div(tf.scalar(255)).flatten();
    //   tfResizedImage = tfResizedImage.reshape([1, 28, 28, 1]);
    //   const output: any = model.predict(tfResizedImage);

    //   const predictions: Array<number> = Array.from(output.dataSync());
    //   console.log(predictions);
    // //   const tyr: any = predictions.reduce((a: any,b: any) => Math.max(a,b));
    // //   const maxPossibility = predictions.indexOf(Math.max(...predictions))
    // //   console.log(maxPossibility);

*/