import React, { useState, useEffect } from 'react';
import { travelApi } from '../api/travelApi';

const TripPlanner = () => {
  const [activeTab, setActiveTab] = useState('destinations');
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [activities, setActivities] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [itinerary, setItinerary] = useState(null);
  
  // Form states
  const [tripForm, setTripForm] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    budget: 2000,
    duration: 5
  });

  const [flightForm, setFlightForm] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: ''
  });

  const [flights, setFlights] = useState([]);

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    setLoading(true);
    try {
      const data = await travelApi.getDestinations();
      setDestinations(data);
    } catch (error) {
      console.error('Error loading destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDestinationSelect = async (destination) => {
    setSelectedDestination(destination);
    setLoading(true);
    
    try {
      // Load related data for the destination
      const [hotelsData, activitiesData, weatherData] = await Promise.all([
        travelApi.getHotels(destination.id),
        travelApi.getActivities(destination.id),
        travelApi.getWeather(destination.id)
      ]);
      
      setHotels(hotelsData);
      setActivities(activitiesData);
      setWeather(weatherData);
    } catch (error) {
      console.error('Error loading destination data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const results = await travelApi.searchDestinations(searchQuery);
      setDestinations(results);
    } catch (error) {
      console.error('Error searching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFlightSearch = async () => {
    if (!flightForm.from || !flightForm.to || !flightForm.departDate) {
      alert('Please fill in all required flight search fields');
      return;
    }

    setLoading(true);
    try {
      const results = await travelApi.searchFlights(
        flightForm.from,
        flightForm.to,
        flightForm.departDate,
        flightForm.returnDate
      );
      setFlights(results);
    } catch (error) {
      console.error('Error searching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateItinerary = async () => {
    if (!selectedDestination) {
      alert('Please select a destination first');
      return;
    }

    setLoading(true);
    try {
      const result = await travelApi.createItinerary(
        selectedDestination.id,
        tripForm.duration,
        tripForm.budget
      );
      setItinerary(result);
      setActiveTab('itinerary');
    } catch (error) {
      console.error('Error generating itinerary:', error);
    } finally {
      setLoading(false);
    }
  };

  const DestinationsTab = () => (
    <div style={styles.tabContent}>
      <div style={styles.searchSection}>
        <h2>🌍 Explore Destinations</h2>
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button onClick={handleSearch} style={styles.searchButton}>
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div style={styles.loading}>Loading destinations...</div>
      ) : (
        <div style={styles.destinationsGrid}>
          {destinations.map(destination => (
            <div
              key={destination.id}
              style={{
                ...styles.destinationCard,
                ...(selectedDestination?.id === destination.id ? styles.selectedCard : {})
              }}
              onClick={() => handleDestinationSelect(destination)}
            >
              <img src={destination.image} alt={destination.name} style={styles.destinationImage} />
              <div style={styles.destinationInfo}>
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <div style={styles.destinationMeta}>
                  <span>🌡️ {destination.avgTemperature}</span>
                  <span>💰 {destination.currency}</span>
                  <span>⭐ {destination.popularityScore}/100</span>
                </div>
                <div style={styles.highlights}>
                  {destination.highlights.slice(0, 2).map((highlight, idx) => (
                    <span key={idx} style={styles.highlight}>{highlight}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const HotelsTab = () => (
    <div style={styles.tabContent}>
      <h2>🏨 Hotels</h2>
      {!selectedDestination ? (
        <p>Please select a destination first to see available hotels.</p>
      ) : (
        <>
          <div style={styles.formSection}>
            <h3>Search Hotels in {selectedDestination.name}</h3>
            <div style={styles.formRow}>
              <input
                type="date"
                value={tripForm.checkIn}
                onChange={(e) => setTripForm({...tripForm, checkIn: e.target.value})}
                style={styles.input}
                placeholder="Check-in"
              />
              <input
                type="date"
                value={tripForm.checkOut}
                onChange={(e) => setTripForm({...tripForm, checkOut: e.target.value})}
                style={styles.input}
                placeholder="Check-out"
              />
              <input
                type="number"
                value={tripForm.guests}
                onChange={(e) => setTripForm({...tripForm, guests: e.target.value})}
                style={styles.input}
                min="1"
                max="10"
                placeholder="Guests"
              />
            </div>
          </div>

          <div style={styles.hotelsGrid}>
            {hotels.map(hotel => (
              <div key={hotel.id} style={styles.hotelCard}>
                <img src={hotel.image} alt={hotel.name} style={styles.hotelImage} />
                <div style={styles.hotelInfo}>
                  <h3>{hotel.name}</h3>
                  <div style={styles.rating}>
                    {'⭐'.repeat(hotel.rating)} ({hotel.reviews})
                  </div>
                  <p>{hotel.description}</p>
                  <div style={styles.amenities}>
                    {hotel.amenities.map((amenity, idx) => (
                      <span key={idx} style={styles.amenity}>{amenity}</span>
                    ))}
                  </div>
                  <div style={styles.hotelPrice}>
                    <strong>{hotel.price} {hotel.currency}/night</strong>
                  </div>
                  <button style={styles.bookButton}>Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  const FlightsTab = () => (
    <div style={styles.tabContent}>
      <h2>✈️ Flights</h2>
      <div style={styles.formSection}>
        <h3>Search Flights</h3>
        <div style={styles.formRow}>
          <input
            type="text"
            placeholder="From (e.g., JFK, CDG)"
            value={flightForm.from}
            onChange={(e) => setFlightForm({...flightForm, from: e.target.value})}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="To (e.g., CDG, NRT)"
            value={flightForm.to}
            onChange={(e) => setFlightForm({...flightForm, to: e.target.value})}
            style={styles.input}
          />
          <input
            type="date"
            value={flightForm.departDate}
            onChange={(e) => setFlightForm({...flightForm, departDate: e.target.value})}
            style={styles.input}
          />
          <input
            type="date"
            value={flightForm.returnDate}
            onChange={(e) => setFlightForm({...flightForm, returnDate: e.target.value})}
            style={styles.input}
            placeholder="Return (optional)"
          />
          <button onClick={handleFlightSearch} style={styles.searchButton}>
            Search Flights
          </button>
        </div>
      </div>

      {flights.length > 0 && (
        <div style={styles.flightsContainer}>
          <h3>Available Flights</h3>
          {flights.map(flight => (
            <div key={flight.id} style={styles.flightCard}>
              <div style={styles.flightInfo}>
                <div style={styles.flightRoute}>
                  <strong>{flight.from} → {flight.to}</strong>
                  <span style={styles.airline}>{flight.airline}</span>
                </div>
                <div style={styles.flightTimes}>
                  <div>
                    <span>Departure: </span>
                    <strong>{new Date(flight.departure).toLocaleString()}</strong>
                  </div>
                  <div>
                    <span>Arrival: </span>
                    <strong>{new Date(flight.arrival).toLocaleString()}</strong>
                  </div>
                  <div>Duration: {flight.duration}</div>
                </div>
                <div style={styles.flightDetails}>
                  <span>{flight.class}</span>
                  <span>{flight.stops === 0 ? 'Direct' : `${flight.stops} stops`}</span>
                  <span>{flight.aircraft}</span>
                </div>
              </div>
              <div style={styles.flightPrice}>
                <strong>{flight.price} {flight.currency}</strong>
                <button style={styles.bookButton}>Book Flight</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const ActivitiesTab = () => (
    <div style={styles.tabContent}>
      <h2>🎯 Activities</h2>
      {!selectedDestination ? (
        <p>Please select a destination first to see available activities.</p>
      ) : (
        <>
          <h3>Activities in {selectedDestination.name}</h3>
          <div style={styles.activitiesGrid}>
            {activities.map(activity => (
              <div key={activity.id} style={styles.activityCard}>
                <img src={activity.image} alt={activity.name} style={styles.activityImage} />
                <div style={styles.activityInfo}>
                  <h4>{activity.name}</h4>
                  <div style={styles.activityMeta}>
                    <span style={styles.category}>{activity.category}</span>
                    <span style={styles.duration}>⏱️ {activity.duration}</span>
                    <span style={styles.rating}>⭐ {activity.rating}</span>
                  </div>
                  <p>{activity.description}</p>
                  <div style={styles.included}>
                    <strong>Included:</strong>
                    <ul>
                      {activity.included.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={styles.activityPrice}>
                    <strong>{activity.price} {activity.currency}</strong>
                    <button style={styles.bookButton}>Book Activity</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  const WeatherTab = () => (
    <div style={styles.tabContent}>
      <h2>🌤️ Weather</h2>
      {!selectedDestination ? (
        <p>Please select a destination first to see weather information.</p>
      ) : weather ? (
        <div style={styles.weatherCard}>
          <h3>Current Weather in {selectedDestination.name}</h3>
          <div style={styles.weatherInfo}>
            <div style={styles.temperature}>
              <span style={styles.tempValue}>{weather.temperature}°C</span>
              <span style={styles.condition}>{weather.condition}</span>
            </div>
            <div style={styles.weatherDetails}>
              <div>💧 Humidity: {weather.humidity}%</div>
              <div>💨 Wind: {weather.windSpeed} km/h</div>
            </div>
          </div>
          <div style={styles.bestTime}>
            <h4>Best Time to Visit:</h4>
            <div style={styles.months}>
              {selectedDestination.bestMonths.map((month, idx) => (
                <span key={idx} style={styles.month}>{month}</span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading weather information...</div>
      )}
    </div>
  );

  const ItineraryTab = () => (
    <div style={styles.tabContent}>
      <h2>📋 Trip Itinerary</h2>
      
      {!selectedDestination ? (
        <p>Please select a destination first.</p>
      ) : (
        <div style={styles.itineraryForm}>
          <h3>Generate Itinerary for {selectedDestination.name}</h3>
          <div style={styles.formRow}>
            <label>
              Duration (days):
              <input
                type="number"
                value={tripForm.duration}
                onChange={(e) => setTripForm({...tripForm, duration: parseInt(e.target.value)})}
                style={styles.input}
                min="1"
                max="30"
              />
            </label>
            <label>
              Budget ({selectedDestination.currency}):
              <input
                type="number"
                value={tripForm.budget}
                onChange={(e) => setTripForm({...tripForm, budget: parseInt(e.target.value)})}
                style={styles.input}
                min="100"
              />
            </label>
            <button onClick={generateItinerary} style={styles.generateButton} disabled={loading}>
              {loading ? 'Generating...' : 'Generate Itinerary'}
            </button>
          </div>
        </div>
      )}

      {itinerary && (
        <div style={styles.itineraryResult}>
          <h3>Your {itinerary.duration}-Day Trip to {itinerary.destination.name}</h3>
          
          <div style={styles.itinerarySummary}>
            <div style={styles.summaryCard}>
              <h4>🏨 Accommodation</h4>
              <p><strong>{itinerary.hotel.name}</strong></p>
              <p>{itinerary.hotel.description}</p>
              <p>💰 {itinerary.hotel.price} {itinerary.hotel.currency}/night</p>
            </div>

            <div style={styles.summaryCard}>
              <h4>💰 Budget Breakdown</h4>
              <p>Total Budget: {itinerary.totalBudget} {itinerary.destination.currency}</p>
              <p>Daily Budget: {Math.round(itinerary.dailyBudget)} {itinerary.destination.currency}</p>
              <p>Estimated Cost: {itinerary.estimatedCost} {itinerary.destination.currency}</p>
              <p style={{color: itinerary.estimatedCost <= itinerary.totalBudget ? 'green' : 'red'}}>
                {itinerary.estimatedCost <= itinerary.totalBudget ? '✅ Within Budget' : '⚠️ Over Budget'}
              </p>
            </div>
          </div>

          <div style={styles.activitiesPlanned}>
            <h4>🎯 Planned Activities</h4>
            <div style={styles.activitiesList}>
              {itinerary.activities.map((activity, idx) => (
                <div key={activity.id} style={styles.plannedActivity}>
                  <span style={styles.dayNumber}>Day {idx + 1}</span>
                  <div>
                    <strong>{activity.name}</strong>
                    <p>{activity.description}</p>
                    <span>{activity.price} {activity.currency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🌍 Roamr Trip Planner</h1>
        <p>Plan your perfect trip with AI-powered recommendations</p>
      </header>

      <nav style={styles.nav}>
        {['destinations', 'hotels', 'flights', 'activities', 'weather', 'itinerary'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.navButton,
              ...(activeTab === tab ? styles.activeNavButton : {})
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      <main style={styles.main}>
        {activeTab === 'destinations' && <DestinationsTab />}
        {activeTab === 'hotels' && <HotelsTab />}
        {activeTab === 'flights' && <FlightsTab />}
        {activeTab === 'activities' && <ActivitiesTab />}
        {activeTab === 'weather' && <WeatherTab />}
        {activeTab === 'itinerary' && <ItineraryTab />}
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f8f9fa',
    minHeight: '100vh'
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '2rem',
    textAlign: 'center'
  },
  nav: {
    display: 'flex',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '0 2rem',
    gap: '1rem'
  },
  navButton: {
    padding: '1rem 1.5rem',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#666',
    borderBottom: '3px solid transparent',
    transition: 'all 0.3s ease'
  },
  activeNavButton: {
    color: '#667eea',
    borderBottomColor: '#667eea'
  },
  main: {
    padding: '2rem'
  },
  tabContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  searchSection: {
    marginBottom: '2rem'
  },
  searchBar: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  searchInput: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  searchButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500'
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    color: '#666'
  },
  destinationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem'
  },
  destinationCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: 'white'
  },
  selectedCard: {
    borderColor: '#667eea',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)'
  },
  destinationImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  destinationInfo: {
    padding: '1rem'
  },
  destinationMeta: {
    display: 'flex',
    gap: '1rem',
    margin: '0.5rem 0',
    fontSize: '0.9rem',
    color: '#666'
  },
  highlights: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginTop: '0.5rem'
  },
  highlight: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.8rem'
  },
  formSection: {
    marginBottom: '2rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  formRow: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    alignItems: 'end'
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    minWidth: '150px'
  },
  hotelsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '1.5rem'
  },
  hotelCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  hotelImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  hotelInfo: {
    padding: '1rem'
  },
  rating: {
    margin: '0.5rem 0',
    color: '#ff9800'
  },
  amenities: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    margin: '0.5rem 0'
  },
  amenity: {
    backgroundColor: '#e8f5e8',
    color: '#2e7d32',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.8rem'
  },
  hotelPrice: {
    margin: '1rem 0',
    fontSize: '1.2rem',
    color: '#667eea'
  },
  bookButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500'
  },
  flightsContainer: {
    marginTop: '2rem'
  },
  flightCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: 'white'
  },
  flightInfo: {
    flex: 1
  },
  flightRoute: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '0.5rem'
  },
  airline: {
    color: '#666',
    fontSize: '0.9rem'
  },
  flightTimes: {
    display: 'flex',
    gap: '2rem',
    margin: '0.5rem 0',
    fontSize: '0.9rem'
  },
  flightDetails: {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.8rem',
    color: '#666'
  },
  flightPrice: {
    textAlign: 'right'
  },
  activitiesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem'
  },
  activityCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  activityImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover'
  },
  activityInfo: {
    padding: '1rem'
  },
  activityMeta: {
    display: 'flex',
    gap: '1rem',
    margin: '0.5rem 0',
    fontSize: '0.9rem'
  },
  category: {
    backgroundColor: '#fff3e0',
    color: '#f57c00',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.8rem'
  },
  duration: {
    color: '#666'
  },
  rating: {
    color: '#ff9800'
  },
  included: {
    margin: '1rem 0',
    fontSize: '0.9rem'
  },
  activityPrice: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem'
  },
  weatherCard: {
    backgroundColor: '#e3f2fd',
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center'
  },
  weatherInfo: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    margin: '1rem 0'
  },
  temperature: {
    textAlign: 'center'
  },
  tempValue: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#1976d2',
    display: 'block'
  },
  condition: {
    fontSize: '1.2rem',
    color: '#666'
  },
  weatherDetails: {
    textAlign: 'left'
  },
  bestTime: {
    marginTop: '2rem'
  },
  months: {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  month: {
    backgroundColor: '#fff',
    color: '#1976d2',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.9rem'
  },
  itineraryForm: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem'
  },
  generateButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500'
  },
  itineraryResult: {
    marginTop: '2rem'
  },
  itinerarySummary: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1rem',
    margin: '1rem 0'
  },
  summaryCard: {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    borderRadius: '8px'
  },
  activitiesPlanned: {
    marginTop: '2rem'
  },
  activitiesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  plannedActivity: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px'
  },
  dayNumber: {
    backgroundColor: '#667eea',
    color: 'white',
    padding: '0.5rem',
    borderRadius: '50%',
    minWidth: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.9rem',
    fontWeight: 'bold'
  }
};

export default TripPlanner;