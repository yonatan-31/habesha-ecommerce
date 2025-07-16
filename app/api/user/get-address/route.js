import connectDB from "@/config/db";
import Address from "@/models/address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);
        
        await connectDB();
        const addresses = await Address.find({ userId });

        if (!addresses) {
            return NextResponse.json({ success: false, message: "Address not found" });
        }


        return NextResponse.json({
            success: true,
            message: "User addresses fetched successfully",
            addresses,
        });

    }catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
