const sfxToggle = document.querySelector("#sfx-toggle");
const sfxLabel = document.querySelector("#sfx-label");
const currentYear = document.querySelector("#current-year");

let sfxEnabled = false;
let audioContext = null;

try {
  sfxEnabled = localStorage.getItem("portfolio.sfx") === "on";
} catch {
  sfxEnabled = false;
}

function getAudioContext() {
  if (!audioContext) {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (Context) audioContext = new Context();
  }
  return audioContext;
}

function beep(frequency = 430, duration = 0.045, type = "square") {
  if (!sfxEnabled) return;
  const context = getAudioContext();
  if (!context) return;

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(0.035, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + duration);
}

function updateSfxControl() {
  if (!sfxToggle || !sfxLabel) return;
  sfxToggle.setAttribute("aria-pressed", String(sfxEnabled));
  sfxLabel.textContent = sfxEnabled ? "SFX ON" : "SFX OFF";
}

sfxToggle?.addEventListener("click", () => {
  sfxEnabled = !sfxEnabled;
  try {
    localStorage.setItem("portfolio.sfx", sfxEnabled ? "on" : "off");
  } catch {
    // The control still works for this page view when storage is unavailable.
  }
  updateSfxControl();
  beep(720, 0.06);
});

document.querySelectorAll("a, button").forEach((control) => {
  if (control === sfxToggle) return;
  control.addEventListener("pointerenter", () => beep(360, 0.025));
});

if (currentYear) currentYear.textContent = String(new Date().getFullYear());
updateSfxControl();
