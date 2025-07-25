// Travel API Module - Mock travel data and services
// This simulates various travel APIs like Amadeus, Booking.com, etc.

// Mock destinations data
const destinations = [
  {
    id: 1,
    name: "Paris, France",
    country: "France",
    continent: "Europe",
    description: "The City of Light, famous for its art, fashion, and romantic atmosphere",
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52",
    popularityScore: 95,
    avgTemperature: "15°C",
    bestMonths: ["April", "May", "September", "October"],
    timeZone: "CET",
    currency: "EUR",
    language: "French",
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame", "Champs-Élysées"]
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    country: "Japan",
    continent: "Asia",
    description: "A vibrant metropolis blending ultra-modern and traditional culture",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
    popularityScore: 92,
    avgTemperature: "16°C",
    bestMonths: ["March", "April", "October", "November"],
    timeZone: "JST",
    currency: "JPY",
    language: "Japanese",
    highlights: ["Shibuya Crossing", "Mount Fuji", "Senso-ji Temple", "Tsukiji Market"]
  },
  {
    id: 3,
    name: "New York City, USA",
    country: "United States",
    continent: "North America",
    description: "The Big Apple - a bustling metropolis with iconic landmarks",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
    popularityScore: 90,
    avgTemperature: "13°C",
    bestMonths: ["April", "May", "September", "October"],
    timeZone: "EST",
    currency: "USD",
    language: "English",
    highlights: ["Statue of Liberty", "Central Park", "Times Square", "Brooklyn Bridge"]
  },
  {
    id: 4,
    name: "Bali, Indonesia",
    country: "Indonesia",
    continent: "Asia",
    description: "Tropical paradise with beautiful beaches, temples, and rice terraces",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
    popularityScore: 88,
    avgTemperature: "27°C",
    bestMonths: ["April", "May", "June", "September"],
    timeZone: "WITA",
    currency: "IDR",
    language: "Indonesian",
    highlights: ["Uluwatu Temple", "Rice Terraces", "Mount Batur", "Seminyak Beach"]
  },
  {
    id: 5,
    name: "Rome, Italy",
    country: "Italy",
    continent: "Europe",
    description: "The Eternal City with ancient history, stunning architecture, and amazing cuisine",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
    popularityScore: 89,
    avgTemperature: "16°C",
    bestMonths: ["April", "May", "September", "October"],
    timeZone: "CET",
    currency: "EUR",
    language: "Italian",
    highlights: ["Colosseum", "Vatican City", "Trevi Fountain", "Roman Forum"]
  }
];

// Mock hotels data
const hotels = [
  {
    id: 1,
    name: "Le Meurice",
    destinationId: 1,
    destination: "Paris, France",
    rating: 5,
    price: 850,
    currency: "EUR",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
    amenities: ["Spa", "Fine Dining", "Concierge", "Fitness Center"],
    description: "Luxury palace hotel in the heart of Paris",
    address: "228 Rue de Rivoli, 75001 Paris",
    reviews: 4.8,
    availability: true
  },
  {
    id: 2,
    name: "Park Hyatt Tokyo",
    destinationId: 2,
    destination: "Tokyo, Japan",
    rating: 5,
    price: 720,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    amenities: ["Spa", "Pool", "Business Center", "Restaurant"],
    description: "Modern luxury hotel with stunning city views",
    address: "3-7-1-2 Nishi Shinjuku, Tokyo",
    reviews: 4.7,
    availability: true
  },
  {
    id: 3,
    name: "The Plaza Hotel",
    destinationId: 3,
    destination: "New York City, USA",
    rating: 5,
    price: 695,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    amenities: ["Spa", "Shopping", "Fine Dining", "Concierge"],
    description: "Iconic luxury hotel on Fifth Avenue",
    address: "768 5th Ave, New York, NY 10019",
    reviews: 4.6,
    availability: true
  },
  {
    id: 4,
    name: "Four Seasons Resort Bali",
    destinationId: 4,
    destination: "Bali, Indonesia",
    rating: 5,
    price: 420,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
    amenities: ["Beach Access", "Spa", "Pool", "Water Sports"],
    description: "Beachfront luxury resort with traditional Balinese architecture",
    address: "Jl. Raya Sayan, Ubud, Bali",
    reviews: 4.9,
    availability: true
  },
  {
    id: 5,
    name: "Hotel de Russie",
    destinationId: 5,
    destination: "Rome, Italy",
    rating: 5,
    price: 580,
    currency: "EUR",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
    amenities: ["Garden", "Spa", "Fine Dining", "Historic"],
    description: "Elegant hotel with beautiful terraced gardens",
    address: "Via del Babuino, 9, 00187 Roma",
    reviews: 4.7,
    availability: true
  }
];

