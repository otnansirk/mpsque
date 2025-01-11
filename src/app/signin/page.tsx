'use client'

import { redirect, RedirectType } from "next/navigation";
import React, { useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signinHanlder = async (ev: React.FormEvent) => {

    ev.preventDefault();
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    
    const result = await response.json();
    setIsLoading(false)

    if (!response.ok) {
      setError(result.message || 'An error occurred');
    } else {
      document.cookie = `_Access_Token=${result.access_token}`;
      redirect('/dashboard', RedirectType.push)
    }
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Masuk Dashboard
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
              onChange={e => setEmail(e.target.value)}
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={e => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              disabled={isLoading}
              onClick={signinHanlder}
              type="submit"
              className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            >
              {isLoading ? 'Sedang Proses': 'Masuk'}
            </button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  )
}
