import { FC } from "react";
import SignupForm from "./components/signup-form";
import s from "./signup-page.module.scss";

const SignupPage: FC = () => {
  return (
    <div className={s["signup-page"]}>
      <div className={s["signup-page__form"]}>
        <h2>Good Doings</h2>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
