import { useState, useEffect } from 'react';
import PostsList from '../components/PostsList';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/posts');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des posts');
      }
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression');
      fetchPosts();
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
    }
  };

  const handleEdit = async (post) => {
    console.log('Modification du post:', post);
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="blog-page">
      <h1>Blog</h1>
      <PostsList 
        posts={posts} 
        onDelete={handleDelete}
        onEdit={handleEdit}
        onRefresh={fetchPosts}
      />
    </div>
  );
}

export default BlogPage;