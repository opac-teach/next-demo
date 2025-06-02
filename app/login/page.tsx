import Login from "@/components/auth/Login";
import Logout from "@/components/auth/Logout";
import { isAuth } from "@/services/api/auth";


const LoginPage = async () => {

    const isUserAuth = await isAuth()

  return (
    <div>
        {
            !isUserAuth ? (
                <Login/>
            ) : (
                <Logout/>
            )
        }
    </div>
  );
};

export default LoginPage; 