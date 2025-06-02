'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

export default function LoginPage() {
	const router = useRouter();
	const { isAuthenticated } = useAuth();
	const [error, setError] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		const res = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
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
			<h1 className="text-2xl font-bold mb-4">Login</h1>
			<form onSubmit={handleLogin} className="space-y-4">
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					required
					className="border rounded px-4 py-2 w-full"
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					required
					className="border rounded px-4 py-2 w-full"
				/>

				{error && <p className="text-red-500 text-sm">{error}</p>}

				<button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded w-full">
					Login
				</button>

				<p className="mt-4 text-sm text-center">
					Don’t have an account?{' '}
					<a href="/register" className="text-blue-600 underline">
						Register here
					</a>
				</p>
			</form>
		</div>
	);
}
