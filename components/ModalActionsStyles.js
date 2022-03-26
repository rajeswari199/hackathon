import { StyleSheet } from 'react-native'

import { COLORS } from '../assets/constants'

const styles = StyleSheet.create({
  closeIcon: {
    position: 'absolute',
    top: 28,
    right: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 280,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  modalTitle: {
    width: '100%',
    textAlign: 'left',
    fontSize: 20,
    color: COLORS.mainColor,
    marginTop: -5,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  contentBody: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  contentLabel: {
    flex: 1,
    fontSize: 14,
    color: COLORS.secondaryColor,
    textAlign: 'left'
  },
  contentValue: {
    fontSize: 14,
    marginLeft: 10,
    color: COLORS.secondaryColor,
    textAlign: 'right',
    fontWeight: "bold"
  }
})

export default styles
