// components/DeleteInstructorButton.tsx (Client-side component)
'use client';

import { deleteInstructor } from "../lib/actions";

export default function DeleteInstructorButton({ instructor_id }: { instructor_id: string }) {
    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const result = await deleteInstructor(instructor_id);
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
