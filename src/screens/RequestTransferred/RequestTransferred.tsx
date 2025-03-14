import React, {useRef, useState} from 'react';
import {
  View,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import WebView from 'react-native-webview';

const RequestTransferred = () => {
  const webViewRef = useRef<WebView>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [canRefresh, setCanRefresh] = useState(true); // Chỉ cho phép refresh khi ở đầu trang

  const onRefresh = () => {
    if (!canRefresh) return; // Chỉ refresh khi đang ở đầu trang
    setRefreshing(true);
    webViewRef.current?.reload();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const onScroll = (event: any) => {
    const {contentOffset} = event.nativeEvent;
    setCanRefresh(contentOffset.y <= 0); // Nếu y <= 0 => đang ở đầu trang, có thể refresh
  };

  return (
    <View style={{flex: 1}}>
      {refreshing && (
        <ActivityIndicator
          size="large"
          color="blue"
          style={{position: 'absolute', top: 20, alignSelf: 'center'}}
        />
      )}
      <WebView
        ref={webViewRef}
        source={{
          uri: 'https://ctynamviet.1erp.vn/request/order?page=1&limit=12',
        }}
        style={{flex: 1}}
        onLoadEnd={() => setCanRefresh(true)} // Reset trạng thái sau khi load xong
      />
    </View>
  );
};

export default RequestTransferred;
