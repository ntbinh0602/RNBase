import {View, StyleSheet, FlatList, RefreshControl, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {wp} from '../../styles/commonStyles';
import CardRequest from './components/CardRequest';
import HeaderRequest from './components/HeaderRequest';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/rootParam.type';
import {NavigationStackScreens} from '../../common/enum';
import {clearLS} from '../../utils/auth';
import LeftRequest from './components/LeftRequest';
import {AxiosResponse} from 'axios';
import http from '../../utils/http';
import {Notifications} from '../../types/notification';
import {getSocket} from '../../utils/socket';
import useAuthStore from '../../store/authStore';
import LoadingLayer from '../../components/Loading/LoadingLayer';

type Props = NativeStackScreenProps<
  RootStackParamList,
  NavigationStackScreens.AuthNavigation
>;

const RequestTransferred: React.FC<Props> = ({navigation}) => {
  const {currentUser, getCurrentUser, chooseStore} = useAuthStore();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const onRefresh = useCallback(() => {}, []);

  const fetchNotifications = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const response: AxiosResponse = await http.get('/notification', {
        params: {page, limit},
      });
      const newNotifications = response.data.data;
      setHasMore(newNotifications.length === limit);
      setNotifications(prevNotifications => {
        const existingIds = new Set(prevNotifications.map(n => n.id));
        const filteredNewNotifications = newNotifications.filter(
          (notification: Notifications) => !existingIds.has(notification.id),
        );
        return [...prevNotifications, ...filteredNewNotifications];
      });
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications(page, limit);

    const initialize = async () => {
      const socket = await getSocket(); // Đợi lấy socket

      socket.on('notification.request', (data: Notifications) => {
        setNotifications(prevNotifications => {
          const existingIds = new Set(prevNotifications.map(n => n.id));
          if (!existingIds.has(data.id)) {
            setUnreadCount(prevUnreadCount => prevUnreadCount + 1);

            return [{...data, isRead: false}, ...prevNotifications];
          }
          return prevNotifications;
        });
      });

      return () => {
        socket.off('notification.request');
      };
    };

    initialize();

    return () => {
      getSocket().then(socket => socket.off('notification.request'));
    };
  }, [page, limit]);

  const addDocuments = () => {
    setPage((prevPage: number) => {
      const nextPage = prevPage + 1;
      fetchNotifications(nextPage, limit);
      return nextPage;
    });
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <View style={[styles.container]}>
      <LoadingLayer />
      {/* <View style={styles.contentWrapper}>
        <HeaderRequest />
        <View style={{flex: 1, marginTop: 20}}>
          <FlatList
            data={notifications}
            keyExtractor={item => item.id.toString()}
            numColumns={3}
            renderItem={({item}) => <CardRequest item={item} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            scrollEventThrottle={250}
            onEndReached={info => {
              addDocuments();
            }}
            onEndReachedThreshold={0.01}
            ListFooterComponent={
              <View
                style={{
                  padding: 15,
                }}>
                {hasMore && (
                  <Text style={{fontWeight: '600'}}>Đang tải thêm...</Text>
                )}
              </View>
            }
            columnWrapperStyle={styles.row}
          />
        </View>
      </View>
      <View style={styles.sidebar}>
        <LeftRequest
          onLogoutPress={() => {
            navigation.replace(NavigationStackScreens.AuthNavigation);
            clearLS();
          }}
        />
      </View> */}
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
