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
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label className="block">Nom</label>
        <input name="name" value={form.name} onChange={handleChange} className="border p-2 w-full" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div>
        <label className="block">Symbole</label>
        <input name="symbol" value={form.symbol} onChange={handleChange} className="border p-2 w-full" />
        {errors.symbol && <p className="text-red-500 text-sm">{errors.symbol}</p>}
      </div>
      <div>
        <label className="block">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="border p-2 w-full" />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>
      <div>
        <label className="block">Logo URL</label>
        <input name="logoUrl" value={form.logoUrl} onChange={handleChange} className="border p-2 w-full" />
        {errors.logoUrl && <p className="text-red-500 text-sm">{errors.logoUrl}</p>}
      </div>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Ajouter</button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  )
}
