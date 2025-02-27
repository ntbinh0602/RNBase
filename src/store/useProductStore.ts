import http from 'src/shared/utils/http';
import { Product, ProductPublic, Unit } from 'src/types/product.type';
import { create } from 'zustand';
import { notification } from 'antd';
import { uploadFileFn } from 'src/shared/utils/uploadFile';
import { RcFile } from 'antd/es/upload';
import { Params } from 'src/types/params.type';
import { ProductPayload } from 'src/validate/productSchema';
import { showError, showErrorMessage } from 'src/shared/utils/error';

export interface FilterProduct extends Params {
  productCategoryId?: string;
  minPrice?: number;
  createdAt?: string;
  status?: string | string[];
}
export interface EditStatusProduct extends Params {
  status: string;
}
interface ProductStore {
  productsPublic: [];
  products: Product[];
  unit: Unit[];
  total: number;
  detailProduct: Product | null;
  isLoading: boolean;
  setProducts: (products: Array<Product> | undefined) => void;
  getUnits: () => Promise<void>;
  fetchProducts: (params: FilterProduct) => Promise<void>;
  fetchProductsPublic: () => Promise<void>;
  updateProduct: (id: string, payload: ProductPayload, thumbnail: RcFile | string) => Promise<void>;
  updateStatusProduct: (id: string, payload: EditStatusProduct) => Promise<void>;
  deleteProducts: (ids: React.Key[]) => Promise<void>;
  createProduct: (payload: ProductPayload, thumbnail: RcFile) => Promise<void>;
  getDetailProduct: (id: string) => Promise<Product | undefined>;
}

const useProductStore = create<ProductStore>((set) => ({
  productsPublic: [],
  products: [],
  unit: [],
  total: 0,
  detailProduct: null,
  isLoading: false,

  setProducts: (product: Array<Product> | undefined) => {
    set({ products: product });
  },

  fetchProductsPublic: async () => {
    set({ isLoading: true });
    try {
      const response = await http.get('/public/product');
      set({ productsPublic: response.data, isLoading: false });
    } catch (error) {
      showErrorMessage({ error });
    }
  },

  fetchProducts: async (params: FilterProduct) => {
    set({ isLoading: true });
    try {
      const response = await http.get('/product', { params });
      set({ products: response.data.data, isLoading: false, total: response.data.totalItems, detailProduct: null });
    } catch (error) {
      showError({ error, title: 'Lấy thông tin sản phẩm thất bại' });
      set({ isLoading: false });
    }
  },

  createProduct: async (data: ProductPayload, thumbnail: RcFile) => {
    set({ isLoading: true });
    try {
      const resFile = await uploadFileFn(thumbnail as RcFile);
      const response = await http.post('/product', { ...data, thumbnail: resFile.link });
      set({ isLoading: false, detailProduct: null });
      notification.success({
        message: 'Tạo mới sản phẩm thành công'
      });
      return response.data;
    } catch (error) {
      showError({ error, title: 'Tạo mới sản phẩm thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  updateProduct: async (id: string, data: ProductPayload, thumbnail: RcFile | string) => {
    set({ isLoading: true });
    try {
      let resFile;
      if (thumbnail && typeof thumbnail !== 'string') {
        resFile = await uploadFileFn(thumbnail as RcFile);
        thumbnail = resFile.link;
      }
      const response = await http.put(`/product/${id}`, { ...data, thumbnail });
      set({ isLoading: false, detailProduct: null });
      notification.success({
        message: 'Cập nhật sản phẩm thành công'
      });

      return response.data;
    } catch (error) {
      showError({ error, title: 'Cập nhật sản phẩm thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  updateStatusProduct: async (id: string, data: EditStatusProduct) => {
    set({ isLoading: true });
    try {
      // Pass `data` directly without wrapping it inside an object
      const response = await http.put(`/product/status/${id}`, data);
      set({ isLoading: false, detailProduct: null });
      notification.success({
        message: 'Cập nhật trạng thái sản phẩm thành công'
      });
      return response.data;
    } catch (error) {
      showError({ error, title: 'Cập nhật trạng thái sản phẩm thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  getDetailProduct: async (id: string): Promise<Product | undefined> => {
    set({ isLoading: true });
    try {
      const response = await http.get<Product>(`/product/${id}`);
      set({ detailProduct: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      showError({ error, title: 'Lấy chi tiết thông tin sản phẩm thất bại' });
      set({ isLoading: false });
    }
  },

  deleteProducts: async (ids: React.Key[]) => {
    set({ isLoading: true });
    try {
      await http.delete<React.Key[]>(`/product`, { data: { ids } });
      set({ isLoading: false });
      notification.success({
        message: 'Xóa sản phẩm thành công'
      });
    } catch (error) {
      showError({ error, title: 'Xóa sản phẩm thất bại' });
      set({ isLoading: false });
      throw error;
    }
  },

  getUnits: async () => {
    set({ isLoading: true });
    try {
      const response = await http.get('/unit');
      set({ unit: response.data, isLoading: false });
    } catch (error) {
      showError({ error, title: 'Lấy thông tin thất bại' });
      set({ isLoading: false });
    }
  }
}));

export default useProductStore;
