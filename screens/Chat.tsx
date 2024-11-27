import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

function Chat({}): React.JSX.Element {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Chat[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatData = await getChatData();
        setData(chatData);
        setLoading(false);
      } catch (error) {
        console.error('메시지 데이터를 가져오는 중 오류 발생:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={{flex: 1, padding: 5}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={{flex: 1, padding: 15}}
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
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() =>
            handleSendMessage(newMessage, data, setData, setNewMessage)
          }>
          <Image
            source={require('../assets/send-button.png')}
            style={{width: 20, height: 20, tintColor: '#fff', marginRight: 2}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface Chat {
  id: string;
  sender: string;
  message: string;
}

const renderItem = ({item}: {item: Chat}) => {
  return renderChat(item);
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

const handleSendMessage = async (
  newMessage: string,
  data: Chat[],
  setData: React.Dispatch<React.SetStateAction<Chat[]>>,
  setNewMessage: React.Dispatch<React.SetStateAction<string>>,
) => {
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

const getChatData = async (): Promise<Chat[]> => {
  const json = {
    data: [
      {id: '1', sender: '나', message: '예솔이한테 뽀로로 보기전에 눈높이 학습지 풀라고 해줘.'},
      {
        id: '2',
        sender: '인형',
        message: '예솔이한테 잘 전달했어요.',
      },
      {id: '3', sender: '인형', message: '예솔이 학습지 다 풀고, 저녁으로 시리얼 먹었어요.'},
    ],
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
    borderRadius: 24,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  sendButton: {
    flex: 1,
    height: 48,
    width: 48,
    justifyContent: 'center',
    position: 'absolute',
    right: 8,
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 24,
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
    backgroundColor: '#C9E1FF',
  },
  dollMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E9E9E9',
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
  },
});

export default Chat;
