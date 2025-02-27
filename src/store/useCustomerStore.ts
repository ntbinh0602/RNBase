import { create } from 'zustand';
import http from 'src/shared/utils/http';
import { CustomerPayload } from 'src/validate/customerSchema';
import { showError, showErrorMessage } from 'src/shared/utils/error';
import { HistoryOrder } from 'src/types/cart.type';
import { getCustomerInfo } from 'src/shared/utils/auth';
import { CustomerInfo, Customers, PickExistCustomerId } from 'src/types/customer.type';
import useCartStore from './useCartStore';
import { Params } from 'src/types/params.type';
import { Store } from 'src/types/store.type';

export interface FilterCustomer extends Params {}

interface CustomerStore {
  isLoading: boolean;
  error: string | null;
  customers: Customers[];
  total: number;
  customerHistory: HistoryOrder[];
  store: Store | null;
  createCustomer: (id: string, payload: CustomerPayload | PickExistCustomerId) => Promise<void>;
  fetchCustomers: (params: FilterCustomer) => Promise<void>;
  fetchCustomerHistory: () => Promise<void>;
  getStoreByTableId: (tableId: string) => Promise<void>;
}
const inforUser = getCustomerInfo() as CustomerInfo;

export const useCustomerStore = create<CustomerStore>((set) => ({
  isLoading: false,
  error: null,
  total: 0,
  customers: [],
  customerHistory: [],
  store: null,

  createCustomer: async (id, payload: CustomerPayload | PickExistCustomerId) => {
    set({ isLoading: true, error: null });
    try {
      await http.post(`customer/start-order/${id}`, payload);
      const cartStore = useCartStore.getState();
      if (id !== inforUser?.tableId) {
        cartStore.clearCart();
        localStorage.removeItem('cart-storage');
      }
      if (!('customerId' in payload && payload.customerId)) {
        set({ isLoading: true });
      }
    } catch (error) {
      showErrorMessage({ error });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchCustomerHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await http.get('public/request/customer/history');
      set({ customerHistory: response.data });
    } catch (error) {
      showErrorMessage({ error });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchCustomers: async (params: FilterCustomer) => {
    set({ isLoading: true });
    try {
      const response = await http.get('/customer', { params });
      set({ customers: response.data.data, isLoading: false, total: response.data.totalItems });
    } catch (error) {
      showError({ error, title: 'Lấy thông tin khách hàng thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  getStoreByTableId: async (tableId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await http.get('public/table/store/' + tableId);
      set({ store: response.data });
    } catch (error) {
      showErrorMessage({ error });
    } finally {
      set({ isLoading: false });
    }
  }
}));
