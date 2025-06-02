'use client';

import Link from 'next/link';
import { useAuth } from '../lib/hooks/useAuth';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export default function Header() {
	const { isAuthenticated } = useAuth();

	const baseLinks = [
		{ href: '/demos', label: 'Demos' },
		{ href: '/posts', label: 'Posts' },
		{ href: '/memecoins', label: 'Memecoins' },
		{ href: '/alternatives', label: 'Alternatives' }
	];

	return (
		<header className="bg-white border-b">
			<div className="flex items-center justify-between p-4">
				<Link href="/" className="text-xl font-light">
					NextJS Demo App
				</Link>

				<NavigationMenu>
					<NavigationMenuList>
						{baseLinks.map((link) => (
							<NavigationMenuItem key={link.href}>
								<NavigationMenuLink
									href={link.href}
									className={navigationMenuTriggerStyle()}
								>
									{link.label}
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}

						{isAuthenticated === null ? null : isAuthenticated ? (
							<NavigationMenuItem>
								<form action="/api/logout" method="POST">
									<button
										type="submit"
										className={navigationMenuTriggerStyle()}
									>
										Logout
									</button>
								</form>
							</NavigationMenuItem>
						) : (
							<NavigationMenuItem>
								<NavigationMenuLink
									href="/login"
									className={navigationMenuTriggerStyle()}
								>
									Login
								</NavigationMenuLink>
							</NavigationMenuItem>
						)}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</header>
	);
}
