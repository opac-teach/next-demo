'use client';

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useActionState, useState} from "react";
import {register} from "@/lib/userUtils";


export default function Register(){

    const [toggle, setToggle] = useState("password");
    const [hide, setHide] = useState("Show");
    const [state, formAction, isPending] = useActionState(register, null);

    function togglePassword() {
        setToggle(toggle === "password" ? "text" : "password");
        setHide(hide === "Show" ? "Hide" : "Show");
    }

    return (
            <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col items-center justify-start w-full">
                    <h1 className="text-center mb-4">Register</h1>
                    <form className="flex flex-col items-start justify-start max-w-md" action={formAction}>
                        <Label htmlFor="name">Nickname</Label>
                        <Input type="text" name="name" placeholder="John Doe" required/>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" name="email" placeholder="john.doe@email.com" required/>
                        <Label htmlFor="password">Password</Label>
                        <Input type={toggle} name="password" placeholder="password" required/>
                        <Label className="cursor-pointer underline text-center" onClick={togglePassword}>{hide} password</Label>
                        <Button className="mt-4" type="submit" disabled={isPending}>Register</Button>
                    </form>
                </div>
            </div>
    )
}