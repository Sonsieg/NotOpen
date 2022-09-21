import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

const URL = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');

  const onLogin = () => {
    navigation.navigate('WebViewScreen', {
      uri: value,
    });
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        alignItems: 'center',
      }}>
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
        />
        <View>
          <TouchableOpacity
            style={{width: '100%', marginTop: 20}}
            onPress={onLogin}>
            <Text>Go webview</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    width: 250,
    height: 40,
    borderRadius: 8,
    borderWidth: 2,
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
});
export default URL;
