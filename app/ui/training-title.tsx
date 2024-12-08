'use client';

import { useRouter } from "next/navigation";

export default function TrainingTitle({ title, training_id }: { title: any; training_id: any; }) {
    const router = useRouter();

    return (
        <td
            className="whitespace-nowrap px-1 py-1 cursor-pointer hover:bg-gray-100"
            onClick={() => router.push(`/home/trainings/${training_id}`)}
        >{title}</td>
    );
}