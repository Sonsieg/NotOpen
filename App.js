import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {RecoilRoot} from 'recoil';
import Router from './src/router';

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
