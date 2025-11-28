import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

export async function POST(req) {
    try {
        const body = await req.json();
        await connectDB();
        await Contact.create(body);

        return NextResponse.json({ success: true, message: "Message Sent!" });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}