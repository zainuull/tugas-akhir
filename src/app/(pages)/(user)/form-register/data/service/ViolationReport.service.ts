// import { ILoginModel } from '@/app/(pages)/(auth)/login/domain/model/model';
import axios from 'axios';

let user: any = {};
if (typeof window !== 'undefined') {
  user = JSON.parse(localStorage.getItem('currentUser') || '{}');
}

export class ViolationService {
  async sendPhoto(file:File) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Replace 'your-api-endpoint' with the actual API endpoint
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data; // You can return any data you want
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  }
}
