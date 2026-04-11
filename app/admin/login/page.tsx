'use client'

import { useSearchParams } from 'next/navigation'
import { login } from './actions'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-gradient-to-b from-[#FDF8F5] to-[#F8E8E0] px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif text-[#2C2C2C] mb-2 font-bold">Admin Portal</h1>
        <p className="text-[#98898D]">Sign in to manage your store</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#FAC1B5]/30 w-full max-w-md">
        <form className="space-y-6" action={login}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-xl border border-red-100 text-sm font-semibold text-center">
              Invalid credentials. Please try again.
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-[#2C2C2C] mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="admin@minasbakeshop.com"
              className="w-full px-4 py-3 border border-[#FAC1B5]/30 rounded-xl focus:outline-none focus:border-[#F283AE] focus:ring-1 focus:ring-[#F283AE] transition-all bg-[#FDF8F5]/50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2C2C2C] mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-[#FAC1B5]/30 rounded-xl focus:outline-none focus:border-[#F283AE] focus:ring-1 focus:ring-[#F283AE] transition-all bg-[#FDF8F5]/50"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#F283AE] hover:bg-[#E86FA3] text-white py-3.5 rounded-xl font-semibold transition-colors mt-4 shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
        </form>
      </div>
      
      <p className="text-xs text-[#98898D] mt-8 text-center max-w-sm">
        Secure Area. Authorized personnel only. Incorrect attempts will be logged.
      </p>
    </div>
  )
}
