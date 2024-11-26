import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

function HomeScreen({navigation}): React.JSX.Element {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={[styles.header, styles.t_bold]}>내 인형</Text>
        </View>
        <View style={styles.outline}>
            <View style={[styles.buttonContainer, styles.h_300]}>
                <Image
                    source={require('../assets/teddy-bear.png')}
                    style={styles.teddyIcon}
                />
                {!isConnected && (
                    <>
                        <Image
                            source={require('../assets/teddy-bear.png')}
                            style={[styles.teddyIcon, styles.grayscale]}
                        />
                        <View style={styles.overlay}>
                        <Text style={styles.overlayText}>인형이 연결되어 있지 않습니다.</Text>
                        </View>
                    </>
                )}
            </View>
            <View style={{ flexDirection : 'row'}}>
                <View style={styles.buttonContainer}>
                    <Text style={[{alignSelf:'flex-start'}, styles.t_bold]}>인형 사용자화</Text>
                    <Text>
                        말투, 성격, 중시하는 대화 내용들을 설정할 수 있어요.
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={[{alignSelf:'flex-start'}, styles.t_bold]}>메시지 보내기</Text>
                    <Text>
                        인형에게 할 말을 전달해요.
                    </Text>
                    <Button title="버튼" onPress={() => navigation.navigate('Chat')} />
                </View>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  t_bold: {
    fontWeight: 'bold',
  },
  header: {
    fontSize: 32,
    marginBottom: 20,
    },
  headerContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  teddyIcon: {
    width: 130,
    height: 130,
  },
  h_300: {
    paddingVertical: 140,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#ffffff',
  },
  outline: {
    width: '95%',
  },
  buttonContainer: {
    flex:1,
    marginHorizontal: 10,
    marginBottom:20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 20,
    padding: 15,
    minHeight: 170,
  },
  grayscale: {
    tintColor: 'gray',
    opacity: 0.65,
    position: 'absolute',
  },
  overlay: {
    position: 'absolute', // 문구를 이미지 위에 겹치게 설정
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  overlayText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HomeScreen;