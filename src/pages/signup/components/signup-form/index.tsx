"use client";

import Button from "@/shared/components/ui/button";
import Input from "@/shared/components/ui/input";
import { routes } from "@/shared/constants/routes";
import { useAppDispatch } from "@/shared/hooks/app-dispatch.hook";
import { useAppTheme } from "@/shared/hooks/use-theme";
import { authService } from "@/shared/services/auth.service";
import { userActions } from "@/shared/store/slices/user.slice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, useState } from "react";
import s from "./signup-form.module.scss";

const SignupForm: FC = () => {
  useAppTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [login, setLogin] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [error, setError] = useState("");

  const { setUser } = userActions;

  const loginChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const passwordConfirmChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const usernameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const signupHandler = async () => {
    if (!login || !username || !password || !passwordConfirm) {
      return;
    }

    try {
      const user = await authService.signup(
        login,
        username,
        password,
        passwordConfirm
      );
      dispatch(setUser(user));
      await authService.login(login, password);
      router.push(routes.profile);
    } catch (error: any) {
      setError("Invalid data");
    }
  };

  return (
    <div className={s["signup-form"]}>
      <div className={s["signup-form__field"]}>
        <label>Username</label>
        <Input value={username} onChange={usernameChangeHandler} />
      </div>
      <div className={s["signup-form__field"]}>
        <label>Login</label>
        <Input value={login} onChange={loginChangeHandler} />
      </div>
      <div className={s["signup-form__field"]}>
        <label>Password</label>
        <Input
          type="password"
          value={password}
          onChange={passwordChangeHandler}
        />
      </div>
      <div className={s["signup-form__field"]}>
        <label>Confirm password</label>
        <Input
          type="password"
          value={passwordConfirm}
          onChange={passwordConfirmChangeHandler}
        />
      </div>
      <div className={s["signup-form__hint"]}>
        <small>
          Already have an account? <Link href={routes.login}>Login</Link>
        </small>
      </div>
      <Button
        as="button"
        size="medium"
        onClick={signupHandler}
        className={s["signup-form__submit"]}
      >
        Sign Up
      </Button>
      <div className={s["signup-form__error"]}>{error}</div>
    </div>
  );
};

export default SignupForm;
