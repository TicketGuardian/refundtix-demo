import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Types
interface OrderItem {
    eventId: string;
    eventName: string;
    ticketTypeId: string;
    ticketTypeName: string;
    quantity: number;
    price: number;
}

interface OrderRequest {
    customer: {
        email: string;
        firstName: string;
        lastName: string;
        phone?: string;
    };
    items: OrderItem[];
    totals: {
        subtotal: number;
        serviceFee: number;
        tax: number;
        total: number;
    };
    paymentTransactionId: string;
}

interface PaymentRequest {
    amount: number;
    paymentMethod?: string;
}

// ============================================
// PAYMENT PROCESSING ENDPOINT
// ============================================
// Mock payment endpoint that simulates successful payment processing.
// In production, this would integrate with Stripe, PayPal, etc.
// ============================================

app.post("/api/payments", (req, res) => {
    const paymentData: PaymentRequest = req.body;

    console.log("\n========================================");
    console.log("💳 PAYMENT PROCESSING");
    console.log("========================================");
    console.log("Amount:", paymentData.amount);
    console.log("Payment Method:", paymentData.paymentMethod || "card");
    console.log("========================================\n");

    // Simulate payment processing delay
    setTimeout(() => {
        const transactionId = `TXN-${Date.now().toString(36).toUpperCase()}`;

        console.log("✅ Payment successful:", transactionId);

        res.json({
            success: true,
            transactionId,
            amount: paymentData.amount,
            status: "completed",
            timestamp: new Date().toISOString(),
        });
    }, 500);
});

// ============================================
// ORDER SUBMISSION ENDPOINT
// ============================================
// Creates a new order with customer info, cart items, and totals.
// Returns an order ID and confirmation details.
// ============================================

app.post("/api/orders", (req, res) => {
    const orderData: OrderRequest = req.body;

    // Log the incoming order for debugging
    console.log("\n========================================");
    console.log("📦 NEW ORDER RECEIVED");
    console.log("========================================");
    console.log("Customer:", orderData.customer);
    console.log("Items:", JSON.stringify(orderData.items, null, 2));
    console.log("Totals:", orderData.totals);
    console.log("Payment Transaction ID:", orderData.paymentTransactionId);
    console.log("========================================\n");

    // Generate a mock order ID
    const orderId = `EVT-${Date.now().toString(36).toUpperCase()}`;

    // Simulate processing delay
    setTimeout(() => {
        res.json({
            success: true,
            orderId,
            message: "Order created successfully",
            paymentTransactionId: orderData.paymentTransactionId,
            timestamp: new Date().toISOString(),
        });
    }, 500);
});

// Health check endpoint
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/api/health`);
    console.log(`   Payments API: POST http://localhost:${PORT}/api/payments`);
    console.log(`   Orders API: POST http://localhost:${PORT}/api/orders\n`);
});
