document.addEventListener('DOMContentLoaded', function () {
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.style.width = '300px';
    container.style.height = '300px';

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '300');
    svg.setAttribute('height', '300');
    svg.setAttribute('viewBox', '0 0 300 300');

    const greenTicksGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    greenTicksGroup.setAttribute('id', 'green-ticks');
    greenTicksGroup.setAttribute('stroke', '#C5FF22');
    greenTicksGroup.setAttribute('stroke-width', '3');

    const greyTicksGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    greyTicksGroup.setAttribute('id', 'grey-ticks');
    greyTicksGroup.setAttribute('stroke', '#d3d3d3');
    greyTicksGroup.setAttribute('stroke-width', '3');

    const percentageText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    percentageText.setAttribute('id', 'percentage-text');
    percentageText.setAttribute('x', '150');
    percentageText.setAttribute('y', '150');
    percentageText.setAttribute('text-anchor', 'middle');
    percentageText.setAttribute('alignment-baseline', 'middle');
    percentageText.setAttribute('font-size', '72');
    percentageText.setAttribute('fill', '#C5FF22');
    percentageText.setAttribute('font-weight', 'bold');
    percentageText.textContent = '0%';

    svg.appendChild(greenTicksGroup);
    svg.appendChild(greyTicksGroup);
    svg.appendChild(percentageText);
    container.appendChild(svg);
    document.body.appendChild(container);

    function animateChart(targetPercentage) {
        const totalTicks = 60;
        const targetGreenTicks = Math.round((targetPercentage / 100) * totalTicks);

        let currentPercentage = 0;
        let currentGreenTicks = 0;

        greenTicksGroup.innerHTML = '';
        greyTicksGroup.innerHTML = '';

        function animate() {
            if (currentPercentage < targetPercentage) {
                currentPercentage += 1;
                percentageText.textContent = `${currentPercentage}%`;
            }

            const greenTicks = Math.round((currentPercentage / 100) * totalTicks);
            if (greenTicks > currentGreenTicks) {
                currentGreenTicks = greenTicks;
                updateTicks(greenTicks, totalTicks);
            }

            if (currentPercentage < targetPercentage || currentGreenTicks < targetGreenTicks) {
                requestAnimationFrame(animate);
            }
        }

        function updateTicks(greenTicks, totalTicks) {
            greenTicksGroup.innerHTML = '';
            greyTicksGroup.innerHTML = '';

            for (let i = 0; i < greenTicks; i++) {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", "150");
                line.setAttribute("y1", "1");
                line.setAttribute("x2", "150");
                line.setAttribute("y2", "40");
                line.setAttribute("transform", `rotate(${i * 6}, 150, 150)`);
                greenTicksGroup.appendChild(line);
            }

            for (let i = greenTicks; i < totalTicks; i++) {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", "150");
                line.setAttribute("y1", "10");
                line.setAttribute("x2", "150");
                line.setAttribute("y2", "30");
                line.setAttribute("transform", `rotate(${i * 6}, 150, 150)`);
                greyTicksGroup.appendChild(line);
            }
        }

        animate();
    }

    animateChart(58);
});
