let osc, playing, freq, amp;

//for knob
let tickAngle = 0;
let knobSize = 100;
let knobTickSize = 20;


function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.mousePressed(playOscillator);
    osc = new p5.Oscillator('sine');

    knobX = width / 2;
    knobY = height / 2;
}

function draw() {
    background(220)
    freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
    amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

    text('freq: ' + freq, 20, 40);
    text('amp: ' + amp, 20, 60);

    if (playing) {
        // smooth the transitions by 0.1 seconds
        osc.freq(freq, 0.1);
        osc.amp(amp, 0.1);

        //Hide cursor when playing
        noCursor();
    } else {
        cursor(ARROW);
    }

    knob(); // Draw the knob
}

function playOscillator() {
    // starting an oscillator on a user gesture will enable audio
    // in browsers that have a strict autoplay policy.
    // See also: userStartAudio();

    //Only play if mouse is over knob and pressed
    if (dist(mouseX, mouseY, knobX, knobY) < knobSize / 2) {
        osc.start();
        playing = true;
    }
}

function mouseReleased() {
    // ramp amplitude to 0 over 0.5 seconds
    osc.amp(0, 0.5);
    playing = false;
}

function knob() {

    if (playing) {
        tickAngle = map(mouseX, 0, width, 0, TWO_PI);
    }

    // Draw the larger circle
    circle(knobX, knobY, knobSize);

    // Draw the smaller circle
    circle(knobX, knobY, knobSize - knobTickSize);

    // Draw the tick on the smaller circle
    let tickSize = knobSize - knobTickSize;
    let tickX = width / 2 + cos(tickAngle) * tickSize / 2;
    let tickY = height / 2 + sin(tickAngle) * tickSize / 2;
    line(width / 2, height / 2, tickX, tickY);
}
