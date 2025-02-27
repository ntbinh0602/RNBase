import http from 'src/shared/utils/http';
import { create } from 'zustand';
import { showError } from 'src/shared/utils/error';
import { Params } from 'src/types/params.type';
import { Request, RequestCounts, RequestProduct } from 'src/types/request.type';
import { notification } from 'antd';
import { RequestStatus } from 'src/shared/common/enum';

export interface FilterRequest extends Params {
  zoneId?: string;
  tableId?: string;
  type?: string;
}

interface ConfirmRequestBody {
  status: 'CONFIRMED' | 'REJECTED' | 'INPROGRESS';
  rejectReason?: string;
  requestProducts?: RequestProduct[];
}

interface RequestStore {
  requests: Request[];
  detailRequest: Request | null;
  total: number;
  isLoading: boolean;
  error: string | null;
  fetchRequests: (params: FilterRequest) => Promise<void>;
  fetchRequestHistory: (params: FilterRequest) => Promise<void>;
  getRequestDetail: (id: string | undefined) => Promise<void>;
  confirmOrRejectRequest: (id: string, data: ConfirmRequestBody) => Promise<void>;
  setRequests: (updater: Request[] | ((prev: Request[]) => Request[])) => void;
  getRequestCounts: (sessionId: string, params: FilterRequest) => Promise<RequestCounts>;
  clearDetailRequest: () => void;
}

const useRequestStore = create<RequestStore>((set) => ({
  requests: [],
  detailRequest: null,
  total: 0,
  isLoading: false,
  error: null,
  clearDetailRequest: () => {
    set({ detailRequest: null });
  },
  setRequests: (updater) =>
    set((state) => {
      const newRequests = typeof updater === 'function' ? updater(state.requests) : updater;
      return {
        requests: newRequests,
        total: state.total + 1
      };
    }),
  fetchRequests: async (params: FilterRequest) => {
    set({ isLoading: true, error: null });
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { page, limit, ...filterParams } = params;
      const response = await http.get('/request', { params: filterParams });
      set({
        requests: response.data.data,
        total: response.data.totalItems,
        isLoading: false
      });
    } catch (error) {
      showError({ error, title: 'Lấy thông tin yêu cầu thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  getRequestDetail: async (id: string | undefined) => {
    set({ isLoading: true, error: null });
    try {
      const response = await http.get(`/request/${id}`);
      set({
        detailRequest: response.data,
        isLoading: false
      });
    } catch (error) {
      showError({ error, title: 'Lấy thông tin chi tiết thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  confirmOrRejectRequest: async (id: string, data: ConfirmRequestBody) => {
    set({ isLoading: true, error: null });
    try {     
      await http.put(`/request/confirm/${id}`, data);
      set({ isLoading: false });
      notification.success({
        message: data?.status === RequestStatus.CONFIRMED || RequestStatus.INPROGRESS  ? 'Xác nhận yêu cầu thành công' : 'Hủy yêu cầu thành công',
      });
    } catch (error) {
      showError({ error, title: 'Cập nhật trạng thái yêu cầu thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },
  fetchRequestHistory: async (params: FilterRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await http.get('/request/history', { params });
      set({
        requests: response.data.data,
        total: response.data.totalItems,
        isLoading: false
      });
    } catch (error) {
      showError({ error, title: 'Lấy lịch sử yêu cầu thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  getRequestCounts: async (sessionId: string, params: FilterRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await http.get(`/request/count/${sessionId}`, { params });
      set({
        isLoading: false
      });
      return response.data;
    } catch (error) {
      showError({ error, title: 'Lấy thông tin yêu cầu thất bại' });
      set({ isLoading: false });
      throw error;
    }
  }
}));

export default useRequestStore;
