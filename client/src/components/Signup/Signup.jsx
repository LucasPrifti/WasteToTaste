import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";


// Registration Component, state for form data and error
const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");


    //Handling form changes & submission
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: resData } = await axios.post(url, data); // resData contains the response body
			setMsg(resData); // Assuming the server sends back a plain string as success message
			setError(''); // Clear any previous error messages
		} 
		catch (error) {
			if (error.response) {
				const { status, data } = error.response;
				if (status === 400) {
					// Adjust this part according to the actual structure of your error response
					setError(data);
				} else if (status === 409) {
					setError("The selected email is already in use. Please use a different email.");
				} else {
					setError("Unexpected error. Please try again later.");
				}
			} else {
				setError("Network error. Please try again later.");
			}
			setMsg(''); // Clear any previous success messages
		}
	};
	

    //HTML for user end of Registration Page

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.right}>
					<h1>Waste to Taste</h1>
					<h2>Already have an account?</h2>
				<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in Here
						</button>
					</Link>
				</div>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>			
						<p className={styles.password_requirements}>
    						Password must contain at least: <br />1 Uppercase letter, 1 lowercase letter, 1 number and 1 symbol.
						</p>
						{error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>}

						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;