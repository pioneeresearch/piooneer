import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact"; // ensure model path sahi ho

export async function GET() {
    try {
        await connectDB();
        const messages = await Contact.find().sort({ createdAt: -1 });

        return NextResponse.json({ success: true, messages });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        await connectDB();
        await Contact.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: "Contact Deleted!" });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message });
    }
}