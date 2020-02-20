//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> Additional
// Chart
import { Radar } from "react-chartjs-2";

class ResultChart extends React.Component{
  state = {
    dataRadarOptions: {
        responsive: true,
        elements: {
            line: {
                tension: 0.4
            }
        },
        legend: {
            display: false,
        },
        scale: {
            ticks: {
                beginAtZero: true,
                max: 10,
                min: 0
            }
        },
        scales: {
            yAxes: [{
                gridLines: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    display: false
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    beginAtZero: true,
                    display: false,
                    stepSize: 1,
                    min: 0,
                    max: 10
                }
            }]
        }
    },
    dataRadarPlugins: [{
        beforeInit: function (chart) {
        chart.data.labels.forEach(function (e, i, a) {
            if (/\n/.test(e)) {
            a[i] = e.split(/\n/)
            }
        })
        }
    }]
  }

  componentDidMount = () => {
    
  }

  getChart = () => {
    if(this.props.data.data){
      console.log("Got data",this.props.data);
      let labels, data;
      labels = [];
      data = [];

      this.props.data.data.map((item) => {
        console.log(item);
      });
      // Set new labels
      this.setState({
        dataRadar: {
          labels: [
            'Große Poren',
            'Sensible Haut',
            'Hautalterung',
            'Ölige Haut',
            'Trockene Haut',
            'Unreine Haut',
            'Pigmentflecken',
            'Zeichen\noxidativen Stresses'
          ],
          datasets: [{
              label: '# of Votes',
              data: [10, 7, 10, 10, 4, 10, 2, 5],
              backgroundColor: [
                  'rgba(246, 26, 66, 0.2)',
              ],
              borderColor: [
                  'rgba(246, 26, 66, 1)',
              ],
              borderWidth: 1
          }]
        },
      });
    }
  }

  render(){
    console.log(this.props, this.state);
    
    if(this.state.dataRadar){
      return(
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
 * Copyright © 2019 Christian Aichner
 */
