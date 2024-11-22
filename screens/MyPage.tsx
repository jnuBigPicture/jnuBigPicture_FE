import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function MyPage(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>마이 페이지 화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyPage;