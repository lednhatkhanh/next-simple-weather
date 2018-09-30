import PropTypes from "prop-types";

export const Root = ({ children }) => (
	<div>
		{children}
		<style jsx>{`
			background-color: #f4f4f4;
			min-height: 100vh;
			display: grid;
			align-content: center;
			justify-content: center;
		`}</style>
	</div>
);

Root.propTypes = {
	children: PropTypes.node,
};

Root.defaultProps = {
	children: null,
};
