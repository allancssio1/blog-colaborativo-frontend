import { useState, useCallback } from 'react';
import { getPosts, getPost, createPost as createPostService, updatePost as updatePostService, deletePost as deletePostService, type Post } from '../services/postService';

interface LoadingStates {
  fetching: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    fetching: false,
    creating: false,
    updating: false,
    deleting: false,
  });
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (limit = 10, offset = 0) => {
    setLoadingStates(prev => ({ ...prev, fetching: true }));
    setError(null);
    try {
      const posts = await getPosts(limit, offset);
      setPosts(posts);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch posts');
    } finally {
      setLoadingStates(prev => ({ ...prev, fetching: false }));
    }
  }, []);

  const fetchPost = useCallback(async (id: string) => {
    setLoadingStates(prev => ({ ...prev, fetching: true }));
    setError(null);
    try {
      const response = await getPost(id);
      setPost(response);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch post');
    } finally {
      setLoadingStates(prev => ({ ...prev, fetching: false }));
    }
  }, []);

  const createPost = async (data: { title: string; content: string }) => {
    setLoadingStates(prev => ({ ...prev, creating: true }));
    setError(null);
    try {
      const newPost = await createPostService(data);
      setPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to create post');
      throw err;
    } finally {
      setLoadingStates(prev => ({ ...prev, creating: false }));
    }
  };

  const updatePost = async (id: string, data: { title: string; content: string }) => {
    setLoadingStates(prev => ({ ...prev, updating: true }));
    setError(null);
    try {
      const updated = await updatePostService(id, data);
      setPosts(prev => prev.map(p => p.id === id ? updated : p));
      if (post?.id === id) {
        setPost(updated);
      }
      return updated;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to update post');
      throw err;
    } finally {
      setLoadingStates(prev => ({ ...prev, updating: false }));
    }
  };

  const removePost = async (id: string) => {
    setLoadingStates(prev => ({ ...prev, deleting: true }));
    setError(null);
    try {
      await deletePostService(id);
      setPosts(prev => prev.filter(p => p.id !== id));
      if (post?.id === id) {
        setPost(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to delete post');
      throw err;
    } finally {
      setLoadingStates(prev => ({ ...prev, deleting: false }));
    }
  };

  const loading = Object.values(loadingStates).some(state => state);

  return {
    posts,
    post,
    loading,
    loadingStates,
    isFetching: loadingStates.fetching,
    isCreating: loadingStates.creating,
    isUpdating: loadingStates.updating,
    isDeleting: loadingStates.deleting,
    error,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    removePost,
  };
};
