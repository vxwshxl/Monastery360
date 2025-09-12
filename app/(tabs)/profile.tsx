import BoldText from '@/assets/fonts/BoldText';
import LightText from '@/assets/fonts/LightText';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  progress: number;
  description: string;
  isUnlocked: boolean;
}

interface Review {
  id: string;
  monasteryName: string;
  rating: number;
  review: string;
  date: string;
  image: string;
}

const Page = () => {
  const [activeTab, setActiveTab] = useState<'reviews' | 'badges'>('badges');

  const badges: Badge[] = [
    {
      id: '1',
      name: 'Spiritual Explorer',
      icon: 'star',
      color: '#9C27B0',
      progress: 67,
      description: 'Visit 5 monasteries',
      isUnlocked: true
    },
    {
      id: '2',
      name: 'Mountain Wanderer',
      icon: 'award',
      color: '#4CAF50',
      progress: 45,
      description: 'Complete 3 mountain treks',
      isUnlocked: true
    },
    {
      id: '3',
      name: 'Meditation Master',
      icon: 'check-circle',
      color: '#2196F3',
      progress: 23,
      description: 'Meditate for 10 hours',
      isUnlocked: false
    },
    {
      id: '4',
      name: 'Cultural Ambassador',
      icon: 'users',
      color: '#FF9800',
      progress: 89,
      description: 'Share 20 cultural insights',
      isUnlocked: true
    },
    {
      id: '5',
      name: 'Photography Pro',
      icon: 'camera',
      color: '#E91E63',
      progress: 34,
      description: 'Take 100 monastery photos',
      isUnlocked: false
    },
    {
      id: '6',
      name: 'Peace Seeker',
      icon: 'heart',
      color: '#795548',
      progress: 6,
      description: 'Complete 50 peaceful moments',
      isUnlocked: false
    }
  ];

  const reviews: Review[] = [
    {
      id: '1',
      monasteryName: 'Tashiding Monastery',
      rating: 5,
      review: 'A truly spiritual experience. The peaceful atmosphere and stunning views made this visit unforgettable.',
      date: '2 weeks ago',
      image: 'https://s7ap1.scene7.com/is/image/incredibleindia/spiritual-spots-in-pelling-popular?qlt=82&ts=1726655959297,3'
    },
    {
      id: '2',
      monasteryName: 'Rumtek Monastery',
      rating: 5,
      review: 'Incredible architecture and rich history. The guided tour was very informative.',
      date: '1 month ago',
      image: 'https://www.tourmyindia.com/states/sikkim/images/rumtek1.jpg'
    },
    {
      id: '3',
      monasteryName: 'Pemayangtse Monastery',
      rating: 4,
      review: 'Beautiful monastery with amazing views of Kanchenjunga. Worth the visit!',
      date: '2 months ago',
      image: 'https://s7ap1.scene7.com/is/image/incredibleindia/pemayangtse-monastery-pelling-sikkim-2-attr-hero?qlt=82&ts=1726656027807,2'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Feather
        key={index}
        name="star"
        size={14}
        color={index < rating ? "#FFD700" : "#E0E0E0"}
        style={styles.star}
      />
    ));
  };

  const renderBadge = (badge: Badge) => (
    <View key={badge.id} style={styles.badgeContainer}>
      <View style={[styles.badge, { backgroundColor: badge.color }]}>
        <Feather name={badge.icon as any} size={24} color="#fff" />
      </View>
      <View style={styles.badgeInfo}>
        <BoldText style={styles.badgeName}>{badge.name}</BoldText>
        <LightText style={styles.badgeDescription}>{badge.description}</LightText>
        <View style={styles.progressContainer}>
          <LightText style={styles.progressText}>Progress: {badge.progress}%</LightText>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${badge.progress}%`,
                  backgroundColor: badge.isUnlocked ? '#4CAF50' : '#E0E0E0'
                }
              ]} 
            />
          </View>
        </View>
      </View>
    </View>
  );

  const renderReview = (review: Review) => (
    <View key={review.id} style={styles.reviewContainer}>
      <Image source={{ uri: review.image }} style={styles.reviewImage} />
      <View style={styles.reviewContent}>
        <View style={styles.reviewHeader}>
          <BoldText style={styles.monasteryName}>{review.monasteryName}</BoldText>
        </View>
        <View style={styles.ratingContainer}>
          {renderStars(review.rating)}
        </View>
        <LightText style={styles.reviewText}>{review.review}</LightText>
        <LightText style={styles.reviewDate}>{review.date}</LightText>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Modern Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' }} 
            style={styles.avatar} 
          />
          <View style={styles.avatarRing} />
        </View>
        <View style={styles.userInfo}>
          <BoldText style={styles.userName}>User</BoldText>
          <LightText style={styles.userHandle}>@User</LightText>
        </View>
      </View>

      {/* Modern Bio Section */}
      <View style={styles.bioContainer}>
        <View style={styles.bioCard}>
          <View style={styles.bioItem}>
            <View style={styles.iconContainer}>
              <Feather name="map-pin" size={18} color="#29292B" />
            </View>
            <LightText style={styles.bioText}>Guwahati, Assam</LightText>
          </View>
          <View style={styles.bioItem}>
            <View style={styles.iconContainer}>
              <Feather name="calendar" size={18} color="#29292B" />
            </View>
            <LightText style={styles.bioText}>8 Feb, 1990</LightText>
          </View>
          <View style={styles.bioItem}>
            <View style={styles.iconContainer}>
              <Feather name="link" size={18} color="#29292B" />
            </View>
            <LightText style={styles.bioText}>www.monastery360.com/user</LightText>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
          onPress={() => setActiveTab('reviews')}
        >
          <BoldText style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
            Reviews
          </BoldText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'badges' && styles.activeTab]}
          onPress={() => setActiveTab('badges')}
        >
          <BoldText style={[styles.tabText, activeTab === 'badges' && styles.activeTabText]}>
            Badges
          </BoldText>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'badges' ? (
          <View style={styles.badgesGrid}>
            {badges.map(renderBadge)}
          </View>
        ) : (
          <View style={styles.reviewsList}>
            {reviews.map(renderReview)}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    marginBottom: 120,
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 100,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: '#fff',
  },
  avatarRing: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 68,
    borderWidth: 3,
    borderColor: '#29292B',
    opacity: 0.3,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 28,
    color: '#1a1a1a',
    marginBottom: 4,
    fontWeight: '700',
  },
  userHandle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '400',
  },
  bioContainer: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  bioCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  bioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bioText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#29292B',
    shadowColor: '#29292B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  badgesGrid: {
    paddingBottom: 20,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#29292B',
  },
  badge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    borderWidth: 4,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeName: {
    fontSize: 18,
    color: '#1a1a1a',
    marginBottom: 6,
    fontWeight: '700',
  },
  badgeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  reviewsList: {
    paddingBottom: 20,
  },
  reviewContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  reviewImage: {
    width: 70,
    height: 70,
    borderRadius: 15,
    marginRight: 20,
  },
  reviewContent: {
    flex: 1,
  },
  reviewHeader: {
    marginBottom: 8,
  },
  monasteryName: {
    fontSize: 18,
    color: '#1a1a1a',
    fontWeight: '700',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  star: {
    marginRight: 3,
  },
  reviewText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 10,
  },
  reviewDate: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },
});
