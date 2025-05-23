"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface FormData {
    name: string;
    symbol: string;
    description: string;
    logoUrl: string;
}

interface FormErrors {
    name?: string;
    symbol?: string;
    description?: string;
    logoUrl?: string;
    form?: string;
}

export function MemecoinsForm() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        symbol: "",
        description: "",
        logoUrl: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        // Name validation (4-16 characters, required)
        if (!formData.name) {
            newErrors.name = "Le nom est obligatoire";
        } else if (formData.name.length < 4 || formData.name.length > 16) {
            newErrors.name = "Le nom doit contenir entre 4 et 16 caractères";
        }

        // Symbol validation (2-4 characters, uppercase only, required)
        if (!formData.symbol) {
            newErrors.symbol = "Le symbole est obligatoire";
        } else if (formData.symbol.length < 2 || formData.symbol.length > 4) {
            newErrors.symbol = "Le symbole doit contenir entre 2 et 4 caractères";
        } else if (!/^[A-Z]+$/.test(formData.symbol)) {
            newErrors.symbol = "Le symbole doit contenir uniquement des lettres majuscules";
        }

        // Description validation (0-1000 characters, optional)
        if (formData.description && formData.description.length > 1000) {
            newErrors.description = "La description ne peut pas dépasser 1000 caractères";
        }

        // Logo URL validation (optional, valid URL if provided)
        if (formData.logoUrl) {
            if (formData.logoUrl.length > 200) {
                newErrors.logoUrl = "L'URL du logo ne peut pas dépasser 200 caractères";
            } else {
                try {
                    new URL(formData.logoUrl);
                } catch {
                    newErrors.logoUrl = "Veuillez fournir une URL valide";
                }
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Auto-uppercase for symbol input
        if (name === "symbol") {
            setFormData(prev => ({ ...prev, [name]: value.toUpperCase() }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            const response = await fetch("https://nuxt-demo-blush.vercel.app/api/create-memecoin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Erreur: ${response.status}`);
            }

            // Reset form on success
            setFormData({
                name: "",
                symbol: "",
                description: "",
                logoUrl: "",
            });

            setSubmitSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => {
                setSubmitSuccess(false);
            }, 3000);

        } catch (error) {
            console.error("Erreur lors de la création du memecoin:", error);
            setErrors({ form: "Une erreur s'est produite lors de la création du memecoin." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Créer un nouveau memecoin</CardTitle>
                </CardHeader>
                <CardContent>
                    {submitSuccess && (
                        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md">
                            Memecoin créé avec succès!
                        </div>
                    )}

                    {errors.form && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                            {errors.form}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">
                                    Nom <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Nom du memecoin (4-16 caractères)"
                                    disabled={isSubmitting}
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="symbol" className="text-sm font-medium">
                                    Symbole <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="symbol"
                                    name="symbol"
                                    value={formData.symbol}
                                    onChange={handleChange}
                                    placeholder="Symbole (2-4 caractères majuscules)"
                                    disabled={isSubmitting}
                                />
                                {errors.symbol && <p className="text-sm text-red-500">{errors.symbol}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-medium">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Description du memecoin (max 1000 caractères)"
                                    className="w-full min-h-[100px] p-2 border rounded-md resize-none"
                                    disabled={isSubmitting}
                                />
                                <p className="text-xs text-gray-500">
                                    {formData.description.length}/1000 caractères
                                </p>
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="logoUrl" className="text-sm font-medium">
                                    URL du logo
                                </label>
                                <Input
                                    id="logoUrl"
                                    name="logoUrl"
                                    value={formData.logoUrl}
                                    onChange={handleChange}
                                    placeholder="https://exemple.com/logo.png"
                                    disabled={isSubmitting}
                                />
                                {errors.logoUrl && <p className="text-sm text-red-500">{errors.logoUrl}</p>}
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full"
                    >
                        {isSubmitting ? (
                            <>
                                <Skeleton className="h-4 w-4 rounded-full mr-2" />
                                Création en cours...
                            </>
                        ) : (
                            "Créer le memecoin"
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}