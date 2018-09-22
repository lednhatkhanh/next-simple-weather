import PropTypes from "prop-types";

export const Card = ({ children }) => (
	<div>
		{children}
		<style jsx>{`
			width: 50rem;
			height: 50rem;
			background-color: #fff;
			border-radius: 0.4rem;
			padding: 2rem;
			box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.2);
			font-size: 1.6rem;
		`}</style>
	</div>
);

Card.propTypes = {
	children: PropTypes.node.isRequired,
};
