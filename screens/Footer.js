import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'

import { COLORS } from '../assets/constants'
import { ROUTES } from '../utils/constants'

import styles from './HomeScreenStyles'

export const Footer = ({ navigation }) => {
  return (
    <View style={styles.addButton}>
      {/* ALL TRANSACTIONS */}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate(ROUTES.allTransactions)}
      >
        <FontAwesome5 name='list-alt' size={24} color={COLORS.mainColor} />
      </TouchableOpacity>

      {/* REPORTS */}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate(ROUTES.reports)}
      >
        <FontAwesome5 name='chart-pie' size={24} color={COLORS.mainColor} />
      </TouchableOpacity>
    </View>
  )
}

export default Footer