'use client';

import {logout} from "@/lib/userUtils";
import {useActionState} from "react";
import {Button} from "@/components/ui/button";

export default function Logout() {

    const [state, formAction, isPending] = useActionState(logout, null)

    return (
            <form className="flex flex-col items-center justify-center w-full" action={formAction}>
                <h1 className="text-center mb-4">Click to logout</h1>
                <Button type="submit" disabled={isPending}>Logout</Button>
            </form>

    )
}