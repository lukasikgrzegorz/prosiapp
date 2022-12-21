import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button/Button";
import css from "./Login.module.css";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onLogin = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				navigate("/");
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	};

	return (
		<>
			<main>
				<section>
					<Logo />
					<div>
						<form className={css["form"]}>
							<div>
								<input
									id="email-address"
									name="email"
									type="email"
									required
									placeholder="Email address"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div>
								<input
									id="password"
									name="password"
									type="password"
									required
									placeholder="Password"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							<div>
								<Button value={"Login"} onClickHandler={onLogin} />
							</div>
						</form>

						<p className={css["text-wrapper"]}>
							No account yet? <NavLink to="/signup">Sign up</NavLink>
						</p>
					</div>
				</section>
			</main>
		</>
	);
};

export default Login;
