import React from 'react'
import { Tabs } from 'expo-router'
import { TabBar } from '@/components/TabBar'

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
        name="explore" 
        options={{ 
          title: 'Explore',
          tabBarGroup: 'left'
        }} 
      />
      
      {/* Center Group */}
      <Tabs.Screen 
        name="support" 
        options={{ 
          title: 'A.I.',
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