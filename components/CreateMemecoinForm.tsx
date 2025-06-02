'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createMemecoin } from '@/lib/api'

type Field = 'name' | 'symbol' | 'description' | 'logoUrl'
type Values = Record<Field, string>
type Errors = Partial<Record<Field, string>>

export default function CreateMemecoinForm() {
  const router = useRouter()
  const [values, setValues]     = useState<Values>({
    name: '',
    symbol: '',
    description: '',
    logoUrl: '',
  })
  const [errors, setErrors]     = useState<Errors>({})
  const [message, setMessage]   = useState<string>('')
  const [isPending, startTransition] = useTransition()

  // validation ok
  const validate = (vals: Values): Errors => {
    const errs: Errors = {}
    if (!vals.name || vals.name.length < 4 || vals.name.length > 16) {
      errs.name = 'Name must be between 4 and 16 characters'
    }
    if (!/^[A-Z]{2,4}$/.test(vals.symbol)) {
      errs.symbol = 'Symbol must be 2–4 uppercase letters'
    }
    if (vals.description.length > 1000) {
      errs.description = 'Description max 1000 chars'
    }
    if (vals.logoUrl && !/^https?:\/\/.+\..+/.test(vals.logoUrl)) {
      errs.logoUrl = 'Logo URL is invalid'
    }
    return errs
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>
  ) => {
    const field = e.target.name as Field
    const value = e.target.value
    const newVals = { ...values, [field]: value }
    const fieldErrs = validate(newVals)
    setErrors((prev) => {
      const errMsg = fieldErrs[field]
      if (errMsg) {
        return { ...prev, [field]: errMsg }
      } else {
        const { [field]: _, ...rest } = prev
        return rest
      }
    })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>
  ) => {
    const field = e.target.name as Field
    const value = e.target.value
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      const { [field]: _, ...rest } = prev
      return rest
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    setMessage('')
  
    const allErrors = validate(values)
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors)
      return
    }
  
    const form = e.currentTarget
  
    startTransition(async () => {
      try {
        setMessage('Envoi en cours…')
        await createMemecoin(values)
        console.log("OK")
        setMessage("C'est bon !")
        form.reset()
        router.refresh()
      } catch (err: any) {
        console.error(err)
        setMessage(`Erreur : ${err.message}`)
      }
    })
  }
  
  const isSubmitDisabled =
    isPending ||
    !values.name.trim() ||
    !values.symbol.trim() ||
    Object.keys(errors).length > 0

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 p-4 border rounded-lg">
      <div>
        <label className="block font-medium">Name *</label>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full border rounded p-2"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div>
        <label className="block font-medium">Symbol *</label>
        <input
          name="symbol"
          value={values.symbol}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full border rounded p-2"
        />
        {errors.symbol && <p className="text-red-500 text-sm">{errors.symbol}</p>}
      </div>
      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full border rounded p-2"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>
      <div>
        <label className="block font-medium">Logo URL</label>
        <input
          name="logoUrl"
          value={values.logoUrl}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full border rounded p-2"
        />
        {errors.logoUrl && (
          <p className="text-red-500 text-sm">{errors.logoUrl}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitDisabled}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {isPending ? 'Envoi…' : 'Créer'}
      </button>

      {message && <p className="mt-2">{message}</p>}
    </form>
  )
}