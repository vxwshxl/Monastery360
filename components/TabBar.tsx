import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import TabBarButton from './TabBarButton';
import { AREventEmitter, AR_EVENTS } from './AREventEmitter';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_BAR_PADDING = 20;
const TAB_GROUP_PADDING = 12;
const INDICATOR_HEIGHT = 50;
const BORDER_RADIUS = 50;
const GROUP_GAP = 15; // Gap between tab groups

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
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

  // Animated values
  const indicatorPosition = useSharedValue(0);
  const tabBarOffset = useSharedValue(0);
  const leftGroupOffset = useSharedValue(0);
  const rightGroupOffset = useSharedValue(0);
  const centerRotation = useSharedValue(0);
  const isARToggled = useSharedValue(true);

  const availableWidth = SCREEN_WIDTH - TAB_BAR_PADDING * 2;
  const centerGroupWidth = groupedRoutes.center.length > 0 ? 60 : 0;
  const totalGapWidth = groupedRoutes.center.length > 0 ? GROUP_GAP * 2 : 0;
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

  useEffect(() => {
    const activeRoute = state.routes[state.index];
    const { options } = descriptors[activeRoute.key];
    const activeGroup = (options.tabBarGroup || 'left') as keyof typeof groupedRoutes;

    // 👇 Slide down when on explore or ar
    if (activeRoute.name === 'explore') {
      tabBarOffset.value = withTiming(100, { duration: 300 });
    } else if (activeRoute.name === 'ar') {
      leftGroupOffset.value = withTiming(100, { duration: 300 });
      rightGroupOffset.value = withTiming(100, { duration: 300 });
      centerRotation.value = withTiming(-45, { duration: 300 });
    } else {
      tabBarOffset.value = withTiming(0, { duration: 300 });
      leftGroupOffset.value = withTiming(0, { duration: 300 });
      rightGroupOffset.value = withTiming(0, { duration: 300 });
      centerRotation.value = withTiming(0, { duration: 300 });
    }

    if (activeGroup !== 'center') {
      const groupRoutes = groupedRoutes[activeGroup];
      const positionInGroup = groupRoutes.findIndex(item => item.index === state.index);
      const buttonWidth = getButtonWidth(activeGroup);
      const buttonX = buttonWidth * positionInGroup;

      indicatorPosition.value = withSpring(buttonX, {
        damping: 60,
        stiffness: 1000,
      });
    }
  }, [state.index]);

  // 🔥 Only slide down, no fade
  const animatedTabBarStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: tabBarOffset.value }],
  }));

  const animatedLeftGroupStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: leftGroupOffset.value }],
  }));

  const animatedRightGroupStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: rightGroupOffset.value }],
  }));

  const animatedCenterStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${centerRotation.value}deg` }],
  }));

   useEffect(() => {
    const subscription = AREventEmitter.addListener(AR_EVENTS.WEBVIEW_OPENED, () => {
      // Trigger the "animate in" part
      if (!isARToggled.value) {  // Only if not already toggled
        leftGroupOffset.value = withTiming(100, { duration: 300 });
        rightGroupOffset.value = withTiming(100, { duration: 300 });
        centerRotation.value = withTiming(-45, { duration: 300 });
        isARToggled.value = true;
      }
    });

    return () => subscription.remove();
  }, []);

  const toggleARAnimations = () => {
    // console.log("AR Toggle:", isARToggled.value);
    if (isARToggled.value) {
      // Reset back
      leftGroupOffset.value = withTiming(0, { duration: 300 });
      rightGroupOffset.value = withTiming(0, { duration: 300 });
      centerRotation.value = withTiming(0, { duration: 300 });

      AREventEmitter.emit(AR_EVENTS.TOGGLE_RESET);
    } else {
      // Animate in
      leftGroupOffset.value = withTiming(100, { duration: 300 });
      rightGroupOffset.value = withTiming(100, { duration: 300 });
      centerRotation.value = withTiming(-45, { duration: 300 });
    }
    isARToggled.value = !isARToggled.value;
  };

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

    if (groupKey === 'center') {
      const SIZE = 70;
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
            {isActiveGroup && (
              <View
                style={{
                  position: 'absolute',
                  width: SIZE - 16,
                  height: SIZE - 16,
                  borderRadius: (SIZE - 16) / 2,
                  backgroundColor: '#fff',
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
                  // console.log("AR 174: ", isARToggled.value);
                  isARToggled.value = true;
                  navigation.navigate(route.name, route.params);
                } else if (isFocused && route.name === 'ar') {
                  // 👇 Reset AR animations when AR tab is pressed while already active
                  toggleARAnimations();
                  // console.log(isARToggled.value);
                  // Emit tabPress for AR even when already focused
                  navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: false,
                  });
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

    const SIZE = 70;
    return (
      <View style={[styles.tabGroup, { width: groupWidth }]}>
        {isActiveGroup && (
          <Animated.View
            style={[
              styles.indicator,
              animatedStyle,
              {
                width: SIZE - 16,
                height: SIZE - 16,
                borderRadius: (SIZE - 16) / 2,
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
              // console.log("AR 242:", isARToggled.value);
              isARToggled.value = false;
              navigation.navigate(route.name, route.params);
            } else if (isFocused && route.name === 'ar') {
              // 👇 Toggle AR animations when AR tab is pressed while already active
              toggleARAnimations();
              // console.log(isARToggled.value);
              // Emit tabPress for AR even when already focused
              navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: false,
              });
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
        <Animated.View style={[styles.sideContainer, { marginRight: groupedRoutes.center.length > 0 ? GROUP_GAP : 0 }, animatedTabBarStyle, animatedLeftGroupStyle]}>
          {renderTabGroup(groupedRoutes.left, 'left')}
        </Animated.View>

        {groupedRoutes.center.length > 0 && (
          <Animated.View style={[styles.centerContainer, animatedCenterStyle, animatedTabBarStyle]}>
            {renderTabGroup(groupedRoutes.center, 'center')}
          </Animated.View>
        )}

        <Animated.View style={[styles.sideContainer, { marginLeft: groupedRoutes.center.length > 0 ? GROUP_GAP : 0 }, animatedTabBarStyle, animatedRightGroupStyle]}>
          {renderTabGroup(groupedRoutes.right, 'right')}
        </Animated.View>
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
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    paddingHorizontal: TAB_BAR_PADDING,
  },
  sideContainer: {
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
    left: TAB_GROUP_PADDING,
  },
});