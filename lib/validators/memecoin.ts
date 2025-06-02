import { MemecoinFieldError } from "@/types/memecoinFieldError";

export function checkMemecoin(
    name: string,
    symbol: string,
    description: string,
    logoUrl: string
): MemecoinFieldError[] {
    const errors: MemecoinFieldError[] = [];

    if (!name || name.length < 4 || name.length > 16) {
        errors.push({
            field: "name",
            description: "Name must be between 4 and 16 characters and is required.",
        });
    }

    if (!symbol || symbol.length < 2 || symbol.length > 4 || !/^[A-Z]+$/.test(symbol)) {
        errors.push({
            field: "symbol",
            description: "Symbol must be between 2 and 4 uppercase characters and is required.",
        });
    }

    if (description && description.length > 1000) {
        errors.push({
            field: "description",
            description: "Description must be 0 to 1000 characters.",
        });
    }

    if (
        logoUrl &&
        (logoUrl.length > 200 || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(logoUrl))
    ) {
        errors.push({
            field: "logoUrl",
            description: "Logo URL must be a valid URL and up to 200 characters.",
        });
    }

    return errors;
}