import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';

interface Report {
  id: Number;
  title: String;
  data: String;
}

function AnalysisReport(): React.JSX.Element {
  const [isLoading, setLoading] = useState(true);
  const [report, setReport] = useState<Report>({
    id: 0,
    title: '',
    data: '',
  });

  const getMovies = async () => {
    try {
      // const response = await fetch('https://reactnative.dev/movies.json');
      const response = {
        json: async () => ({
          id: '1',
          title: '감정 상태 요약',
          data: '주요 감정 : 슬픔, 자존감 저하\n감정 빈도 : 슬픔 및 혼란스러운 표현이 언급됨\n심리 상태 및 분석\n자존감 저하: 아이가 유치원에서 외모에 대한 놀림을 받으며 이에 대한 언급이 자아존중감에 영향을 주는 것으로 판단됨\n부모님을 위한 조언\n긍정적 자아상 강화: 아이의 장점을 칭찬하거나 긍정적인 자아 인식을 가질 수 있는 대화를 통해 자존감을 키워주세요.\n감정 표현 격려: 아이가 속상한 마음을 자유롭게 표현할 수 있도록 격려해주세요.',
        }),
      };
      const json = await response.json();
      setReport({
        id: Number(json.id),
        title: json.title,
        data: json.data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />{' '}
          {/* 큰 크기 로딩 */}
        </View>
      ) : (
        <>
          <Text style={styles.title}>{report.title}</Text>
          <Image
            source={require('../assets/report-image.png')}
            style={{width: 200, height: 200, alignSelf: 'center'}}
          />
          <Text style={styles.data}>{report.data}</Text>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  data: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnalysisReport;
