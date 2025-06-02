import { createMemecoin } from "@/lib/actions";
import { Label } from "@radix-ui/react-label";
import { useActionState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type ErrorType = {
    field: string,
    description: string,
}

export default function MemecoinForm({ onSuccess }: { onSuccess: () => void }) {
    const [state, formAction, isPending] = useActionState(createMemecoin, null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const result = await createMemecoin(null, formData)

        if (!result.errors) {
            onSuccess();
            event.currentTarget.reset();
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Label htmlFor="name">Name</Label>
            <LabelError field="name" state={state} />
            <Input type="text" name="name" />
            <Label htmlFor='symbol'>Symbole</Label>
            <LabelError field="symbol" state={state} />
            <Input type="text" name="symbol" />
            <Label htmlFor='description'>Description</Label>
            <LabelError field="description" state={state} />
            <Input type="text" name="description" />
            <Label htmlFor='logoUrl'>LogoUrl</Label>
            <LabelError field="logoUrl" state={state} />
            <Input type="text" name="logoUrl" />
            <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create"}
            </Button>
        </form>
    )
}

function LabelError({ field, state }: { field: string; state: { errors?: ErrorType[] } }) {
    const error = state?.errors?.find((err) => err.field === field);

    if (!error) return null;

    return (
        <Label className='p-2 text-red-500' htmlFor={field}>
            {error.description}
        </Label>
    )
}

