import connectDB from "@/config/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
       
        await connectDB();
        const products = await Product.find({}); // fetch all products
        return NextResponse.json({
            success: true,
            products
        });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
