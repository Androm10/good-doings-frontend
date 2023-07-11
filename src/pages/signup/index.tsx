import { FC, ReactElement } from "react";
import SignupForm from "@shared/components/auth/signup-form";
import s from "./signup-page.module.scss";
import type { NextPageWithLayout } from "../_app";

const SignupPage: NextPageWithLayout = () => {
  return (
    <div className={s["signup-page"]}>
      <div className={s["signup-page__form"]}>
        <h2>Good Doings</h2>
        <SignupForm />
      </div>
    </div>
  );
};

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default SignupPage;
