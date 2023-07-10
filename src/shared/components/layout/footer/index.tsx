import { routes } from "@/shared/constants/routes";
import Link from "next/link";
import { FC } from "react";
import s from "./footer.module.scss";

const Footer: FC = () => {
  return (
    <div className={s.footer}>
      <h2 className={s.footer__logo}>Good Doings</h2>
      <nav className={s.footer__nav}>
        <Link href={routes.doings} className={s.footer__link}>
          My Doings
        </Link>
        <Link href={routes.friends} className={s.footer__link}>
          Friends
        </Link>
        <Link href={routes.profile} className={s.footer__link}>
          Profile
        </Link>
      </nav>
      <div>Copyright ©2023 All rights reserved</div>
    </div>
  );
};

export default Footer;
