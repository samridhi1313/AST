"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Calendar, TrendingUp, AlertTriangle, CheckCircle, Clock, Map, Flag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const issueCategories = [
  "All Issues",
  "Roads",
  "Lighting",
  "Water Supply",
  "Cleanliness",
  "Public Safety",
  "Obstructions",
]

const statusOptions = ["All Status", "Reported", "In Progress", "Resolved"]

const issues = [
  {
    id: 1,
    title: "Large Pothole on Main Street",
    description: "Dangerous pothole causing traffic issues and potential vehicle damage near the intersection.",
    images: ["/placeholder.svg?height=200&width=300"],
    reportedDate: "Dec 07, 2024",
    location: "Main Street & 5th Ave",
    category: "Roads",
    status: "In Progress",
    upvotes: 23,
    distance: 0.8,
    reporter: "Anonymous",
    isFollowing: false,
  },
  {
    id: 2,
    title: "Broken Street Light",
    description: "Street light has been flickering for weeks, creating safety concerns for pedestrians at night.",
    images: ["/placeholder.svg?height=200&width=300"],
    reportedDate: "Dec 06, 2024",
    location: "Park Avenue",
    category: "Lighting",
    status: "Reported",
    upvotes: 15,
    distance: 1.2,
    reporter: "John Smith",
    isFollowing: true,
  },
  {
    id: 3,
    title: "Overflowing Garbage Bins",
    description:
      "Multiple garbage bins overflowing for several days, attracting pests and creating unsanitary conditions.",
    images: ["/placeholder.svg?height=200&width=300"],
    reportedDate: "Dec 05, 2024",
    location: "Central Park Entrance",
    category: "Cleanliness",
    status: "Resolved",
    upvotes: 31,
    distance: 2.1,
    reporter: "Sarah Johnson",
    isFollowing: false,
  },
  {
    id: 4,
    title: "Open Manhole Cover",
    description: "Dangerous open manhole without proper barriers or warning signs. Immediate attention required.",
    images: ["/placeholder.svg?height=200&width=300"],
    reportedDate: "Dec 08, 2024",
    location: "Riverside Drive",
    category: "Public Safety",
    status: "Reported",
    upvotes: 45,
    distance: 1.5,
    reporter: "Mike Chen",
    isFollowing: false,
  },
]

export default function IssuesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Issues")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const [distanceFilter, setDistanceFilter] = useState("5")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    // Request location permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Location access denied:", error)
        },
      )
    }
  }, [])

  const filteredIssues = issues.filter((issue) => {
    const matchesCategory = selectedCategory === "All Issues" || issue.category === selectedCategory
    const matchesStatus = selectedStatus === "All Status" || issue.status === selectedStatus
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDistance = Number.parseFloat(distanceFilter) >= issue.distance

    return matchesCategory && matchesStatus && matchesSearch && matchesDistance
  })

  // Sort issues by upvotes (most urgent first)
  const sortedIssues = [...filteredIssues].sort((a, b) => b.upvotes - a.upvotes)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Reported":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "Resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Reported":
        return "bg-red-100 text-red-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold gradient-bg bg-clip-text text-transparent">Community Pulse</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-purple-600">
                Events
              </Link>
              <Link href="/issues" className="text-gray-900 hover:text-purple-600 font-medium">
                Issues
              </Link>
              <Link href="/add-event" className="text-gray-500 hover:text-purple-600">
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

      {/* Hero Section */}
      <section className="gradient-bg text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Community Issues</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Report and track civic issues in your neighborhood</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="flex items-center bg-white rounded-lg shadow-lg">
              <Search className="h-5 w-5 text-gray-400 ml-4" />
              <input
                type="text"
                placeholder="Search issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 text-gray-900 rounded-lg focus:outline-none"
              />
              <button className="btn-primary m-2">Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and View Toggle */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {issueCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Filters and View Toggle */}
            <div className="flex items-center gap-4">
              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              {/* Distance Filter */}
              <select
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="1">Within 1km</option>
                <option value="3">Within 3km</option>
                <option value="5">Within 5km</option>
              </select>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "map" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                  }`}
                >
                  <Map className="h-4 w-4 inline mr-1" />
                  Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              {selectedCategory === "All Issues" ? "Nearby Issues" : selectedCategory}
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-gray-500">{sortedIssues.length} issues found</span>
              <Link href="/report-issue" className="btn-primary">
                Report Issue
              </Link>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedIssues.map((issue) => (
                <Link key={issue.id} href={`/issue/${issue.id}`}>
                  <div className="event-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
                    <div className="relative">
                      <Image
                        src={issue.images[0] || "/placeholder.svg"}
                        alt={issue.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />

                      {/* Status Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(issue.status)}`}
                        >
                          {getStatusIcon(issue.status)}
                          {issue.status}
                        </span>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {issue.category}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute bottom-3 right-3 flex space-x-2">
                        <button className="p-1.5 bg-white/80 rounded-full hover:bg-white">
                          <Flag className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600 font-medium">{issue.upvotes} upvotes</span>
                        </div>
                        <span className="text-sm text-gray-500">{issue.distance}km away</span>
                      </div>

                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{issue.title}</h4>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{issue.description}</p>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-2" />
                          Reported on {issue.reportedDate}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-2" />
                          {issue.location}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Reported by: {issue.reporter}</span>
                          {issue.isFollowing && (
                            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                              Following
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Map View */
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <Map className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Map View</p>
                  <p className="text-gray-400 text-sm">
                    Showing {sortedIssues.length} issues within {distanceFilter}km
                  </p>
                </div>
              </div>
            </div>
          )}

          {sortedIssues.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No issues found matching your criteria.</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
