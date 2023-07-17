import React, { useState } from "react";
import { Sucess } from "./Sucess"


export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: email,
            password: pass,
        };

        // Make the API call
        fetch("https://loginfucntion.onrender.com/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json()) // Parse the response as JSON
            .then((data) => {
                if (data.message === "OTP Sent to registered mail") {
                    window.alert(data.message)
                    setShowOtpInput(true);
                } else {
                    window.alert("Invalid credentials")
                    console.log("Invalid credentials");
                }
            })
            .catch((error) => {
                window.alert("Invalid credentials")
                console.log("Error:", error);
            });
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: email,
            otp: otp,
        };

        // Make the API call
        fetch("https://loginfucntion.onrender.com/api/user/login/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json()) // Parse the response as JSON
            .then((data) => {
                if (data.message === "User LoggedIn Successfull!") {
                    window.alert(data.message)
                } else {
                    console.log("Invalid OTP");
                }
            })
            .catch((error) => {
                window.alert("Invalid OTP")
                console.log("Error:", error);
            });
    };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            {!showOtpInput ? (
                <form className="login-form">
                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="youremail@gmail.com"
                        id="email"
                        name="email"
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        placeholder="********"
                        id="password"
                        name="password"
                        required
                    />
                    <button onClick={handleSubmit}>Log In</button>
                </form>
            ) : (
                    <form className="otp-form" onSubmit={handleOtpSubmit}>
                        <label htmlFor="otp">Enter OTP</label>
                        <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            type="text"
                            placeholder="OTP"
                            id="otp"
                            name="otp"
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>
                )}
            <button
                className="link-btn"
                onClick={() => props.onFormSwitch("register")}
            >
                Don't have an account? Register here.
      </button>
        </div>
    );
};
