import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function TaskChart({ todos }) {
  const categoryCount = todos.reduce((acc, todo) => {
    acc[todo.category] = (acc[todo.category] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryCount),
    datasets: [
      {
        label: 'Number of Tasks',
        data: Object.values(categoryCount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tasks by Category',
      },
    },
  };

  return <Bar options={options} data={data} />;
}

export default TaskChart;