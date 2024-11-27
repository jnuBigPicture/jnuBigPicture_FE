import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  FlatList,
  TextInput,
} from 'react-native';

function Dialog(): React.JSX.Element {
  const nowDate = new Date();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Dialog[]>([]);
  const [dialogDate, setDate] = useState<DialogDate>(getCurrentDate());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatData = await getDialogData();
        setData(chatData);
        setLoading(false);
      } catch (error) {
        console.error('메시지 데이터를 가져오는 중 오류 발생:', error);
      }
    };
    fetchData();
  }, []);

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
    </View>
  );
}

interface Dialog {
  id: string;
  sender: string;
  message: string;
}

interface DialogDate {
  year: number;
  month: number;
  day: number;
}

const getCurrentDate = () => {
  const date = new Date();
  const koreanTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const year = koreanTime.getUTCFullYear();
  const month = String(koreanTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(koreanTime.getUTCDate()).padStart(2, '0');
  return {year: year, month: parseInt(month), day: parseInt(day)};
};

const renderItem = ({item}: {item: Dialog}) => {
  return renderDialog(item);
};

const renderDialog = (chatProp: Dialog) => {
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

const getDialogData = async (): Promise<Dialog[]> => {
  const json = {
    data: [
      {id: '1', sender: '인형', message: '예솔아 유치원 다녀왔어?'},
      {
        id: '2',
        sender: '예솔',
        message: '응. 그런데 나 유치원에서 안좋은 일 있었어.',
      },
      {id: '3', sender: '인형', message: '유치원에서 무슨 일 있었어?'},
      {id: '4', sender: '예솔', message: '지안이가 돼지라고 놀렸어.'},
      {
        id: '5',
        sender: '인형',
        message:
          '이런. 우리 예솔이 많이 속상했겠다. 그래서 예솔이는 뭐라고 했어?',
      },
      {id: '1', sender: '인형', message: '예솔아 유치원 다녀왔어?'},
      {
        id: '2',
        sender: '예솔',
        message: '응. 그런데 나 유치원에서 안좋은 일 있었어.',
      },
      {id: '3', sender: '인형', message: '유치원에서 무슨 일 있었어?'},
      {id: '4', sender: '예솔', message: '지안이가 돼지라고 놀렸어.'},
      {
        id: '5',
        sender: '인형',
        message:
          '이런. 우리 예솔이 많이 속상했겠다. 그래서 예솔이는 뭐라고 했어?',
      },
      {id: '1', sender: '인형', message: '예솔아 유치원 다녀왔어?'},
      {
        id: '2',
        sender: '예솔',
        message: '응. 그런데 나 유치원에서 안좋은 일 있었어.',
      },
      {id: '3', sender: '인형', message: '유치원에서 무슨 일 있었어?'},
      {id: '4', sender: '예솔', message: '지안이가 돼지라고 놀렸어.'},
      {
        id: '5',
        sender: '인형',
        message:
          '이런. 우리 예솔이 많이 속상했겠다. 그래서 예솔이는 뭐라고 했어?',
      },
    ],
  };
  return json.data;
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
});

export default Dialog;
