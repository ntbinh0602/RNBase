import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {fontSize} from '../../../styles/commonStyles';
import Icon from '../../../common/icons';

type Props = {
  onLogoutPress: () => void;
};

const LeftRequest: React.FC<Props> = ({onLogoutPress}) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>Tổng số món cần thực hiện</Text>

          <View style={styles.itemContainer}>
            <Text style={styles.badge}>2</Text>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>Bánh mỳ nướng muối ớt</Text>
              <Text style={styles.itemNote}>
                Ghi chú: Bánh mỳ nướng không muối, không ớt, không hành.
              </Text>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.badge}>2</Text>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>Bánh mỳ nướng muối ớt</Text>
              <Text style={styles.itemNote}>
                Ghi chú: Bánh mỳ nướng không muối, không ớt, không hành.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutButton} onPress={onLogoutPress}>
            <Icon type="Ionicons" name="exit-outline" color="red" size={24} />
            <Text numberOfLines={1} style={styles.email}>
              tung.nguyenhoang1@mobifone.vn
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  title: {
    color: 'black',
    fontSize: fontSize.font14,
    fontWeight: '600',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  badge: {
    width: 20,
    height: 20,
    backgroundColor: '#005FAB',
    textAlign: 'center',
    fontSize: fontSize.font10,
    color: 'white',
    lineHeight: 20,
    borderRadius: 6,
  },
  itemInfo: {
    gap: 2,
  },
  itemTitle: {
    color: '#27272A',
    fontWeight: '600',
  },
  itemNote: {
    color: '#27272A',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F71E1E1A',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  email: {
    flexShrink: 1,
    paddingRight: 10,
    color: '#000000',
  },
});

export default LeftRequest;
