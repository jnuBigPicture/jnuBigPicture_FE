import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  StatusBar,
} from 'react-native';
import BootSplash from "react-native-bootsplash";
import { getAccessToken } from '@react-native-seoul/kakao-login';
import MainScreen from './screens/navigation/MainScreen';
import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './screens/navigation/StackNavigation';

function App(): React.JSX.Element {
  // 토큰 확인하는 변수
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const init = async () => {
      // 앱 초기화 작업 (예: 로컬 저장소에서 토큰이나 설정 값 가져오면 됨.
      try {
        const tokenInfo = await getAccessToken(); // 카카오 라이브러리를 이용해 토큰 확인
        if(tokenInfo) {
          console.log("토큰 이씀", tokenInfo.accessToken);
          setIsLoggedIn(true); // 메인 화면으로 넘어가는 상태로 설정
        } else {
          console.log("토큰 엄는듯,,,");
          setIsLoggedIn(false); // 로그인 화면으로 넘어가는 상태로 설정
        }
      }
      catch (error) {
        console.error("로그인 상태 확인 중 오류: ", error);
        setIsLoggedIn(false); // 로그인 화면으로 넘어가는 상태로 설정
      }
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <StackNavigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 100,
    backgroundColor: "#FFFFFF"
  },
  resultContainer: {
    width: "100%",
    padding: 24,
  },
  button: {
    backgroundColor: "#FEE500",
    borderRadius: 40,
    borderWidth: 1,
    width: 250,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    textAlign: "center",
  },
});

export default App;