import { TabBar } from '@/components/TabBar'
import { Tabs } from 'expo-router'
import React from 'react'

const TabLayout = () => {
  return (
    <Tabs 
      screenOptions={{ headerShown: false }} 
      tabBar={props => <TabBar {...props} />}
    >
      {/* Left Group */}
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
          tabBarGroup: 'left'
        }} 
      />
      <Tabs.Screen 
        name="events" 
        options={{ 
          title: 'Events',
          tabBarGroup: 'left'
        }} 
      />
      <Tabs.Screen 
        name="packages" 
        options={{ 
          title: 'Packages',
          tabBarGroup: 'left'
        }} 
      />
      <Tabs.Screen 
        name="explore" 
        options={{ 
          title: 'Explore',
          tabBarGroup: 'left'
        }} 
      />
      
      {/* Center Group */}
      <Tabs.Screen 
        name="ar" 
        options={{ 
          title: 'ar',
          tabBarGroup: 'center'
        }} 
      />
      
      {/* Right Group */}
      <Tabs.Screen 
        name="alert" 
        options={{ 
          title: 'Alert',
          tabBarGroup: 'right'
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
          tabBarGroup: 'right'
        }} 
      />
    </Tabs>
  )
}

export default TabLayout