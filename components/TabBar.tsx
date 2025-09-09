import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import TabBarButton from './TabBarButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_BAR_PADDING = 20;
const TAB_GROUP_PADDING = 12;
const INDICATOR_HEIGHT = 50;
const BORDER_RADIUS = 50;
const GROUP_GAP = 15; // Gap between tab groups

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  // Group routes by their tabBarGroup option
  const groupedRoutes = {
    left: [] as Array<{ route: any; index: number }>,
    center: [] as Array<{ route: any; index: number }>,
    right: [] as Array<{ route: any; index: number }>
  };

  state.routes.forEach((route, index) => {
    const { options } = descriptors[route.key];
    const group = (options.tabBarGroup || 'left') as keyof typeof groupedRoutes;
    groupedRoutes[group].push({ route, index });
  });

  // Single animated value for all groups
  const indicatorPosition = useSharedValue(0);

  // Calculate dynamic dimensions with gaps
  const availableWidth = SCREEN_WIDTH - (TAB_BAR_PADDING * 2);
  const centerGroupWidth = groupedRoutes.center.length > 0 ? 60 : 0;
  const totalGapWidth = groupedRoutes.center.length > 0 ? GROUP_GAP * 2 : 0; // Gaps on both sides of center
  const sideGroupWidth = (availableWidth - centerGroupWidth - totalGapWidth) / 2;
  
  const getGroupWidth = (groupKey: keyof typeof groupedRoutes) => {
    if (groupKey === 'center') return centerGroupWidth;
    return sideGroupWidth;
  };

  const getButtonWidth = (groupKey: keyof typeof groupedRoutes) => {
    const groupWidth = getGroupWidth(groupKey);
    const routeCount = groupedRoutes[groupKey].length;
    if (routeCount === 0) return 0;
    return (groupWidth - TAB_GROUP_PADDING * 2) / routeCount;
  };

  // Update indicator position when active tab changes
  useEffect(() => {
    const activeRoute = state.routes[state.index];
    const { options } = descriptors[activeRoute.key];
    const activeGroup = (options.tabBarGroup || 'left') as keyof typeof groupedRoutes;
    
    if (activeGroup !== 'center') {
      const groupRoutes = groupedRoutes[activeGroup];
      const positionInGroup = groupRoutes.findIndex(item => item.index === state.index);
      const buttonWidth = getButtonWidth(activeGroup);
      const buttonX = buttonWidth * positionInGroup;
      
      indicatorPosition.value = withSpring(buttonX, { 
        damping: 20,
        stiffness: 300
      });
    }
  }, [state.index]);

  const renderTabGroup = (
    groupRoutes: Array<{ route: any; index: number }>, 
    groupKey: keyof typeof groupedRoutes
  ) => {
    if (groupRoutes.length === 0) return null;
    
    const isActiveGroup = groupRoutes.some(item => item.index === state.index);
    const groupWidth = getGroupWidth(groupKey);
    const buttonWidth = getButtonWidth(groupKey);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: indicatorPosition.value }]
    }));

    // ✅ If center group -> circle with indicator
    if (groupKey === "center") {
      const SIZE = 70; // diameter of circle tab
      return (
        <View style={{ width: SIZE, height: SIZE, alignItems: "center", justifyContent: "center" }}>
          <View
            style={{
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
              backgroundColor: "#29292B",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 12,
              shadowOpacity: 0.15,
              elevation: 8,
              position: 'relative',
            }}
          >
            {/* White indicator for center group */}
            {isActiveGroup && (
              <View
                style={{
                  position: 'absolute',
                  width: SIZE - 16,
                  height: SIZE - 16,
                  borderRadius: (SIZE - 16) / 2,
                  backgroundColor: '#fff',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                  shadowOpacity: 0.1,
                  elevation: 2,
                }}
              />
            )}
            
            {groupRoutes.map(({ route, index: routeIndex }) => {
              const { options } = descriptors[route.key];
              const isFocused = state.index === routeIndex;

              const onPress = () => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              };

              const onLongPress = () => {
                navigation.emit({
                  type: "tabLongPress",
                  target: route.key,
                });
              };

              return (
                <TabBarButton
                  key={route.name}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  isFocused={isFocused}
                  routeName={route.name}
                  color={isFocused ? "#29292B" : "#C9C7BA"}
                />
              );
            })}
          </View>
        </View>
      );
    }

    // ✅ Default pill style for left & right groups
    const SIZE = 70; // diameter of circle tab
    return (
      <View style={[
        styles.tabGroup,
        { 
          width: groupWidth,
        }
      ]}>
        {isActiveGroup && (
          <Animated.View
            style={[
              styles.indicator,
              animatedStyle,
              {
                position: 'absolute',
                width: SIZE - 16,
                height: SIZE - 16,
                borderRadius: (SIZE - 16) / 2,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                shadowOpacity: 0.1,
                elevation: 2,
              }
            ]}
          />
        )}
        
        {groupRoutes.map(({ route, index: routeIndex }) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === routeIndex;

          const onPress = () => {
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
      <View style={styles.tabBarContainer}>
        {/* Left Group */}
        <View style={[styles.sideContainer, { marginRight: groupedRoutes.center.length > 0 ? GROUP_GAP : 0 }]}>
          {renderTabGroup(groupedRoutes.left, 'left')}
        </View>
        
        {/* Center Group */}
        {groupedRoutes.center.length > 0 && (
          <View style={styles.centerContainer}>
            {renderTabGroup(groupedRoutes.center, 'center')}
          </View>
        )}
        
        {/* Right Group */}
        <View style={[styles.sideContainer, { marginLeft: groupedRoutes.center.length > 0 ? GROUP_GAP : 0 }]}>
          {renderTabGroup(groupedRoutes.right, 'right')}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Changed from 'space-evenly' to 'center' for better control
    width: SCREEN_WIDTH,
    paddingHorizontal: TAB_BAR_PADDING,
  },
  sideContainer: {
    // Removed flex: 1 to prevent stretching, let natural width take effect
    alignItems: 'center',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#29292B',
    borderRadius: BORDER_RADIUS,
    paddingVertical: 18,
    paddingHorizontal: TAB_GROUP_PADDING,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    shadowOpacity: 0.15,
    elevation: 8,
    position: 'relative',
    minHeight: INDICATOR_HEIGHT + 20,
  },
  indicator: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: BORDER_RADIUS - 4,
    left: TAB_GROUP_PADDING,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});