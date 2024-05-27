import axios, { AxiosResponse } from 'axios';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  statusCode: number;
  body?: any;
}

export async function fetchData<T>(
  url: string,
  method: 'POST' | 'GET' | 'PUT' | 'DELETE',
  data?: T
): Promise<ApiResponse<T>> {
  try {
    const axiosConfig = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Add CORS header
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      data: data != null ? JSON.stringify(data) : undefined
    };

    const response: AxiosResponse = await axios(axiosConfig);

    return {
      success: true,
      statusCode: response.status,
      data: response.data
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error handling
      return {
        success: false,
        statusCode: error.response?.status || 500,
        message: error.message,
        body: error.response?.data
      };
    } else {
      // General error handling
      return {
        success: false,
        statusCode: 500,
        message: 'An unexpected error occurred.'
      };
    }
  }
}
