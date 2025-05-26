import React, { useState } from 'react';
import { Heart } from 'lucide-react'; // Icône (npm install lucide-react)

// Fonction utilitaire pour concaténer les classes conditionnelles (tu peux l’enlever si tu veux faire simple)
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Like = ({ initialLikes = 0, initiallyLiked = false }) => {
  const [liked, setLiked] = useState(initiallyLiked);
  const [likes, setLikes] = useState(initialLikes);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <button
      onClick={toggleLike}
      className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition-colors"
    >
      <Heart color="red"
        className={cn(
          'w-6 h-6 transition-transform duration-200',
          liked ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-400'
        )}
      />
      <span className="text-sm">{likes}</span>
    </button>
  );
};

export default Like;
