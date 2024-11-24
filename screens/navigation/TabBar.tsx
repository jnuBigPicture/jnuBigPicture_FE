import React from 'react';
import { View, TouchableWithoutFeedback, Text, Image, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    return (
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          // 아이콘과 라벨 가져오기
          const icons: { [key: string]: any } = {
            '홈': require('../../assets/icons/home.png'),
            '대화 기록': require('../../assets/icons/chat-history.png'),
            '분석 리포트': require('../../assets/icons/analysis-report.png'),
            '마이 페이지': require('../../assets/icons/my-page.png'),
          };
  
          const iconSource = icons[route.name];
  
          let label;

          if(typeof options.tabBarLabel === 'string') {
            label = options.tabBarLabel;
          } else if(typeof options.title === 'string') {
            label = options.title;
          } else {
            label = route.name;
          }
  
  
          return (
            <TouchableWithoutFeedback
              key={route.key}
              onPress={onPress}
            >
              <View style={styles.tabItem}>
                <Image
                  source={iconSource}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: isFocused ? '#6200EE' : '#828282',
                  }}
                />
                <Text style={{
                  color: isFocused ? '#6200EE' : '#828282',
                  fontWeight: isFocused ? 'bold' : 'normal',
                  fontSize: 12,
                  marginTop: 4,
                }}>
                  {label}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    tabBar: {
      flexDirection: 'row',
      height: 70,
      backgroundColor: '#FFFFFF',
      borderTopWidth: 0.5,
      borderTopColor: '#E0E0E0',
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  export default TabBar;