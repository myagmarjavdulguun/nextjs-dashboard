'use client';

import { useState } from 'react';
import { createInstructor } from '@/app/lib/actions';

export default function RegisterInstructorPage() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [expertise, setExpertise] = useState('');
  const [userType, setUserType] = useState('instructor'); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('password', password);
    formData.append('field_of_study', fieldOfStudy);
    formData.append('expertise', expertise);
    formData.append('user_type', userType);

    const result = await createInstructor(formData);

    if (result?.message) {
      alert(result.message);
    } else {
      alert('Instructor registered successfully!');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-semibold">Багш бүртгэх</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Нэвтрэх нэр</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Нэр</label>
          <input
            type="text"
            id="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Овог</label>
          <input
            type="text"
            id="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Нууц үг</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="field_of_study" className="block text-sm font-medium text-gray-700">Салбар</label>
          <input
            type="text"
            id="field_of_study"
            value={fieldOfStudy}
            onChange={(e) => setFieldOfStudy(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">Мэргэшил</label>
          <input
            type="text"
            id="expertise"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Багш бүртгэх
        </button>
      </form>
    </div>
  );
}
