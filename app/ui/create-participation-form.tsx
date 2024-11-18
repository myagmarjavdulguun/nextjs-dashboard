'use client';

import { useState } from 'react';
import { createParticipation } from '../lib/actions';

export default function ParticipationButton({
    graduate_id,
    training_id, 
    query,
}: {
    graduate_id: string;
    training_id: string;
    query: string;
}) {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted"); 

        const formData = new FormData();
        formData.append('graduate_id', graduate_id);
        formData.append('training_id', training_id);
        formData.append('query', query);

        const result = await createParticipation({}, formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-all"
            >
                Сургалтад хамрагдах
            </button>
        </form>
    );
}