// Mock flights data
const flights = [
  {
    id: 1,
    airline: "Air France",
    from: "CDG",
    to: "JFK",
    departure: "2025-02-15T10:30:00",
    arrival: "2025-02-15T14:45:00",
    duration: "8h 15m",
    price: 850,
    currency: "USD",
    class: "Economy",
    stops: 0,
    aircraft: "Boeing 777"
  },
  {
    id: 2,
    airline: "Japan Airlines",
    from: "NRT",
    to: "LAX",
    departure: "2025-02-20T16:20:00",
    arrival: "2025-02-20T09:35:00",
    duration: "11h 15m",
    price: 1250,
    currency: "USD",
    class: "Business",
    stops: 0,
    aircraft: "Boeing 787"
  },
  {
    id: 3,
    airline: "Delta Airlines",
    from: "JFK",
    to: "CDG",
    departure: "2025-03-01T22:45:00",
    arrival: "2025-03-02T12:30:00",
    duration: "7h 45m",
    price: 720,
    currency: "USD",
    class: "Economy",
    stops: 0,
    aircraft: "Airbus A330"
  }
];

// Mock activities data
const activities = [
  {
    id: 1,
    name: "Eiffel Tower Skip-the-Line Tour",
    destinationId: 1,
    destination: "Paris, France",
    category: "Sightseeing",
    duration: "2 hours",
    price: 45,
    currency: "EUR",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f",
    description: "Skip the lines and enjoy panoramic views of Paris",
    included: ["Skip-the-line access", "Audio guide", "Elevator to 2nd floor"]
  },
  {
    id: 2,
    name: "Sushi Making Class",
    destinationId: 2,
    destination: "Tokyo, Japan",
    category: "Culinary",
    duration: "3 hours",
    price: 85,
    currency: "USD",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d",
    description: "Learn authentic sushi making from a master chef",
    included: ["All ingredients", "Professional instruction", "Certificate"]
  },
  {
    id: 3,
    name: "Central Park Bike Tour",
    destinationId: 3,
    destination: "New York City, USA",
    category: "Adventure",
    duration: "2.5 hours",
    price: 35,
    currency: "USD",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3",
    description: "Explore Central Park's highlights on a guided bike tour",
    included: ["Bike rental", "Helmet", "Professional guide"]
  },
  {
    id: 4,
    name: "Mount Batur Sunrise Trekking",
    destinationId: 4,
    destination: "Bali, Indonesia",
    category: "Adventure",
    duration: "6 hours",
    price: 55,
    currency: "USD",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    description: "Watch the sunrise from the top of an active volcano",
    included: ["Hotel pickup", "Breakfast", "Professional guide", "Flashlight"]
  },
  {
    id: 5,
    name: "Colosseum Underground Tour",
    destinationId: 5,
    destination: "Rome, Italy",
    category: "Historical",
    duration: "3 hours",
    price: 65,
    currency: "EUR",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
    description: "Explore the underground chambers of the ancient Colosseum",
    included: ["Skip-the-line access", "Underground access", "Professional guide"]
  }
];

// Mock weather data
const weatherData = [
  { destinationId: 1, temperature: 12, condition: "Partly Cloudy", humidity: 65, windSpeed: 15 },
  { destinationId: 2, temperature: 8, condition: "Clear", humidity: 45, windSpeed: 10 },
  { destinationId: 3, temperature: 5, condition: "Snow", humidity: 70, windSpeed: 20 },
  { destinationId: 4, temperature: 28, condition: "Sunny", humidity: 80, windSpeed: 8 },
  { destinationId: 5, temperature: 15, condition: "Rainy", humidity: 75, windSpeed: 12 }
];

