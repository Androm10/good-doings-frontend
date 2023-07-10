import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserEntity } from "@/core/entities/user.entity";
import { BASE_URL } from "@/shared/constants/api";
import { JwtService } from "@/shared/services/jwt.service";

interface UserState {
  user: UserEntity | null;
}

const initialState: UserState = {
  user: null,
};

export const fetchProfile = createAsyncThunk("user/profile", async () => {
  const res = await fetch(`${BASE_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${JwtService.getAccessToken()}`,
    },
  });

  const data = await res.json();
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserEntity | null>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProfile.fulfilled,
      (state, action: PayloadAction<UserEntity>) => {
        state.user = action.payload;
      }
    );
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
