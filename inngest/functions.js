import { inngest } from "@/config/inngest";
import connectDB from "@/config/db";
import User from "@/models/user";
import Order from "@/models/Order";


// Inngest Function to save user data to a database
export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk'
    },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.create(userData)
    }
)

// Inngest Function to update user data in database
export const syncUserUpdate = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    { event: 'clerk/user.updated' },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            imageUrl: image_url
        }

        await connectDB()
        await User.findByIdAndUpdate(id, userData)
    }
)



// Inngest Function to delete user from database
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-with-clerk'
    },
    { event: 'clerk/user.deleted' },
    async ({ event }) => {

        const { id } = event.data

        await connectDB()
        await User.findByIdAndDelete(id)
    }
)

export const createUserOrder = inngest.createFunction(
  {
    id: "create-user-order",
    batchEvents: {
      maxSize: 5,
      timeout: "5s",
    },
  },
  { event: "order/created" },
  async ({ events }) => {
    console.log("Inngest function triggered", events); // ✅ Properly inside the function

    try {
      const orders = events.map((event) => ({
        userId: event.data.userId,
        items: event.data.items,
        amount: event.data.amount,
        address: event.data.address,
        date: event.data.date ?? new Date()
      }));

      console.log("Prepared orders:", orders);

      await connectDB();
      console.log("MongoDB connected");

      await Order.insertMany(orders);
      console.log("Orders inserted");

      return { success: true, processed: orders.length };
    } catch (err) {
      console.error("Error processing orders:", err);
      return { success: false, error: err.message };
    }
  }
);
