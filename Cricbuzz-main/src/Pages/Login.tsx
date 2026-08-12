import { useState } from "react";
import { loginAdmin } from "../services/adminservice";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const {login} = useAuth()
    const navigate= useNavigate()
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setError("");
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!formData.email.trim() || !formData.password.trim()) {
            setError("Email and password are required");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await loginAdmin({
                email: formData.email,
                password: formData.password
            });


            //alert("Login successful");
            login(response.token,response.role)

             navigate("/");
         
        } catch (error) {
            console.error("Login Error:", error);
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="login-container">
            <section className="login-card">

                <h1 className="login-title">
                    Login
                </h1>

                <p className="login-subtitle">
                    Login to your Admin Account
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="login-form-group">
                        <label className="login-form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="login-form-input"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="login-form-group">
                        <label className="login-form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="login-form-input"
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

            </section>
        </main>
    );
}

export default Login;