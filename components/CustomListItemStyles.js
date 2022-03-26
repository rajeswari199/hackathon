import { StyleSheet } from 'react-native'

import { COLORS } from '../assets/constants'

const styles = StyleSheet.create({
  left: {
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 8,
    padding: 10,
  },
  debitedStyle: {
    fontWeight: 'bold',
    color: COLORS.red,
  },
  creditedStyle: {
    fontWeight: 'bold',
    color: COLORS.green,
  },
})

export default styles
