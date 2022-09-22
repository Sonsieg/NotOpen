import React from 'react';
import {WebView} from 'react-native-webview';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const WebViewScreen = props => {
  const {uri} = props?.route?.params;
  console.log('uri', uri);
  const webviewRef = React.useRef(null);

  function webViewGoBack() {
    if (webviewRef && webviewRef.current) webviewRef.current.goBack();
  }

  function webViewNext() {
    if (webviewRef && webviewRef.current) webviewRef.current.goForward();
  }
  function LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }
  return (
    <>
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          source={{uri: uri ? `https://${uri}` : 'https://google.com'}}
          renderLoading={LoadingIndicatorView}
          startInLoadingState={true}
          ref={webviewRef}
        />
        <View style={styles.tabBarContainer}>
          <TouchableOpacity onPress={webViewGoBack}>
            <Text style={styles.text}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Text style={styles.text}>Exit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={webViewNext}>
            <Text style={styles.text}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  flexContainer: {
    flex: 1,
  },
  tabBarContainer: {
    backgroundColor: '#d3d399',
    height: 56,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  button: {
    fontSize: 24,
  },
  arrow: {
    color: '#ef4771',
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {color: 'green', fontWeight: '500'},
});
export default WebViewScreen;
