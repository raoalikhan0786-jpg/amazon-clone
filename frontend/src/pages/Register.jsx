import { useState } from "react";

import API from "../api";

const Register = () => {

    const [name, setName] =
        useState("");

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

                        "/auth/register",

                        {
                            name,
                            email,
                            password
                        }

                    );

                alert("Register Success");

                console.log(data);

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

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button type="submit">
                    Register
                </button>

            </form>

        </div>

    );

};

export default Register;