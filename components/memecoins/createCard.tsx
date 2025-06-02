"use client";
import React, { useState } from "react";

type FormState = {
  name: string;
  symbol: string;
  logoUrl: string;
  description: string;
};

type FormError = Partial<Record<keyof FormState, string>> & { submit?: string };

const initialState: FormState = {
  name: "",
  symbol: "",
  description: "",
  logoUrl: "",
};

const CreateMemecoinForm = ({ onCreated }: { onCreated?: () => void }) => {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormError>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate(values: FormState): FormError {
    const errs: FormError = {};
    if (!values.name || values.name.length < 4 || values.name.length > 16) {
      errs.name = "Le nom doit faire entre 4 et 16 caractères.";
    }
    if (
      !values.symbol ||
      values.symbol.length < 2 ||
      values.symbol.length > 4 ||
      !/^[A-Z]+$/.test(values.symbol)
    ) {
      errs.symbol = "Le symbole doit faire 2 à 4 lettres MAJUSCULES.";
    }
    if (values.description && values.description.length > 1000) {
      errs.description = "Description trop longue (max 1000 caractères).";
    }
    if (
      values.logoUrl &&
      (values.logoUrl.length > 200 ||
        !/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(values.logoUrl))
    ) {
      errs.logoUrl = "URL invalide ou trop longue (max 200 caractères).";
    }
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch(
        "https://nuxt-demo-blush.vercel.app/api/create-memecoin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Erreur lors de la création.");
      setSuccess(true);
      setForm(initialState);
      if (onCreated) onCreated();
    } catch (err) {
      setErrors({ submit: "Erreur lors de la création du memecoin." });
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded shadow mb-8"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4">Créer un Memecoin</h2>
      <div className="mb-3">
        <label className="block font-medium mb-1">
          Nom <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full border rounded px-2 py-1"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          minLength={4}
          maxLength={16}
          required
        />
        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
      </div>
      <div className="mb-3">
        <label className="block font-medium mb-1">
          Symbole <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full border rounded px-2 py-1 uppercase"
          value={form.symbol}
          onChange={(e) =>
            setForm({ ...form, symbol: e.target.value.toUpperCase() })
          }
          minLength={2}
          maxLength={4}
          pattern="[A-Z]+"
          required
        />
        {errors.symbol && (
          <div className="text-red-500 text-sm">{errors.symbol}</div>
        )}
      </div>
      <div className="mb-3">
        <label className="block font-medium mb-1">Description</label>
        <textarea
          className="w-full border rounded px-2 py-1"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          maxLength={1000}
          rows={3}
        />
        {errors.description && (
          <div className="text-red-500 text-sm">{errors.description}</div>
        )}
      </div>
      <div className="mb-3">
        <label className="block font-medium mb-1">Logo URL</label>
        <input
          className="w-full border rounded px-2 py-1"
          value={form.logoUrl}
          onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
          maxLength={200}
          type="url"
          placeholder="https://..."
        />
        {errors.logoUrl && (
          <div className="text-red-500 text-sm">{errors.logoUrl}</div>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Création..." : "Créer"}
      </button>
      {errors.submit && (
        <div className="text-red-500 text-sm mt-2">{errors.submit}</div>
      )}
      {success && (
        <div className="text-green-600 text-sm mt-2">
          Memecoin créé avec succès !
        </div>
      )}
    </form>
  );
};

export default CreateMemecoinForm;