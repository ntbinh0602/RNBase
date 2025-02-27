import { notification } from 'antd';
import { RcFile } from 'antd/es/upload';
import { showError } from 'src/shared/utils/error';
import http from 'src/shared/utils/http';
import { uploadFileFn } from 'src/shared/utils/uploadFile';
import { ProfilePayload, ProfileStorePayload } from 'src/validate/userSchema';
import { create } from 'zustand';
import useAuthStore from './authStore';
import { Bank } from 'src/types/user.type';
import { Store } from 'src/types/store.type';
import { Params } from 'react-router-dom';
export interface FilterStores extends Params {
   search?: string;
}
interface ProfileStore {
  isLoading: boolean;
  stores: Store[];
  banks: Bank[];
  detailStore: Store| null;
  total: number;
  updateProfile: ( payload: ProfilePayload, avatar: RcFile | string ) => Promise<void>;
  createStore: ( payload: ProfileStorePayload, thumbnail: RcFile | string ) => Promise<void>;
  updateProfileStore: (id: string, payload: ProfileStorePayload, thumbnail: RcFile | string ) => Promise<void>;
  fetchStores: (params: FilterStores) => Promise<void>;
  getBanks: () => Promise<void>;
  deleteStores: (ids: React.Key[]) => Promise<void>;
  getDetailStore: (id: string) => Promise<Store>;
}

const useProfileStore = create<ProfileStore>((set) => ({
  isLoading: false,
  banks: [],
  detailStore : null,
  total: 0,
  stores: [],

  fetchStores: async (params: FilterStores) => {
    set({ isLoading: true,  });
    try {
      const response = await http.get('/store', { params });
      set({ stores: response.data.data, isLoading: false, total: response.data.totalItems, detailStore: null });
    } catch (error) {
      showError({ error, title: 'Lấy danh sách cửa hàng thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  createStore: async ( data: ProfileStorePayload, thumbnail: RcFile | string ) => {
    set({ isLoading: true });
    try {
      let resFile;
      if (thumbnail && typeof thumbnail !== 'string') {
        resFile = await uploadFileFn(thumbnail as RcFile);
        thumbnail = resFile.link;
      }
      const response = await http.post(`/store`, { ...data, thumbnail });
      set({ isLoading: false });
      notification.success({
        message: 'Tạo mới cửa hàng thành công'
      });
      return response.data;
    } catch (error) {
      showError({ error, title: 'Tạo mới cửa hàng thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  deleteStores: async (ids: React.Key[]) => {
    set({ isLoading: true });
    try {
      await http.delete<React.Key[]>(`/store`, { data: { ids } });
      set({ isLoading: false });
      notification.success({
        message: 'Xóa cửa hàng thành công'
      });
    } catch (error) {
      showError({ error, title: 'Xóa cửa hàng thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  getDetailStore: async (id:string): Promise<Store> => {
    set({ isLoading: true });
    try {
      const response = await http.get<Store>(`/store/${id}`);
      set({ detailStore: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      showError({ error, title: 'Lấy chi tiết công ty thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  updateProfile: async ( data: ProfilePayload, avatar: RcFile | string ) => {
    set({ isLoading: true });
    try {
      let resFile;
      if (avatar && typeof avatar !== 'string') {
        resFile = await uploadFileFn(avatar as RcFile);
        avatar = resFile.link;
      }
      const response = await http.put(`/user/my`, { ...data, avatar });
      await useAuthStore.getState().getCurrentUser()
      set({ isLoading: false });
      notification.success({
        message: 'Chỉnh sửa thông tin tài khoản thành công'
      });
      return response.data;
    } catch (error) {
      showError({ error, title: 'Chỉnh sửa thông tin tài khoản thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  updateProfileStore: async (id: string, data: ProfileStorePayload, thumbnail: RcFile | string ) => {
    set({ isLoading: true });
    try {
      let resFile;
      if (thumbnail && typeof thumbnail !== 'string') {
        resFile = await uploadFileFn(thumbnail as RcFile);
        thumbnail = resFile.link;
      }
      const response = await http.put(`/store/${id}`, { ...data, thumbnail });
      await useAuthStore.getState().getCurrentUser()
      set({ isLoading: false });
      notification.success({
        message: 'Chỉnh sửa thông tin cửa hàng thành công'
      });
      return response.data;
    } catch (error) {
      showError({ error, title: 'Chỉnh sửa thông tin cửa hàng thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  getBanks: async () => {
    set({ isLoading: true });
    try {
      const response = await http.get('/qr-code-payment/bank');
      set({ banks: response.data, isLoading: false });
    } catch (error) {
      showError({ error, title: 'Lấy thông tin thất bại' });
      set({ isLoading: false });
    }
  }
}));

export default useProfileStore;
