import React from "react";
import ReactMarkdown from "react-markdown";
import "./HomePage.css";

function HomePage() {
	const markdown = `
# Credit Card Fraud Detection
### by Aryan, Anurag and Gautam
---------------------------------
One of the biggest and most prominent frauds in the field of finance is the credit card fraud.


This fraud every year drains millions of dollars out of peoples pockets and yet no one can do anything about it.


These frauds are software based and often go into the system unnoticed(i.e. without raising alert).


But relax everyone , we at IEEE have come up with a unique solution of preventing these frauds from happening in the first place.


With the help of ML we are working on a mechanism that detects these fraudulent transactions and reports it to the system.
	`;

	return (
		<>
			<Banner />
			<div className="homepage-main-container">
				<ReactMarkdown>{markdown}</ReactMarkdown>
			</div>
			;
		</>
	);
}

function Banner() {
	return (
		<div className="homepage-banner">
			<h1>Credit Card Fraud Detection</h1>
			<h2>using sklearn, flask and react</h2>
			<button
				onClick={() => {
					window.location = "/predict";
				}}
			>
				make predictions
			</button>
		</div>
	);
}

export default HomePage;
