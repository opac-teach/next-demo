'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const memecoinSchema = z.object({
  name: z.string().min(4, 'Le nom doit comporter au moins 4 caractères').max(16, 'Le nom doit comporter au maximum 16 caractères'),
  symbol: z.string().min(2, 'Le symbole doit comporter au moins 2 caractères').max(4, 'Le symbole doit comporter au maximum 4 caractères')
    .refine(val => /^[A-Z]+$/.test(val), { message: 'Le symbole doit contenir uniquement des lettres majuscules' }),
  description: z.string().max(1000, 'La description doit comporter au maximum 1000 caractères').optional(),
  logoUrl: z.string().max(200, 'L\'URL du logo doit comporter au maximum 200 caractères')
    .url('L\'URL du logo doit être une URL valide')
    .optional()
    .or(z.literal(''))
});

export type FormState = {
  errors?: {
    name?: string[];
    symbol?: string[];
    description?: string[];
    logoUrl?: string[];
    _form?: string[];
  };
  success?: boolean;
  message?: string;
};

export async function createMemecoin(prevState: FormState, formData: FormData): Promise<FormState> {

  const validatedFields = memecoinSchema.safeParse({
    name: formData.get('name'),
    symbol: formData.get('symbol'),
    description: formData.get('description') || undefined,
    logoUrl: formData.get('logoUrl') || undefined,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
      message: 'Validation échouée. Veuillez corriger les erreurs ci-dessous.'
    };
  }

  const memecoinData = validatedFields.data;

  try {
    const response = await fetch('https://nuxt-demo-blush.vercel.app/api/create-memecoin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memecoinData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        errors: {
          _form: [data.message || 'Erreur lors de la création du memecoin']
        },
        success: false,
        message: 'Échec de la création du memecoin'
      };
    }

    revalidatePath('/memecoins');

    return {
      success: true,
      message: 'Memecoin créé avec succès!'
    };
  } catch (error) {
    return {
      errors: {
        _form: ['Erreur de connexion. Veuillez réessayer.']
      },
      success: false,
      message: 'Erreur lors de la création du memecoin'
    };
  }
}