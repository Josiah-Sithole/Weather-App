//default import 
import React from 'react';
import './App.css';

//Bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

//weather icons here:git project https://github.com/erikflowers/weather-icons
import 'weather-icons/css/weather-icons.css';

//rendered components
import Form from './Components/Form';
import Weather from './Components/Weather';

//custom css
import './style.css'; 

//Inorder to get current weather use the API link below:
//api.openweathermap.org/data/2.5/weather?q=London,uk&appid=
const Api_Key = "30536aad247ff74e085cc1724ca2bc1a";

//default values for on the state are set to undefined 
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "bi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }
//ID numbers for (Rain,Snow Thunderstom etc) are specified on the weather ApI website 
//for more info:https://openweathermap.org/guide
  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }
//calculating celcius
  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }
//get-weather method and fetching the data from the API call syncronously
  getWeather = async e => {
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

//the fetch() function will map the API call  
    if (country && city) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
      );

//this will convert all the data into JSON format      
      const response = await api_call.json();
      //console.log(response);  

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        main: response.weather[0].main,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });

      // seting icons and specifying its object
      //depending on the weather the Api will display a different icon
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

      //console.log(response);
    } else {
      this.setState({
        error: true
      });
    }
  };
  
  //form and weather components are called in the return statement 
  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather
          cityname={this.state.city}
          weatherIcon={this.state.icon}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
        />
      </div>
    );
  }
}

export default App;