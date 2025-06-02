import { createMemecoin } from "@/lib/memecoin";
import type { MemecoinFieldErrorType } from "@/types/memecoinFieldError";
import { Label } from "@radix-ui/react-label";
import { useActionState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function MemecoinForm({ onSuccess }: { onSuccess: () => void }) {
    const [state, formAction, isPending] = useActionState(async (_prevState: null, formData: FormData) => {
        const result = await createMemecoin(null, formData);
        if (!result.errors) {
            onSuccess();
        }
        return result;
    }, null);

    return (
        <form action={formAction}>
            <Label htmlFor="name">Name</Label>
            <LabelError field="name" state={state} />
            <Input id="name" type="text" name="name" />

            <Label htmlFor="symbol">Symbole</Label>
            <LabelError field="symbol" state={state} />
            <Input id="symbol" type="text" name="symbol" />

            <Label htmlFor="description">Description</Label>
            <LabelError field="description" state={state} />
            <Input id="description" type="text" name="description" />

            <Label htmlFor="logoUrl">Logo URL</Label>
            <LabelError field="logoUrl" state={state} />
            <Input id="logoUrl" type="text" name="logoUrl" />

            <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create"}
            </Button>
        </form>
    );
}

function LabelError({ field, state }: { field: string; state: { errors?: MemecoinFieldErrorType[] } | null }) {
    const error = state?.errors?.find((err) => err.field === field);
    if (!error) return null;
    return (
        <Label className="p-2 text-red-500" htmlFor={field}>
            {error.description}
        </Label>
    );
}