import { cookies } from "next/headers";


export async function getCurrentUser () {

    const cookieStore = await cookies();
    const currentUser = cookieStore.get('current_user')

    return currentUser?.value;
}