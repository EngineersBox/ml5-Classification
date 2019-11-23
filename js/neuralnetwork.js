class ML5NN {

    /**
     * Create a new ML5 neural network instance
     * 
     * @param {Object} initOptions 
     * @param {Object} trainOptions 
     */
    constructor(initOptions, trainOptions) {
        this.initOptions = initOptions || {
            inputs: ["x", "y"],
            outputs: ["label"],
            task: "classification",
            debug: "true"
        };
        this.trainOptions = trainOptions || {
            epochs: epoch_count,
            learningRate: learning_rate
        };
        this.network = ml5.neuralNetwork(this.initOptions);
        this.isTrained = false;
    }

    /**
     * Add training data with (x, y) position and assosciated label
     * 
     * @param {Number} x_val 
     * @param {Number} y_val 
     * @param {*} target 
     */
    addData(x_val, y_val, target) {
        let inputs = {
            x: x_val,
            y: y_val
        }
        let targets = {
            label: target
        }
        this.network.addData(inputs, targets);
    }

    /**
     * Train the network given the current data
     */
    train() {
        this.network.normalizeData();
        this.network.train(this.trainOptions, this.whileTraining, this.doneTraining);
        this.isTrained = true;
    }

    /**
     * Display the epoch and loss for each training epoch
     * 
     * @param {*} epoch 
     * @param {*} loss 
     */
    whileTraining(epoch, loss) {
        console.log(`[ML5 ${uid}]> Epoch ${epoch}, Loss: ${loss}`);
    }

    /**
     * Display 'done' message when training epochs are complete
     */
    doneTraining() {
        console.log(`[ML5 ${uid}]> Done Training.`);
    }

}