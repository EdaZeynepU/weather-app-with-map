import PropTypes from "prop-types";


const apiKey = "2183f46ee5d8c23c3290ac7cd4433027";

const API = {
    getWeather: async (location) => {
            console.log(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${location[0]}&lon=${location[1]}&appid=2183f46ee5d8c23c3290ac7cd4433027`
            );
          
            const resp = await fetch(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${location[0]}&lon=${location[1]}&appid=${apiKey}`
            );
            const data = await resp.json();
            console.log(data);
            return data
          }
}

API.propTypes = {
    setLocation: PropTypes.func,
};  

export default API
