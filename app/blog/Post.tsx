import React from 'react';
import { Post } from 'app/types';

export const SinglePost: React.FC<Post> = ({ id }) => (
  <p className="text-lg text-gray-800 bg-white p-4 rounded shadow">{id}</p>
);
