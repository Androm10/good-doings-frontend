import { FC, PropsWithChildren } from "react";
import Footer from "./footer";
import Header from "./header";
import s from "./layout.module.scss";

const Layout: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  return (
    <div className={s.layout}>
      <div className={s.layout__header}>
        <Header />
      </div>
      <div className={s.layout__body}>{children}</div>
      <div className={s.layout__footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
