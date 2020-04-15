//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> Additional
// Chart
import { Radar } from "react-chartjs-2";

class ResultChart extends React.Component {
  state = {
    dataRadarOptions: {
      responsive: true,
      elements: {
        line: {
          tension: 0.2,
        },
      },
      legend: {
        display: false,
      },
      scale: {
        pointLabels: {
          fontSize: 16,
          display: this.props.hideLabels ? false : true,
          fontFamily: "Roboto",
        },
        ticks: {
          beginAtZero: true,
          display: false,
          max: 100,
          min: 0,
          stepSize: 20,
        },
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
      },
    },
    dataRadarPlugins: [
      {
        beforeInit: function (chart) {
          chart.data.labels.forEach(function (e, i, a) {
            if (/\n/.test(e)) {
              a[i] = e.split(/\n/);
            }
          });
        },
      },
    ],
  };

  getChart = () => {
    if (this.props.data) {
      let labels, data;
      labels = [];
      data = [];

      // Get value and label
      Object.keys(this.props.data).map((keyName, i) => {
        labels.push(this.props.data[keyName].name);
        data.push(this.props.data[keyName].value);
      });

      // Set data radar chart
      this.setState({
        dataRadar: {
          labels,
          datasets: [
            {
              label: "# of Votes",
              data,
              backgroundColor: ["rgba(246, 26, 66, 0.2)"],
              borderColor: ["rgba(246, 26, 66, 1)"],
              borderWidth: 1,
            },
          ],
        },
      });
    }
  };

  render() {
    if (this.state.dataRadar) {
      return (
        <Radar
          data={this.state.dataRadar}
          options={this.state.dataRadarOptions}
          plugins={this.state.dataRadarPlugins}
        />
      );
    } else {
      this.getChart();
      return null;
    }
  }
}

export default ResultChart;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */
