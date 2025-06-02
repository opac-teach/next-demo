'use client';

import React, {useActionState, useState} from "react";
import {createMemecoin} from "@/lib/coinUtils";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import Link from "next/link";

function isValidUrl(url: string) {
    if (!url) return true;
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export default function CreateCoin() {

    const [state, formAction, isPending] = useActionState(createMemecoin, null)

    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [form, setForm] = useState({
        name: "",
        symbol: "",
        description: "",
        logoUrl: ""
    });

    const validate = () => {
        const newErrors: {[key: string]: string} = {};

        if (!form.name.trim()) newErrors.name = "Le nom est requis.";
        else if (form.name.length < 4 || form.name.length > 16) newErrors.name = "Entre 4 et 16 caractères";


        if (!form.symbol.trim()) newErrors.symbol = "Le symbole est requis.";
        else if (form.symbol.length < 2 || form.symbol.length > 4) newErrors.symbol = "Entre 2 et 4 caractères majuscules";
        else if (!/^[A-Z]+$/.test(form.symbol)) newErrors.symbol = "Entre 2 et 4 caractères majuscules";


        if (form.description && form.description.length > 1000) newErrors.description = "Maximum 1000 caractères";


        if (form.logoUrl && form.logoUrl.length > 200) newErrors.logoUrl = "Maximum 200 caractères";
        else if (form.logoUrl && !isValidUrl(form.logoUrl)) newErrors.logoUrl = "Doit être une URL valide";

        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
        setErrors({...errors, [e.target.name]: ""});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            e.preventDefault();
            setErrors(validationErrors);
        }
    };

    return (
        <div className="min-h-auto pt-8 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-start w-full">
                    <h1 className="text-center">Create Coin</h1>
                    <form action={formAction} onSubmit={handleSubmit} noValidate>
                        <Label className="mb-2" htmlFor="name">Name</Label>
                        <Input type="text" name="name" placeholder="Enter coin name" required minLength={4} maxLength={16} value={form.name} onChange={handleChange}/>
                        {errors.name ? <span className="text-red-500 text-xs">Entre 4 et 16 caractères</span> : <span className="text-gray-500 text-xs ">Entre 4 et 16 caractères</span>}

                        <Label className="mb-2" htmlFor="symbol">Symbol</Label>
                        <Input type="text" name="symbol" placeholder="Enter coin symbol" required minLength={2} maxLength={4} value={form.symbol} onChange={handleChange}/>
                        {errors.symbol ? <span className="text-red-500 text-xs-sm">{errors.symbol}</span> : <span className="text-gray-500 text-xs ">Entre 2 et 4 caractères majuscules</span>}

                        <Label className="mb-2" htmlFor="description">Description</Label>
                        <Textarea name="description" placeholder="Enter coin description"  maxLength={1000} value={form.description} onChange={handleChange}></Textarea>
                        {errors.description ? <span className="text-red-500 text-xs">{errors.description}</span> : <span className="text-gray-500 text-xs ">Maximum 1000 caractères</span>}

                        <Label className="mb-2" htmlFor="logoUrl">Logo URL</Label>
                        <Input type="text" name="logoUrl" placeholder="Enter logo URL" maxLength={200} value={form.logoUrl} onChange={handleChange}/>
                        {errors.logoUrl ? <span className="text-red-500 text-xs">{errors.logoUrl}</span> : <span className="text-gray-500 text-xs ">Maximum 200 caractères</span>}
                        <br />
                        <Button className="mt-4" type="submit" disabled={isPending}>Create Coin</Button>
                    </form>
                </div>
                <Link href="/prisma/coins"
                      className="mt-4 mb-4 font-bold data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4">
                    Back
                </Link>
        </div>
    )
}