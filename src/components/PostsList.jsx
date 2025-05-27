import '../assets/css/PostsList.css';
import { useState } from 'react';

function PostsList({ posts, onDelete, onEdit, onRefresh }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) throw new Error('Erreur lors de l\'ajout du post');
      setShowAddForm(false);
      setNewPost({ title: '', content: '' });
      onRefresh(); // Rafraîchir la liste des posts après l'ajout
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="posts-container">
      <button 
        className="add-post-button"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? 'Annuler' : 'Ajouter un post'}
      </button>

      {showAddForm && (
        <form className="add-post-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Titre"
            value={newPost.title}
            onChange={(e) => setNewPost({...newPost, title: e.target.value})}
            required
          />
          <textarea
            placeholder="Contenu"
            value={newPost.content}
            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
            required
          />
          <button type="submit">Publier</button>
        </form>
      )}

      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.updatedAt && (
              <p className="update-date">
                Mis à jour le {formatDate(post.updatedAt)}
              </p>
            )}
            <div className="post-actions">
              <button 
                className="edit-button"
                onClick={() => onEdit(post)}
              >
                Modifier
              </button>
              <button 
                className="delete-button"
                onClick={() => onDelete(post.id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostsList; 