import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { CalculatorForm } from "@/models/CalculatorForm";



const MONGO_URI = process.env.MONGODB_URI;

async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(MONGO_URI);
    }
}

export async function POST(req) {
    const data = await req.json();
    await connectDB();
    await CalculatorForm.create(data);

    return NextResponse.json({ message: "Data Saved" }, { status: 200 });
}