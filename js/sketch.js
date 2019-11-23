let canvas;
let CANV_W = 600;
let CANV_H = 600;

const dType = {
    MANUAL: true,
    RANDOM: false
};
let data_input_type = dType.MANUAL;
let data_val = 'A';

let fType = "linear";
const func_types = {
    LIN: x => x,
    SIN: x => CANV_H / 2 + Math.sin(radians(x)) * CANV_H / 4,
    COS: x => CANV_H / 2 + Math.cos(radians(x)) * CANV_H / 4,
    TAN: x => CANV_H / 2 + Math.tan(radians(x)) * CANV_H / 4,
    PARA: x => 0.01 * (x - CANV_W / 2) ** 2,
    CUSTOM: undefined
}

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

function toFType(val) {
    switch(val) {
        case "linear":
            return func_types.LIN;
        case "sin":
            return func_types.SIN;
        case "cos":
            return func_types.COS;
        case "tan":
            return func_types.TAN;
        case "parabola":
            return func_types.PARA;
        case "custom":
            return func_types.CUSTOM;
        default:
            return func_types.LIN;
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

function drawData(x, y, val) {
    //noFill();
    stroke(0);
    ellipse(x, y, 25);
    textAlign(CENTER, CENTER);
    text(val, x, y);
}

function mousePressed() {
    if (stage == "input") {
        if (data_input_type == dType.MANUAL) {
            model.addData(mouseX, mouseY, data_val);
            noFill();
            drawData(mouseX, mouseY, data_val);
        } else if (data_input_type = dType.RANDOM) {

        }
    }
}

function randomPoints() {
    let pointCount = parseInt(Utils.getElem("point_count").value);
    let func = toFType(Utils.getElem("data_gen").value) || eval(Utils.getElem("dg_custom_expr").value);
    for (let i = 0; i < pointCount; i++) {
        let x = Math.random() * CANV_W;
        let y = Math.random() * CANV_H;
        let value = func(x) <= y ? 'B' : 'A';
        model.addData(x, y, value);
        fill(value == 'B' ? color(255, 0, 0, 127) : color(0, 0, 255, 127))
        drawData(x, y, value);
    }
}

function draw() {
    initConst();
    Utils.getElem("point_rand").disabled = data_input_type;
    let expr = Utils.getElem("dg_custom_expr");
    expr.style.visibility = toFType(Utils.getElem("data_gen").value) == undefined ? "visible" : "hidden";
    
}