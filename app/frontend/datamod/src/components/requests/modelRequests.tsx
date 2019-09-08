import * as tf from '@tensorflow/tfjs';


const Loader = async () => {
    let url = 'https://raw.githubusercontent.com/justahuman1/stock_analysis/master/app/frontend/datamod/src/components/requests/tfjs/ModelJS/model.json';
    return await tf.loadLayersModel(url);
};

const Predictor = async (imageData: ImageData, model: any) => {

    // const pred = await tf.tidy(() => {

    //   let img:any = tf.browser.fromPixels(imageData, 1);
    //   img = img.reshape([1, 28, 28, 1]);
    //   img = tf.cast(img, 'float32');

    //   const output = model.predict(img) as any;

    //   return Array.from(output.dataSync()); // const predictions
    // });
};

const Modeler = {
    'loader': Loader,
    'predictor': Predictor
};

export default Modeler;