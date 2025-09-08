import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import TabBarButton from './TabBarButton';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  // Group routes by their tabBarGroup option
  const groupedRoutes = {
    left: [] as any[],
    center: [] as any[],
    right: [] as any[]
  };

  state.routes.forEach((route, index) => {
    const { options } = descriptors[route.key];
    const group = options.tabBarGroup || 'left';
    groupedRoutes[group as keyof typeof groupedRoutes].push({ route, index });
  });

  // Create separate animated values for each group
  const leftTabPosition = useSharedValue(0);
  const centerTabPosition = useSharedValue(0);
  const rightTabPosition = useSharedValue(0);

  const getAnimatedValue = (group: 'left' | 'center' | 'right') => {
    switch (group) {
      case 'left': return leftTabPosition;
      case 'center': return centerTabPosition;
      case 'right': return rightTabPosition;
    }
  };

  const renderTabGroup = (groupRoutes: any[], groupKey: 'left' | 'center' | 'right') => {
    if (groupRoutes.length === 0) return null;
    
    const isActiveGroup = groupRoutes.some(item => item.index === state.index);
    const animatedValue = getAnimatedValue(groupKey);
    
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: animatedValue.value }]
      }
    });

    // Calculate button width for this specific group
    const groupWidth = groupKey === 'center' ? 60 : 120; // Center group smaller
    const buttonWidth = groupWidth / groupRoutes.length;

    return (
      <View style={[
        styles.tabGroup,
        groupKey === 'center' ? styles.centerGroup : styles.sideGroup,
        !isActiveGroup && styles.inactiveGroup
      ]}>
        {isActiveGroup && (
          <Animated.View style={[
            animatedStyle,
            {
              position: 'absolute',
              backgroundColor: '#fff',
              borderRadius: 50,
              height: 50,
              width: buttonWidth - 10,
            }
          ]} />
        )}
        
        {groupRoutes.map(({ route, index: routeIndex }) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === routeIndex;
          const positionInGroup = groupRoutes.findIndex(item => item.index === routeIndex);

          const onPress = () => {
            if (isActiveGroup) {
              const buttonX = buttonWidth * positionInGroup;
              animatedValue.value = withSpring(buttonX, { duration: 1500 });
            }
            
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <View key={route.name} style={{ width: buttonWidth }}>
              <TabBarButton
                onPress={onPress}
                onLongPress={onLongPress}
                isFocused={isFocused}
                routeName={route.name}
                color={isFocused ? "#29292B" : "#C9C7BA"}
              />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Left Group */}
      {renderTabGroup(groupedRoutes.left, 'left')}
      
      {/* Center Group */}
      {renderTabGroup(groupedRoutes.center, 'center')}
      
      {/* Right Group */}
      {renderTabGroup(groupedRoutes.right, 'right')}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  tabGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#29292B',
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 8,
    shadowColor: '#29292B',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    shadowOpacity: 0.3,
    position: 'relative',
  },
  sideGroup: {
    minWidth: 120,
  },
  centerGroup: {
    minWidth: 60,
  },
  inactiveGroup: {
    opacity: 0.8,
  },
})