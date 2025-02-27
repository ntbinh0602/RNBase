import http from 'src/shared/utils/http';
import { create } from 'zustand';
import { Params } from 'src/types/params.type';
import { showError } from 'src/shared/utils/error';
import { CreateOrderPayload, Order, PayOrderPayload, UpdateOrderPayload } from 'src/types/order.type';
import { notification } from 'antd';
import { Dayjs } from 'dayjs';
export interface FilterOrder extends Params {
  search?: string;
  status?: string;
  zoneId?: string;
  tableId?: string;
  startDate?: Dayjs | string;
  endDate?: Dayjs | string;
  isHasRemainingRequest?: boolean;
}
interface OrderStore {
  orders: Order[];
  detailOrder: Order | null;
  qrCode: string | null;
  total: number;
  isLoading: boolean;
  setDetailOrder: (order: Order | null) => void;
  createOrder: (data: CreateOrderPayload) => Promise<Order>;
  updateOrder: (id: string, data: UpdateOrderPayload) => Promise<Order>;
  payOrder: (orderId: string | undefined, data: PayOrderPayload) => Promise<Order>;
  fetchOrders: (params: FilterOrder) => Promise<void>;
  getDetailOrder: (id: string | undefined) => Promise<Order>;
  deleteOrder: (id: string | undefined) => Promise<void>;
  generateQRCodePayment: (amount: string) => Promise<string>;
  checkRemainingOrderRequest: (id: string | undefined) => Promise<boolean>;
}

const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  total: 0,
  detailOrder: null,
  qrCode: null,
  isLoading: false,
  setDetailOrder: (order: Order | null) => {
    set({ detailOrder: order });
  },

  createOrder: async (data: CreateOrderPayload) => {
    set({ isLoading: true });
    try {
      const response = await http.post('/order', data);
      set({ isLoading: false, detailOrder: null });
      notification.success({
        message: response?.data?.id ? 'Tạo mới đơn hàng thành công' : 'Đóng phiên thành công'
      });
      return response.data;
    } catch (error) {
      showError({ error, title: 'Tạo mới đơn hàng thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  updateOrder: async (id: string, data: UpdateOrderPayload) => {
    set({ isLoading: true });
    try {
      const response = await http.put(`/order/${id}`, data);
      set({ isLoading: false, detailOrder: null });
      notification.success({
        message: 'Cập nhật đơn hàng thành công'
      });
      return response.data;
    } catch (error) {
      showError({ error, title: 'Cập nhật đơn hàng thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  payOrder: async (orderId: string | undefined, data: PayOrderPayload) => {
    set({ isLoading: true });
    try {
      const response = await http.put(`/order/payment/${orderId}`, data);
      set({ isLoading: false, detailOrder: null });
      return response.data;
    } catch (error) {
      showError({ error, title: 'Tạo mới đơn hàng thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  fetchOrders: async (params: FilterOrder) => {
    set({ isLoading: true });
    try {
      const response = await http.get('/order', { params });
      set({
        orders: response.data.data,
        isLoading: false,
        total: response.data.totalItems,
        detailOrder: null
      });
    } catch (error) {
      showError({ error, title: 'Lấy thông tin đơn hàng thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  getDetailOrder: async (id: string | undefined): Promise<Order> => {
    set({ isLoading: true });
    try {
      const response = await http.get<Order>(`/order/${id}`);
      set({ detailOrder: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      showError({ error, title: 'Lấy chi tiết đơn hàng thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  checkRemainingOrderRequest: async (id: string | undefined): Promise<boolean> => {
    try {
      const response = await http.get<boolean>(`/order/check-remaining-request/${id}`);
      return response.data;
    } catch (error) {
      showError({ error, title: 'Kiểm tra đơn hàng thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  generateQRCodePayment: async (amount: string): Promise<string> => {
    set({ isLoading: true });
    try {
      const response = await http.post(`/qr-code-payment`, { amount });
      set({ qrCode: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      showError({ error, title: 'Lấy mã QR thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  deleteOrder: async (id: string | undefined): Promise<void> => {
    set({ isLoading: true });
    try {
      await http.delete<Order>(`/order/${id}`);
      set({ detailOrder: null, isLoading: false });
      notification.success({
        message: 'Xóa đơn hàng thành công'
      });
    } catch (error) {
      showError({ error, title: 'Xóa đơn hàng thất bại' });
      set({ isLoading: false });
      throw error;
    }
  }
}));

export default useOrderStore;
