import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, default: "No Subject" },
    message: { type: String, required: true },
}, { timestamps: true });

export const Contact =
    mongoose.models.Contact || mongoose.model("Contact", ContactSchema);