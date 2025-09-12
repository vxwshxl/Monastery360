import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import packagesList from '../components/packagesList';

const { width, height } = Dimensions.get('window');

interface PackageData {
  id: number;
  name: string;
  category: string[];
  duration: number;
  nights: number;
  destinations: string[];
  startingPrice: number;
  currency: string;
  image: string;
  inclusions: string[];
  coordinates: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  itinerary: Array<{
    day: number;
    morning: string;
    noon: string;
    evening: string;
  }>;
  pricing: {
    packageCost: number;
    gst: number;
    grandTotal: number;
    gstPercentage: number;
  };
  roomsGuests: {
    rooms: number;
    guests: number;
  };
  priceCategory: string;
  fromCity: string;
  rating: number;
  reviews: number;
  description: string;
}

const PackageDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Overview');
  const [packageData, setPackageData] = useState<PackageData | null>(null);

  useEffect(() => {
    if (id) {
      const pkg = packagesList.find(p => p.id === parseInt(Array.isArray(id) ? id[0] : id));
      setPackageData(pkg || null);
    }
  }, [id]);

  if (!packageData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading package details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const formatDestinations = (destinations: string[]) => {
    if (destinations.length <= 2) {
      return destinations.join(' → ');
    }
    return `${destinations[0]} → ${destinations[destinations.length - 1]}`;
  };

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'Family with Kids': '#FF6B6B',
      'Adventure': '#4ECDC4',
      'Spiritual': '#45B7D1',
      'Cultural': '#96CEB4',
      'Honeymoon': '#FECA57',
      'Couples': '#FF9FF3',
      'Wildlife': '#54A0FF',
      'Nature': '#5F27CD',
      'Photography': '#00D2D3',
      'Winter Sports': '#00D2D3',
      'Shopping': '#FF9F43'
    };
    
    return colorMap[category] || '#8395A7';
  };

  const tabs = ['Overview', 'Itinerary', 'Accommodation', 'Inclusion and Exclusion'];

  const renderOverview = () => (
    <View style={styles.tabContent}>
      <View style={styles.highlightsSection}>
        <Text style={styles.sectionTitle}>Package Highlights</Text>
        <Text style={styles.highlightsDescription}>{packageData.description}</Text>
        
        <View style={styles.highlightsGrid}>
          <View style={styles.highlightItem}>
            <Ionicons name="location" size={20} color="#4A90E2" />
            <Text style={styles.highlightText}>{packageData.destinations.length} Destinations</Text>
          </View>
          <View style={styles.highlightItem}>
            <Ionicons name="time" size={20} color="#4A90E2" />
            <Text style={styles.highlightText}>{packageData.duration} Days / {packageData.nights} Nights</Text>
          </View>
          <View style={styles.highlightItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4A90E2" />
            <Text style={styles.highlightText}>{packageData.inclusions.length} Inclusions</Text>
          </View>
          <View style={styles.highlightItem}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.highlightText}>Rated {packageData.rating}/5 ({packageData.reviews} reviews)</Text>
          </View>
        </View>
      </View>

      <View style={styles.overviewInclusionsSection}>
        <Text style={styles.sectionTitle}>What's Included</Text>
        <View style={styles.inclusionsGrid}>
          {packageData.inclusions.map((inclusion: string, index: number) => (
            <View key={index} style={styles.inclusionCard}>
              <Ionicons 
                name={
                  inclusion === 'Hotel' ? 'bed' :
                  inclusion === 'Transfer' ? 'car' :
                  inclusion === 'Sightseeing' ? 'eye' :
                  inclusion === 'Meals' ? 'restaurant' :
                  inclusion === 'Permits' ? 'document-text' :
                  inclusion === 'Guide' ? 'person' :
                  inclusion === 'Safari' ? 'camera' :
                  inclusion === 'Forest Permits' ? 'leaf' :
                  inclusion === 'Spiritual Guide' ? 'heart' :
                  inclusion === 'Winter Clothing' ? 'snow' :
                  inclusion === 'Snow Activities' ? 'snow' :
                  inclusion === 'Candlelight Dinner' ? 'restaurant' :
                  inclusion === 'Rain Gear' ? 'umbrella' :
                  'checkmark-circle'
                } 
                size={24} 
                color="#4A90E2" 
              />
              <Text style={styles.inclusionText}>{inclusion}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderItinerary = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Day-wise Itinerary</Text>
      {packageData.itinerary.map((day: any, index: number) => (
        <View key={index} style={styles.itineraryCard}>
          <View style={styles.dayHeader}>
            <View style={styles.dayBadge}>
              <Text style={styles.dayNumber}>Day {day.day}</Text>
            </View>
          </View>
          
          <View style={styles.itineraryContent}>
            {day.morning && (
              <View style={styles.itineraryItem}>
                <Ionicons name="sunny" size={16} color="#FFA500" />
                <Text style={styles.timeLabel}>Morning</Text>
                <Text style={styles.activityText}>{day.morning}</Text>
              </View>
            )}
            {day.noon && (
              <View style={styles.itineraryItem}>
                <Ionicons name="partly-sunny" size={16} color="#87CEEB" />
                <Text style={styles.timeLabel}>Noon</Text>
                <Text style={styles.activityText}>{day.noon}</Text>
              </View>
            )}
            {day.evening && (
              <View style={styles.itineraryItem}>
                <Ionicons name="moon" size={16} color="#9370DB" />
                <Text style={styles.timeLabel}>Evening</Text>
                <Text style={styles.activityText}>{day.evening}</Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );

  const renderAccommodation = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Accommodation Details</Text>
      <View style={styles.accommodationCard}>
        <View style={styles.accommodationHeader}>
          <Ionicons name="bed" size={24} color="#4A90E2" />
          <Text style={styles.accommodationTitle}>Hotel Accommodation</Text>
        </View>
        <Text style={styles.accommodationDescription}>
          Comfortable accommodation in {packageData.priceCategory} category hotels with modern amenities and excellent service.
        </Text>
        <View style={styles.accommodationFeatures}>
          <View style={styles.featureItem}>
            <Ionicons name="wifi" size={16} color="#4A90E2" />
            <Text style={styles.featureText}>Free WiFi</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="restaurant" size={16} color="#4A90E2" />
            <Text style={styles.featureText}>Restaurant</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="car" size={16} color="#4A90E2" />
            <Text style={styles.featureText}>Parking</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="snow" size={16} color="#4A90E2" />
            <Text style={styles.featureText}>Room Heater</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderInclusions = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Inclusions & Exclusions</Text>
      
      <View style={styles.inclusionsExclusionsCard}>
        <View style={styles.inclusionsExclusionsSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.sectionSubtitle}>Inclusions</Text>
          </View>
          {packageData.inclusions.map((inclusion: string, index: number) => (
            <View key={index} style={styles.listItem}>
              <Ionicons name="checkmark" size={16} color="#4CAF50" />
              <Text style={styles.listText}>{inclusion}</Text>
            </View>
          ))}
        </View>

        <View style={styles.exclusionsSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="close-circle" size={20} color="#F44336" />
            <Text style={styles.sectionSubtitle}>Exclusions</Text>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="close" size={16} color="#F44336" />
            <Text style={styles.listText}>Personal expenses and shopping</Text>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="close" size={16} color="#F44336" />
            <Text style={styles.listText}>Any meals not mentioned in inclusions</Text>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="close" size={16} color="#F44336" />
            <Text style={styles.listText}>Travel insurance</Text>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="close" size={16} color="#F44336" />
            <Text style={styles.listText}>Any additional activities not mentioned</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return renderOverview();
      case 'Itinerary':
        return renderItinerary();
      case 'Accommodation':
        return renderAccommodation();
      case 'Inclusion and Exclusion':
        return renderInclusions();
      default:
        return renderOverview();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Image */}
        <View style={styles.headerImageContainer}>
          <Image source={{ uri: packageData.image }} style={styles.headerImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
            style={styles.imageGradient}
          />
          
          {/* Header Actions */}
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            
            <View style={styles.rightActions}>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="share-outline" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="heart-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Package Info */}
          <View style={styles.packageInfo}>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>{packageData.category[0]}</Text>
            </View>
            
            <Text style={styles.packageTitle}>{packageData.name}</Text>
            
            <View style={styles.packageDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="location" size={16} color="#666" />
                <Text style={styles.detailText}>{packageData.destinations.length} Country</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="business" size={16} color="#666" />
                <Text style={styles.detailText}>{packageData.destinations.length} City</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="moon" size={16} color="#666" />
                <Text style={styles.detailText}>{packageData.nights} Nights</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="sunny" size={16} color="#666" />
                <Text style={styles.detailText}>{packageData.duration} Days</Text>
              </View>
            </View>
            
            <Text style={styles.routeText}>{formatDestinations(packageData.destinations)}</Text>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tab, activeTab === tab && styles.activeTab]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Tab Content */}
          <View style={styles.tabContentContainer}>
            {renderTabContent()}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceSection}>
          <Text style={styles.startingPriceText}>Starting Price</Text>
          <Text style={styles.priceText}>
            {packageData.currency}{packageData.startingPrice.toLocaleString('en-IN')}
          </Text>
        </View>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PackageDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  
  // Scroll Container
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom bar
  },
  
  // Header Image Section
  headerImageContainer: {
    height: height * 0.35,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerActions: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  rightActions: {
    flexDirection: 'row',
    gap: 12,
  },

  // Main Content
  mainContent: {
    backgroundColor: '#FFFFFF',
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    minHeight: height * 0.6, // Ensure minimum height for content
  },
  packageInfo: {
    padding: 24,
    paddingBottom: 16,
  },
  categoryTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  packageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1D29',
    lineHeight: 32,
    marginBottom: 16,
  },
  packageDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  routeText: {
    fontSize: 16,
    color: '#1A1D29',
    fontWeight: '600',
  },

  // Tabs
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 16,
  },
  tabsScroll: {
    paddingHorizontal: 20,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#4A90E2',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#FFFFFF',
  },

  // Tab Content
  tabContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tabContent: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1D29',
    marginBottom: 16,
  },

  // Overview Tab
  highlightsSection: {
    marginBottom: 24,
  },
  highlightsDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    minWidth: '45%',
  },
  highlightText: {
    fontSize: 14,
    color: '#1A1D29',
    fontWeight: '500',
  },
  overviewInclusionsSection: {
    marginBottom: 24,
  },
  inclusionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  inclusionCard: {
    width: (width - 72) / 2, // 2 columns with proper spacing
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  inclusionText: {
    fontSize: 14,
    color: '#1A1D29',
    fontWeight: '500',
    textAlign: 'center',
  },

  // Itinerary Tab
  itineraryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  dayHeader: {
    padding: 16,
    paddingBottom: 12,
  },
  dayBadge: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  itineraryContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  itineraryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    minWidth: 50,
  },
  activityText: {
    fontSize: 14,
    color: '#1A1D29',
    fontWeight: '500',
    flex: 1,
  },

  // Accommodation Tab
  accommodationCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  accommodationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  accommodationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1D29',
  },
  accommodationDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  accommodationFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  featureText: {
    fontSize: 12,
    color: '#1A1D29',
    fontWeight: '500',
  },

  // Inclusions & Exclusions Tab
  inclusionsExclusionsCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1D29',
  },
  inclusionsExclusionsSection: {
    marginBottom: 20,
  },
  exclusionsSection: {
    marginBottom: 0,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  listText: {
    fontSize: 14,
    color: '#1A1D29',
    fontWeight: '500',
    flex: 1,
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1000,
  },
  priceSection: {
    flex: 1,
  },
  startingPriceText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1D29',
    letterSpacing: -0.5,
  },
  bookButton: {
    backgroundColor: '#FF4757',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: '#FF4757',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});