import PropTypes from "prop-types";

const API = {
    getWeather: async (location) => {
            const resp = await fetch(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${location[0]}&lon=${location[1]}&appid=${import.meta.env.VITE_API_KEY}`
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
