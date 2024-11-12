document.addEventListener('DOMContentLoaded', function() {
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.style.width = '32%';
    container.style.height = '200px';

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 400 200');

    const dataValues = [65, 59, 19, 81];
    const maxDataValue = Math.max(...dataValues);

    const barHeight = 5;
    const barColor = '#C5FF22';
    const textColor = '#fff';

    const easing = (t) => t * (2 - t);

    function animateBar(bar, targetWidth, duration) {
        const startWidth = 0;
        const startTime = Date.now();

        function animate() {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentWidth = startWidth + (targetWidth - startWidth) * easing(progress);
            bar.setAttribute('width', currentWidth);

            if (elapsedTime < duration) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }

    dataValues.forEach((value, index) => {
        const barWidth = (value / maxDataValue) * 300;

        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bar.setAttribute('x', '50');
        bar.setAttribute('y', `${20 + index * 40}`);
        bar.setAttribute('width', 0);
        bar.setAttribute('height', barHeight);
        bar.setAttribute('fill', barColor);

        const dataText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        dataText.setAttribute('x', '55');
        dataText.setAttribute('y', `${40 + index * 40}`);
        dataText.setAttribute('fill', textColor);
        dataText.setAttribute('font-size', '14');
        dataText.setAttribute('text-anchor', 'start');
        dataText.textContent = `${value}%`;

        svg.appendChild(bar);
        svg.appendChild(dataText);

        animateBar(bar, barWidth, 1000);
    });

    container.appendChild(svg);
    document.body.appendChild(container);
});
