import express from "express";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

const router = express.Router();


// REGISTER

router.post("/register",
    async (req, res) => {

        const { name, email, password } =
            req.body;

        try {

            const userExists =
                await User.findOne({ email });

            if (userExists) {

                return res.json({
                    message:
                        "User already exists"
                });

            }

            const hashedPassword =
                await bcrypt.hash(password, 10);

            const user =
                await User.create({

                    name,

                    email,

                    password:
                        hashedPassword

                });

            res.json({

                _id: user._id,

                name: user.name,

                email: user.email

            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    });


// LOGIN

router.post("/login",
    async (req, res) => {

        const { email, password } =
            req.body;

        try {

            const user =
                await User.findOne({ email });

            if (
                user &&
                await bcrypt.compare(
                    password,
                    user.password
                )
            ) {

                const token =
                    jwt.sign(

                        { id: user._id },

                        "secret123",

                        { expiresIn: "30d" }

                    );

                res.json({

                    _id: user._id,

                    name: user.name,

                    email: user.email,

                    token

                });

            } else {

                res.status(401).json({
                    message:
                        "Invalid email or password"
                });

            }

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    });

export default router;