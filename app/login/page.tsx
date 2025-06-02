import { redirect } from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import { isAuthenticated } from '@/lib/auth';

export const metadata = {
  title: 'Connexion | Memecoins',
  description: 'Connectez-vous pour gérer les memecoins',
};

export default async function LoginPage() {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    redirect('/');
  }

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
      <LoginForm />
    </div>
  );
}