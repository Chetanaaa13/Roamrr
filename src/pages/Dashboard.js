import React, { useState, useEffect } from 'react';
import { travelApi } from '../api/travelApi';
import CurrencyConverter from '../components/CurrencyConverter';

const Dashboard = () => {
  const [destinations, setDestinations] = useState([]);
  const [savedTrips, setSavedTrips] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickStats, setQuickStats] = useState({
    totalTrips: 0,
    totalDestinations: 0,
    favoriteDestination: null
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const destinationsData = await travelApi.getDestinations();
      const hotelsData = await travelApi.getHotels();
      const activitiesData = await travelApi.getActivities();

      // Sort destinations by popularity
      const popular = destinationsData
        .sort((a, b) => b.popularityScore - a.popularityScore)
        .slice(0, 3);

      setDestinations(destinationsData);
      setPopularDestinations(popular);

      // Mock saved trips data
      const mockSavedTrips = [
        {
          id: 1,
          destination: popular[0],
          dates: '2025-03-15 to 2025-03-22',
          status: 'upcoming',
          hotel: hotelsData.find(h => h.destinationId === popular[0].id),
          activities: activitiesData.filter(a => a.destinationId === popular[0].id).slice(0, 2)
        },
        {
          id: 2,
          destination: popular[1],
          dates: '2025-01-10 to 2025-01-17',
          status: 'completed',
          hotel: hotelsData.find(h => h.destinationId === popular[1].id),
          activities: activitiesData.filter(a => a.destinationId === popular[1].id).slice(0, 1)
        }
      ];

      setSavedTrips(mockSavedTrips);

      // Mock recent activity
      const mockActivity = [
        { id: 1, action: 'Booked hotel', item: 'Le Meurice, Paris', time: '2 hours ago', type: 'booking' },
        { id: 2, action: 'Searched flights', item: 'JFK to CDG', time: '5 hours ago', type: 'search' },
        { id: 3, action: 'Added activity', item: 'Eiffel Tower Tour', time: '1 day ago', type: 'activity' },
        { id: 4, action: 'Created itinerary', item: 'Tokyo 7-day trip', time: '2 days ago', type: 'planning' }
      ];

      setRecentActivity(mockActivity);

      // Calculate quick stats
      setQuickStats({
        totalTrips: mockSavedTrips.length,
        totalDestinations: destinationsData.length,
        favoriteDestination: popular[0]
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming': return '🎯';
      case 'completed': return '✅';
      case 'planning': return '📝';
      default: return '📅';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'booking': return '🏨';
      case 'search': return '🔍';
      case 'activity': return '🎯';
      case 'planning': return '📋';
      default: return '📌';
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <h2>Loading your travel dashboard...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🌍 Travel Dashboard</h1>
        <p>Welcome back! Here's your travel overview</p>
      </header>

      {/* Quick Stats */}
      <section style={styles.statsSection}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>✈️</div>
          <div style={styles.statInfo}>
            <h3>{quickStats.totalTrips}</h3>
            <p>Total Trips</p>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🌍</div>
          <div style={styles.statInfo}>
            <h3>{quickStats.totalDestinations}</h3>
            <p>Destinations Available</p>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>⭐</div>
          <div style={styles.statInfo}>
            <h3>{quickStats.favoriteDestination?.name}</h3>
            <p>Top Destination</p>
          </div>
        </div>
      </section>

      <div style={styles.mainContent}>
        <div style={styles.leftColumn}>
          {/* Saved Trips */}
          <section style={styles.section}>
            <h2>📅 Your Trips</h2>
            <div style={styles.tripsContainer}>
              {savedTrips.map(trip => (
                <div key={trip.id} style={styles.tripCard}>
                  <div style={styles.tripHeader}>
                    <img 
                      src={trip.destination.image} 
                      alt={trip.destination.name}
                      style={styles.tripImage}
                    />
                    <div style={styles.tripInfo}>
                      <h3>{trip.destination.name}</h3>
                      <p style={styles.tripDates}>{trip.dates}</p>
                      <div style={styles.tripStatus}>
                        {getStatusIcon(trip.status)} {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                      </div>
                    </div>
                  </div>
                  <div style={styles.tripDetails}>
                    <div style={styles.tripDetailItem}>
                      <strong>Hotel:</strong> {trip.hotel?.name}
                    </div>
                    <div style={styles.tripDetailItem}>
                      <strong>Activities:</strong> {trip.activities.length} planned
                    </div>
                  </div>
                  <div style={styles.tripActions}>
                    <button style={styles.actionButton}>View Details</button>
                    <button style={styles.actionButtonSecondary}>Edit Trip</button>
                  </div>
                </div>
              ))}
            </div>
            <button style={styles.planNewTripButton}>
              ➕ Plan New Trip
            </button>
          </section>

          {/* Popular Destinations */}
          <section style={styles.section}>
            <h2>🔥 Popular Destinations</h2>
            <div style={styles.destinationsGrid}>
              {popularDestinations.map(destination => (
                <div key={destination.id} style={styles.destinationCard}>
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    style={styles.destinationImage}
                  />
                  <div style={styles.destinationInfo}>
                    <h4>{destination.name}</h4>
                    <div style={styles.destinationMeta}>
                      <span>⭐ {destination.popularityScore}/100</span>
                      <span>🌡️ {destination.avgTemperature}</span>
                    </div>
                    <button style={styles.exploreButton}>Explore</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div style={styles.rightColumn}>
          {/* Currency Converter */}
          <section style={styles.section}>
            <CurrencyConverter />
          </section>

          {/* Recent Activity */}
          <section style={styles.section}>
            <h2>📊 Recent Activity</h2>
            <div style={styles.activityList}>
              {recentActivity.map(activity => (
                <div key={activity.id} style={styles.activityItem}>
                  <div style={styles.activityIcon}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div style={styles.activityDetails}>
                    <div style={styles.activityAction}>{activity.action}</div>
                    <div style={styles.activityItem}>{activity.item}</div>
                    <div style={styles.activityTime}>{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section style={styles.section}>
            <h2>⚡ Quick Actions</h2>
            <div style={styles.quickActions}>
              <button style={styles.quickActionButton}>
                ✈️ Search Flights
              </button>
              <button style={styles.quickActionButton}>
                🏨 Find Hotels
              </button>
              <button style={styles.quickActionButton}>
                🎯 Browse Activities
              </button>
              <button style={styles.quickActionButton}>
                🌤️ Check Weather
              </button>
              <button style={styles.quickActionButton}>
                📋 Create Itinerary
              </button>
              <button style={styles.quickActionButton}>
                💱 Convert Currency
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    padding: '2rem'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.2rem',
    color: '#666'
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  statsSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem'
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  statIcon: {
    fontSize: '2.5rem'
  },
  statInfo: {
    flex: 1
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  tripsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1rem'
  },
  tripCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '1.5rem',
    backgroundColor: '#fafafa'
  },
  tripHeader: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  tripImage: {
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    objectFit: 'cover'
  },
  tripInfo: {
    flex: 1
  },
  tripDates: {
    color: '#666',
    margin: '0.5rem 0'
  },
  tripStatus: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  tripDetails: {
    margin: '1rem 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  tripDetailItem: {
    fontSize: '0.9rem',
    color: '#666'
  },
  tripActions: {
    display: 'flex',
    gap: '0.5rem'
  },
  actionButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  actionButtonSecondary: {
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    color: '#667eea',
    border: '1px solid #667eea',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  planNewTripButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600'
  },
  destinationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem'
  },
  destinationCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'transform 0.3s ease'
  },
  destinationImage: {
    width: '100%',
    height: '120px',
    objectFit: 'cover'
  },
  destinationInfo: {
    padding: '1rem'
  },
  destinationMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0.5rem 0',
    fontSize: '0.9rem',
    color: '#666'
  },
  exploreButton: {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  activityItem: {
    display: 'flex',
    gap: '0.75rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  activityIcon: {
    fontSize: '1.5rem'
  },
  activityDetails: {
    flex: 1
  },
  activityAction: {
    fontWeight: '600',
    marginBottom: '0.25rem'
  },
  activityTime: {
    fontSize: '0.8rem',
    color: '#666'
  },
  quickActions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '0.75rem'
  },
  quickActionButton: {
    padding: '0.75rem',
    backgroundColor: '#f8f9fa',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    textAlign: 'center'
  }
};

export default Dashboard;