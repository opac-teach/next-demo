'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createMemecoinAction } from '@/app/actions/createMemecoin';
import { CreateMemecoinPayload } from '@/lib/types';

type ValidationErrors = {
	name?: string;
	symbol?: string;
	description?: string;
	logoUrl?: string;
};

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
				pending ? 'opacity-70 cursor-not-allowed' : ''
			}`}
		>
			{pending ? 'Creating...' : 'Create Memecoin'}
		</button>
	);
}

export default function CreateMemecoinForm({ onSuccess }: { onSuccess: () => void }) {
	const [formData, setFormData] = useState<CreateMemecoinPayload>({
		name: '',
		symbol: '',
		description: '',
		logoUrl: '',
	});
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [formResult, setFormResult] = useState<{ success: boolean; message: string } | null>(null);

	const validateForm = (): boolean => {
		const newErrors: ValidationErrors = {};

		if (!formData.name || formData.name.length < 4 || formData.name.length > 16) {
			newErrors.name = 'Name must be 4-16 characters';
		}
		if (!formData.symbol || formData.symbol.length < 2 || formData.symbol.length > 4 || formData.symbol !== formData.symbol.toUpperCase()) {
			newErrors.symbol = 'Symbol must be 2-4 uppercase letters';
		}
		if (formData.description && formData.description.length > 1000) {
			newErrors.description = 'Max 1000 characters';
		}
		if (formData.logoUrl) {
			if (formData.logoUrl.length > 200) {
				newErrors.logoUrl = 'Max 200 characters';
			} else {
				try {
					new URL(formData.logoUrl);
				} catch {
					newErrors.logoUrl = 'Invalid URL';
				}
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setFormResult(null);

		if (!validateForm()) return;

		try {
			const result = await createMemecoinAction(formData);
			setFormResult(result);
			setFormData({ name: '', symbol: '', description: '', logoUrl: '' });
			onSuccess();
		} catch (err) {
			setFormResult({
				success: false,
				message: err instanceof Error ? err.message : 'An unexpected error occurred',
			});
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name as keyof ValidationErrors]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-xl font-bold mb-4">Create New Memecoin</h2>

			{formResult && (
				<div className={`mb-4 p-3 rounded ${formResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
					{formResult.message}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
				{['name', 'symbol', 'description', 'logoUrl'].map((field) => {
					const isTextArea = field === 'description';
					const label = field.charAt(0).toUpperCase() + field.slice(1);
					return (
						<div key={field}>
							<label htmlFor={field} className="block text-sm font-medium text-gray-700">
								{label} {field === 'name' || field === 'symbol' ? <span className="text-red-500">*</span> : ''}
							</label>
							{isTextArea ? (
								<textarea
									id={field}
									name={field}
									value={formData[field as keyof CreateMemecoinPayload] as string}
									onChange={handleChange}
									rows={3}
									className={`mt-1 block w-full px-3 py-2 border ${
										errors[field as keyof ValidationErrors] ? 'border-red-500' : 'border-gray-300'
									} rounded-md shadow-sm`}
									placeholder={`${label} (optional, max 1000 chars)`}
								/>
							) : (
								<input
									type="text"
									id={field}
									name={field}
									value={formData[field as keyof CreateMemecoinPayload] as string}
									onChange={handleChange}
									className={`mt-1 block w-full px-3 py-2 border ${
										errors[field as keyof ValidationErrors] ? 'border-red-500' : 'border-gray-300'
									} rounded-md shadow-sm`}
									placeholder={
										field === 'symbol'
											? 'Symbol (2-4 uppercase letters)'
											: field === 'logoUrl'
											? 'Logo URL (optional)'
											: ''
									}
								/>
							)}
							{errors[field as keyof ValidationErrors] && (
								<p className="mt-1 text-sm text-red-600">{errors[field as keyof ValidationErrors]}</p>
							)}
						</div>
					);
				})}

				<div className="flex items-center justify-end">
					<SubmitButton />
				</div>
			</form>
		</div>
	);
}