// API Functions
export const travelApi = {
  // Destinations
  async getDestinations() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(destinations), 500);
    });
  },

  async getDestinationById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const destination = destinations.find(d => d.id === parseInt(id));
        resolve(destination);
      }, 300);
    });
  },

  async searchDestinations(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = destinations.filter(d => 
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.country.toLowerCase().includes(query.toLowerCase()) ||
          d.continent.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 400);
    });
  },

  // Hotels
  async getHotels(destinationId = null) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = destinationId 
          ? hotels.filter(h => h.destinationId === parseInt(destinationId))
          : hotels;
        resolve(filtered);
      }, 600);
    });
  },

  async getHotelById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const hotel = hotels.find(h => h.id === parseInt(id));
        resolve(hotel);
      }, 300);
    });
  },

  async searchHotels(destinationId, checkIn, checkOut, guests = 2) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = hotels.filter(h => h.destinationId === parseInt(destinationId));
        // Add price variation based on dates and guests
        const modifiedHotels = filtered.map(hotel => ({
          ...hotel,
          price: Math.round(hotel.price * (1 + Math.random() * 0.3 - 0.15))
        }));
        resolve(modifiedHotels);
      }, 800);
    });
  },

  // Flights
  async searchFlights(from, to, departDate, returnDate = null) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filter flights based on origin and destination
        const filtered = flights.filter(f => 
          f.from.toLowerCase().includes(from.toLowerCase()) ||
          f.to.toLowerCase().includes(to.toLowerCase())
        );
        
        // Add price variation
        const modifiedFlights = filtered.map(flight => ({
          ...flight,
          price: Math.round(flight.price * (1 + Math.random() * 0.4 - 0.2)),
          departure: departDate + "T" + flight.departure.split("T")[1],
          arrival: departDate + "T" + flight.arrival.split("T")[1]
        }));
        
        resolve(modifiedFlights);
      }, 700);
    });
  },

  async getFlightById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const flight = flights.find(f => f.id === parseInt(id));
        resolve(flight);
      }, 300);
    });
  },

  // Activities
  async getActivities(destinationId = null) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = destinationId 
          ? activities.filter(a => a.destinationId === parseInt(destinationId))
          : activities;
        resolve(filtered);
      }, 500);
    });
  },

  async getActivityById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const activity = activities.find(a => a.id === parseInt(id));
        resolve(activity);
      }, 300);
    });
  },

  async searchActivities(destinationId, category = null, priceRange = null) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = activities.filter(a => a.destinationId === parseInt(destinationId));
        
        if (category) {
          filtered = filtered.filter(a => a.category.toLowerCase() === category.toLowerCase());
        }
        
        if (priceRange) {
          filtered = filtered.filter(a => a.price >= priceRange.min && a.price <= priceRange.max);
        }
        
        resolve(filtered);
      }, 600);
    });
  },

  // Weather
  async getWeather(destinationId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const weather = weatherData.find(w => w.destinationId === parseInt(destinationId));
        resolve(weather);
      }, 400);
    });
  },

  // Trip Planning
  async createItinerary(destinationId, duration, budget, preferences = []) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const destination = destinations.find(d => d.id === parseInt(destinationId));
        const destinationHotels = hotels.filter(h => h.destinationId === parseInt(destinationId));
        const destinationActivities = activities.filter(a => a.destinationId === parseInt(destinationId));
        
        // Simple algorithm to create an itinerary
        const budgetPerDay = budget / duration;
        const selectedHotel = destinationHotels.find(h => h.price <= budgetPerDay * 0.6) || destinationHotels[0];
        
        const itinerary = {
          destination,
          hotel: selectedHotel,
          duration,
          totalBudget: budget,
          dailyBudget: budgetPerDay,
          activities: destinationActivities.slice(0, Math.min(duration, destinationActivities.length)),
          estimatedCost: selectedHotel.price * duration + destinationActivities.slice(0, duration).reduce((sum, a) => sum + a.price, 0)
        };
        
        resolve(itinerary);
      }, 1000);
    });
  },

  // Currency conversion (mock rates)
  async convertCurrency(amount, from, to) {
    const rates = {
      'USD': { 'EUR': 0.85, 'JPY': 110, 'IDR': 14500 },
      'EUR': { 'USD': 1.18, 'JPY': 130, 'IDR': 17000 },
      'JPY': { 'USD': 0.009, 'EUR': 0.0077, 'IDR': 131 },
      'IDR': { 'USD': 0.000069, 'EUR': 0.000059, 'JPY': 0.0076 }
    };
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const rate = rates[from]?.[to] || 1;
        resolve({
          originalAmount: amount,
          convertedAmount: Math.round(amount * rate * 100) / 100,
          fromCurrency: from,
          toCurrency: to,
          exchangeRate: rate
        });
      }, 300);
    });
  }
};

export default travelApi;