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
      className="w-full max-w-4xl mx-auto p-10 bg-white rounded-2xl shadow-lg border border-green-100"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-extrabold text-center text-green-900 mb-6 tracking-tight">
        Créer un Memecoin
      </h2>
      <div className="mb-4">
        <label className="block font-medium mb-1 text-green-900">
          Nom <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 px-3 py-2 rounded-lg outline-none transition"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          minLength={4}
          maxLength={16}
          required
        />
        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1 text-green-900">
          Symbole <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 px-3 py-2 rounded-lg outline-none transition uppercase"
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
          <div className="text-red-500 text-sm mt-1">{errors.symbol}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1 text-green-900">Description</label>
        <textarea
          className="w-full border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 px-3 py-2 rounded-lg outline-none transition"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          maxLength={1000}
          rows={3}
        />
        {errors.description && (
          <div className="text-red-500 text-sm mt-1">{errors.description}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1 text-green-900">Logo URL</label>
        <input
          className="w-full border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 px-3 py-2 rounded-lg outline-none transition"
          value={form.logoUrl}
          onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
          maxLength={200}
          type="url"
          placeholder="https://..."
        />
        {errors.logoUrl && (
          <div className="text-red-500 text-sm mt-1">{errors.logoUrl}</div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-900 to-green-700 text-white py-2 rounded-lg font-semibold shadow hover:from-green-800 hover:to-green-600 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Création..." : "Créer"}
      </button>
      {errors.submit && (
        <div className="text-red-500 text-sm mt-3 text-center">{errors.submit}</div>
      )}
      {success && (
        <div className="text-green-700 text-sm mt-3 text-center bg-green-50 border border-green-200 rounded p-2">
          Memecoin créé avec succès !
        </div>
      )}
    </form>
  );
};

export default CreateMemecoinForm;