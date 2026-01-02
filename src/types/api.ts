import type { Post } from '../services/postService';

export interface PaginatedResponse<T> {
  data: T[];
  total?: number;
  page?: number;
  limit?: number;
}

export type PostsResponse = Post[] | PaginatedResponse<Post>;

export type { Post };
