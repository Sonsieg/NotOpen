import React, {useState} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
    }
  };

  return (
    <View style={styles.view}>
      <StatusBar />
      <KeyboardAwareScrollView
        enableOnAndroid
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}>
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
          onCodeFilled={goLogin}
          placeholderTextColor={`#9932cc`}
          editable={true}
          selectionColor={`#9932cc`}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 45,
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
    width: '100%',
    height: 120,
  },
  view: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OTP;
