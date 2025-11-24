import PaymentForm from "../components/forms/PaymentForm";

export default function Checkout() {
    return (
        <>
            <title>Phong's Biograf - Checkout</title>
            <div className="flex items-center justify-between mb-2">
                <h1>Payment Method</h1>
                <p className="text-gray-400">change</p>
            </div>
            <figure className="flex gap-3">
                <img src="../src/assets/Card-Payment-1.png" alt="" />
                <img src="../src/assets/Card-Payment-1.png" alt="" />
            </figure>
            <PaymentForm />
        </>
    );
}