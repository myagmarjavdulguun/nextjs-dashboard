'use client';

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { createRequest } from "../lib/actions";

export default function RequestButton({
    instructor_id, 
    graduate_id,
    query,
} : {
    instructor_id: string; 
    graduate_id: string;
    query: string;
}) {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('instructor_id', instructor_id);
        formData.append('graduate_id', graduate_id);
        formData.append('status', 'pending');
        formData.append('query', query);
    
        const result = await createRequest({}, formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2"
                type='submit'
            >
                <PaperAirplaneIcon className="h-5 w-5" />
                <span>Хүсэлт илгээх</span>
            </button>
        </form>
    );
}