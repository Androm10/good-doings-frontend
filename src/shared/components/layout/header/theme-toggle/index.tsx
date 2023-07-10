"use client";

import Toggle from "@/shared/components/ui/toggle";
import { Themes } from "@/shared/constants/themes";
import { useAppTheme } from "@/shared/hooks/use-theme";
import { FC } from "react";

const ThemeToggle: FC = () => {
  const [theme, setTheme] = useAppTheme();
  const changeThemeHandler = () => {
    const newTheme = theme === Themes.light ? Themes.dark : Themes.light;
    setTheme(newTheme);
  };
  return (
    <div>
      <Toggle checked={theme === Themes.light} onChange={changeThemeHandler} />
    </div>
  );
};

export default ThemeToggle;
