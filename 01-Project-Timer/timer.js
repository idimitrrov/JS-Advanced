class Timer {
  hasStarted = false;
  hasPaused = false;
  duration;

  constructor(duration, startButton, pauseButton, callbacks) {
    this.duration = duration;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
      this.onPause = callbacks.onPause;
    }
  }

  start = () => {
    this.hasStarted = true;
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick();
    this.interval = setInterval(this.tick, 10);
  };
  pause = () => {
    this.hasPaused = true;
    if (this.onPause) {
      this.onPause();
    }
    clearInterval(this.interval);
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.01;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  get timeRemaining() {
    return Number(this.duration.value);
  }

  set timeRemaining(time) {
    this.duration.value = time.toFixed(2);
  }
}
