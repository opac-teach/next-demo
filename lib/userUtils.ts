'use server';

import bcrypt from "bcrypt";
import jwt, {Secret} from "jsonwebtoken";
import {User} from "@/app/generated/prisma";
import {cookies} from "next/headers";
import prisma from "@/lib/prisma";
import {redirect} from "next/navigation";

const secretKey: Secret = process.env.JWT_SECRET || 'secret';

async function encrypt(password: string){
    return await bcrypt.hash(password, 10);
}

function createAccessToken(password: string) {
    const token = jwt.sign(password, secretKey, {
        algorithm: "HS256",
    });
    return token;
};

export async function getUser(): Promise<User> {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    if (!session){
        throw new Error("Something went wrong");
    }
    const id: string | undefined = jwt.decode(session?.value)?.toString();
    if (id == null) {
        throw new Error("Something went wrong");
    }
    const user: User | null = await prisma.user.findUnique({
        where: {id: parseInt(id)},
    });
    if (user == null) {
        throw new Error("Something went wrong");
    }
    return user;
}

export async function login(prevState: never, formData: FormData) {
    const password = formData.get("password") as string;
    const email = formData.get("email") as string;
    const user = await prisma.user.findUnique({
        where: {email: email},
    });

    if (!user) {
        throw new Error("Something went wrong");
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    const id: string = user.id.toString();
    if (!passwordValid) {
        return JSON.parse(JSON.stringify({error: 401}));
    }
    const jwt = createAccessToken(id);

    const cookieStore = await cookies();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookieStore.set('session', jwt, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
    // Redirection après écriture du cookie
    redirect('/prisma/coins');
}

export async function register(prevState: never, formData: FormData) {
    const password = formData.get("password") as string;
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const hashedPassword = await encrypt(password);
    try {
        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            },
        });
    }catch (e)
    {
        console.log(e);
    }
    redirect('/login');
}

export async function logout() {
    const cookieStore = await cookies();
    try {
        cookieStore.delete('session');
    } catch (e) {
        console.error("Error deleting cookie", e);
        return e;
    }
    redirect('/login');
}