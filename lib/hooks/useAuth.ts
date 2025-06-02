'use client';

import { useEffect, useState } from "react";

export function useAuth() {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

	const checkAuth = async () => {
		const res = await fetch('/api/session');
		const data = await res.json();
		setIsAuthenticated(data.authenticated);
	};

	useEffect(() => {
		checkAuth();

		// Listen to custom events like "auth:change"
		const handler = () => checkAuth();
		window.addEventListener('auth:change', handler);

		return () => {
			window.removeEventListener('auth:change', handler);
		};
	}, []);

	return { isAuthenticated, refreshAuth: checkAuth };
}
