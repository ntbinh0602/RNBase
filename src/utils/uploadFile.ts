import { notification } from 'antd';
import axios from 'axios';
import { v4 } from 'uuid';

interface UploadResponse {
  result: {
    name: string;
    url: string;
    extension: string;
  };
}

interface UploadFileFnResponse {
  link: string;
}

export const uploadFileFn = async (file: File): Promise<UploadFileFnResponse> => {
  const formData = new FormData();
  const UploadId = v4();
  const FileName = file?.name;
  const Index = 0;
  const TotalCount = 1;
  const FileSize = file.size; // Get actual file size
  formData.append('chunk', file);
  formData.append(
    'arguments',
    JSON.stringify({
      target_path: 'STDV/AUTHOR',
      chunkMetadata: {
        UploadId,
        FileName,
        Index,
        TotalCount,
        FileSize
      }
    })
  );

  try {
    const response = await axios.post<UploadResponse>(import.meta.env.VITE_MEDIA_SEVER_URL, formData);
    return {
      link: response.data?.result?.url,
    };
  } catch (error: any) {
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};
