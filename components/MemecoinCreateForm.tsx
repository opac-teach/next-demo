'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition, useState } from 'react';
import { createMemecoin } from '@/lib/actions';

const schema = z.object({
  name: z.string().min(4).max(16),
  symbol: z.string().min(2).max(4).regex(/^[A-Z]+$/, 'Doit être en MAJUSCULES'),
  description: z.string().max(1000).optional(),
  logoUrl: z.string().url().max(200).optional(),
});
type FormData = z.infer<typeof schema>;

export default function MemecoinCreateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = (data: FormData) =>
    startTransition(async () => {
      setMessage(null);
      try {
        const result = await createMemecoin(data);
        if (result.ok) {
          setMessage('✅ Memecoin créé !');
          reset();
        } else {
          setMessage(`❌ Erreur : ${(result as { ok: false; error: string }).error}`);
        }
      } catch {
        setMessage(`❌ Erreur inconnue`);
      }
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('name')} placeholder="Nom" className="input w-full" />
      {errors.name && <p className="text-red-600">{errors.name.message}</p>}

      <input {...register('symbol')} placeholder="SYM" className="input w-full" />
      {errors.symbol && <p className="text-red-600">{errors.symbol.message}</p>}

      <input {...register('logoUrl')} placeholder="https://..." className="input w-full" />
      {errors.logoUrl && <p className="text-red-600">{errors.logoUrl.message}</p>}

      <textarea {...register('description')} placeholder="Description (facultatif)" className="textarea w-full" rows={4} />
      {errors.description && <p className="text-red-600">{errors.description.message}</p>}

      <button type="submit" disabled={pending} className="btn btn-primary w-full">
        {pending ? 'Création en cours…' : 'Créer'}
      </button>

      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}
