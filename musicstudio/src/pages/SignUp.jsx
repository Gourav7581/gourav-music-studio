import React, { useState } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await api.post(
                "/api/auth/signup",
                formData
            );

            toast.success("Sign Up Successfully 🎉");
            navigate("/login");
            setFormData({
                name: "",
                email: "",
                password: "",
            });
        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Signup Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>🎵 Create Account</h1>

                <form onSubmit={handleSubmit}>
                    <label>YOUR NAME</label>

                    <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <label>EMAIL ADDRESS</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label>PASSWORD</label>

                    <input
                        type="password"
                        name="password"
                        placeholder="******"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Sign Up"}
                    </button>

                </form>
                <div
                    style={{
                        textAlign: "center",
                        marginTop: "20px",
                        color: "#999",
                    }}
                >
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        style={{
                            color: "#1DB954",
                            cursor: "pointer",
                            fontWeight: "600",
                        }}
                    >
                        Login
                    </span>
                </div>
            </div>
        </div>
    );
}
