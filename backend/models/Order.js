import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        products: Array,

        totalPrice: Number,

        paymentStatus: {
            type: String,
            default: "Pending"
        }
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);