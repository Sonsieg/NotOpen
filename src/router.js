import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OTP from './OTP';
import URL from './URL';
import WebViewScreen from './WebView';

const Stack = createStackNavigator();

function Router() {
  return (
    <Stack.Navigator initialRouteName="OTP">
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
      <Stack.Screen name="URL" component={URL} />
    </Stack.Navigator>
  );
}
export default Router;
