'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

export default function LoginPage() {
	const router = useRouter();
	const { isAuthenticated } = useAuth();
	const [error, setError] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		const res = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password }),
		});

		if (res.ok) {
			window.dispatchEvent(new Event('auth:change'));
			router.push('/memecoins');
		} else {
			const data = await res.json();
			setError(data.error || 'Login failed');
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			router.replace('/memecoins');
		}
	}, [isAuthenticated, router]);
	return (
		<div className="p-8 max-w-md mx-auto">
			<h1 className="text-2xl font-bold mb-4">
				Login
			</h1>
			<form onSubmit={handleLogin} className="space-y-4">
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Enter password"
					className="border rounded px-4 py-2 w-full"
				/>
				{
					error && <p className="text-red-500 text-sm">{error}</p>
				}
				<button className="bg-indigo-600 text-white px-4 py-2 rounded">
					Login
				</button>
			</form>
		</div>
	);
}
