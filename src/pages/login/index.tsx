import { FC, ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import LoginForm from "@shared/components/auth/login-form";
import s from "./login-page.module.scss";

const LoginPage: NextPageWithLayout = () => {
  return (
    <div className={s["login-page"]}>
      <div className={s["login-page__form"]}>
        <h2>Good Doings</h2>
        <LoginForm />
      </div>
    </div>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default LoginPage;
