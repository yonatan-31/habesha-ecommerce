import connectDB from "@/config/db";
import Address from "@/models/address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);
        console.log("userId 2", userId);

        await connectDB();
        const addresses = await Address.find({ userId });

        if (!addresses) {
            return NextResponse.json({ success: false, message: "Address not found" });
        }


        console.log("addre 2", addresses);
        return NextResponse.json({
            success: true,
            message: "User addresses fetched successfully",
            addresses,
        });

    }catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
