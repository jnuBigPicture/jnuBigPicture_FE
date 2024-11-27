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
  const [data, setData] = useState<Chat[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatData = await getChatData();
        setData(chatData);
      } catch (error) {
        console.error('메시지 데이터를 가져오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({item}: {item: Chat}) => renderChat(item);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const response = await sendMessage(newMessage);

      console.log(response);

      setNewMessage('');
      const updatedData = [
        ...data,
        {id: String(data.length + 1), sender: '인형', message: newMessage},
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
          placeholder="메시지를 입력하세요"
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

interface Requirement {
  id: string;
  requirement: string;
}

const getChatData = async (): Promise<Requirement[]> => {
  // const response = await fetch('https://reactnative.dev/movies.json');
  const json = {
    data: [
      {id: '1', requirement: '인형사용자화'},
      {id: '2', requirement: '인형사용자화'},
      {id: '3', requirement: '인형사용자화'} 
    ]   
  };
  return json.data;
};

const sendMessage = async (message: string) => {
  try {
    const response = await fetch(
      'https://your-server-endpoint.com/sendMessage',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('서버에 메시지 전송 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('메시지 전송 중 오류 발생:', error);
  }
};

const renderChat = (chatProp: Chat) => {
  return (
    <View
      style={[
        styles.messageContainer,
        chatProp.sender === '인형' ? styles.dollMessage : styles.myMessage,
      ]}>
      <Text style={styles.senderText}>{chatProp.sender}</Text>
      <Text style={styles.messageText}>{chatProp.message}</Text>
      <Text style={styles.dateText}>2024.10.11 18:00</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
  messageContainer: {
    padding: 10,
    marginVertical: 8,
    maxWidth: '70%',
    borderRadius: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
  },
  dollMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  senderText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  dateText: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: '#888',
  }
});

export default Customization;
