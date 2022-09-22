import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import {useListState, useReset} from './atoms';
import Modal from 'react-native-modal';

const URL = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [list, setList] = useListState();
  const [isModalVisible, setModalVisible] = useState(false);
  const resetList = useReset();

  const onLogin = link => {
    navigation.navigate('WebViewScreen', {
      uri: link ?? value,
    });
    closeModal();
  };
  const addItem = () => {
    setList(oldTodoList => [...oldTodoList, value]);
  };

  const openModal = () => {
    setModalVisible(!isModalVisible);
  };
  const closeModal = () => {
    setModalVisible(!isModalVisible);
  };
  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.touchItem} onPress={() => onLogin(item)}>
      <Text numberOfLines={1}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.view}>
      <KeyboardAwareScrollView
        enableOnAndroid
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}>
        <TextInput
          style={[styles.textInput]}
          value={value}
          onChangeText={text => {
            setValue(text);
          }}
          placeholder="Web entry"
          onSubmitEditing={onLogin}
        />
        <View>
          <TouchableOpacity style={styles.save} onPress={addItem}>
            <Text>Save URL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch} onPress={onLogin}>
            <Text>Go webview</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.history} onPress={openModal}>
            <Text>History</Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modal}>
            <View style={styles.header}>
              <Text onPress={resetList}>Delete</Text>
              <Text onPress={closeModal}>Close</Text>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={list || []}
              renderItem={renderItem}
              keyExtractor={(item, index) => {
                return `${index}+${item}`;
              }}
              ListEmptyComponent={() => {
                return (
                  <View style={styles.empty}>
                    <Text numberOfLines={1}>google.com</Text>
                  </View>
                );
              }}
            />
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    width: 250,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    textAlign: 'center',
    color: 'green',
    fontSize: 13,
    backgroundColor: 'white',
    fontFamily: 'cs',
    paddingHorizontal: 40,
  },
  guitarRight: {
    position: 'absolute',
    right: '16%',
    zIndex: 10,
  },
  guitarLeft: {
    position: 'absolute',
    left: '16%',
    zIndex: 10,
  },
  label: {
    top: -5,
    position: 'absolute',
    left: '15%',
  },
  view: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
  save: {
    width: '100%',
    marginTop: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: '#d3f999',
  },
  touch: {
    width: '100%',
    marginTop: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: '#d3d399',
  },
  history: {
    width: '100%',
    marginTop: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: '#d1e449',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
    borderBottomColor: 'gray',
  },
  modal: {
    backgroundColor: 'white',
    width: '100%',
    height: 300,
    padding: 20,
    borderRadius: 10,
  },
  touchItem: {
    marginVertical: 5,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'brown',
    paddingHorizontal: 10,
  },
  empty: {marginTop: 5},
});
export default URL;
