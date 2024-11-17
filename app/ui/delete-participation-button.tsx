'use client';

import { useState } from 'react';
import { deleteParticipation } from '../lib/actions';

export default function DeleteParticipation({
  graduate_id,
  training_id,
  query,
}: {
    graduate_id: string;
    training_id: string;
  query: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('graduate_id', graduate_id);
    formData.append('training_id', training_id);
    formData.append('query', query);

    const response = await deleteParticipation(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className={`bg-red-500 text-white px-4 py-2 rounded-lg transition-all ${
          loading ? 'opacity-50' : 'hover:bg-red-800'
        }`}
        disabled={loading}
      >
        {loading ? 'Цуцалж байна...' : 'Цуцлах'}
      </button>
    </form>
  );
}
