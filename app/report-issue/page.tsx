"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, MapPin, Camera, AlertTriangle } from "lucide-react"

export default function ReportIssuePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    address: "",
    isAnonymous: false,
    images: [] as File[],
    guidelines: false,
  })

  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const categories = ["Roads", "Lighting", "Water Supply", "Cleanliness", "Public Safety", "Obstructions", "Other"]

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + formData.images.length > 5) {
      alert("Maximum 5 images allowed")
      return
    }

    const newImages = [...formData.images, ...files]
    setFormData({ ...formData, images: newImages })

    // Create previews
    const newPreviews = [...imagePreviews]
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviews.push(reader.result as string)
        setImagePreviews([...newPreviews])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages })
    setImagePreviews(newPreviews)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Issue report:", formData)
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/issues" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to Issues
              </Link>
              <h1 className="text-2xl font-bold gradient-bg bg-clip-text text-transparent">Community Pulse</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-purple-600">
                Events
              </Link>
              <Link href="/issues" className="text-gray-500 hover:text-purple-600">
                Issues
              </Link>
              <Link href="/add-event" className="text-gray-500 hover:text-purple-600">
                Add Event
              </Link>
              <Link href="/report-issue" className="text-gray-900 hover:text-purple-600 font-medium">
                Report Issue
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="btn-secondary">
                Login
              </Link>
              <Link href="/register" className="btn-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Report Community Issue</h2>
            <p className="text-gray-600 mt-1">Help improve your neighborhood by reporting civic issues</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Issue Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Issue Title *
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Brief description of the issue"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Provide detailed information about the issue..."
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Location Name *
                </label>
                <input
                  type="text"
                  id="location"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Main Street, Central Park"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Specific Address *
                </label>
                <input
                  type="text"
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Full address or nearest landmark"
                />
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Camera className="inline h-4 w-4 mr-1" />
                Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                <div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="images" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">Upload photos</span>
                      <span className="mt-1 block text-sm text-gray-500">
                        PNG, JPG, GIF up to 10MB each (max 5 photos)
                      </span>
                    </label>
                    <input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Anonymous Reporting */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Reporting Options</h3>
                  <p className="text-sm text-gray-600">Choose how you want to submit this report</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAnonymous}
                    onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900">Report Anonymously</span>
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {formData.isAnonymous
                  ? "Your identity will be kept private. You won't receive status updates."
                  : "Your name will be visible to administrators. You'll receive updates on this issue."}
              </p>
            </div>

            {/* Guidelines */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                <AlertTriangle className="inline h-5 w-5 mr-2 text-orange-500" />
                Reporting Guidelines
              </h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p>• Only report legitimate civic issues that affect the community</p>
                <p>• Provide accurate location and description information</p>
                <p>• Do not report personal disputes or private property issues</p>
                <p>• Avoid duplicate reports - check if the issue has already been reported</p>
                <p>• Include clear photos when possible to help authorities understand the issue</p>
                <p>• Reports flagged as spam or inappropriate will be removed</p>
              </div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  required
                  checked={formData.guidelines}
                  onChange={(e) => setFormData({ ...formData, guidelines: e.target.checked })}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-900">
                  I understand and agree to follow the reporting guidelines *
                </span>
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button type="button" className="flex-1 btn-secondary">
                Save as Draft
              </button>
              <button type="submit" className="flex-1 btn-primary">
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
