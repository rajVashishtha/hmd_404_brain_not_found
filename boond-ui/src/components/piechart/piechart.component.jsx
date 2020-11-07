import ReactApexChart from 'react-apexcharts';
import React from 'react';

class PieChart extends React.Component{

    render() {
        const {data,  size, onClickHandler} = this.props;
        const options = {
              chart: {
                  type: 'polarArea',
                  events:{
                      legendClick:(chartC, seriesIndex, config)=>{onClickHandler(seriesIndex)},
                      markerClick:(event, chartC, content)=>{onClickHandler(content.seriesIndex)},
                      dataPointSelection:(event, chartC, config)=>{onClickHandler(config.dataPointIndex)}
                  }
              },
              stroke: {
                colors: ['#232531']
              },
              labels:["A+ ","A- ","B+ ","B- ","AB+ ","AB- ","O+ ","O- "],
              fill: {
                opacity: 0.9,
                  colors:["#F33237","#EB2A2F","#E82126","#E6151B","#E4070E","#CF0007","#B50006","#9E0207"]
              },
            legend:{
              showForZeroSeries: true,
                labels:{
                  colors:"white"
                },
                markers:{
                  fillColors:["#F33237","#EB2A2F","#E82126","#E6151B","#E4070E","#CF0007","#B50006","#9E0207"],
                }
            },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'center',
                      showForNullSeries:false,
                      labels:{
                        useSeriesColors: true
                      }
                  }
                }
              }],

        };
        return (
            <ReactApexChart options={options} series={data} type="polarArea" width={500} />
        );
    }
}

export default PieChart;
