import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fakeUser from "./fakeLogin.json";
import { TextField, Button, Typography } from "@mui/material";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("email")) {
            navigate("/tp3/");
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();

        if (email === fakeUser.email && password === fakeUser.password) {
            localStorage.setItem("email", email);
            navigate("/tp3/");
        } else {
            setError("Email ou senha incorretos!");
        }
    };

    return (
        <div
            style={{
                backgroundColor: "#FFFFFF",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    padding: "2rem",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    textAlign: "center",
                    maxWidth: "400px",
                    width: "100%",
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: "#003163", fontWeight: "bold" }}>
                    Login
                </Typography>

                <Typography variant="subtitle1" gutterBottom sx={{ color: "#00A0E3", marginBottom: "1rem" }}>
                    Bem-vindo! Faça login para continuar.
                </Typography>

                <form onSubmit={handleLogin}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ marginBottom: "1.5rem" }}
                    />

                    <TextField
                        label="Senha"
                        type="password"
                        variant="outlined"
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ marginBottom: "1.5rem" }}
                    />

                    {error && (
                        <Typography color="error" variant="body2" sx={{ marginBottom: "1rem" }}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        sx={{
                            backgroundColor: "#1e90ff",
                            color: "#FFFFFF",
                            padding: "10px 20px",
                            fontSize: "1rem",
                            "&:hover": {
                                backgroundColor: "#002244",
                            },
                        }}
                    >
                        Entrar
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
