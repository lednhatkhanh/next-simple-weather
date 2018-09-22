import PropTypes from "prop-types";

export const Root = ({ children, backgroundParams }) => (
	<div>
		{children}
		<style jsx>{`
			background: url(https://source.unsplash.com/1600x900/?${backgroundParams});
			background-size: cover;
			background-repeat: no-repeat;
			min-height: 100vh;
			display: grid;
			align-content: center;
			justify-content: center;
		`}</style>
	</div>
);

Root.propTypes = {
	children: PropTypes.node,
	backgroundParams: PropTypes.string,
};

Root.defaultProps = {
	children: null,
	backgroundParams: "rain",
};
