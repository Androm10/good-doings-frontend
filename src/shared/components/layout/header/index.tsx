import { FC } from "react";
import Profile from "./profile";
import ThemeToggle from "./theme-toggle";
import s from "./header.module.scss";
import Link from "next/link";
import { routes } from "@/shared/constants/routes";

const Header: FC = () => {
  return (
    <div className={s.header}>
      <div className={s.header__nav}>
        <h2 className={s.header__logo}>Good Doings</h2>
        <nav className={s.header__links}>
          <Link href={routes.doings} className={s.header__link}>
            My Doings
          </Link>
          <Link href={routes.friends} className={s.header__link}>
            Friends
          </Link>
          <Link href={routes.profile} className={s.header__link}>
            Profile
          </Link>
        </nav>
      </div>
      <div className={s.header__actions}>
        <Profile />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
