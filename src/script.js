function random(a, b) {
    return Math.round(Math.random() * (b - a)) + a;
}

function animate(startValue, endValue, time, onFrame, onEnd) {
    let frames = time / 5;
    let step = (endValue - startValue) / frames;
    let up = endValue > startValue;
    let inter = setInterval(function () {
        startValue += step;
        if ((up && startValue >= endValue) || (!up && startValue <= endValue)) {
            clearInterval(inter);
            startValue = endValue;
            if (onEnd) onEnd();
        }
        onFrame(startValue);
    }, 5);
}

let scoreCounter = 0;
let livesCounter = 10;

class Bubble {

    start() {
        window.addEventListener("load", e => this.init());
    }

    init() {
        this.loadComponents();
        this.bindEvents();
        this.bubbleGen();
    }

    loadComponents() {
        this.container = document.querySelector(".container");
        this.score = document.querySelector(".score");
        this.lives = document.querySelector(".lives");
        this.score.innerText = scoreCounter;
        this.lives.innerText = livesCounter;
    }

    bindEvents() {
        this.container.addEventListener("click", e => {
            if (e.target.matches(".bubble")) this.delBubble(e.target);
        })
    }

    addBubble(speed) {
        let bubble = document.createElement("div");
        bubble.classList.add("bubble");

        let containerWidth = this.container.offsetWidth;
        let containerHeight = this.container.offsetHeight;

        let bubbleSize = random(100, containerHeight / 4);
        let bubblePosLeft = random(0, containerWidth - bubbleSize);
        let bubblePosBottom = -bubbleSize;

        let colors = ["red", "green", "blue", "cyan", "magenta", "yellow"];
        let bubbleColor = colors[random(0, colors.length - 1)];

        bubble.style.width = bubbleSize + "px";
        bubble.style.height = bubbleSize + "px";
        bubble.style.left = bubblePosLeft + "px";
        bubble.style.bottom = bubblePosBottom + "px";
        bubble.style.backgroundColor = bubbleColor;

        this.container.appendChild(bubble);

        animate(bubblePosBottom, containerHeight + bubbleSize, speed, function (v) {
            bubble.style.bottom = v + "px";
        }, function () {
            bubble.remove();
            // livesCounter--;
        });

        this.lives.innerText = livesCounter;

    }

    delBubble(clickedBubble) {
        clickedBubble.remove();
        scoreCounter++;
        this.score.innerText = scoreCounter;
    }

    bubbleGen() {
        let genInt = 3500;
        let speed = 7000;
        let addInt = setTimeout(function int() {
            bubble.addBubble(random(speed, speed - 1000));
            if (scoreCounter === 5) genInt = 3000;
            else if (scoreCounter === 8) speed = 6500;
            else if (scoreCounter === 13) genInt = 2500;
            else if (scoreCounter === 21) speed = 6000;
            else if (scoreCounter === 34) genInt = 2000;
            else if (scoreCounter === 55) speed = 5500;
            else if (scoreCounter === 89) genInt = 1500;
            else if (scoreCounter === 144) speed = 5000;
            else if (scoreCounter === 233) genInt = 1000;
            if (livesCounter > 0) addInt = setTimeout(int, random(genInt, genInt - 500));
        }, 0);
    }
}

let bubble = new Bubble();
bubble.start();
