import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home';
import ChatHistory from './ChatHistory';
import AnalysisReport from './AnalysisReport';
import MyPage from './MyPage';

const Tab = createBottomTabNavigator();

import HomeIcon from '../assets/icons/home.png'
import ChatHistoryIcon from '../assets/icons/chat-history.png'
import AnalysisReportIcon from '../assets/icons/analysis-report.png'
import MyPageIcon from '../assets/icons/my-page.png'
import { Image } from 'react-native';

function MainScreen({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>> }): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconSource;
          
          if (route.name === '홈') {
            iconSource = HomeIcon;
          } else if (route.name === '대화 기록') {
            iconSource = ChatHistoryIcon;
          } else if (route.name === '분석 리포트') {
            iconSource = AnalysisReportIcon;
          } else if (route.name === '마이 페이지') {
            iconSource = MyPageIcon;
          }

          return (
            <Image
              source={iconSource}
              style={{ width: size * 0.8, height: size * 0.8, tintColor: color }}
            />
          );
        },
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={{
              color,
              fontWeight: focused ? 'bold' : 'normal',
              fontSize: 12,
            }}
          >
            {route.name}
          </Text>
        ),
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: '#828282',
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        headerShown: false,
      })}
      >

      <Tab.Screen name="홈" component={Home} />
      <Tab.Screen name="대화 기록" component={ChatHistory} />
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