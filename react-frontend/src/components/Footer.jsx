import React from "react";
import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import constants from "../constants.js";

function Footer() {
	return (
		<footer>
			<div className="icon-grp">
				<a href={constants.social.gh} target="_blank">
					<FaGithub />
				</a>
				<a href={constants.social.ig} target="_blank">
					<FaInstagram />
				</a>
				<a href={constants.social.yt} target="_blank">
					<FaYoutube />
				</a>
			</div>
		</footer>
	);
}

export default Footer;
