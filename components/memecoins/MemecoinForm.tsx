'use client';

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {createMemecoin} from "@/lib/actions";
import {useActionState} from "react";
import React, {useState} from "react";

function isValidUrl(url: string) {
    if (!url) return true;
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export default function MemecoinForm() {
    const [state, formAction, isPending] = useActionState(createMemecoin, null);

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
        else if (form.name.length < 4 || form.name.length > 16) newErrors.name = "Le nom doit faire entre 4 et 16 caractères.";


        if (!form.symbol.trim()) newErrors.symbol = "Le symbole est requis.";
        else if (form.symbol.length < 2 || form.symbol.length > 4) newErrors.symbol = "Le symbole doit faire entre 2 et 4 caractères.";
        else if (!/^[A-Z]+$/.test(form.symbol)) newErrors.symbol = "Le symbole doit contenir uniquement des lettres majuscules.";


        if (form.description && form.description.length > 1000) newErrors.description = "La description ne doit pas dépasser 1000 caractères.";


        if (form.logoUrl && form.logoUrl.length > 200) newErrors.logoUrl = "Le logo ne doit pas dépasser 200 caractères.";
        else if (form.logoUrl && !isValidUrl(form.logoUrl)) newErrors.logoUrl = "Le logo doit être une URL valide.";

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

    return(
        <div className="flex flex-col items-center justify-start w-full">
            <h1 className="text-center">Create Memecoins</h1>
            <form action={formAction} className="w-full max-w-md" onSubmit={handleSubmit} noValidate>
                <Label htmlFor="name">Name</Label>
                <Input type="text" name="name" required minLength={4} maxLength={16} value={form.name} onChange={handleChange}/>
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                <Label htmlFor="symbol">Symbol</Label>
                <Input type="text" name="symbol" required minLength={2} maxLength={4} value={form.symbol} onChange={handleChange}/>
                {errors.symbol && <p className="text-red-500 text-sm">{errors.symbol}</p>}

                <Label htmlFor="description">Description</Label>
                <Textarea name="description" maxLength={1000} value={form.description} onChange={handleChange}/>
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input type="text" name="logoUrl" maxLength={200} value={form.logoUrl} onChange={handleChange}/>
                {errors.logoUrl && <p className="text-red-500 text-sm">{errors.logoUrl}</p>}

                <Button variant={"outline"} type="submit" disabled={isPending}>Create</Button>
                {state && (state.statusCode == 400 || state.statusCode == 500) && <p className="text-red-500">{state.message} : {form.name}</p>}
                {state && (state.statusCode != 400 || state.statusCode != 500) && <p className="text-green-500">{state.message} : {form.name}</p>}
            </form>
        </div>
    );
}
