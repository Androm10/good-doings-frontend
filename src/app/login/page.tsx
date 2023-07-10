import { FC } from "react";
import LoginForm from "./components/login-form";
import s from "./login-page.module.scss";

const LoginPage: FC = () => {
  return (
    <div className={s["login-page"]}>
      <div className={s["login-page__form"]}>
        <h2>Good Doings</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
