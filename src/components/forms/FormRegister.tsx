import { Form, useNavigate } from "react-router-dom";
import { z } from "zod/v4"; // Importer zod for at kunne bruge z.treeifyError
import { registerSchema } from "../../utility/schemas";
import { useState } from "react";
// import { useAuth } from "../../context/AuthContext.tsx";
import React from "react";
// import '../../index.css';


export default function FormRegister() {

    type FormErrors = {
        [key: string]: { errors: string[] }
    };

    const [errors, setErrors] = useState<FormErrors>({});

    const navigate = useNavigate();

    // Helper to display all errors for a field
    function renderErrors(field: string) {
        return errors[field]?.errors?.map((err, i) => (
            <p key={i} className="text-red-500">{err}</p>
        ));
    }

    async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        const result = registerSchema.safeParse(data);

        // console.log(result); // Remove or comment out in production

        if (!result.success) {
            // Show all validation errors
            const errors = z.treeifyError(result.error);
            setErrors(errors.properties || {});
        } else {
            setErrors({});
            // Handle successful registration

            const { confirmPassword, ...userData } = result.data;

            const response = await fetch("http://localhost:4000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            const userdata = await response.json();

            if (!response.ok) {
                setErrors({ general: { errors: [userdata.message || userdata.error || "Please fill out all fields"] } });
            } else {
                // Registration successful, redirect to login or home
                navigate("/login", { replace: true });
            }
        }
    }



    return (
        <>
            <div className="p-10 rounded-[3px] shadow-md max-w-md mx-auto my-15">
                <div>
                    <Form onSubmit={handleRegister} className="login-form flex flex-col gap-4">
                        <label htmlFor="fullname" className="text-white">Fulde navn:</label>
                        <input
                            type="text"
                            id="fullname"
                            name="name"
                            placeholder="Fulde navn"
                            className="border border-gray-300 p-1 rounded-[3px] bg-primary_2 text-white"
                        />
                        {renderErrors("username")}

                        <label htmlFor="email" className="text-white">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email"
                            className="border border-gray-300 p-1 rounded-[3px] bg-primary_2 text-white"
                        />
                        {renderErrors("email")}

                        <label htmlFor="password" className="text-white">Adgangskode:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Adgangskode"
                            className="border border-gray-300 p-1 rounded-[3px] bg-primary_2 text-white"
                        />
                        {renderErrors("password")}

                        <label htmlFor="confirmPassword" className="text-white">Bekræft adgangskode:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Bekræft adgangskode"
                            className="border border-gray-300 p-1 rounded-[3px]  bg-primary_2 text-white"
                        />
                        {renderErrors("custom")}

                        {/* General backend error */}
                        {renderErrors("general")}

                        <button type="submit" className="border border-gray-300 p-1 rounded-[3px] bg-dinmaegler-blue text-white">
                            Opret bruger
                        </button>
                    </Form>
                </div>
            </div>
        </>
    )
}