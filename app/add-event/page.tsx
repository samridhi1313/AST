"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, MapPin, Calendar, Clock, Users, Tag, Plus, Trash2 } from "lucide-react"

export default function AddEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    location: "",
    address: "",
    maxAttendees: "",
    isPaid: false,
    ticketTiers: [{ name: "Standard", price: "", description: "" }],
    tags: "",
    image: null as File | null,
    guidelines: false,
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const categories = [
    "Music",
    "Sports",
    "Food & Drink",
    "Arts & Culture",
    "Community",
    "Business",
    "Health & Wellness",
    "Education",
    "Technology",
    "Lost & Found",
    "Other",
  ]

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addTicketTier = () => {
    setFormData({
      ...formData,
      ticketTiers: [...formData.ticketTiers, { name: "", price: "", description: "" }],
    })
  }

  const removeTicketTier = (index: number) => {
    const newTiers = formData.ticketTiers.filter((_, i) => i !== index)
    setFormData({ ...formData, ticketTiers: newTiers })
  }

  const updateTicketTier = (index: number, field: string, value: string) => {
    const newTiers = formData.ticketTiers.map((tier, i) => (i === index ? { ...tier, [field]: value } : tier))
    setFormData({ ...formData, ticketTiers: newTiers })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Event data:", formData)
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back
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
              <Link href="/add-event" className="text-gray-900 hover:text-purple-600 font-medium">
                Add Event
              </Link>
              <Link href="/report-issue" className="text-gray-500 hover:text-purple-600">
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
            <h2 className="text-2xl font-bold text-gray-900">Create New Event</h2>
            <p className="text-gray-600 mt-1">Fill in the details to create your community event</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Event Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter event title"
              />
            </div>

            {/* Event Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Event preview"
                      className="mx-auto h-48 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null)
                        setFormData({ ...formData, image: null })
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="image" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">Upload event image</span>
                        <span className="mt-1 block text-sm text-gray-500">
                          PNG, JPG, GIF up to 10MB (max 5 images for Lost & Found)
                        </span>
                      </label>
                      <input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </div>
                  </div>
                )}
              </div>
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
                placeholder="Describe your event..."
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
              {formData.category === "Lost & Found" && (
                <p className="text-sm text-orange-600 mt-1">
                  Lost & Found posts will be highlighted for 24 hours for increased visibility
                </p>
              )}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Event Date *
                </label>
                <input
                  type="date"
                  id="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Start Time *
                </label>
                <input
                  type="time"
                  id="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Venue Name *
                </label>
                <input
                  type="text"
                  id="location"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Central Park"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Full address"
                />
              </div>
            </div>

            {/* Max Attendees (not for Lost & Found) */}
            {formData.category !== "Lost & Found" && (
              <div>
                <label htmlFor="maxAttendees" className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline h-4 w-4 mr-1" />
                  Max Attendees
                </label>
                <input
                  type="number"
                  id="maxAttendees"
                  min="1"
                  value={formData.maxAttendees}
                  onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Leave empty for unlimited"
                />
              </div>
            )}

            {/* Paid Event Toggle */}
            {formData.category !== "Lost & Found" && (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Event Pricing</h3>
                    <p className="text-sm text-gray-600">Configure ticket pricing for your event</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPaid}
                      onChange={(e) => setFormData({ ...formData, isPaid: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">Paid Event</span>
                  </label>
                </div>

                {formData.isPaid && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Ticket Tiers</h4>
                    {formData.ticketTiers.map((tier, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="font-medium text-gray-900">Tier {index + 1}</h5>
                          {formData.ticketTiers.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeTicketTier(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <input
                            type="text"
                            placeholder="Tier name (e.g., Standard, Gold)"
                            value={tier.name}
                            onChange={(e) => updateTicketTier(index, "name", e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <input
                            type="number"
                            placeholder="Price ($)"
                            value={tier.price}
                            onChange={(e) => updateTicketTier(index, "price", e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <input
                            type="text"
                            placeholder="Description/Benefits"
                            value={tier.description}
                            onChange={(e) => updateTicketTier(index, "description", e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addTicketTier}
                      className="flex items-center text-purple-600 hover:text-purple-700"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Another Tier
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="inline h-4 w-4 mr-1" />
                Tags
              </label>
              <input
                type="text"
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., outdoor, family-friendly, music (comma separated)"
              />
              <p className="text-sm text-gray-500 mt-1">Separate tags with commas</p>
            </div>

            {/* Community Guidelines */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Community Guidelines</h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p>• No hate speech, discrimination, or offensive content</p>
                <p>• No scams, fraudulent activities, or misleading information</p>
                <p>• No dangerous or illegal activities</p>
                <p>• Respect community members and local regulations</p>
                <p>• Provide accurate event information and location</p>
              </div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  required
                  checked={formData.guidelines}
                  onChange={(e) => setFormData({ ...formData, guidelines: e.target.checked })}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-900">I agree to follow the community guidelines *</span>
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button type="button" className="flex-1 btn-secondary">
                Save as Draft
              </button>
              <button type="submit" className="flex-1 btn-primary">
                Publish Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
