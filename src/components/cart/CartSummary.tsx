import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";

interface CartSummaryProps {
    showCheckoutButton?: boolean;
}

export function CartSummary({ showCheckoutButton = true }: CartSummaryProps) {
    const { items, getTotal } = useCartStore();
    const subtotal = getTotal();

    // Placeholder values for integration points
    const serviceFee = subtotal * 0.1; // 10% service fee placeholder
    const tax = subtotal * 0.08; // 8% tax placeholder
    const total = subtotal + serviceFee + tax;

    if (items.length === 0) {
        return null;
    }

    return (
        <div className="rounded-lg border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-neutral-900">Order Summary</h2>

            <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium text-neutral-900">
                        ${subtotal.toFixed(2)}
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">
                        Service Fee
                        <span className="ml-1 text-xs text-neutral-400">(placeholder)</span>
                    </span>
                    <span className="font-medium text-neutral-900">
                        ${serviceFee.toFixed(2)}
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">
                        Tax
                        <span className="ml-1 text-xs text-neutral-400">(placeholder)</span>
                    </span>
                    <span className="font-medium text-neutral-900">
                        ${tax.toFixed(2)}
                    </span>
                </div>
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-neutral-900">Total</span>
                <span className="text-xl font-bold text-neutral-900">
                    ${total.toFixed(2)}
                </span>
            </div>

            {showCheckoutButton && (
                <Button asChild className="mt-6 w-full" size="lg">
                    <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
            )}
        </div>
    );
}
