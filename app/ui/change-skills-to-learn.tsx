'use client';

import { redirect } from "next/navigation";
import { useState } from "react";
import { changeSkillsToLearn } from "../lib/actions";

export default function ChangeSkillsToLearn({
    graduate_id,
    skills_to_learn,
}: {
    graduate_id: string;
    skills_to_learn: string;
}) {
    const [skills, setSkills] = useState(skills_to_learn);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('graduate_id', graduate_id);
        formData.append('skills_to_learn', skills);
    
        const result = await changeSkillsToLearn(formData);

        redirect('/home');
    };

    return (
        <div className="bg-gray-50 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Сурах ур чадвараа шинэчлэх</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                <label htmlFor="skillsToLearn" className="block text-sm font-medium text-gray-700">
                    Сурах ур чадвар
                </label>
                <textarea
                    id="skillsToLearn"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Сурахыг хүсч буй ур чадваруудаа энд оруулна уу"
                    rows={4}
                    onChange={(e) => setSkills(e.target.value)}
                >
                    {skills}
                </textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
                >
                Шинэчлэх
                </button>
            </form>
        </div>
    );
}