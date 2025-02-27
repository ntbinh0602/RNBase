import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {fontSize} from '../../../styles/commonStyles';
import Icon from '../../../common/icons';

const HeaderRequest = () => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.requestBox}>
        <Text style={styles.requestText}>Yêu cầu gọi món</Text>
        <TouchableOpacity
          style={{backgroundColor: 'white'}}
          onPress={() => console.log('123123')}>
          <View style={styles.sortWrapper}>
            <Icon type="Foundation" name={'filter'} color="#005FAB" size={26} />
            <Text style={styles.sortText}>Sắp xếp</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => console.log('123')}
        style={styles.storeBox}>
        <Icon type="FontAwesome5" name={'store'} color="#EA580C" />
        <Text numberOfLines={1} style={styles.storeText}>
          Cửa hàng MobiFone - 586 Nguyễn...
        </Text>
      </TouchableOpacity>
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
  rowContainer: {
    flexDirection: 'row',
  },
  requestBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    flex: 0.7,
    marginRight: 16,
  },
  requestText: {
    fontSize: fontSize.font15,
    color: 'black',
    fontWeight: '600',
  },
  sortWrapper: {
    flexDirection: 'row',
  },
  sortText: {
    color: '#005FAB',
    fontSize: fontSize.font14,
    fontWeight: '600',
    marginLeft: 10,
  },
  storeBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    flex: 0.3,
  },
  storeText: {
    fontSize: fontSize.font14,
    color: '#EA580C',
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default HeaderRequest;
