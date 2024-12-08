'use client';

import { useRouter } from "next/navigation";



export default function HomeTraining({ training }: { training: any }) {
    const router = useRouter();

    return (
        <div
            className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            key={training}
            onClick={() => router.push(`/home/trainings/${training.training_id}`)}
        >
            <h3 className="text-xl font-medium text-gray-800 mb-4">{training.title}</h3>
            <p className="text-sm text-gray-600">
                Багш: {training.first_name + ' ' + training.last_name}
            </p>
            <p className="text-sm text-gray-600">
                <span className="font-semibold">Эхлэх огноо:</span> {new Date(training.start_date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
                <span className="font-semibold">Дуусах огноо:</span> {new Date(training.end_date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
                <span className="font-semibold">Байршил:</span> {training.location}
            </p>
        </div>
    );
}