import React, {Component} from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from './components/Card';
import Grid from "@mui/material/Grid"
import MenuAppBar from './components/MenuAppBar.tsx';
import ChartPopup from './components/ChartPopup.js';
import { styled, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none"
    }
  }
});


class App extends Component
{
  constructor(props){
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      openPopup: "",
      defaultRadioButtonValue: 0,
    }
  }
  intervalID;

  componentDidMount(){
    this.getData();
    this.intervalID = setInterval(this.getData, 2000);
  }

  closePopup()
  {
    this.setState({openPopup: ""});
    this.intervalID = setInterval(this.getData, 2000);
  }

  openPopup(value, defaultRadioButtonVal)
  {
    clearInterval(this.intervalID);
    this.setState({openPopup: value, defaultRadioButtonValue: defaultRadioButtonVal});
  }

  getData = () => {
    fetch('https://localhost:5001/RawDataAPI/GetDashboardData')
        .then(res => res.json())
        .then(json => {
            this.setState({
                items: json,
                isLoaded: true,
            })
        });
  }

  render(){
    var {isLoaded, items} = this.state;
    if(!isLoaded)
    {
      return <div>Loading.....</div>
    }
    else{
      return (
        <div className="App">
          <MenuAppBar/>
          <ThemeProvider theme={theme}>
          
          <Container sx = {{paddingTop: 2}}>
            {/* <h4>Logged at: {items.loggedAt}</h4> */}
            <Grid >
              <Button onClick={() => this.openPopup("avgSolarOutputWatts", 0) }>
                <Card Value={items.currentSolarOutputWatts} Color="green" Unit={items.currentSolarOutputWattsUnit} Heading = "Current Solar Output"/>
              </Button>

              <Button onClick={() => this.openPopup("avgLoadWatts", 0) }>
                <Card Value={items.currentLoadWatts} Color="red" Unit={items.currentLoadWattsUnit} Heading = "Current Load"/>
              </Button>

              <Button onClick={() => this.openPopup("solarGeneratedWh" , 2) }>
                <Card Value={items.powerGeneratedThisMonth} Color="green" Unit={items.powerGeneratedThisMonthUnit} Heading = "Power Generated This Month"/>
              </Button>

              <Button onClick={() => this.openPopup("powerConsumedWh", 2) }>
                <Card Value={items.powerConsumedThisMonth} Color="red" Unit={items.powerConsumedThisMonthUnit} Heading = "Power Consumed This Month"/>
              </Button>

              <Button onClick={() => this.openPopup("solarGeneratedWh", 1) }>
                <Card Value={items.powerGeneratedToday} Color="green" Unit={items.powerGeneratedTodayUnit} Heading = "Power Generated Today"/>
              </Button>

              <Button onClick={() => this.openPopup("powerConsumedWh", 1) }>
                <Card Value={items.powerConsumedToday} Color="red" Unit={items.powerConsumedTodayUnit} Heading = "Power Consumed Today"/>
              </Button>

              <Button onClick={() => this.openPopup("solarGeneratedWh", 2) }>
                <Card Value={items.powerGeneratedPerDay} Color="green" Unit={items.powerGeneratedPerDayUnit} Heading = "Power Generated Per Day"/>
              </Button>

              <Button onClick={() => this.openPopup("powerConsumedWh", 2) }>
                <Card Value={items.powerConsumedPerDay} Color="red" Unit={items.powerConsumedPerDayUnit} Heading = "Power Consumed Per Day"/>
              </Button>

              <Button onClick={() => this.openPopup("inputbatteryPerc", 0) }>
                <Card Value={items.batteryPerc} Unit={items.batteryPercUnit} Heading = "Battery"/>
              </Button>

              <Button onClick={() => this.openPopup("", 0) }>
                <Card Value={items.powerSource} Unit="" Heading = "Power Source"/>
              </Button>
            </Grid>
            
          </Container>
          </ThemeProvider>
          <ChartPopup trigger= {this.state.openPopup} defaultRadioButtonValue= {this.state.defaultRadioButtonValue} setCloseTrigger = {this} >
            <h3>My Popup</h3>
          </ChartPopup>
        </div>
      );
    }
  }
}

export default App;