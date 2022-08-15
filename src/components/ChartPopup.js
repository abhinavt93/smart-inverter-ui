import React, { Component } from 'react';
import { Button } from '@mui/material';
import './ChartPopup.css'
import CloseIcon from '@mui/icons-material/Close';
// import {Chart, ArcElement} from 'chart.js'
import { Line } from 'react-chartjs-2';
import RowRadioButtonsGroup from './RowRadioButtonsGroup.tsx';
import Chart from 'chart.js/auto';
class ChartPopup extends Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            graphData: [],
            isLoaded: false,
        }
    }

    intervalID = 0;
    
    componentDidUpdate(prevProps)
    {
        if(this.props.trigger !== "" && prevProps.trigger !== this.props.trigger)
        {
            this.setState({inputSelected: this.props.defaultRadioButtonValue});
            this.getData();
            this.intervalID = setInterval(this.getData, 2000);
        }
    }

    getData = () =>
    {
        fetch('https://localhost:5001/RawDataAPI/GetGraphData?input=' + this.props.trigger)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    graphData: json,
                    isLoaded: true
                })
        });
    }

    getLastHourChart()
    {
        const {inputSelected} = this.state;
        return (this.state.isLoaded) ? (
            <Line 
                data= {{
                    labels: this.state.graphData[inputSelected].label,
                    datasets: 
                    [
                        {
                            label: this.state.graphData[inputSelected].titleMain,
                            data: this.state.graphData[inputSelected].dataMain,
                            borderWidth: 5,
                            //borderColor: 'rgb(75, 192, 192)',
                            borderColor: '#1E731D',
                            fill: false,
                            tension: 0.1
                        },
                        
                        {
                            label: this.state.graphData[inputSelected].titleSecondary,
                            data: this.state.graphData[inputSelected].dataSecondary,
                            borderWidth: 5,
                            //borderColor: 'rgb(75, 192, 192)',
                            borderColor: '#921313',
                            fill: false,
                            tension: 0.1
                        }
                    ],
                }}

                    height={400}
                    width={70}
                    options=
                    {{
                        maintainAspectRatio: false,
                        scales: 
                        {
                            yAxes: 
                            [
                                {
                                    ticks: 
                                    {
                                        beginAtZero: true,
                                    },
                                },
                            ],
                        },
                        legend: 
                        {
                            labels: 
                            {
                                fontSize: 25,
                            },
                        },
                        elements: {
                            point:
                            {
                                radius: 0
                            }
                        },
                    }}
            />
        )
        : "Loading..."; 
    } 
    
    onRadioButtonClick(value)
    {
        this.setState({inputSelected: value});
    }

    onCloseButtonClick()
    {
        clearInterval(this.intervalID);
        this.setState({
            inputSelected: 0,
            graphData: [],
            isLoaded: false,
        });
        this.props.setCloseTrigger.closePopup();
    }

    render(){
        return (this.props.trigger !== "") ? (
            
            <div className='chartPopup'>
                
                <div className='chartPopup-inner'>
                    
                    <Button onClick={() => this.onCloseButtonClick()} className='close-button'><CloseIcon/></Button>
                </div>
                
                <div className='chartCanvas'>
                    {this.getLastHourChart()}
                </div>
                <div className='radioButton'>
                    <RowRadioButtonsGroup handleChange={this} defaultValue={this.props.defaultRadioButtonValue}/>
                </div>
                
            </div>
            ) : "";
    }

}

export default ChartPopup;