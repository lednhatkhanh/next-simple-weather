export const Spinner = () => (
	<div>
		<div className="lds-ring">
			<div />
			<div />
			<div />
			<div />
		</div>
		<style jsx>{`
			.lds-ring {
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				width: 10rem;
				height: 10rem;
			}
			.lds-ring div {
				box-sizing: border-box;
				display: block;
				position: absolute;
				width: 51px;
				height: 51px;
				margin: 6px;
				border: 6px solid #fff;
				border-radius: 50%;
				animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
				border-color: #fff transparent transparent transparent;
			}
			.lds-ring div:nth-child(1) {
				animation-delay: -0.45s;
			}
			.lds-ring div:nth-child(2) {
				animation-delay: -0.3s;
			}
			.lds-ring div:nth-child(3) {
				animation-delay: -0.15s;
			}
			@keyframes lds-ring {
				0% {
					transform: rotate(0deg);
				}
				100% {
					transform: rotate(360deg);
				}
			}
		`}</style>
	</div>
);
