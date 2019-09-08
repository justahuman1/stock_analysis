import * as tf from '@tensorflow/tfjs';


const Loader = async () => {
    await tf.loadLayersModel('./tfjs/ModelJS');
};

const Predictor = async (imageData: ImageData, model: any) => {

    const pred = await tf.tidy(() => {

      let img:any = tf.browser.fromPixels(imageData, 1);
      img = img.reshape([1, 28, 28, 1]);
      img = tf.cast(img, 'float32');

      const output = model.predict(img) as any;

      const predictions = Array.from(output.dataSync());
    });
};

const Modeler = {
    'loader':Loader,
    'predictor': Predictor
}

export default Modeler;