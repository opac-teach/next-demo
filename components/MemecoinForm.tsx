import { useState } from 'react'

export default function MemecoinForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ name: '', symbol: '', description: '', logoUrl: '' })
  const [errors, setErrors] = useState<any>({})
  const [message, setMessage] = useState<string | null>(null)

  const validate = () => {
    const errs: any = {}
    if (!form.name || form.name.length < 4 || form.name.length > 16) {
      errs.name = 'Le nom doit faire entre 4 et 16 caractères'
    }
    if (!form.symbol || !/^[A-Z]{2,4}$/.test(form.symbol)) {
      errs.symbol = 'Le symbole doit contenir 2 à 4 lettres majuscules'
    }
    if (form.description.length > 1000) {
      errs.description = 'La description ne doit pas dépasser 1000 caractères'
    }
    if (form.logoUrl && !/^https?:\/\/.+\..+/.test(form.logoUrl)) {
      errs.logoUrl = 'URL du logo invalide'
    }
    return errs
  }

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    setMessage(null)
    if (Object.keys(validationErrors).length > 0) return

    try {
      const res = await fetch('https://nuxt-demo-blush.vercel.app/api/create-memecoin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Erreur inconnue')
      setMessage('Memecoin ajouté avec succès !')
      setForm({ name: '', symbol: '', description: '', logoUrl: '' })
      onSuccess()
    } catch (err: any) {
      setMessage(`Erreur: ${err.message}`)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 mb-6 bg-white/80 shadow-xl rounded-xl px-8 py-8 border border-gray-200"
    >
      <h2 className="text-xl font-bold text-center mb-2 text-green-700">Créer un Memecoin</h2>
      <div>
        <label className="block font-semibold text-gray-700 mb-1">Nom</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition ${
            errors.name ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <label className="block font-semibold text-gray-700 mb-1">Symbole</label>
        <input
          name="symbol"
          value={form.symbol}
          onChange={handleChange}
          className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition ${
            errors.symbol ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errors.symbol && <p className="text-red-500 text-xs mt-1">{errors.symbol}</p>}
      </div>
      <div>
        <label className="block font-semibold text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition resize-none ${
            errors.description ? 'border-red-400' : 'border-gray-300'
          }`}
          rows={3}
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
      </div>
      <div>
        <label className="block font-semibold text-gray-700 mb-1">Logo URL</label>
        <input
          name="logoUrl"
          value={form.logoUrl}
          onChange={handleChange}
          className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition ${
            errors.logoUrl ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errors.logoUrl && <p className="text-red-500 text-xs mt-1">{errors.logoUrl}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-green-700 text-white font-semibold py-2 rounded-lg shadow hover:bg-green-500 transition"
      >Ajouter
      </button>
      {message && (
        <p
          className={`text-center text-sm mt-2 ${
            message.startsWith('Erreur') ? 'text-red-600' : 'text-green-700'
          }`}
        >
          {message}
        </p>
      )}
    </form>
  )
}
