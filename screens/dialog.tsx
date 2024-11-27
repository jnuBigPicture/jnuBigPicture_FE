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
        <>
          <Text style={{textAlign: 'center', color: '#888', marginBottom: 20}}>
            2024.10.11 금요일
          </Text>
          <FlatList
            data={data}
            keyExtractor={({id}) => id}
            renderItem={renderItem}
          />
        </>
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
      <Text
        style={[
          styles.senderText,
          {textAlign: chatProp.sender === '인형' ? 'left' : 'right'},
        ]}>
        {chatProp.sender}
      </Text>
      <Text style={styles.messageText}>{chatProp.message}</Text>
      <Text
        style={[
          styles.dateText,
          {textAlign: chatProp.sender === '인형' ? 'right' : 'left'},
        ]}>
        2024.10.11 18:00
      </Text>
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
      {
        id: '6',
        sender: '예솔',
        message:
          '당황해서 아무말도 못하고 그 자리에서 펑펑 울었어.',
      },
      {
        id: '7',
        sender: '인형',
        message:
          '예솔아. 그런 일 있으면 나한테 말해줘. 내가 예솔이를 도와줄게.',
      },
      {
        id: '8',
        sender: '예솔',
        message:
          '응 그럴게. 고마워 말랑핑.',
      },
      {
        id: '9',
        sender: '인형',
        message:
          '아니야. 예솔이가 힘들어하면 나도 힘들어. 그리고 예솔이가 행복하면 나도 행복해.',
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
    fontSize: 10,
    color: '#888',
    marginTop: 8,
  },
});

export default Dialog;
