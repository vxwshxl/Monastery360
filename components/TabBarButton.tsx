import { View, StyleSheet } from 'react-native'
import React from 'react'
import { PlatformPressable } from '@react-navigation/elements'
import { icon } from '@/constants/icon'

const TabBarButton = (
    {
        onPress, onLongPress, isFocused, routeName, color
    } : {
        onPress:Function;
        onLongPress:Function;
        isFocused:boolean;
        routeName:string;
        color:string
    }) => {
        return (
            <PlatformPressable
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabbarItem}
                >
                {icon[routeName]({
                    color: isFocused ? "#ff0" : "#fff"
                })}
            </PlatformPressable>
        )
}

export default TabBarButton

const styles = StyleSheet.create({
    tabbarItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
    }
})