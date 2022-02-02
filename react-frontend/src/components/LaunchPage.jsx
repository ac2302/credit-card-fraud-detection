import React, { useState, useEffect } from "react";
import "./LaunchPage.css";
import axios from "axios";

const backendLocation = "https://cc-fraud-model-api.aryansdomain.com";
// const backendLocation = "http://localhost:5000";

function LaunchPage() {
	const [resultId, setResultId] = useState(false);

	return (
		<div className={"launch-container"}>
			<h1>make predictions</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();

					const formData = new FormData(e.target);
					console.log(formData);

					axios
						.post(`${backendLocation}/predict`, formData, {
							headers: {
								"Content-Type": "multipart/form-data",
							},
						})
						.then((res) => {
							if (res.data.predictions) setResultId(res.data.predictions);
							else {
								console.error(res);
								setResultId(res.data.error);
							}
						})
						.catch((err) => console.error(err));
				}}
			>
				<label htmlFor="data">input csv</label>
				<input type="file" name="data" id="data" className="file" />
				<input type="submit" id="launch-btn" />
			</form>

			<Result resultId={resultId} />
			<Gist resultid={resultId} />

			<SinglePrediction />
		</div>
	);
}

function SinglePrediction() {
	const [show, setShow] = useState(false);
	const [vector, setVector] = useState(
		"7610,0.725645739819857,2.30089443776603,-5.32997618300917,4.007682804682,-1.73041059025206,-1.73219256822244,-3.96859261813707,1.06372815344105,-0.486096552344833,-4.62498495406596,5.5887239146762,-7.14824263637845,1.68045074096412,-6.21025774661028,0.495282117814298,-3.5995402092184,-4.83032424210571,-0.649090120211694,2.2501232487881,0.504646226103286,0.589669127323198,0.109541319229913,0.601045276521079,-0.364700278220039,-1.84307769215194,0.351909298434892,0.594549978086464,0.0993722360416487,1"
	);
	const [prediction, setPrediction] = useState(null);

	return (
		<div className="sp-container">
			{!show && (
				<button
					onClick={() => {
						setShow(true);
					}}
				>
					make singular prediction
				</button>
			)}
			{show && (
				<>
					<label htmlFor="sp-input">input variables seperated by ','</label>
					<textarea
						id="sp-input"
						onChange={(e) => {
							setVector(e.target.value);
						}}
					>
						{vector}
					</textarea>
					<button
						onClick={() => {
							let reqbody = {
								vectors: [vector.split(",").map((element) => Number(element))],
							};

							axios
								.post(`${backendLocation}/predict-vectors`, reqbody)
								.then((res) => {
									setPrediction(res.data[0]);
								})
								.catch((err) => {
									console.error(err);
								});
						}}
					>
						predict
					</button>

					{prediction && <div className="sp-output">result: {prediction}</div>}
				</>
			)}
		</div>
	);
}

function Result({ resultId }) {
	if (resultId) {
		return isNaN(resultId) ? (
			<span className="result">{resultId}</span>
		) : (
			<a
				className="result"
				target="_blank"
				href={`${backendLocation}/result/${resultId}.csv`}
			>
				download result
			</a>
		);
	} else return null;
}

function Gist({ resultid }) {
	const [gists, setGists] = useState([]);
	useEffect(() => {
		axios
			.get(`${backendLocation}/result/frauds/${resultid}`)
			.then((res) => {
				setGists(res.data);
			})
			.catch(() => setGists([]));
	}, [resultid]);

	if (gists.length !== 0)
		return (
			<>
				<h2>gist of frauds</h2>
				<table>
					<thead>
						<tr>
							<th>account name</th>
							<th>amount</th>
						</tr>
					</thead>
					<tbody>
						{gists.map((gist) => (
							<tr key={`${gist.acc_name}+${gist.amount}+${Math.random()}`}>
								<td>{gist.acc_name}</td>
								<td>$ {gist.amount}</td>
							</tr>
						))}
					</tbody>
				</table>
			</>
		);
	else return null;
}

export default LaunchPage;
