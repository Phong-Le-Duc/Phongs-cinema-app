import { useState } from "react";
import { z } from "zod";
import type { PaymentFormState } from "../../Types";
import type { PaymentFormProps } from "../../Types";

const seatPrice = 12;

export const paymentSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    cardholder: z.string().min(2, { message: "Cardholder name must be at least 2 characters." }),
    cardnumber: z.string()
        .regex(/^\d{16,19}$/, "Card number must be 16-19 digits (no spaces)."),
    expMonth: z.string().length(2, { message: "Select a valid month." }),
    expYear: z.string().length(4, { message: "Select a valid year." }),
    cvc: z.string().min(3, { message: "CVC must be at least 3 digits." }).max(4, { message: "CVC must be at most 4 digits." }),
});



export default function PaymentForm({ selectedSeats }: PaymentFormProps) {
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 12 }, (_, i) => (currentYear + i).toString());

    const [form, setForm] = useState<PaymentFormState>({
        email: "",
        cardholder: "",
        cardnumber: "",
        expMonth: "",
        expYear: "",
        cvc: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState(false);


    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const cleanedForm = { ...form, cardnumber: form.cardnumber.replace(/\s/g, "") };
        const result = paymentSchema.safeParse(cleanedForm);
        if (!result.success) {
            const fieldErrors: { [key: string]: string } = {};
            result.error.issues.forEach(err => {
                const key = String(err.path[0]);
                fieldErrors[key] = err.message;
            });
            setErrors(fieldErrors);
            setSuccess(false); // Hide success message if there are errors
        } else {
            setErrors({});
            setSuccess(true); // Show success message
            // Proceed with payment logic
        }
    }

    const totalCost = selectedSeats.length * seatPrice;

    return (
        <>
            <form className="flex flex-col gap-4 max-w-md mx-auto p-4 rounded-lg" onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold mb-2 text-gray-400">Payment Details</h2>

                <label className="text-gray-400 rounded-md flex flex-col">
                    <span className="mb-2">Your Email</span>
                    <input
                        type="text"
                        name="email"
                        className="border border-white rounded-md p-2 w-full text-gray-400 bg-transparent"
                        placeholder="milesmorales@gmail.com"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
                </label>

                <label className="text-gray-400 rounded-md flex flex-col">
                    <span className="mb-2">Cardholder Name</span>
                    <input
                        type="text"
                        name="cardholder"
                        className="border border-white rounded-md p-2 w-full text-gray-400 bg-transparent"
                        placeholder="Miles Morales"
                        value={form.cardholder}
                        onChange={handleChange}
                    />
                    {errors.cardholder && <span className="text-red-500 text-sm mt-1">{errors.cardholder}</span>}
                </label>

                <label className="text-gray-400 rounded-md flex flex-col">
                    <span className="mb-2">Card Number</span>
                    <input
                        type="text"
                        name="cardnumber"
                        className="border border-white rounded-md p-2 w-full text-gray-400 bg-transparent"
                        maxLength={19}
                        placeholder="**** **** **** 51446"
                        value={form.cardnumber}
                        onChange={handleChange}
                    />
                    {errors.cardnumber && <span className="text-red-500 text-sm mt-1">{errors.cardnumber}</span>}
                </label>

                <div className="flex items-end justify-between gap-4">
                    <label className="text-gray-400 rounded-md flex flex-col">
                        <span className="mb-2">Expiry Date</span>
                        <div className="flex gap-4">
                            <select
                                name="expMonth"
                                className="border border-white rounded-md p-2 text-gray-400 bg-transparent w-20"
                                value={form.expMonth}
                                onChange={handleChange}
                            >
                                <option value="">MM</option>
                                {months.map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                            <select
                                name="expYear"
                                className="border border-white rounded-md p-2 text-gray-400 bg-transparent w-20"
                                value={form.expYear}
                                onChange={handleChange}
                            >
                                <option value="">YY</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        {(errors.expMonth || errors.expYear) && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.expMonth || errors.expYear}
                            </span>
                        )}
                    </label>

                    <label className="text-gray-400 rounded-md flex flex-col">
                        <span className="mb-2">CVC</span>
                        <input
                            type="text"
                            name="cvc"
                            className="border border-white rounded-md p-2 text-gray-400 bg-transparent w-16"
                            maxLength={4}
                            placeholder="***"
                            value={form.cvc}
                            onChange={handleChange}
                        />
                        {errors.cvc && <span className="text-red-500 text-sm mt-1">{errors.cvc}</span>}
                    </label>
                </div>

                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4 flex items-center justify-around w-full">
                    <span>Pay Now</span>
                    <span className="mx-2">|</span>
                    <span className="text-gray-400 font-normal">
                        {selectedSeats.length} seat(s) × ${seatPrice} = <span className="font-bold text-white">${totalCost}</span>
                    </span>
                </button>
            </form>
            {success && (


                <div className="mt-6 p-4 rounded-md bg-green-700 text-white text-center font-semibold">
                    Your payment was successful
                </div>
            )}
        </>
    );
}