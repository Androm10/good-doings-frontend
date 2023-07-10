import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserEntity } from "@/core/entities/user.entity";
import { BASE_URL } from "@/shared/constants/api";
import { JwtService } from "@/shared/services/jwt.service";
import { ApiService } from "@/shared/services/api.service";

interface UserState {
  user: UserEntity | null;
  error: Error | null;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk("user/profile", async () => {
  const res = await ApiService.Instance.get<UserEntity>(`/user/profile`);
  return res;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserEntity | null>) {
      state.user = action.payload;
      state.isLoading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProfile.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      fetchProfile.fulfilled,
      (state, action: PayloadAction<UserEntity>) => {
        state.user = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(
      fetchProfile.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.isLoading = false;
      }
    );
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
