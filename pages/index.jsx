import React from "react";
import fetch from "isomorphic-unfetch";
import { parse, isSameDay, getTime, format } from "date-fns";

import { Layout } from "../src/components/Layout";
import { Root } from "../src/components/Root";
import { Card } from "../src/components/Card";
import { WeatherItem } from "../src/components/WeatherItem";

export default class IndexPage extends React.PureComponent {
	state = {
		lat: 15.9828152,
		lon: 108.1640954,
		forecast: [],
		city: "",
		country: "",
		temp: 0,
		type: "Fahrenheit",
		weather: "",
		loading: false,
	};

	componentDidMount() {
		this.getWeatherData();
		if (navigator && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					const { latitude, longitude } = position.coords;

					if (latitude !== this.state.lat || longitude !== this.state.lon) {
						this.setState(
							{
								lat: latitude,
								lon: longitude,
							},
							this.getWeatherData,
						);
					}
				},
				() => {},
				{
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
					<Card backgroundParam={this.state.weather} loading={this.state.loading}>
						<span className="card__top">
							<h1 className="card__city">{this.state.city}</h1>
							<span className="card__subtitle">
								{this.state.country}, {format(new Date(), "MMM DD YYYY")}
							</span>
							<h1 className="card__temp">
								<span className="card__temp-text">
									{this.getFormattedTemp(this.state.temp)}
								</span>
								<span className="card__temp-unit" onClick={this.toggleTempType}>
									{this.state.type === "Celsius" ? "C" : "F"}
								</span>
							</h1>
							<span className="card__weather">Sunny</span>
						</span>
						{this.state.forecast.length > 0 && (
							<div className="card__forecast-list list">
								{this.state.forecast.map((item, index) => (
									<WeatherItem
										key={item.id}
										date={item.date}
										temp={this.getFormattedTemp(item.temp)}
										icon={item.icon}
									/>
								))}
							</div>
						)}
						<style jsx>{`
							.card__top {
								display: grid;
								grid-template-columns: 1fr max-content;
								grid-template-rows: repeat(2, auto);
								align-items: end;
								justify-content: start;
								grid-row-gap: 1rem;
							}

							.card__city {
								font-size: 4rem;
								grid-column: 1 / 2;
								grid-row: 1 / 2;
							}

							.card__subtitle {
							}

							.card__temp {
								font-size: 4rem;
								grid-column: 2 / -1;
								grid-row: 1 / 2;
								justify-self: end;
							}

							.card__temp-text::after {
								content: "°";
								vertical-align: text-top;
								display: inline-block;
							}

							.card__temp-unit {
								opacity: 0.7;
								transition: opacity 0.2s ease-in-out;
								cursor: pointer;
								text-transform: uppercase;
							}

							.card__temp-unit:hover {
								opacity: 1;
							}

							.card__weather {
								justify-self: end;
								text-transform: uppercase;
							}

							.card__forecast-list {
								background-color: rgba(40, 180, 133, 0.8);
								padding: 2rem;
								border-radius: 0.6rem;
								justify-self: end;

								display: grid;
								grid-template-columns: repeat(${this.state.forecast.length}, 1fr);
								grid-template-rows: 1fr;
								grid-column-gap: 2rem;
							}
						`}</style>
					</Card>
				</Root>
			</Layout>
		);
	}

	toggleTempType = () => {
		this.setState(({ type }) => ({
			type: type === "Celsius" ? "Fahrenheit" : "Celsius",
		}));
	};

	getFormattedTemp = K => {
		if (this.state.type === "Celsius") {
			return parseInt(K - 273);
		}
		return parseInt((9 / 5) * (K - 273) + 32);
	};

	getWeatherData = () => {
		this.setState(
			{
				loading: true,
			},
			async () => {
				await this.getCurrrentWeather();
				await this.getWeatherForecast();
				this.setState({
					loading: false,
				});
			},
		);
	};

	getCurrrentWeather = async () => {
		const { lat, lon } = this.state;
		const { OPEN_WEATHER_API_KEY } = process.env;
		if (OPEN_WEATHER_API_KEY) {
			const result = await fetch(
				`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`,
			);
			const data = await result.json();
			const {
				sys: { country },
				main: { temp },
			} = data;
			const city = data.name;
			const weather = data.weather[0].main;
			this.setState({
				city,
				country,
				temp,
				weather,
			});
		}
	};

	getWeatherForecast = async () => {
		const { lat, lon } = this.state;
		const { OPEN_WEATHER_API_KEY } = process.env;
		if (OPEN_WEATHER_API_KEY) {
			const result = await fetch(
				`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`,
			);
			const data = await result.json();
			const { list } = data;

			const today = parse(new Date());
			let i = 0;
			this.setState(
				{
					forecast: [],
				},
				() => {
					while (isSameDay(parse(list[i].dt_txt), today)) {
						const weatherData = list[i];
						const date = getTime(list[i].dt_txt);
						const { temp } = weatherData.main;
						const weather = weatherData.weather[0].main;
						const icon = weatherData.weather[0].icon;
						this.setState(({ forecast }) => ({
							forecast: [
								...forecast,
								{
									id: date,
									date,
									temp,
									weather,
									icon,
								},
							],
						}));
						if (i >= 5) {
							return;
						}
						i++;
					}
				},
			);
		}
	};
}
