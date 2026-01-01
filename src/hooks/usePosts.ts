import { useState, useCallback } from 'react';
import { getPosts, getPost, createPost as createPostService, updatePost as updatePostService, deletePost as deletePostService, type Post } from '../services/postService';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (limit = 10, offset = 0) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPosts(limit, offset);
      // Handles both array direct return or object with data property
      // @ts-ignore
      setPosts(Array.isArray(response) ? response : (response.data || []));
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPost = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPost(id);
      setPost(response);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch post');
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = async (data: { title: string; content: string }) => {
    setLoading(true);
    setError(null);
    try {
      await createPostService(data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to create post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id: string, data: { title: string; content: string }) => {
    setLoading(true);
    setError(null);
    try {
      await updatePostService(id, data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to update post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removePost = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deletePostService(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to delete post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    post,
    loading,
    error,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    removePost,
  };
};
