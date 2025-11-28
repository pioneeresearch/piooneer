import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { CalculatorForm } from "@/models/CalculatorForm";


export async function GET() {
    try {
        await connectDB();
        const leads = await CalculatorForm.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, leads });
    } catch (error) {
        return NextResponse.json({ success: false, leads: [], error: error.message });
    }
}


export async function DELETE(req) {
    try {
        await connectDB();
        const id = req.nextUrl.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ success: false, message: "No ID provided" });
        }

        await CalculatorForm.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Lead Deleted!" });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}