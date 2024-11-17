// components/DeleteInstructorButton.tsx (Client-side component)
'use client';

import { deleteGraduate } from "../lib/actions";

export default function DeleteGraduateButton({ graduate_id }: { graduate_id: string }) {
    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const result = await deleteGraduate(graduate_id);
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
            Устгах
        </button>
    );
}
