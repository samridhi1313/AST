"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Calendar, Users, Heart, Share2, Map, AlertTriangle, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface TicketTier {
  name: string
  price: number
  description: string
}

interface Event {
  id: number
  title: string
  description: string
  image: string
  date: string
  time: string
  location: string
  attendees: number
  category: string
  organizer: string
  isFeatured: boolean
  isPaid: boolean
  ticketTiers?: TicketTier[]
  distance: number
  status: string
  upvotes: number
  isUrgent: boolean
}

const categories = [
  "All Events",
  "Music",
  "Sports",
  "Food & Drink",
  "Arts & Culture",
  "Community",
  "Business",
  "Health & Wellness",
  "Lost & Found",
]

const events: Event[] = [
  {
    id: 1,
    title: "Live Music Festival",
    description: "Join us for an amazing night of live music featuring local bands and artists.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Dec 09, 2024",
    time: "10:30 AM",
    location: "Central Park",
    attendees: 27,
    category: "Music",
    organizer: "Music Events Co.",
    isFeatured: true,
    isPaid: true,
    ticketTiers: [
      { name: "Standard", price: 1999, description: "General admission" },
      { name: "Gold", price: 3999, description: "Premium seating + refreshments" },
      { name: "Platinum", price: 7999, description: "VIP experience + meet & greet" },
    ],
    distance: 1.2,
    status: "upcoming",
    upvotes: 15,
    isUrgent: false,
  },
  {
    id: 2,
    title: "Lost Golden Retriever - Max",
    description:
      "Missing since yesterday evening near Riverside Park. Friendly dog, responds to 'Max'. Please contact if seen.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Dec 08, 2024",
    time: "6:00 PM",
    location: "Riverside Park Area",
    attendees: 0,
    category: "Lost & Found",
    organizer: "Sarah Johnson",
    isFeatured: false,
    isPaid: false,
    distance: 0.8,
    status: "urgent",
    upvotes: 23,
    isUrgent: true,
  },
  {
    id: 3,
    title: "Community Cleanup Drive",
    description: "Help make our neighborhood cleaner and more beautiful. Free refreshments provided.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Dec 12, 2024",
    time: "9:00 AM",
    location: "Riverside Park",
    attendees: 15,
    category: "Community",
    organizer: "Green Initiative",
    isFeatured: false,
    isPaid: false,
    distance: 2.1,
    status: "upcoming",
    upvotes: 8,
    isUrgent: false,
  },
  {
    id: 4,
    title: "Food Truck Rally",
    description: "Taste amazing food from local food trucks and vendors.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Dec 15, 2024",
    time: "12:00 PM",
    location: "Downtown Square",
    attendees: 42,
    category: "Food & Drink",
    organizer: "Foodie Events",
    isFeatured: false,
    isPaid: false,
    distance: 3.2,
    status: "upcoming",
    upvotes: 12,
    isUrgent: false,
  },
]

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Events")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const [distanceFilter, setDistanceFilter] = useState("5")
  const [dateFilter, setDateFilter] = useState("all")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationPermission, setLocationPermission] = useState<"granted" | "denied" | "pending">("pending")

  useEffect(() => {
    // Request location permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLocationPermission("granted")
        },
        (error) => {
          console.error("Location access denied:", error)
          setLocationPermission("denied")
        },
      )
    }
  }, [])

  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === "All Events" || event.category === selectedCategory
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDistance = Number.parseFloat(distanceFilter) >= event.distance

    let matchesDate = true
    if (dateFilter === "today") {
      matchesDate = event.date === "Dec 09, 2024" // Today's date
    } else if (dateFilter === "tomorrow") {
      matchesDate = event.date === "Dec 10, 2024"
    } else if (dateFilter === "week") {
      // Events within this week
      matchesDate = true
    }

    return matchesCategory && matchesSearch && matchesDistance && matchesDate
  })

  // Sort events: urgent first, then by upvotes
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (a.isUrgent && !b.isUrgent) return -1
    if (!a.isUrgent && b.isUrgent) return 1
    return b.upvotes - a.upvotes
  })

  const getStatusBadge = (event: any) => {
    const now = new Date()
    const eventDate = new Date(event.date + " " + event.time)

    if (event.isUrgent) {
      return (
        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">URGENT</span>
      )
    }

    const timeDiff = eventDate.getTime() - now.getTime()
    const hoursUntil = Math.floor(timeDiff / (1000 * 60 * 60))

    if (hoursUntil < 0) {
      return <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium">Event Ended</span>
    } else if (hoursUntil < 2) {
      return <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">Happening Now</span>
    } else if (hoursUntil < 24) {
      return (
        <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          Starts in {hoursUntil}h
        </span>
      )
    }

    return null
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-400">Community Pulse</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 font-medium">
                Events
              </Link>
              <Link href="/issues" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
                Issues
              </Link>
              <Link href="/add-event" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
                Add Event
              </Link>
              <Link href="/report-issue" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
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

      {/* Location Banner */}
      {locationPermission === "denied" && (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4 sticky top-16 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Location access is required to show nearby events. Please enable location services or enter your
                  address manually.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Discover Local Events & Issues</h2>
          <p className="text-xl md:text-2xl mb-8 text-white/90">Connect with your community within 5km radius</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <Search className="h-5 w-5 text-gray-400 ml-4" />
              <input
                type="text"
                placeholder="Search events and issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-4 px-4 rounded-lg focus:outline-none dark:bg-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="week">This Week</option>
            </select>

            <select
              value={distanceFilter}
              onChange={(e) => setDistanceFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="1">Within 1km</option>
              <option value="2">Within 2km</option>
              <option value="5">Within 5km</option>
              <option value="10">Within 10km</option>
            </select>

            <button
              onClick={() => setViewMode(viewMode === "grid" ? "map" : "grid")}
              className="px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white flex items-center gap-2"
            >
              {viewMode === "grid" ? (
                <>
                  <Map className="h-5 w-5" /> Show Map
                </>
              ) : (
                <>
                  <TrendingUp className="h-5 w-5" /> Show Grid
                </>
              )}
            </button>
          </div>

          {/* Events Grid */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedEvents.map((event) => (
                <Link href={`/event/${event.id}`} key={event.id}>
                  <div className="event-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      {getStatusBadge(event)}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{event.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{event.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.distance}km
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {event.attendees}
                        </div>
                      </div>
                      {event.isPaid && event.ticketTiers && event.ticketTiers.length > 0 && (
                        <div className="mt-4 text-sm font-medium text-purple-600 dark:text-purple-400">
                          From ₹{event.ticketTiers[0].price}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="h-[600px] bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Map view coming soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
