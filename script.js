const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const TEXT = "TE IUBESC";

let angle = 0;

let phase = "heart";
let phaseStart = Date.now();

const HEART_TIME = 5000;
const TRANSITION_TIME = 2000;
const TEXT_TIME = 3000;

function heartX(t) {
  return 16 * Math.pow(Math.sin(t), 3);
}

function heartY(t) {
  return (
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t)
  );
}

function drawHeart(alpha, scaleExtra) {
  const NUM_STEPS = 120;
  const SCALE = 18 + scaleExtra;

  ctx.save();

  ctx.globalAlpha = alpha;

  ctx.fillStyle = "red";
  ctx.shadowColor = "red";
  ctx.shadowBlur = 20;

  ctx.font = "bold 22px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  for (let i = 0; i < NUM_STEPS; i++) {
    const t = (Math.PI * 2 * i) / NUM_STEPS + angle;

    const x = heartX(t) * SCALE;
    const y = -heartY(t) * SCALE;

    ctx.fillText(TEXT, cx + x, cy + y);
  }

  ctx.restore();

  angle += 0.002;
}

function drawBigText(alpha, scale) {
  ctx.save();

  ctx.globalAlpha = alpha;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(scale, scale);

  ctx.fillStyle = "red";
  ctx.shadowColor = "red";
  ctx.shadowBlur = 30;

  ctx.font = "bold 90px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(TEXT, 0, 0);

  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const now = Date.now();
  const elapsed = now - phaseStart;

  if (phase === "heart") {
    drawHeart(1, 0);

    if (elapsed > HEART_TIME) {
      phase = "transition";
      phaseStart = now;
    }
  }

  else if (phase === "transition") {
    const progress = elapsed / TRANSITION_TIME;

    const heartAlpha = 1 - progress;
    const textAlpha = progress;

    drawHeart(heartAlpha, progress * 10);
    drawBigText(textAlpha, 0.7 + progress * 0.3);

    if (elapsed > TRANSITION_TIME) {
      phase = "text";
      phaseStart = now;
    }
  }

  else if (phase === "text") {
    drawBigText(1, 1);

    if (elapsed > TEXT_TIME) {
      phase = "heart";
      phaseStart = now;
    }
  }

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
