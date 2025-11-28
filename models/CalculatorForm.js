import mongoose from "mongoose";

// CALCULATOR FORM SCHEMA
const CalculatorFormSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    goal: { type: String, required: true },

    calculatorType: { type: String, required: true },
}, { timestamps: true });


export const CalculatorForm =
    mongoose.models.CalculatorForm ||
    mongoose.model("CalculatorForm", CalculatorFormSchema);

export default CalculatorForm;