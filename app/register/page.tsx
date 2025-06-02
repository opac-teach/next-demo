'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		const res = await fetch('/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		const data = await res.json();

		if (!res.ok) {
			setError(data.error || 'Registration failed');
		} else {
			setSuccess(true);
			setTimeout(() => router.push('/login'), 2000);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
			<h1 className="text-2xl font-bold mb-4">Register</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="w-full p-2 border rounded"
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					minLength={6}
					className="w-full p-2 border rounded"
				/>
				<button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
					Register
				</button>
			</form>
			{error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
			{success && <p className="mt-2 text-green-600 text-sm">Success! Redirecting to login…</p>}
		</div>
	);
}
