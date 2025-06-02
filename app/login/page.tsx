import { LoginForm } from "@/components/Login/Form";
import { Logout } from "@/components/Login/Logout";
import { isValid } from "@/services/api/auth";
import { getCurrentUser } from "@/services/api/user";

const LoginPage = async () => {
    
  const isLogged = await isValid();

   const currentUser = await getCurrentUser();

  return (
    <div>
      {isLogged ? (
        <div className="flex flex-col justify-self-center gap-10">
          <span className="text-center text-xl">Bienvenue {currentUser} !</span>
          <Logout />
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default LoginPage;
