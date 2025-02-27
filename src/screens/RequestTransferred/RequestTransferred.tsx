import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {fontSize, wp} from '../../styles/commonStyles';
import CardRequest from './components/CardRequest';
import HeaderRequest from './components/HeaderRequest';
import Icon from '../../common/Icons';

const RequestTransferred = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(() => {}, []);
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <HeaderRequest />
        <View style={{flex: 1, marginTop: 20}}>
          <FlatList
            data={[
              {id: 1, name: 'Item A\nDòng 2'},
              {id: 2, name: 'Item B'},
              {id: 3, name: 'Item C\nDòng 2\nDòng 3'},
              {id: 4, name: 'Item D'},
              {id: 5, name: 'Item E\nDòng 2\nDòng 3\nDòng 4'},
              {id: 6, name: 'Item F'},
              {id: 7, name: 'Item G\nDòng 2'},
              {id: 8, name: 'Item H'},
              {id: 12, name: 'Item F'},
              {id: 22, name: 'Item G\nDòng 2'},
              {id: 121, name: 'Item H'},
            ]}
            keyExtractor={item => item.id.toString()}
            numColumns={3}
            renderItem={({item}) => <CardRequest item={item} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            scrollEventThrottle={250}
            onEndReachedThreshold={0.01}
            ListFooterComponent={<View style={{padding: 15}} />}
            columnWrapperStyle={styles.row}
          />
        </View>
      </View>
      <View style={styles.sidebar}>
        <View style={{flex: 1, padding: 10}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: fontSize.font14,
                  fontWeight: '600',
                }}>
                Tổng số món cần thực hiện
              </Text>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Text
                  style={{
                    width: 24,
                    height: 24,
                    backgroundColor: '#005FAB',
                    textAlign: 'center',
                    color: 'white',
                    lineHeight: 24,
                    borderRadius: 6,
                  }}>
                  2
                </Text>
                <View style={{gap: 2}}>
                  <Text style={{color: '#27272A', fontWeight: '600'}}>
                    Bánh mỳ nướng muối ớt
                  </Text>
                  <Text>
                    Ghi chú: Bánh mỳ nướng không muối, không ớt, không hành.
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  backgroundColor: '#F71E1E1A',
                  paddingVertical: 4,
                  paddingHorizontal: 10,
                  borderRadius: 6,
                }}
                onPress={() => console.log('123123')}>
                <Icon
                  type="Ionicons"
                  name="exit-outline"
                  color="red"
                  size={24}
                />
                <Text
                  numberOfLines={1}
                  style={{paddingRight: 10, color: '#000000'}}>
                  tung.nguyenhoang1@mobifone.vn
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    flexDirection: 'row',
  },
  contentWrapper: {
    flex: 1,
    padding: 20,
  },
  sidebar: {
    width: wp(20),
    backgroundColor: 'white',
  },

  row: {
    marginRight: -5,
    marginLeft: -5,
  },
});

export default RequestTransferred;
