import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function MainScreen({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>> }): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>메인 화면</Text>
    </View>
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