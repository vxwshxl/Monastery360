import BoldText from '@/assets/fonts/BoldText';
import LightText from '@/assets/fonts/LightText';
import MediumText from '@/assets/fonts/MediumText';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import markers from './markers';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

interface AITravelPlannerProps {
  visible: boolean;
  onClose: () => void;
}

interface Recommendation {
  monastery: any;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  travelTip: string;
  bestTime: string;
  duration: string;
}

export default function AITravelPlanner({ visible, onClose }: AITravelPlannerProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const slideAnim = useState(new Animated.Value(screenHeight))[0];

  useEffect(() => {
    if (visible) {
      generateRecommendations();
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const generateRecommendations = () => {
    setIsLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      // AI Algorithm: Sort by rating, then by review count, then by unique features
      const sortedMonasteries = [...markers].sort((a, b) => {
        // Primary: Rating (higher is better)
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        // Secondary: Number of reviews (more reviews = more popular)
        const aReviews = a.reviews?.length || 0;
        const bReviews = b.reviews?.length || 0;
        if (bReviews !== aReviews) {
          return bReviews - aReviews;
        }
        // Tertiary: Special features (historical significance, unique location, etc.)
        const aFeatures = getFeatureScore(a);
        const bFeatures = getFeatureScore(b);
        return bFeatures - aFeatures;
      });

      const aiRecommendations: Recommendation[] = sortedMonasteries.slice(0, 5).map((monastery, index) => {
        const priority = index < 2 ? 'high' : index < 4 ? 'medium' : 'low';
        return {
          monastery,
          reason: generateReason(monastery, index),
          priority,
          travelTip: generateTravelTip(monastery),
          bestTime: generateBestTime(monastery),
          duration: generateDuration(monastery),
        };
      });

      setRecommendations(aiRecommendations);
      setIsLoading(false);
    }, 1500);
  };

  const getFeatureScore = (monastery: any): number => {
    let score = 0;
    
    // Historical significance
    if (monastery.name.includes('Dubdi') || monastery.name.includes('Pemayangtse')) {
      score += 3; // Oldest/Historic
    }
    
    // Special architecture or features
    if (monastery.description.includes('murals') || monastery.description.includes('frescoes')) {
      score += 2;
    }
    
    // Festival or special events
    if (monastery.description.includes('festival') || monastery.description.includes('Cham dance')) {
      score += 2;
    }
    
    // Scenic views
    if (monastery.description.includes('view') || monastery.description.includes('Himalayas') || monastery.description.includes('Kanchenjunga')) {
      score += 2;
    }
    
    // Accessibility
    if (monastery.location.includes('Gangtok')) {
      score += 1; // More accessible
    }
    
    return score;
  };

  const generateReason = (monastery: any, index: number): string => {
    const reasons = [
      `Top-rated monastery with ${monastery.rating} stars and exceptional spiritual atmosphere`,
      `Highly recommended for its ${monastery.description.split(',')[0].toLowerCase()}`,
      `Perfect blend of ${monastery.description.split(' ').slice(0, 3).join(' ').toLowerCase()}`,
      `Must-visit for ${monastery.description.split(' ').slice(-3).join(' ').toLowerCase()}`,
      `Outstanding ${monastery.description.split(' ')[0].toLowerCase()} experience`
    ];
    return reasons[index] || reasons[0];
  };

  const generateTravelTip = (monastery: any): string => {
    const tips = [
      "Visit early morning for the best spiritual experience and fewer crowds",
      "Wear comfortable walking shoes as some areas require climbing",
      "Respect the monastery rules - remove shoes and maintain silence",
      "Bring a camera for stunning architectural photography",
      "Plan to spend at least 1-2 hours to fully appreciate the monastery",
      "Check for special ceremonies or festivals before visiting",
      "Dress modestly and cover your shoulders and knees",
      "Consider hiring a local guide for better cultural understanding"
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const generateBestTime = (monastery: any): string => {
    const times = [
      "Early morning (6-8 AM) for peaceful meditation",
      "Late afternoon (4-6 PM) for golden hour photography",
      "Morning hours (8-10 AM) for guided tours",
      "Evening (5-7 PM) for sunset views",
      "Weekday mornings for fewer crowds"
    ];
    return times[Math.floor(Math.random() * times.length)];
  };

  const generateDuration = (monastery: any): string => {
    const durations = [
      "1-2 hours for a complete visit",
      "2-3 hours including meditation time",
      "1 hour for a quick tour",
      "3-4 hours for photography and exploration",
      "2 hours for guided experience"
    ];
    return durations[Math.floor(Math.random() * durations.length)];
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'low': return '#9E9E9E';
      default: return '#9E9E9E';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return 'star';
      case 'medium': return 'star-half';
      case 'low': return 'star-outline';
      default: return 'star-outline';
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.container,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.aiIconContainer}>
                <Feather name="compass" size={24} color="#fff" />
              </View>
              <View style={styles.headerText}>
                <BoldText style={styles.headerTitle}>AI Travel Planner</BoldText>
                <LightText style={styles.headerSubtitle}>Personalized monastery recommendations</LightText>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <View style={styles.loadingIcon}>
                  <Feather name="compass" size={32} color="#2196F3" />
                </View>
                <BoldText style={styles.loadingText}>AI is analyzing monasteries...</BoldText>
                <LightText style={styles.loadingSubtext}>Finding the best spiritual experiences for you</LightText>
              </View>
            ) : (
              <>
                {/* AI Summary */}
                <View style={styles.summaryCard}>
                  <View style={styles.summaryHeader}>
                    <Feather name="brain" size={20} color="#2196F3" />
                    <BoldText style={styles.summaryTitle}>AI Analysis Complete</BoldText>
                  </View>
                  <LightText style={styles.summaryText}>
                    Based on ratings, reviews, and unique features, I've curated the top 5 monastery experiences 
                    that will give you the most meaningful spiritual journey in Sikkim.
                  </LightText>
                </View>

                {/* Recommendations */}
                {recommendations.map((rec, index) => (
                  <View key={rec.monastery.id} style={styles.recommendationCard}>
                    <View style={styles.recommendationHeader}>
                      <View style={styles.rankContainer}>
                        <BoldText style={styles.rankNumber}>#{index + 1}</BoldText>
                      </View>
                      <View style={styles.priorityContainer}>
                        <Feather 
                          name={getPriorityIcon(rec.priority)} 
                          size={16} 
                          color={getPriorityColor(rec.priority)} 
                        />
                        <MediumText style={[styles.priorityText, { color: getPriorityColor(rec.priority) }]}>
                          {rec.priority.toUpperCase()}
                        </MediumText>
                      </View>
                    </View>

                    <View style={styles.monasteryInfo}>
                      <Image source={{ uri: rec.monastery.image }} style={styles.monasteryImage} />
                      <View style={styles.monasteryDetails}>
                        <BoldText style={styles.monasteryName}>{rec.monastery.name}</BoldText>
                        <MediumText style={styles.monasteryLocation}>{rec.monastery.location}</MediumText>
                        <View style={styles.ratingContainer}>
                          <Feather name="star" size={14} color="#FFD700" />
                          <MediumText style={styles.ratingText}>{rec.monastery.rating}</MediumText>
                        </View>
                      </View>
                    </View>

                    <View style={styles.reasonContainer}>
                      <Feather name="lightbulb" size={16} color="#4CAF50" />
                      <LightText style={styles.reasonText}>{rec.reason}</LightText>
                    </View>

                    <View style={styles.detailsGrid}>
                      <View style={styles.detailItem}>
                        <Feather name="clock" size={14} color="#666" />
                        <LightText style={styles.detailText}>{rec.duration}</LightText>
                      </View>
                      <View style={styles.detailItem}>
                        <Feather name="sunrise" size={14} color="#666" />
                        <LightText style={styles.detailText}>{rec.bestTime}</LightText>
                      </View>
                    </View>

                    <View style={styles.tipContainer}>
                      <Feather name="info" size={14} color="#2196F3" />
                      <LightText style={styles.tipText}>{rec.travelTip}</LightText>
                    </View>
                  </View>
                ))}

                {/* AI Footer */}
                <View style={styles.footerCard}>
                  <Feather name="sparkles" size={20} color="#9C27B0" />
                  <BoldText style={styles.footerTitle}>AI-Powered Recommendations</BoldText>
                  <LightText style={styles.footerText}>
                    These recommendations are generated using advanced algorithms that analyze ratings, 
                    reviews, historical significance, and unique features to ensure you have the most 
                    meaningful spiritual journey.
                  </LightText>
                </View>
              </>
            )}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    height: screenHeight * 0.9,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  aiIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  recommendationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rankContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankNumber: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '600',
  },
  monasteryInfo: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  monasteryImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  monasteryDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  monasteryName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  monasteryLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
    fontWeight: '600',
  },
  reasonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
  },
  reasonText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    backgroundColor: '#fff3e0',
    borderRadius: 8,
  },
  tipText: {
    fontSize: 13,
    color: '#e65100',
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
  footerCard: {
    backgroundColor: '#f3e5f5',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 16,
    color: '#9C27B0',
    marginTop: 8,
    marginBottom: 8,
  },
  footerText: {
    fontSize: 13,
    color: '#7b1fa2',
    textAlign: 'center',
    lineHeight: 18,
  },
});
