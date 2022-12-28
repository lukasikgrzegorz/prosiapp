import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";
import Loader from "../../components/Loader/Loader";
import css from "./Signup.module.css";

const Signup = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoadnig] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async (e) => {
		setIsLoadnig(true);
		e.preventDefault();
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user);
				navigate("/login");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			})
			.finally(() => {
				setIsLoadnig(false);
			});
	};

	return (
		<>
			{isLoading && <Loader />}
			<main>
				<section>
					<div className={css["wrapper"]}>
						<Logo />
						<div>
							<div>
								<form className={css["form"]}>
									<div>
										<input
											type="email"
											label="Email address"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
											placeholder="Email address"
										/>
									</div>

									<div>
										<input
											type="password"
											label="Create password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
											placeholder="Password"
										/>
									</div>

									<Button value={"Sign up"} onClickHandler={onSubmit} />
								</form>

								<p className={css["text-wrapper"]}>
									Already have an account? <NavLink to="/login">Sign in</NavLink>
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default Signup;
