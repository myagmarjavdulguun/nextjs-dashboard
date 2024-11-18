'use client';

import { redirect } from "next/navigation";
import { useState } from "react";
import { changePassword } from "../lib/actions";

export default function ChangePasswordForm({
    username,
    usertype,
}: {
    username: string;
    usertype: string;
}) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('username', username);
        formData.append('usertype', usertype);
        formData.append('old_password', oldPassword);
        formData.append('new_password', newPassword);
    
        const result = await changePassword(formData);

        redirect('/');
    };

    return (
        <div className="bg-gray-50 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Нууц үг шинэчлэх</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Одоогийн нууц үг
              </label>
              <input
                id="currentPassword"
                type="password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Одоогийн нууц үгээ оруулна уу"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                Шинэ нууц үг
              </label>
              <input
                id="newPassword"
                type="password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Шинэ нууц үгээ оруулна уу"
                onChange={(e) => setNewPassword(e.target.value)}
              />
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