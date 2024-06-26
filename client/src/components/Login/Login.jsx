import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";


// Receiving user information, handling changes and submission.
const Login = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const [error, setError] = useState("");
	
	const navigate = useNavigate();
    

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    // Catching and preventing Errors

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			localStorage.setItem("user", data.email); 
			  // Check role and redirect accordingly
			  if (res.role === 'admin') {
                navigate("/AdminDashboard"); // Redirect to AdminDashboard
				window.location.reload();
            } else {
                navigate("/view-profile"); // Redirect to regular user profile
				window.location.reload();
            }
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

    //HTML for user end of Login

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Waste To Taste</h1>
						<h2>Log in Below</h2>
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
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
						<Link to="/forgot-password">
						<p className={styles.password_requirements}> Forgot Password? Click Here </p>
						</Link>
					</form>
				</div>
				<div className={styles.right}>
                <h1>New User?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign up Here
						</button>
					
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;