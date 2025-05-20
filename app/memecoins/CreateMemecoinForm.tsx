'use client';

import { useState, useEffect, useActionState } from 'react';
import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { createMemecoin, FormState } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full py-2 px-4 rounded-md text-white font-medium ${
        pending ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
      } transition-colors`}
    >
      {pending ? 'Création en cours...' : 'Créer le memecoin'}
    </button>
  );
}

const initialState: FormState = {
  errors: {},
  success: false,
  message: '',
};

export default function CreateMemecoinForm() {
  const [state, formAction] = useActionState(createMemecoin, initialState);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        setResetKey(prev => prev + 1);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [state.success]);

  return (
    <div key={resetKey} className="border rounded-md p-4">
      {state.success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-md">
          {state.message}
        </div>
      )}

      {state.errors?._form && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
          {state.errors._form.join(', ')}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nom*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`w-full px-3 py-2 border rounded-md ${state.errors?.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Ex: DogeCoin"
            required
            minLength={4}
            maxLength={16}
          />
          {state.errors?.name && (
            <p className="mt-1 text-sm text-red-600">{state.errors.name.join(', ')}</p>
          )}
        </div>

        <div>
          <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 mb-1">
            Symbole*
          </label>
          <input
            type="text"
            id="symbol"
            name="symbol"
            className={`w-full px-3 py-2 border rounded-md ${state.errors?.symbol ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Ex: DOGE"
            required
            minLength={2}
            maxLength={4}
            pattern="[A-Z]+"
            title="Le symbole doit contenir uniquement des lettres majuscules"
          />
          {state.errors?.symbol && (
            <p className="mt-1 text-sm text-red-600">{state.errors.symbol.join(', ')}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className={`w-full px-3 py-2 border rounded-md ${state.errors?.description ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Description du memecoin (optionnel)"
            maxLength={1000}
          ></textarea>
          {state.errors?.description && (
            <p className="mt-1 text-sm text-red-600">{state.errors.description.join(', ')}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Maximum 1000 caractères
          </p>
        </div>

        <div>
          <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-1">
            URL du logo
          </label>
          <input
            type="url"
            id="logoUrl"
            name="logoUrl"
            className={`w-full px-3 py-2 border rounded-md ${state.errors?.logoUrl ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="https://exemple.com/logo.png (optionnel)"
            maxLength={200}
          />
          {state.errors?.logoUrl && (
            <p className="mt-1 text-sm text-red-600">{state.errors.logoUrl.join(', ')}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            URL valide, maximum 200 caractères
          </p>
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}