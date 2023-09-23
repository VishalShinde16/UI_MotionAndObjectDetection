import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );



const BarChart = () => {

    const data = {
        labels: [2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018],
        datasets: [
            {
                label: 'Total Carcasses',
                data:[30,3,118,96,113,113,111,202,155,123,84,74,136,72],
                backgroundColor:'#3a651e',
                borderColoro:'black',
                borderWidth:1,
            },
            {
                label: 'Illegal Carcasses',
                data:[4,1,20,29,26,27,18,20,6,18,16,9,12,5],
                backgroundColor:'#abde02',
                borderColoro:'black',
                borderWidth:1,
            },

        ]
    }

    const options = {
        plugins: {
            title: {
              display: true,
              text: 'Total and Illegal number of cacasses - MYS', // Title for the entire chart
              font:{
                size:18,
                weight:400
            } 
            },
            legend: {
                display: true,
                position: 'bottom', // Display legend below the chart

            },

          },
          scales: {
            y: {
              beginAtZero: true, // You can adjust this as needed
              title: {
                display: true,
                text: 'Number Of Carcasses', // Your y-axis label
                font:{
                    size:16
                } 
              }
            },
          },
        responsive: true,
        maintainAspectRatio: false,
        
    }

  return (
    <div>
      <Bar
        style={{width:'80vw',height:'80vh',marginTop:'1rem'}}    
        data={data}
        options = {options}
      >

      </Bar>
    </div>
  )
}

export default BarChart
