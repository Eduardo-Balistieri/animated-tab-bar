import React from 'react'
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native'

import TabBarOption from '../components/TabBarOption'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSequence, withDelay } from 'react-native-reanimated'

import { Colors } from '../global/styles/Colors'
import { ICON_SIZE, LINE1_WIDTH, LINE2_WIDTH, ANIMATION_DURATION } from '../global/Parameters'


import { Home, Person, Settings, Apps } from '../icons'


const tabBarOptions = [Home, Person, Settings, Apps]

const { width } = Dimensions.get('window')
const TABBAR_OPTION_WIDTH = width / tabBarOptions.length



const TabBar = () => {
	const activeIndex = useSharedValue(0)

	const line1Position = useSharedValue(
		TABBAR_OPTION_WIDTH - (TABBAR_OPTION_WIDTH / 2) - LINE1_WIDTH + (ICON_SIZE / 2)
	)
	const line2Position = useSharedValue(
		TABBAR_OPTION_WIDTH - (TABBAR_OPTION_WIDTH / 2) - LINE2_WIDTH + (ICON_SIZE / 2)
	)

	const lineScale = useSharedValue(0)
	const lineOpacity = useSharedValue(0)


	const calculateTranslateXValue = (index: number, lineWidth: number, direction: 'right' | 'left') => {
		let translateX
		if (direction === 'right')
			translateX = TABBAR_OPTION_WIDTH * (index + 1) - (TABBAR_OPTION_WIDTH / 2) - lineWidth + (ICON_SIZE / 2)
		else
			translateX = TABBAR_OPTION_WIDTH * (index + 1) - (TABBAR_OPTION_WIDTH / 2) - (ICON_SIZE / 2)

		return translateX
	}

	const setActiveIndexHandler = (newIndex: number) => {
		'worklet'
		if (newIndex === activeIndex.value)
			return

		const direction = newIndex > activeIndex.value ? 'right' : 'left'
		activeIndex.value = newIndex

		const line1TranslateX = calculateTranslateXValue(newIndex, LINE1_WIDTH, direction)
		const line2TranslateX = calculateTranslateXValue(newIndex, LINE2_WIDTH, direction)

		line1Position.value = withTiming(
			line1TranslateX,
			{ duration: ANIMATION_DURATION * 0.85 }
		)
		line2Position.value = withDelay(ANIMATION_DURATION * 0.2,
			withTiming(line2TranslateX, { duration: ANIMATION_DURATION * 0.8 })
		)

		lineScale.value = lineOpacity.value = withSequence(
			withTiming(0.2, { duration: ANIMATION_DURATION * 0.3 }),
			withTiming(1, { duration: ANIMATION_DURATION * 0.35 }),
			withTiming(0, { duration: ANIMATION_DURATION * 0.35 })
		)
	}


	const line1AnimatedStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: line1Position.value },
				{ scaleX: lineScale.value }
			],
			opacity: lineOpacity.value
		}
	})

	const line2AnimatedStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: line2Position.value },
				{ scaleX: lineScale.value }
			],
			opacity: lineOpacity.value
		}
	})

	return (
		<View style={styles.tabBar}>
			{tabBarOptions.map((TabBarIcon, index) => {
				return (
					<TouchableOpacity
						activeOpacity={0.9}
						onPress={() => setActiveIndexHandler(index)}
						key={index}
						style={{ zIndex: 10 }}
					>
						<View style={styles.tabBarOptionWrapper}>
							<TabBarOption active={activeIndex} index={index}>
								<TabBarIcon isActive={false} />
							</TabBarOption>
						</View>
					</TouchableOpacity>
				)
			})}

			<View style={styles.barsWrapper}>
				<Animated.View style={[styles.line1, line1AnimatedStyles]} />
				<Animated.View style={[styles.line2, line2AnimatedStyles]} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	tabBar: {
		position: 'absolute',
		height: 70,
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: '#FFF',
		flexDirection: 'row',
		alignItems: 'center',

		shadowOpacity: 0.3,
		shadowColor: '#CCC',
		shadowRadius: 5,
	},
	tabBarOptionWrapper: {
		width: TABBAR_OPTION_WIDTH,
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},

	barsWrapper: {
		position: 'absolute',
		width: 0,
		zIndex: 5
	},

	line1: {
		height: 3,
		backgroundColor: Colors.active,
		borderRadius: 3,
		marginBottom: 5,
		width: LINE1_WIDTH
	},
	line2: {
		height: 3,
		backgroundColor: Colors.active,
		borderRadius: 3,
		width: LINE2_WIDTH
	}
})

export default TabBar