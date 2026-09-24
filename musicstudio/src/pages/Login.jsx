import React, { useState,useEffect } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usePlayer } from "../context/PlayerContext";
export default function Login() {
    const { clearPlayer } = usePlayer();
useEffect(() => {
  clearPlayer();
}, []);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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
                "/api/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                res.data.token
            );
            navigate("/home");
            toast.success("Login Successful 🎉");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>🎧 Welcome Back</h1>

                <form onSubmit={handleSubmit}>
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
                            ? "Logging In..."
                            : "Login"}
                    </button>
                </form>

                <div
                    style={{
                        textAlign: "center",
                        marginTop: "20px",
                        color: "#999",
                    }}
                >
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        style={{
                            color: "#1DB954",
                            cursor: "pointer",
                            fontWeight: "600",
                        }}
                    >
                        Sign Up
                    </span>
                </div>
            </div>
        </div>
    );
}
