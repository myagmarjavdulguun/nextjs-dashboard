'use client';

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from 'react';
import { createTraining } from "../lib/actions";
import { redirect } from "next/navigation";

export default function CreateTrainingForm({ instructor_id }: { instructor_id: string }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [maxParticipants, setMaxParticipants] = useState(0);
    const [price, setPrice] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);
        formData.append('location', location);
        formData.append('max_participants', maxParticipants.toString());
        formData.append('price', price);
        formData.append('instructor_id', instructor_id);

        const result = await createTraining({}, formData);

        redirect('/home/trainings');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto my-5 p-2 bg-white rounded-xl shadow-lg space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Сургалтын нэр</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Тайлбар</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Эхлэх огноо</label>
                <input
                    type="date"
                    id="start_date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">Дуусах огноо</label>
                <input
                    type="date"
                    id="end_date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Байршил</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Суудлын тоо</label>
                <input
                    type="number"
                    id="max_participants"
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(Number(e.target.value))}
                    required
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Төлбөр</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-green-500 text-white px-4 py-3 rounded-md flex items-center justify-center gap-3 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            >
                <PaperAirplaneIcon className="h-5 w-5" />
                Сургалт үүсгэх
            </button>
        </form>
    );
}
