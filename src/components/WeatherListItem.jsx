import PropTypes from "prop-types";

const WeatherListItem = ({ index, date, gradient, wList, iconurl }) => {
  return (
    <div
      className="weather-list-item"
      style={{
        background: `linear-gradient(to right ${gradient} )`,
      }}
      key={index}
    >
      <div>
        <p>
          {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
        </p>
        <p>
          {" "}
          {date.getHours().toString().padStart(2, "0")}:
          {date.getMinutes().toString().padStart(2, "0")}
        </p>
      </div>

      <div>
        <p>{wList.weather[0].main}</p>
        <p>{wList.weather[0].description}</p>
      </div>

      <p>{Math.round(wList.main.temp - 273)}°</p>
      <p>feels like {Math.round(wList.main.feels_like - 273)}°</p>
      <p>wind speed {wList.wind.speed}</p>
      <img src={iconurl} className="weather-icon" />
    </div>
  );
};

WeatherListItem.propTypes = {
  index: PropTypes.number.isRequired,
  date: PropTypes.oneOf(Date).isRequired,
  gradient: PropTypes.string.isRequired,
  wList: PropTypes.object.isRequired,
  iconurl: PropTypes.string.isRequired,
};

export default WeatherListItem;
