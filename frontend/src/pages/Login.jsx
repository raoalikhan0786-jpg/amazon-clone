import { useState } from "react";

import API from "../api";

const Login = () => {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const submitHandler =
        async (e) => {

            e.preventDefault();

            try {

                const { data } =
                    await API.post(

                        "/auth/login",

                        {
                            email,
                            password
                        }

                    );

                localStorage.setItem(
                    "userInfo",
                    JSON.stringify(data)
                );

                window.location.href = "/";

            } catch (error) {

                alert("Invalid Login");

            }

        };

    return (

        <div className="auth">

            <form
                onSubmit={submitHandler}
                className="auth-form"
            >

                <h2>Login</h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>

    );

};

export default Login;