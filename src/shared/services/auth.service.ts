import { UserEntity } from "@/core/entities/user.entity";
import { LoginBackendData } from "@/core/types/backend/login-backend-data";
import { BASE_URL } from "../constants/api";
import { JwtService } from "./jwt.service";

class AuthService {
  async login(login: string, password: string) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }

    const data: LoginBackendData = await res.json();
    JwtService.setAccessToken(data.accessToken);
    JwtService.setRefreshToken(data.refreshToken);
    return data;
  }

  async signup(
    login: string,
    username: string,
    password: string,
    confirmPassword: string
  ) {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
        username,
        confirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }

    const data: UserEntity = await res.json();
    return data;
  }
}

export const authService = new AuthService();
