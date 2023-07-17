import React, { useState } from "react";

export const Register = (props) => {
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
        fetch("https://loginfucntion.onrender.com/api/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json()) // Parse the response as JSON
            .then((data) => {
                if (data.message == "OTP Sent to registered mail") {
                    window.alert(data.message);
                    setShowOtpInput(true);
                } else {
                    console.log("Error:", data.message);
                }
            })
            .catch((error) => {
                window.alert("Email Already In Use");
                console.log("Error:", error);
            });
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: email,
            otp: otp,
        };

        // Make the API call to verify the entered OTP
        fetch("https://loginfucntion.onrender.com/api/user/signup/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json()) // Parse the response as JSON
            .then((data) => {
                if (data.message === "User Registration Successfull!") {
                    window.alert(data.message);
                } else {
                    console.log("Error:", data.message);
                }
            })
            .catch((error) => {
                window.alert('Wrong Or Expired OTP');
                console.log("Error:", error);
            });
    };

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            {!showOtpInput ? (
                <form className="register-form" onSubmit={handleSubmit}>
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
                    <button type="submit">Register</button>
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
                onClick={() => props.onFormSwitch("login")}
            >
                Already have an account? Login here.
      </button>
        </div>
    );
};
