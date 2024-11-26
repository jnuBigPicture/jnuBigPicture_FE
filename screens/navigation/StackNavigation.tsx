import React from 'react';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import MainScreen from './MainScreen';
import LoginScreen from '../LoginScreen';
import Chat from '../Chat';

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
      <Stack.Screen name="Main" options={{headerShown: false}}>
        {() => <MainScreen navigation={Stack.Navigator}/>}
      </Stack.Screen>
    ) : (
      <Stack.Screen name="Login" options={{headerShown: false}}>
        {() => <LoginScreen setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
    )}
    <Stack.Screen name='Chat' component={Chat} />
  </Stack.Navigator>
);

export default StackNavigation;