const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const circle = document.querySelector("circle");

const perimeter = circle.getAttribute("r") * 2 * Math.PI;

circle.setAttribute("stroke-dasharray", perimeter);

let duration;

const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    if (timer.hasStarted) {
      startButton.disabled = true;
    }
    duration = totalDuration;
  },
  onPause() {
    if (timer.hasPaused) {
      startButton.disabled = false;
    }
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );
    timeRemaining;
  },
  onComplete() {
    console.log("Timer is completed");
  },
});

const startAction = startButton.addEventListener("click", timer.start);
const pauseAction = pauseButton.addEventListener("click", timer.pause);
