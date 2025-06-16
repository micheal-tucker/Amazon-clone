"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would handle authentication
    alert(`${isLogin ? "Login" : "Sign up"} successful! (This is a demo)`)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold">
            <span className="text-gray-900">amazon</span>
            <span className="text-orange-400">.com</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{isLogin ? "Sign In" : "Create Account"}</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={!isLogin}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={!isLogin}
                />
              </div>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={!isLogin}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg transition-colors"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          {isLogin && (
            <div className="mt-4 text-center">
              <Link href="#" className="text-sm text-blue-600 hover:underline">
                Forgot your password?
              </Link>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button onClick={() => setIsLogin(!isLogin)} className="ml-1 text-blue-600 hover:underline font-medium">
                {isLogin ? "Create one" : "Sign in"}
              </button>
            </p>
          </div>

          <div className="mt-6 border-t pt-6">
            <p className="text-xs text-gray-500 text-center">
              By continuing, you agree to Amazon's{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Conditions of Use
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Privacy Notice
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
