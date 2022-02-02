import React from "react";
import atharvaIeeeLogo from "../assets/atharva-ieee-cropped.png";

function Navbar() {
	return (
		<nav>
			<a href="/">
				<img src={atharvaIeeeLogo} className="icon" />
			</a>
		</nav>
	);
}

export default Navbar;
