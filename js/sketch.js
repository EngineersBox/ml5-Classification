let canvas;
let CANV_W = 600;
let CANV_H = 600;

let dType = {
    MANUAL: true,
    RANDOM: false
};
let data_input_type = dType.MANUAL;
let data_val = 'A';

/* ML5 Related */
let model;
let epoch_count;
let learning_rate;
let stage = "input";
let uid;

function toDType(val) {
    switch(val) {
        case "manual":
            return dType.MANUAL;
        case "randomised":
            return dType.RANDOM;
        default:
            return dType.MANUAL;
    }
}

function initConst() {
    epoch_count = parseInt(Utils.getElem("epoch_count").value);
    learning_rate = parseFloat(Utils.getElem("learning_rate").value);
    data_input_type = toDType(Utils.getElem("t_data").value);
}

function setup() {
    initConst();
    canvas = createCanvas(CANV_W, CANV_H);
    canvas.parent("sketch_view");
    background(255);

    model = new ML5NN();
    uid = UUID.generate();
}

function keyPressed() {
    if (key == 't') {
        model.train();
    } else {
        data_val = key.toUpperCase();
    }
}

function mousePressed() {
    if (stage == "input") {
        if (data_input_type == dType.MANUAL) {
            model.addData(mouseX, mouseY, data_val);
            noFill();
            stroke(0);
            ellipse(mouseX, mouseY, 25);
            textAlign(CENTER, CENTER);
            text(data_val, mouseX, mouseY);
        } else if (data_input_type = dType.RANDOM) {

        }
    }
}

function draw() {
    initConst();
    Utils.getElem("point_rand").disabled = data_input_type;
}