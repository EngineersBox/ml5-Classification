let canvas;
let CANV_W = 600;
let CANV_H = 600;

let NNID = UUID.generate();

let data_input_type;
let data_val = 'A';

/* ML5 Related */
let model;
let epoch_count;
let learning_rate;

function initConst() {
    epoch_count = parseInt(Utils.getElem("epoch_count").value);
    learning_rate = parseFloat(Utils.getElem("learning_rate").value);
    data_input_type = Utils.getElem("t_data").value;
}

function setup() {
    initConst();
    canvas = createCanvas(CANV_W, CANV_H);
    canvas.parent("sketch_view");
    background(255);

    let options = {
        inputs: ["x", "y"],
        outputs: ["label"],
        task: "classification",
        debug: "true"
    };
    model = ml5.neuralNetwork(options);
}

function whileTraining(epoch, loss) {
    console.log(`[ML5 ${NNID}]> Epoch ${epoch}, Loss: ${loss}`);
}

function doneTraining() {
    console.log(`[ML5 ${NNID}]> Done Training.`);
}

function keyPressed() {
    if (key == 't') {
        let options = {
            epochs: epoch_count,
            learningRate: learning_rate
        }
        model.normalizeData();
        model.train(options, whileTraining, doneTraining);
    } else {
        data_val = key.toUpperCase();
    }
}

function mousePressed() {
    if (data_input_type == "manual") {
        let inputs = {
            x: mouseX,
            y: mouseY
        }
        let target = {
            label: data_val
        }
        model.addData(inputs, target);
        noFill();
        stroke(0);
        ellipse(mouseX, mouseY, 25);
        textAlign(CENTER, CENTER);
        text(data_val, mouseX, mouseY);
    }
}

function draw() {
    initConst();
}