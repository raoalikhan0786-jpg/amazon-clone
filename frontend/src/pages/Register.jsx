import { useState } from "react";

import API from "../api";

const Register = () => {

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const submitHandler =
        async (e) => {

            e.preventDefault();

            try {

                await API.post(
                    "/auth/register",
                    {
                        name,
                        email,
                        password
                    }
                );

                alert("Register Success");

            } catch (error) {

                alert("Register Failed");

            }

        };

    return (

        <div className="auth">

            <form
                onSubmit={submitHandler}
                className="auth-form"
            >

                <h2>Register</h2>

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <div
                    style={{
                        position: "relative",
                        width: "100%"
                    }}
                >

                    <input
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        style={{
                            width: "100%",
                            paddingRight: "50px"
                        }}
                    />

                    <span
                        onClick={() =>
                            setShowPassword(
                                !showPassword
                            )
                        }
                        style={{
                            position: "absolute",
                            right: "15px",
                            top: "50%",
                            transform:
                                "translateY(-50%)",
                            cursor: "pointer",
                            fontSize: "20px"
                        }}
                    >

                        {
                            showPassword
                                ? "🙈"
                                : "👁️"
                        }

                    </span>

                </div>

                <button type="submit">
                    Register
                </button>

            </form>

        </div>

    );

};

export default Register;