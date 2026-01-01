
import api from './api';

export interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author_name: string;
  created_at: string;
  updated_at: string;
}

export interface PostsResponse {
  data: Post[];
  total: number;
}

export const getPosts = async (limit = 10, offset = 0) => {
  const response = await api.get<PostsResponse>('/posts', {
    params: { limit, offset },
  });
  return response.data; // Assuming backend returns { data: [], total: ... } or array directly? 
                        // The user said "Get /posts?limit=10&offset=0". 
                        // Standard REST usually returns a list or a paginated object. 
                        // I will assume it returns an array OR an object. 
                        // Let's assume it returns { posts: Post[] } or just Post[].
                        // If it's a "Clean Architecture" PHP backend, it likely returns a standard JSON envelope.
                        // I'll check the response structure when I can, but for now I'll assume it returns the list or paginated object.
                        // Safer to return response.data and let the component handle it.
};

export const getPost = async (id: string) => {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
};

export const createPost = async (data: { title: string; content: string }) => {
  const response = await api.post<Post>('/posts', data);
  return response.data;
};

export const updatePost = async (id: string, data: { title: string; content: string }) => {
  const response = await api.put<Post>(`/posts/${id}`, data);
  return response.data;
};

export const deletePost = async (id: string) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};
