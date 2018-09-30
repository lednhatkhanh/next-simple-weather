import PropTypes from "prop-types";
import { Spinner } from "./Spinner";

export const Card = ({ children, backgroundParam, loading }) => (
	<div>
		{loading ? <Spinner /> : children}
		<style jsx>{`
			background: linear-gradient(to right, rgba(126, 213, 111, 0.8), rgba(40, 180, 133, 0.8)),
				url(https://source.unsplash.com/1600x900/?${backgroundParam});
			overflow: hidden;
			background-size: cover;
			background-repeat: no-repeat;
			width: 50vw;
			height: 50vh;
			border-radius: 0.6rem;
			padding: 4rem;
			padding-top: 6rem;
			box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.2);
			font-size: 1.6rem;
			color: #fff;

			display: ${loading ? "flex" : "grid"};
			grid-template-columns: 1fr;
			grid-template-rows: min-content min-content;
			align-content: ${loading ? "center" : "space-between"};
			justify-content: ${loading ? "center" : "start"};
			align-items: ${loading ? "center" : "start"};
		`}</style>
	</div>
);

Card.propTypes = {
	children: PropTypes.node.isRequired,
	backgroundParam: PropTypes.string,
	loading: PropTypes.bool,
};

Card.defaultProps = {
	backgroundParam: "Rain",
	loading: false,
};
