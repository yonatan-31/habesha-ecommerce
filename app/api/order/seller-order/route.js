import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Order from "@/models/Order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);
        const isSeller = await authSeller(userId);

        if (!isSeller) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const orders = await Order.find({}).populate("address items.product");

        const sellerOrders = orders
            .map(order => {
                const sellerItems = order.items.filter(item => item.product?.userId === userId);
                if (sellerItems.length === 0) return null;

                return {
                    ...order.toObject(),
                    items: sellerItems
                };
            })
            .filter(order => order !== null);

        return NextResponse.json({
            success: true,
            sellerOrders
        });

    } catch (error) {
        console.error("Order fetch error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
