import React, { useRef, useEffect } from 'react';

const PieChart = ({ data, colors }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const total = data.reduce((acc, value) => acc + value, 0);
        let startAngle = 0;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10; // Radius adjusted for padding

        data.forEach((value, index) => {
            const sliceAngle = (value / total) * 2 * Math.PI;
            const endAngle = startAngle + sliceAngle;
            context.beginPath();
            context.moveTo(centerX, centerY); // center of the pie
            context.arc(centerX, centerY, radius, startAngle, endAngle);
            context.closePath();
            context.fillStyle = colors[index];
            context.fill();
            startAngle = endAngle;
        });
    }, [data, colors]);

    return <canvas ref={canvasRef} width="250" height="250"></canvas>;
};

export default PieChart;
