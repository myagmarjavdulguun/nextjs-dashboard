'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');
    const usertype = formData.get('usertype');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, usertype }),
    });

    if (response.ok) {
      router.push('/home');
    } else {
      // Show error message if login fails
      const { error } = await response.json();
      setErrorMessage(error || 'An error occurred, please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-pink-200 p-6 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Үргэлжлүүлэхийн тулд нэвтрэх шаардлагатай.
        </h1>

        {/* Username Field */}
        <div>
          <label
            className="block text-xs font-medium text-gray-900 mb-2"
            htmlFor="username"
          >
            Хэрэглэгчийн нэр
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
            type="text"
            name="username"
            placeholder="Хэрэглэгчийн нэрээ оруулна уу"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label
            className="block text-xs font-medium text-gray-900 mb-2"
            htmlFor="password"
          >
            Нууц үг
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            type="password"
            name="password"
            placeholder="Нууц үгээ оруулна уу"
            required
            minLength={6}
          />
        </div>

        {/* User Type Selection */}
        <div>
          <label
            htmlFor="usertype"
            className="block text-xs font-medium text-gray-900 mb-2"
          >
            Та аль хэрэглэгч вэ?
          </label>
          <select
            id="usertype"
            name="usertype"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="graduate" defaultChecked>
              Төгсөгч
            </option>
            <option value="instructor">Багш</option>
            <option value="admin">Админ</option>
          </select>
        </div>

        {/* Login Button */}
        <button
          className="w-full py-3 bg-blue-700 text-white rounded-md hover:bg-blue-500 transition-colors"
          type="submit"
        >
          Log in
        </button>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-sm text-center mt-3">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
}
