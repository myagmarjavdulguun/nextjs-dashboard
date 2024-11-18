'use client';

import { acceptRequest } from "../lib/actions";

export default function AcceptRequestButton({
    request_id,
    query,
} : {
    request_id: string;
    query: string;
}) {
    const handleAccept = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('request_id', request_id);
        formData.append('query', query);
    
        const result = await acceptRequest({}, formData);
    };

    return (
        <form onSubmit={handleAccept}>
            <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
            >
                Зөвшөөрөх
            </button>
        </form>
    );
}