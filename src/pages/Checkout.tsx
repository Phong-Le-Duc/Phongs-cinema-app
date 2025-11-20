import { useSearchParams } from "react-router-dom";
import PaymentForm from "../components/forms/PaymentForm";

export default function Checkout() {
    const [searchParams] = useSearchParams();
    const seats = searchParams.get("seats"); // e.g. "5,6,7"
    const selectedSeats = seats ? seats.split(",").map(Number) : [];

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
            <PaymentForm selectedSeats={selectedSeats} />
        </>
    );
}