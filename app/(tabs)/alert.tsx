import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AlertNotificationPanel = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'landslide',
      title: 'Landslide',
      description: 'Mangan Road Block – High risk',
      radius: '900 m',
      severity: 'high',
      icon: 'warning',
      timestamp: Date.now() - (5 * 60 * 1000), // 5 minutes ago
      colors: {
        border: '#f87171',
        background: '#fef2f2',
        icon: '#dc2626',
        card: '#ffffff'
      }
    },
    {
      id: 2,
      type: 'road-closed',
      title: 'Road Closed',
      description: 'Nathula Pass seasonal closure',
      radius: '1200 m',
      severity: 'medium',
      icon: 'close-circle',
      timestamp: Date.now() - (12 * 60 * 1000), // 12 minutes ago
      colors: {
        border: '#fb923c',
        background: '#fff7ed',
        icon: '#ea580c',
        card: '#ffffff'
      }
    },
    {
      id: 3,
      type: 'flood',
      title: 'Flood',
      description: 'Teesta flood risk zone',
      radius: '800 m',
      severity: 'medium',
      icon: 'water',
      timestamp: Date.now() - (18 * 60 * 1000), // 18 minutes ago
      colors: {
        border: '#60a5fa',
        background: '#eff6ff',
        icon: '#2563eb',
        card: '#ffffff'
      }
    },
    {
      id: 4,
      type: 'landslide',
      title: 'Landslide',
      description: 'Yumthang Valley access issue',
      radius: '900 m',
      severity: 'high',
      icon: 'warning',
      timestamp: Date.now() - (25 * 60 * 1000), // 25 minutes ago
      colors: {
        border: '#f87171',
        background: '#fef2f2',
        icon: '#dc2626',
        card: '#ffffff'
      }
    },
    {
      id: 5,
      type: 'cultural-event',
      title: 'Cultural Festival',
      description: 'Losoong Festival celebration - Road restrictions',
      radius: '500 m',
      severity: 'low',
      icon: 'calendar',
      timestamp: Date.now() - (35 * 60 * 1000), // 35 minutes ago
      colors: {
        border: '#a78bfa',
        background: '#f5f3ff',
        icon: '#7c3aed',
        card: '#ffffff'
      }
    },
    {
      id: 6,
      type: 'cultural-event',
      title: 'Monastery Ritual',
      description: 'Rumtek Monastery annual ceremony - Heavy traffic',
      radius: '300 m',
      severity: 'low',
      icon: 'people',
      timestamp: Date.now() - (42 * 60 * 1000), // 42 minutes ago
      colors: {
        border: '#6366f1',
        background: '#eef2ff',
        icon: '#4f46e5',
        card: '#ffffff'
      }
    },
    {
      id: 7,
      type: 'cultural-event',
      title: 'Traditional Market',
      description: 'Weekly Lal Bazaar - Parking limited',
      radius: '200 m',
      severity: 'low',
      icon: 'location',
      timestamp: Date.now() - (58 * 60 * 1000), // 58 minutes ago
      colors: {
        border: '#34d399',
        background: '#ecfdf5',
        icon: '#059669',
        card: '#ffffff'
      }
    }
  ]);

  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (timestamp) => {
    const minutes = Math.floor((currentTime - timestamp) / (1000 * 60));
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 min ago';
    if (minutes < 60) return `${minutes} mins ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  const legendItems = [
    { icon: 'business', label: 'Monastery', color: '#d97706' },
    { icon: 'radio-button-on', label: 'Start', color: '#10b981' },
    { icon: 'radio-button-on', label: 'Stop', color: '#3b82f6' },
    { icon: 'warning', label: 'Landslide', color: '#dc2626' },
    { icon: 'close-circle', label: 'Road Closed', color: '#ea580c' },
    { icon: 'water', label: 'Flood', color: '#2563eb' },
    { icon: 'snow', label: 'Snow', color: '#06b6d4' },
    { icon: 'flame', label: 'Fire', color: '#dc2626' },
    { icon: 'calendar', label: 'Cultural Event', color: '#7c3aed' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="warning" size={24} color="#dc2626" />
          <Text style={styles.headerTitle}>Travel Alerts</Text>
        </View>
      </View>

      {/* Map Legend Card */}
      <View style={styles.legendCard}>
        <Text style={styles.legendTitle}>Map Legend</Text>
        
        <View style={styles.legendGrid}>
          {legendItems.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              {item.label === 'Start' || item.label === 'Stop' ? (
                <View 
                  style={[
                    styles.legendDot, 
                    { backgroundColor: item.color }
                  ]} 
                />
              ) : (
                <Ionicons name={item.icon} size={16} color={item.color} />
              )}
              <Text style={styles.legendLabel}>{item.label}</Text>
            </View>
          ))}
          
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#dc2626', opacity: 0.6 }]} />
            <Text style={styles.legendLabel}>Hazard radius</Text>
          </View>
        </View>
      </View>

      {/* Alerts Cards */}
      <ScrollView style={styles.alertsList} showsVerticalScrollIndicator={false}>
        {alerts.map((alert) => (
          <View key={alert.id} style={styles.alertCard}>
            <View
              style={[
                styles.alertContent,
                { 
                  backgroundColor: alert.colors.background,
                  borderLeftColor: alert.colors.border 
                }
              ]}
            >
              <View style={styles.alertHeader}>
                <View style={styles.alertTitleRow}>
                  <Ionicons name={alert.icon} size={22} color={alert.colors.icon} />
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                </View>
                <Text style={styles.timeAgo}>
                  {getTimeAgo(alert.timestamp)}
                </Text>
              </View>
              
              <Text style={styles.alertDescription}>
                {alert.description}
              </Text>
              
              <Text style={styles.alertRadius}>
                Radius ~ {alert.radius}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 50,
    paddingBottom: 110,
  },
  header: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginLeft: 12,
  },
  alertsList: {
    flex: 1,
  },
  alertCard: {
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  alertContent: {
    borderLeftWidth: 5,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  alertTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 10,
  },
  timeAgo: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6b7280',
    marginLeft: 12,
  },
  alertDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 10,
    lineHeight: 20,
  },
  alertRadius: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6b7280',
  },
  legendCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginTop: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 14,
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: '#374151',
    marginLeft: 8,
  },
});

export default AlertNotificationPanel;