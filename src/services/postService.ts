
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
  limit: number;
  offset: number;
}

export interface PostResponse {
  message: string;
  post: Post;
}

export const getPosts = async (limit = 10, offset = 0): Promise<Post[]> => {
  const response = await api.get<Post[] | PostsResponse>('/posts', {
    params: { limit, offset },
  });

  const data = response.data;
  return Array.isArray(data) ? data : (data.data || []);
};

export const getPost = async (id: string) => {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
};

export const createPost = async (data: { title: string; content: string }) => {
  const response = await api.post<PostResponse>('/posts', data);
  return response.data.post;
};

export const updatePost = async (id: string, data: { title: string; content: string }) => {
  const response = await api.put<PostResponse>(`/posts/${id}`, data);
  return response.data.post;
};

export const deletePost = async (id: string) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};
