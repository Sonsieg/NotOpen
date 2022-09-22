import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useNavigation} from '@react-navigation/native';

const OTP = () => {
  const [otp, setOTP] = useState('');
  const navigation = useNavigation();

  const onCode = code => {
    setOTP(code);
  };

  const goLogin = () => {
    if (otp === '1892') {
      navigation.navigate('URL');
      setOTP('');
    }
  };

  return (
    <View style={styles.view}>
      <StatusBar />
      <OTPInputView
        style={styles.OTP}
        pinCount={4}
        onCodeChanged={onCode}
        code={otp}
        autoFocusOnLoad
        keyboardType="number-pad"
        codeInputFieldStyle={[
          styles.underlineStyleBase,
          otp.length === 4 && {borderColor: `#9932cc`},
        ]}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        placeholderTextColor={`#9932cc`}
        editable={true}
        selectionColor={`#9932cc`}
      />
      <TouchableOpacity style={styles.button} onPress={goLogin}>
        <Text>Go webview</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 40,
    height: 50,
    borderWidth: 2,
    borderColor: 'gray',
    fontSize: 20,
    color: `#9932cc`,
    fontFamily: 'cs',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  underlineStyleHighLighted: {
    borderColor: `#9932cc`,
    fontSize: 20,
    color: `#9932cc`,
    fontFamily: 'cs',
  },
  OTP: {
    height: 120,
  },
  view: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  button: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default OTP;
