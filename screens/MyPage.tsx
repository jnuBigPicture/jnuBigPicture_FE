import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { login, logout, getProfile, getAccessToken } from '@react-native-seoul/kakao-login';

const MyPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const initProfile = async () => {
      try {
        const tokenInfo = await getAccessToken();
        if (tokenInfo) {
          setIsLoggedIn(true);
          const userProfile = await getProfile();
          setProfile(userProfile);
          console.log('프로필 정보:', userProfile);
        } else {
          setIsLoggedIn(false);
          setProfile(null);
        }
      } catch (error) {
        console.error('프로필 초기화 중 오류 발생:', error);
      }
    };

    initProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      setProfile(null);
      alert('로그아웃되었습니다.');
    } catch (error) {
      console.error('로그아웃 중 오류:', error);
      alert('로그아웃에 실패했습니다.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>마이페이지</Text>

      {profile ? (
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: profile?.profileImageUrl || 'https://via.placeholder.com/50' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile?.nickname || '닉네임 없음'}</Text>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.logoutText}>로그아웃</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => login().then(() => alert('로그인 완료!'))}
        >
          <Text style={styles.sectionButtonText}>로그인</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.sectionButton}>
        <Text style={styles.sectionButtonText}>공지사항</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.sectionButton}>
        <Text style={styles.sectionButtonText}>자주 묻는 질문</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.sectionButton}>
        <Text style={styles.sectionButtonText}>설정</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    backgroundColor: '#ddd',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutText: {
    fontSize: 14,
    color: '#007bff',
    marginTop: 4,
  },
  sectionButton: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  sectionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyPage;
