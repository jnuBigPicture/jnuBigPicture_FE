import React from 'react';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import MainScreen from './MainScreen';
import LoginScreen from '../LoginScreen';
import Chat from '../Chat';
import Customization from '../Customization';

const Stack = createStackNavigator();

const StackNavigation = ({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: null | boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}) => (
  <Stack.Navigator>
    {isLoggedIn ? (
      <Stack.Screen name="메인" options={{headerShown: false}}>
        {({ navigation }) => <MainScreen navigation={navigation} />}
      </Stack.Screen>
    ) : (
      <Stack.Screen name="로그인" options={{headerShown: false}}>
        {() => <LoginScreen setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
    )}
    <Stack.Screen name='채팅' component={Chat} />
    <Stack.Screen name='사용자화' component={Customization} />
  </Stack.Navigator>
);

export default StackNavigation;