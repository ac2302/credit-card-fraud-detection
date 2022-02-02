import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./components/HomePage.jsx";
import LaunchPage from "./components/LaunchPage.jsx";

function App() {
	return (
		<Router>
			{/* font */}
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link
				rel="preconnect"
				href="https://fonts.gstatic.com"
				crossOrigin="true"
			/>
			<link
				href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
				rel="stylesheet"
			/>

			<Navbar />

			<main>
				<Switch>
					<Route path="/" exact>
						<HomePage />
					</Route>
					<Route path="/predict" exact>
						<LaunchPage />
					</Route>
				</Switch>
			</main>

			<Footer />
		</Router>
	);
}

export default App;
