import React, { useRef, useState } from "react";

const Modalform = ({
	closeModal,
	ref,
	checked,
	handleChange,
	shackFunction,
	disable,
	title,
	description,
	price,
	imageUrl,
	location,
	displayNone,
}) => {
	const [state, setState] = useState({
		shackTitle: title,
		shackDescription: description,
		shackPrice: price,
		shackImageUrl: imageUrl,
		shackLocation: location,
	});

	const handleValueChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="modal">
			<div className="modal-backdrop" onClick={() => closeModal()}></div>
			<div className="modal-content">
				<div className="modal-header"></div>
				<div className="modal-body content">
					<form className="form">
						<div className="form-group">
							<div className="label">
								<label>Nom</label>
							</div>
							<div>
								<input
									className="form-control my-2"
									name="shackTitle"
									type="text"
									value={state.shackTitle}
									onChange={handleValueChange}
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="label">
								<label>Price</label>
							</div>
							<div>
								<input
									className="form-control my-2"
									name="shackPrice"
									type="text"
									value={state.shackPrice}
									onChange={handleValueChange}
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="label">
								<label>Description</label>
							</div>
							<div>
								<textarea
									name="shackDescription"
									type="text"
									className="form-control my-2"
									style={{ width: "100%", height: "100px" }}
									value={state.shackDescription}
									onChange={handleValueChange}
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="label">
								<label>ImageUrl</label>
							</div>
							<div>
								<input
									className="form-control my-2"
									name="shackImageUrl"
									type="text"
									value={state.shackImageUrl}
									onChange={handleValueChange}
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="label">
								<label>Location</label>
							</div>
							<div>
								<input
									className="form-control my-2"
									name="shackLocation"
									type="text"
									value={state.shackLocation}
									onChange={handleValueChange}
								></input>
							</div>
						</div>
						{displayNone && (
							<div className="form-group d-flex justify-content-center">
								<div>
									<input
										type="checkbox"
										name="addShackPublished"
										value={checked}
										onChange={handleChange}
										className="my-3 mx-2"
									/>
									Publier cette annonce ?
								</div>
							</div>
						)}
					</form>
				</div>
				<div className="modal-footer">
					<button
						className="btn btn-outline-secondary"
						style={{ marginLeft: "0" }}
						onClick={() => closeModal()}
					>
						Annuler
					</button>
					<button
						disabled={disable}
						className="btn btn-secondary"
						onClick={() => shackFunction(state)}
					>
						{displayNone ? "Ajouter" : "Éditer"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modalform;
