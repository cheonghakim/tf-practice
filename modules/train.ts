const tf = require("@tensorflow/tfjs");

interface ITrain {
  setData(): void;
  createModel(): void;
  trainData(): void;
  predictData(): void;
  saveModel(): Promise<any>;
}

export default class Train implements ITrain {
  model: any;
  protected dense1: any;
  protected dense2: any;
  protected dense3: any;
  constructor(
    private errorFunc: string,
    private learningRate: number,
    private step: number,
    private epoch: number,
    private batchSize: number
  ) {}
  setData() {}
  createModel() {}
  trainData() {}
  predictData() {}
  async saveModel(): Promise<any> {
    return await this.model.save("file:///path/to/my-model");
  }
}
