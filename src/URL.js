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
          <TouchableOpacity style={styles.save} onPress={onLogin}>
            <Text>Save URL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch} onPress={onLogin}>
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
});
export default URL;
