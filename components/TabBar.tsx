import { View, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import TabBarButton from './TabBarButton';

export function TabBar({ state, descriptors, navigation } : BottomTabBarProps) {

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

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
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? "#ff0" : "#fff"}
          />
          // <PlatformPressable
          //   key={route.name}
          //   href={buildHref(route.name, route.params)}
          //   accessibilityState={isFocused ? { selected: true } : {}}
          //   accessibilityLabel={options.tabBarAccessibilityLabel}
          //   testID={options.tabBarButtonTestID}
          //   onPress={onPress}
          //   onLongPress={onLongPress}
          //   style={styles.tabbarItem}
          // >
          //   {icon[route.name]({
          //     color: isFocused ? "#ff0" : "#fff"
          //   })}
          // </PlatformPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    tabbar: {
      position: 'absolute',
      bottom: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#222',
      marginHorizontal: 80,
      paddingVertical: 20,
      borderRadius: 35,
      shadowColor: '#222',
      shadowOffset: { width: 0, height: 10},
      shadowRadius: 10,
      shadowOpacity: 0.1,
    },
})