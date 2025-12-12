import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { z } from "zod/v4"; // Importer zod for at kunne bruge z.treeifyError
import { loginSchema } from "../../utility/schemas";
import { useAuth } from "../../context/AuthContext";


export default function FormLogin() {
    type FormErrors = {
        [key: string]: { errors: string[] }
    };

    const [errors, setErrors] = useState<FormErrors>({});
    const { login } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";



    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        const result = loginSchema.safeParse(data);

        console.log(result);


        if (!result.success) {
            const errors = z.treeifyError(result.error);
            console.log(errors);
            setErrors(errors.properties || {});
        } else {
            setErrors({});




            // Use correct backend endpoint and field names
            const response = await fetch("http://localhost:4000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            });

            if (response.ok) {
                const userData = await response.json();
                login(userData);
                navigate(from, { replace: true });
            } else {
                const userData = await response.json();
                setErrors(userData.message || userData.error || "Please provide login credentials");
            }
        }
    }



    return (
        <>
            <div className="py-5 px-10 rounded-[3px] max-w-md mx-auto my-10">
                <div>
                    <form onSubmit={handleLogin} className="login-form flex flex-col gap-4">
                        <label htmlFor="email" className="text-white">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email"
                            className="border border-gray-300 p-1 rounded-[3px] bg-primary_2 text-white"
                        />
                        <p>{errors && errors?.email?.errors[0]}</p>

                        <label htmlFor="password" className="text-white">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            className="border border-gray-300 p-1 rounded-[3px] bg-primary_2 text-white"
                        />
                        <p>{errors && errors?.password?.errors[0]}</p>

                        <button
                            type="submit"
                            className="border border-gray-300 p-1 rounded-[3px] bg-dinmaegler-blue text-white transition hover:bg-blue-700 hover:shadow cursor-pointer"
                        >
                            Login
                        </button>
                    </form>

                    <div className="">
                        <p className="mt-5 mb-1 text-white">
                            don't have an account? <span className="text-blue-500"><Link to="/register">Register here.</Link></span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}