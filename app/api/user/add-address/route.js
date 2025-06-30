import connectDB from "@/config/db";
import Address from "@/models/address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {
        const { userId } = getAuth(request)
        const { address } = await request.json()

        if(!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
      
        await connectDB()
        const newAddress = await Address.create({
            userId,
           ...address
        })

        return NextResponse.json({ success: true, message: "Address saved successfully!", newAddress });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }

}