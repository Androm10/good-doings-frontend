import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Themes } from '@shared/constants/themes';

interface ThemeState {
  theme: Themes;
}

const initialState: ThemeState = {
  theme: Themes.light,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Themes>) {
      state.theme = action.payload;
    },
  },
});

export const themeReducer = themeSlice.reducer;
export const themeActions = themeSlice.actions;
