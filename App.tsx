import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet } from 'react-native'

import TabBar from './src/screens/TabBar'

const App = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar style='dark' />
    <TabBar />
  </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFD'
  }
})

export default App
