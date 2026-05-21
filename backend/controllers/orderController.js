import Order from "../models/Order.js";

export const createOrder = async (req, res) => {

    const order = await Order.create({
        user: req.user.id,
        products: req.body.products,
        totalPrice: req.body.totalPrice
    });

    res.json(order);

};