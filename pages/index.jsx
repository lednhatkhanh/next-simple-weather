import React from "react";
import fetch from "isomorphic-unfetch";

import { Layout } from "../src/components/Layout";
import { Root } from "../src/components/Root";
import { Card } from "../src/components/Card";

export default class IndexPage extends React.PureComponent {
	state = {
		lat: 0,
		lon: 0,
	};

	componentDidMount() {
		if (navigator && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					const { latitude, longitude } = position.coords;

					this.setState(
						{
							lat: latitude,
							lon: longitude,
						},
						this.getWeatherData,
					);
				},
				error => {
					alert("Failed to get your position, please try again later");
					console.log(error);
				},
				{
					// enableHighAccuracy: true,
					maximumAge: 5 * 60 * 1000,
					timeout: 20 * 1000,
				},
			);
		}
	}

	render() {
		return (
			<Layout>
				<Root>
					<Card>
						<div>Hello World</div>
					</Card>
				</Root>
			</Layout>
		);
	}

	getWeatherData = async () => {
		const { lat, lon } = this.state;
		const { OPEN_WEATHER_API_KEY } = process.env;
		if (lat && lon && OPEN_WEATHER_API_KEY) {
			console.log("yes");
			const result = await fetch(
				`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`,
			);
			const data = await result.json();
			console.log(data);
		}
	};
}
