import PropTypes from "prop-types";
import { format } from "date-fns";

export const WeatherItem = ({ icon, date, temp }) => (
	<div>
		<span className="item__date">{format(date, "HH:MM")}</span>
		<span className="item__icon">
			<img src={`http://openweathermap.org/img/w/${icon}.png`} alt="Weather icon" />
		</span>
		<span className="item__temp">{temp}</span>
		<style jsx>{`
			display: grid;
			grid-template-rows: repeat(3, min-content);
			grid-template-columns: 1fr;
			justify-items: center;
			grid-row-gap: 2rem;

			.item__date {
				font-weight: 700;
				font-size: 1.8rem;
				display: block;
			}

			.item__icon {
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.item__temp {
				font-weight: 700;
				font-size: 1.8rem;
				display: block;
			}

			.item__temp::after {
				content: "°";
				vertical-align: text-top;
				display: inline-block;
			}
		`}</style>
	</div>
);

WeatherItem.propTypes = {
	icon: PropTypes.node.isRequired,
	date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	temp: PropTypes.number.isRequired,
};
