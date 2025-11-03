import { useState } from "react";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Simple validation
        if (!email) {
            alert("Please enter an email address");
            return;
        }

        if (!email.includes("@")) {
            alert("Please enter a valid email address");
            return;
        }

        // Set loading state
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log("Newsletter signup:", email);
            alert("Thank you for signing up!");
            setEmail("");
            setIsLoading(false);
        }, 1000);
    }

    return (
        <div className="w-full flex justify-center mt-4">
            <form onSubmit={handleSubmit} className="relative flex gap-2 w-full max-w-[600px] z-30">
                <input
                    type="email"
                    placeholder="Indtast din email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="p-2 rounded border border-gray-300 bg-dinmaegler-white min-w-[300px] max-w-[600px] w-full"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-dinmaegler-white text-dinmaegler-blue p-2 rounded disabled:opacity-50">
                    {isLoading ? "..." : <img src="src/assets/arrow-right.svg" alt="submit button" />}
                </button>
            </form>
        </div>
    );
}