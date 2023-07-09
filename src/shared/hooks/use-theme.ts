import { useEffect } from "react";
import { Themes } from "../constants/themes";
import { THEME_TOKEN } from "../constants/tokens";
import { themeActions } from "../store/slices/theme.slice";
import { useAppDispatch } from "./app-dispatch.hook";
import { useAppSelector } from "./app-selector.hook";

export const useAppTheme = () => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  const dispatch = useAppDispatch();
  const { setTheme } = themeActions;

  const setCurrentTheme = (name: Themes) => {
    localStorage.setItem(THEME_TOKEN, name);
    document.documentElement.className = "";
    document.documentElement.classList.add(`theme-${name}`);
    dispatch(setTheme(name));
  };

  useEffect(() => {
    const themeNameFromStorage = localStorage.getItem(THEME_TOKEN);

    const currentTheme =
      themeNameFromStorage && themeNameFromStorage in Themes
        ? (themeNameFromStorage as Themes)
        : Themes.light;

    setCurrentTheme(currentTheme);
  }, []);

  return [theme, setCurrentTheme] as const;
};
