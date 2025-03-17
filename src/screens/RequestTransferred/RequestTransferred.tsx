import React, {useRef, useState} from 'react';
import {
  View,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import WebView from 'react-native-webview';

const RequestTransferred = () => {
  return (
    <View style={{flex: 1}}>
      <WebView
        useWebView2={true}
        mixedContentMode={'always'}
        originWhitelist={['https://*', 'wss://*']}
        source={{uri: 'https://ctynamviet.1erp.vn/'}}
      />
    </View>
  );
};

export default RequestTransferred;
