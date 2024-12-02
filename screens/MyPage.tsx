import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { login, logout, getProfile, getAccessToken } from '@react-native-seoul/kakao-login';

const MyPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);

  // 추가 기능 관련 상태
  const [showFAQ, setShowFAQ] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  // FAQ 개별 질문 상태 관리
  const [faqAnswers, setFaqAnswers] = useState({
    question1: false,
    question2: false,
    question3: false,
  });

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

  const toggleFaqAnswer = (key) => {
    setFaqAnswers((prev) => ({ ...prev, [key]: !prev[key] }));
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

      {/* 공지사항 */}
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => setShowNotice(!showNotice)}
      >
        <Text style={styles.sectionButtonText}>공지사항</Text>
      </TouchableOpacity>
      {showNotice && (
        <View style={styles.sectionContent}>
          <Text>현재 앱은 테스트 버전입니다. 문의 사항은 support@app.com으로 연락주세요.</Text>
        </View>
      )}

      {/* 자주 묻는 질문 */}
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => setShowFAQ(!showFAQ)}
      >
        <Text style={styles.sectionButtonText}>자주 묻는 질문</Text>
      </TouchableOpacity>
      {showFAQ && (
        <View style={styles.sectionContent}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => toggleFaqAnswer('question1')}
          >
            <Text style={styles.optionText}>이 앱은 무엇인가요?</Text>
          </TouchableOpacity>
          {faqAnswers.question1 && (
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>이 앱은 사용자의 편의를 위한 다양한 기능을 제공합니다.</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => toggleFaqAnswer('question2')}
          >
            <Text style={styles.optionText}>어떻게 로그인을 하나요?</Text>
          </TouchableOpacity>
          {faqAnswers.question2 && (
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>로그인 버튼을 클릭하여 카카오 계정으로 로그인하세요.</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => toggleFaqAnswer('question3')}
          >
            <Text style={styles.optionText}>기능이 작동하지 않아요.</Text>
          </TouchableOpacity>
          {faqAnswers.question3 && (
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>
                문제가 발생할 경우 앱을 다시 실행하거나 고객센터에 문의하세요.
              </Text>
            </View>
          )}
        </View>
      )}

      {/* 설정 */}
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => setShowSettings(!showSettings)}
      >
        <Text style={styles.sectionButtonText}>설정</Text>
      </TouchableOpacity>
      {showSettings && (
        <View style={styles.sectionContent}>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>알림 설정</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>계정 관리</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>앱 정보</Text>
          </TouchableOpacity>
        </View>
      )}
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
  sectionContent: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  answerContainer: {
    backgroundColor: '#e6f7ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  answerText: {
    fontSize: 14,
    color: '#333',
  },
});

export default MyPage;
