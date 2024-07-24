import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [description, setDescription] = useState("");

	const maxCharacters = 300;

	const handleChangeFeedback = (event) => {
		if (event.target.value.length <= maxCharacters) {
			setDescription(event.target.value);
		}
	};

	const charactersLeft = maxCharacters - description.length;

	const handleClick = () => {
		actions.feedback(email, description);
	};

	return (
		<>
			<footer>
				<p>© 2024 Hoop Legend Sneakers. All rights reserved.</p>
				<ul>
					<li><a href="#">Privacy Policy</a></li>
					<li><a href="#">Terms of Service</a></li>
					<li><a href="#">About Us</a></li>
					<Link to="/feedback">
						<li><a data-bs-toggle="modal" data-bs-target="#staticBackdrop">Feedback</a></li>
					</Link>
				</ul>
			</footer>
			<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="staticBackdropLabel">Feedback</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<div className="mb-3">
								<label htmlFor="feedbackEmail" className="form-label">Email</label>
								<input
									type="email"
									className="form-control"
									id="feedbackEmail"
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="exampleFormControlTextarea1" className="form-label">Enter your feedback</label>
								<textarea
									className="form-control"
									id="exampleFormControlTextarea1"
									rows="3"
									value={description}
									onChange={handleChangeFeedback}
								></textarea>
								<small className="text-muted">{charactersLeft} characters left</small>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>Submit</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
