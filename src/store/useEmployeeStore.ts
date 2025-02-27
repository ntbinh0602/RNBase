import http from 'src/shared/utils/http';
import { create } from 'zustand';
import { notification } from 'antd';
import { Params } from 'src/types/params.type';
import { showError } from 'src/shared/utils/error';
import { Employee } from 'src/types/employee.type';
import { EmployeePayload, EmployeePayloadWithOutPassword } from 'src/validate/employeeSchema';
import useAuthStore from './authStore';

export interface FilterEmployee extends Params {
  productCategoryId?: string;
  minPrice?: number;
  createdAt?: string;
  status?: string | string[];
}
interface EmployeeStore {
  employees: Employee[];
  total: number;
  isLoading: boolean;
  isLoadingResetPassword: boolean;
  dataResetPassword: null;
  detailEmployee: Employee | null;
  fetchEmployees: (params: FilterEmployee) => Promise<void>;
  createEmployee: (payload: EmployeePayload | EmployeePayloadWithOutPassword) => Promise<void>;
  updateEmployee: (id: string, payload: EmployeePayload | EmployeePayloadWithOutPassword) => Promise<void>;
  getDetailEmployee: (id: string) => Promise<Employee>;
  resetPasswordEmployee: (id: string) => Promise<void>;
  deleteEmployees: (ids: React.Key[]) => Promise<void>;
}

const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  unit: [],
  total: 0,
  detailEmployee: null,
  isLoading: false,
  isLoadingResetPassword: false,
  dataResetPassword: null,

  fetchEmployees: async (params: FilterEmployee) => {
    set({ isLoading: true,  });
    try {
      const response = await http.get('/user', { params });
      set({ employees: response.data.data, isLoading: false, total: response.data.totalItems, dataResetPassword: null, detailEmployee:null });
    } catch (error) {
      showError({ error, title: 'Lấy thông tin nhân viên thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  deleteEmployees: async (ids: React.Key[]) => {
    set({ isLoading: true });
    try {
      await http.delete<React.Key[]>(`/user`, { data: { ids } });
      set({ isLoading: false });
      notification.success({
        message: 'Xóa nhân viên thành công'
      });
    } catch (error) {
      showError({ error, title: 'Xóa nhân viên thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  createEmployee: async (data: EmployeePayload | EmployeePayloadWithOutPassword) => {
    set({ isLoading: true });
    try {
      const response = await http.post('/user', data);
      set({ isLoading: false, detailEmployee: null });
      notification.success({
        message: 'Tạo mới nhân viên thành công'
      });
      return response.data;
    } catch (error) {
      showError({ error, title: 'Tạo mới nhân viên thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  updateEmployee: async (id: string, payload: EmployeePayload | EmployeePayloadWithOutPassword) => {
    set({ isLoading: true });
    try {
      const response = await http.put(`/user/${id}`, payload);
      set({ isLoading: false, detailEmployee: null });
      await useAuthStore.getState().getCurrentUser()
      notification.success({
        message: 'Chỉnh sửa nhân viên thành công'
      });
      return response.data;
    } catch (error) {
      showError({ error, title: 'Chỉnh sửa nhân viên thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  getDetailEmployee: async (id: string): Promise<Employee> => {
    set({ isLoading: true });
    try {
      const response = await http.get<Employee>(`/user/${id}`);
      set({ detailEmployee: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      showError({ error, title: 'Lấy chi tiết nhân viên thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  resetPasswordEmployee: async (id: string) => {
    set({ isLoadingResetPassword: true });
    try {
      const response = await http.put(`/user/reset-password/${id}`);
      notification.success({
        message: "Đặt lại mật khẩu thành công"
      });
      set({ isLoadingResetPassword: false, dataResetPassword: response.data.data });
      return response.data;
    } catch (error) {
      showError({ error, title: 'Đặt lại mật khẩu thất bại' });
      set({ isLoadingResetPassword: false });
      throw error;
    }
  },

}));

export default useEmployeeStore;
