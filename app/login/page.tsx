'use client';

import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useActionState, useState} from "react";
import {login} from "@/lib/userUtils";
import Link from "next/link";

export default function Login() {

    const [toggle, setToggle] = useState("password");
    const [hide, setHide] = useState("Show");
    const [state, formAction, isPending] = useActionState(login, null);

    function togglePassword() {
        setToggle(toggle === "password" ? "text" : "password");
        setHide(hide === "Show" ? "Hide" : "Show");
    }

    return (
        <div>
            <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col items-center justify-start w-full">
                    <h1 className="text-center mb-4">Login</h1>
                    <form className="flex flex-col items-center justify-start max-w-md" action={formAction}>
                        <Label htmlFor="email"></Label>
                        <Input type="email" name="email" placeholder="john.doe@email.com" required/>
                        <Label htmlFor="password"></Label>
                        <Input type={toggle} name="password" placeholder="password" required/>
                        <Label className="cursor-pointer underline text-center" onClick={togglePassword}>{hide} password</Label>
                        <Button className="mt-4" type="submit" disabled={isPending}>Login</Button>
                    </form>
                    {state && state.error && <p className="text-red-500">Invalid password</p>}
                    <Link className="mt-4" href="/register"><u>Register</u></Link>
                </div>
            </div>

        </div>
    )
        ;
}