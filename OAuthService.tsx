import { Alert } from "react-native";
import {
  login,
  logout,
  getProfile,
  shippingAddresses,
  unlink,
} from "@react-native-seoul/kakao-login";

export default class OAuthService {
  /**
   * 카카오 로그인
   */
  static async signInWithKakao(): Promise<any | null> {
    try {
      const token = await login();
      console.log("로그인 성공:", token.accessToken);
      return token;
    } catch (error) {
      console.error("로그인 실패:", error);
      Alert.alert("로그인 실패", "카카오 로그인 중 오류가 발생했습니다.");
      return null;
    }
  }

  /**
   * 프로필 가져오기
   */
  static async fetchProfile(): Promise<any | null> {
    try {
      const profile = await getProfile();
      console.log("프로필 정보:", profile);
      return profile;
    } catch (error) {
      console.error("프로필 가져오기 실패:", error);
      Alert.alert("프로필 가져오기 실패", "프로필 정보를 가져오는 데 실패했습니다.");
      return null;
    }
  }

  /**
   * 카카오 링크 해제
   */
  static async unlinkKakao(): Promise<string | null> {
    try {
      const message = await unlink();
      console.log("링크 해제 성공:", message);
      return message;
    } catch (error) {
      console.error("링크 해제 실패:", error);
      Alert.alert("링크 해제 실패", "링크 해제 중 오류가 발생했습니다.");
      return null;
    }
  }

  /**
   * 카카오 로그아웃
   */
  static async signOutWithKakao(): Promise<string | null> {
    try {
      const message = await logout();
      console.log("로그아웃 성공:", message);
      return message;
    } catch (error) {
      console.error("로그아웃 실패:", error);
      Alert.alert("로그아웃 실패", "로그아웃 중 오류가 발생했습니다.");
      return null;
    }
  }
}