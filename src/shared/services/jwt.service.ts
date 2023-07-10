import { ACCESS_JWT_TOKEN, REFRESH_JWT_TOKEN } from "@shared/constants/tokens";

export class JwtService {
  static getAccessToken() {
    const token = localStorage.getItem(ACCESS_JWT_TOKEN);
    if (!token || token == "undefined") {
      return null;
    }
    return token;
  }

  static getRefreshToken() {
    const token = localStorage.getItem(REFRESH_JWT_TOKEN);
    if (!token || token == "undefined") {
      return null;
    }
    return token;
  }

  static setAccessToken(value: string) {
    localStorage.setItem(ACCESS_JWT_TOKEN, value);
  }

  static setRefreshToken(value: string) {
    localStorage.setItem(REFRESH_JWT_TOKEN, value);
  }
}
