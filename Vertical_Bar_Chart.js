const svgChart = document.getElementById('svg-chart');
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const datasets = [
  { label: "Groen Dataset", color: "#C5FF22", data: [5, 15, 20, 24, 29, 35, 40, 50, 60, 65, 70, 75, 80, 100] },
  { label: "Wit Dataset", color: "white", data: [6, 12, 15, 18, 20, 23, 34, 33, 40, 50, 60, 66, 80, 100] }
];

const totalDuration = 1000;
const easing = (t) => t * (2 - t); // Example of easing function

const duration = (ctx) => easing(ctx.index / ctx.dataset.data.length) * totalDuration / ctx.dataset.data.length;
const delay = (ctx) => easing(ctx.index / ctx.dataset.data.length) * totalDuration;

function animateBars(rect, targetHeight, duration, delay) {
  const startHeight = 0;
  const startTime = Date.now();

  function animate() {
    const elapsedTime = Date.now() - startTime - delay;
    if (elapsedTime < 0) {
      requestAnimationFrame(animate);
      return;
    }

    const progress = Math.min(elapsedTime / duration, 1);
    const currentHeight = startHeight + (targetHeight - startHeight) * easing(progress);
    rect.setAttribute("height", currentHeight);
    rect.setAttribute("y", 400 - currentHeight);

    if (elapsedTime < duration) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

function drawChart() {
  svgChart.innerHTML = "";
  const barWidth = 600 / (labels.length * 2);
  
  datasets.forEach((dataset, datasetIndex) => {
    dataset.data.forEach((value, index) => {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      const xPosition = (index * 2 + datasetIndex) * barWidth;
      rect.setAttribute("x", xPosition);
      rect.setAttribute("y", 400);  // Start at the bottom of the SVG
      rect.setAttribute("width", barWidth - 20);
      rect.setAttribute("fill", dataset.color);
      rect.classList.add("bar");
      svgChart.appendChild(rect);

      const targetHeight = (value / 100) * 300;
      const barDuration = duration({ index, dataset });
      const barDelay = delay({ index, dataset });

      animateBars(rect, targetHeight, barDuration, barDelay);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  drawChart();
});
