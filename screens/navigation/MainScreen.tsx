import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../Home';
import AnalysisReport from '../AnalysisReport';
import MyPage from '../MyPage';

import CustomTabBar from './TabBar';

const Tab = createBottomTabNavigator();

import {NavigationProp} from '@react-navigation/native';
import Dialog from '../Dialog';

function MainScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}): React.JSX.Element {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="홈" component={Home} initialParams={navigation} />
      <Tab.Screen name="대화 기록" component={Dialog} />
      <Tab.Screen name="분석 리포트" component={AnalysisReport} />
      <Tab.Screen name="마이 페이지" component={MyPage} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;
