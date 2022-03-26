import { StyleSheet } from 'react-native'
import { COLORS } from '../assets/constants'

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryColor,
    flex: 1,
  },
  monthPickerView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10
  },
  monthPickerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10
  },
  pieChart: {
    height: 280
  },
})

export default styles
