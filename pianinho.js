const getKeyFrequency = n => Math.pow(2, (n - 49) / 12) * 440;
const audioCtx = new AudioContext();
const playing = {};

window.addEventListener('keydown', e => {
  'qwertyuiopasdfghjklçzxcvbnm'.split('').forEach((k, i) => {
    if (e.key === k && !playing[k]) {
      const frequency = getKeyFrequency(30 + i);
      const oscillator = audioCtx.createOscillator();
      playing[k] = oscillator;
      oscillator?.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      oscillator.connect(audioCtx.destination);
      oscillator?.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      oscillator.type = "triangle";
      oscillator.start();
    }
  });
});

window.addEventListener('keyup', e => {
  const k = e.key;

  const stop = x => {
    try {
      playing[x].stop();
      playing[x].disconnect;
      playing[x] = false;
    }catch{}
  }

  if (e.key === 'n') {
    Object.keys(playing).forEach(x => stop(x));
  }

  stop(k);
});
