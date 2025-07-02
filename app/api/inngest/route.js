import { serve } from "inngest/next";
import { inngest } from "@/config/inngest";
import {
  createUserOrder,
  syncUserCreation,
  syncUserUpdate,
  syncUserDeletion
} from "@/inngest/function";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        syncUserCreation,
        syncUserUpdate,
        syncUserDeletion,
        createUserOrder
    ],
});