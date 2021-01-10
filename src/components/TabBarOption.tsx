import React, { cloneElement, ReactElement } from 'react'
import { StyleSheet } from 'react-native'

import Animated, { Easing, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import { ICON_SIZE, ANIMATION_DURATION } from '../global/Parameters'


interface TabBarOptionProps {
  index: number
  active: Animated.SharedValue<number>
  children: ReactElement
}

const TabBarOption = ({ index, active, children }: TabBarOptionProps) => {

  const isActive = useDerivedValue(() => index === active.value)
  const opacity = useDerivedValue(() => isActive.value ? 1 : 0)

  
  const showActive = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration: ANIMATION_DURATION, easing: Easing.linear })
    }
  })

  const backgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: isActive.value ? '#FFF' : 'rgba(0, 0, 0, 0)'
    }
  })

  return (
    <Animated.View style={[{ overflow: 'hidden' }, backgroundColor]}>
      {children}

      <Animated.View style={[styles.iconCopy, showActive]}>
        {cloneElement(children, { isActive: isActive })}
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  iconCopy: {
    position: 'absolute',
    zIndex: 10,
    width: ICON_SIZE,
    height: ICON_SIZE,
    overflow: 'hidden'
  }
})

export default TabBarOption