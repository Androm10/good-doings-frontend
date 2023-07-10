import s from "./profile-layout.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className={s["profile-layout__header"]}>HEADER</header>
      <div>{children}</div>
      <footer>footer</footer>
    </div>
  );
}
