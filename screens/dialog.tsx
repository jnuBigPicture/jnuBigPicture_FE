import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, FlatList, TextInput } from 'react-native';

function ChatHistory(): React.JSX.Element {
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
      const updatedData = [...data, {id: String(data.length + 1), sender: '인형', message: newMessage}];
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
      
      <TextInput
        style={styles.textInput}
        placeholder="메시지를 입력하세요"
        value={newMessage}
        onChangeText={setNewMessage}
      />
      
      <Button title="Send" onPress={handleSendMessage} />
    </View>
  );
}

interface Chat {
  id: string;
  sender: string;
  message: string;
}

const getChatData = async (): Promise<Chat[]> => {
  const json = {
    data: [
      {id: '1', sender: '인형', message: '예솔아 유치원 다녀왔어?'},
      {id: '2', sender: '예솔', message: '응. 그런데 나 유치원에서 안좋은 일 있었어.'},
      {id: '3', sender: '인형', message: '유치원에서 무슨 일 있었어?'},
      {id: '4', sender: '예솔', message: '지안이가 돼지라고 놀렸어.'},
      {id: '5', sender: '인형', message: '이런. 우리 예솔이 많이 속상했겠다. 그래서 예솔이는 뭐라고 했어?'},
    ],
  };
  return json.data;
};

const sendMessage = async (message: string) => {
  try {
    const response = await fetch('https://your-server-endpoint.com/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
      }),
    });
    
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
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 16,
    paddingLeft: 8,
    marginBottom: 16,
  },
});

export default ChatHistory;