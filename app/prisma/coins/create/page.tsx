'use client';

import {useActionState} from "react";
import {createMemecoin} from "@/lib/coinUtils";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import Link from "next/link";


export default function CreateCoin() {

    const [state, formAction, isPending] = useActionState(createMemecoin, null)

    return (
        <div className="min-h-auto pt-16 bg-gray-50 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-start w-full">
                    <h1 className="text-center">Create Coin</h1>
                    <p>Fill in the form to create a new coin</p>
                    <form action={formAction}>
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" name="name" placeholder="Enter coin name" required/>
                        <Label htmlFor="symbol">Symbol</Label>
                        <Input type="text" name="symbol" placeholder="Enter coin symbol" required/>
                        <Label htmlFor="description">Description</Label>
                        <Textarea name="description" placeholder="Enter coin description"></Textarea>
                        <Label htmlFor="logoUrl">Logo URL</Label>
                        <Input type="text" name="logoUrl" placeholder="Enter logo URL"/>
                        <Button type="submit" disabled={isPending}>Create Coin</Button>
                    </form>
                </div>
                <Link href="/prisma/coins"
                      className="mt-4 mb-4 font-bold data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4">
                    Back
                </Link>
        </div>
    )
}