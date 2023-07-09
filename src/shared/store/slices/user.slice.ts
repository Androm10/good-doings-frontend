import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserEntity } from "@/core/entities/user.entity";

interface UserState {
  user: UserEntity | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserEntity | null>) {
      state.user = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
