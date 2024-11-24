import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import OAuthService from "../OAuthService";

function LoginScreen({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>> }): React.JSX.Element {
    const [result, setResult] = useState<string>("");

    const handleLogin = async () => {
        const token = await OAuthService.signInWithKakao();
        if (token) {
            setResult(JSON.stringify(token));
            setIsLoggedIn(true); // 로그인 성공시 메인 화면으로 전환
        }
      };
    
      return (
        <View style={styles.container}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logoImage}
          />
          <Image
            source={require("../assets/login-text-image.png")}
            style={styles.loginTextImage}
          />
          <Pressable style={styles.button} onPress={handleLogin}>
            <Image 
              source={require("../assets/kakao-symbol.png")} // 카카오 심볼 이미지
              style={styles.symbol}
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>카카오로 시작하기</Text>
          </Pressable>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingVertical: 80,
      alignItems: 'center',
    },
    logoImage: {
      width: 150,
      height: 150,
    },
    loginTextImage: {
      width: 300,
      height: 215,
      resizeMode: "contain",
    },
    button: {
      flexDirection: "row",
      backgroundColor: "#FEE500",
      padding: 10,
      paddingHorizontal: 20,
      borderRadius: 12,
      alignItems: "center",
    },
    symbol: {
      width: 24,
      height: 24,
      marginRight: 10,
    },
    buttonText: {
      fontSize: 16,
      color: "#000",
      fontWeight: "bold",
      opacity: 0.85,
    },
  });
  
  export default LoginScreen;