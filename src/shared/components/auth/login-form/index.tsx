import Button from "@/shared/components/ui/button";
import Input from "@/shared/components/ui/input";
import { routes } from "@/shared/constants/routes";
import { useAppTheme } from "@/shared/hooks/use-theme";
import { authService } from "@/shared/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, useState } from "react";
import s from "./login-form.module.scss";

const LoginForm: FC = () => {
  useAppTheme();

  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const loginChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginHandler = async () => {
    if (!login || !password) return;

    try {
      await authService.login(login, password);
      router.push(routes.profile);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className={s["login-form"]}>
      <div className={s["login-form__field"]}>
        <label>Login</label>
        <Input value={login} onChange={loginChangeHandler} />
      </div>
      <div className={s["login-form__field"]}>
        <label>Password</label>
        <Input
          type="password"
          value={password}
          onChange={passwordChangeHandler}
        />
      </div>
      <div className={s["login-form__hint"]}>
        <small>
          Don't have an account? <Link href={routes.signup}>Sign Up</Link>
        </small>
      </div>
      <Button
        size="medium"
        className={s["login-form__submit"]}
        as="button"
        onClick={loginHandler}
      >
        Login
      </Button>
      <div className={s["login-form__error"]}>{error}</div>
    </div>
  );
};

export default LoginForm;
