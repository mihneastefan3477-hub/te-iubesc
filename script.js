const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let angle = 0;

const NUM_STEPS = 120;
const SCALE = 18;
const TEXT = "TE IUBESC";

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

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  ctx.fillStyle = "red";
  ctx.font = "bold 22px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let i = 0; i < NUM_STEPS; i++) {
    const t = (Math.PI * 2 * i) / NUM_STEPS + angle;

    const x = heartX(t) * SCALE;
    const y = -heartY(t) * SCALE;

    ctx.fillText(TEXT, cx + x, cy + y);
  }

  angle += 0.002;

  requestAnimationFrame(draw);
}

draw();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
