import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';

function Customization({}): React.JSX.Element {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Customization[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const CustomizationData = await getCustomization();
        setData(CustomizationData);
      } catch (error) {
        console.error('사용자화 데이터를 가져오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({item}: {item: Customization}) => renderCustomization(item);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const response = await addCustomizaiton(newMessage);
      console.log(response);
      setNewMessage('');
      const updatedData = [
        ...data,
        {id: String(data.length + 1), requirement: newMessage},
      ];
      setData(updatedData);
    }
  };

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={renderItem}
        />
      )}
      <View style={styles.messageSendContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="요구사항을 입력하세요."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface Customization {
  id: string;
  requirement: string;
}

const getCustomization = async (): Promise<Customization[]> => {
  // const response = await fetch('https://reactnative.dev/movies.json');
  const json = {
    data: [
      {id: '1', requirement: '인형 이름은 말랑핑이야.'},
      {id: '2', requirement: '아이 이름은 예솔이야.'},
      {id: '3', requirement: '예솔이 또래 친구처럼 이야기해줘.'},
      {id: '3', requirement: '유치원에서 어땠는지 매일 물어봐.'}
    ],
  };
  return json.data;
};

const addCustomizaiton = async (requirement: string) => {
  try {
    const response = await fetch(
      'https://your-server-endpoint.com/sendMessage',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requirement: requirement,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('요구사항 추가 실패');
    }
    return await response.json();
  } catch (error) {
    console.error('요구사항 추가 중 오류 발생:', error);
  }
};

const renderCustomization = (customizationProp: Customization) => {
  return (
    <View style={styles.messageContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.requirementText}>{`• ${customizationProp.requirement}`}</Text>
      </View>
      <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Button Pressed')}>
        <Text>삭제버튼</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textContainer: {
    flex: 1,
  },
  requirementText: {
    fontSize: 16,
    color: '#333',
  },
  iconButton: {
    padding: 5
  },
  messageSendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    width: '100%',
    paddingHorizontal: 8,
  },
  textInput: {
    flex: 1,
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  sendButton: {
    height: 48, // 버튼 높이 텍스트 박스와 일치
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 12,
    marginLeft: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: '#888',
  },
});

export default Customization;
