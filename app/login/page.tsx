'use client';

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        setLoading(false);

        if (res?.ok) {
            router.push("/");
            router.refresh();
        } else {
            alert("Identifiants incorrects");
        }
    };

    return (
        <div className="h-full flex items-center justify-center flex-1">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md space-y-6 border"
            >
                <h1 className="text-2xl font-semibold text-center">Connexion</h1>

                <div>
                    <label htmlFor="email" className="block text-sm mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
                        placeholder="admin@example.com"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm mb-1">
                        Mot de passe
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
                        placeholder="••••••••"
                    />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Connexion..." : "Se connecter"}
                </Button>
            </form>
        </div>
    );
}