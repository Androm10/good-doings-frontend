import { UserEntity } from "@/core/entities/user.entity";
import { LoginBackendData } from "@/core/types/backend/login-backend-data";
import { ApiService } from "./api.service";
import { JwtService } from "./jwt.service";

class AuthService {
  async login(login: string, password: string) {
    const data: LoginBackendData =
      await ApiService.Instance.post<LoginBackendData>("/auth/login", {
        login,
        password,
      });
    JwtService.setAccessToken(data.accessToken);
    JwtService.setRefreshToken(data.refreshToken);
  }

  async signup(
    login: string,
    username: string,
    password: string,
    confirmPassword: string
  ) {
    const data = await ApiService.Instance.post<UserEntity>("/auth/signup", {
      login,
      username,
      password,
      confirmPassword,
    });

    return data;
  }
}

export const authService = new AuthService();
