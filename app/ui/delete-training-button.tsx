'use client';

import { XCircleIcon } from "@heroicons/react/24/outline";
import { deleteTraining } from "../lib/actions";

export default function DeleteTrainingButton({
    training_id,
    query,
} : {
    training_id: string;
    query: string;
}) {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('training_id', training_id);
        formData.append('query', query);
    
        const result = await deleteTraining({}, formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2"
            >
                <XCircleIcon className="w-5 h-5" />
                <span>Устгах</span>
            </button>
        </form>
    );
}