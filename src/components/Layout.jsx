import Head from "next/head";

export const Layout = ({ children, title }) => (
	<>
		<Head>
			<link
				href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,500,700"
				rel="stylesheet"
			/>
			<meta charSet="utf-8" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, viewport-fit=cover"
			/>
			<title>{title || "Weather App"}</title>
			<meta name="description" content="An simple weather app" />
		</Head>
		{children}
		<style jsx global>{`
			*,
			*::before,
			*::after {
				margin: 0;
				padding: 0;
				box-sizing: inherit;
			}

			html {
				font-size: 62.5%;
				box-sizing: border-box;
			}

			body {
				font-family: Roboto, sans-serif;
			}
		`}</style>
	</>
);
