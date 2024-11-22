import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function AnalysisReport(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>분석 리포트 화면</Text>
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

export default AnalysisReport;