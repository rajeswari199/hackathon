import React, { useState } from 'react'
import { View } from 'react-native'
import { ListItem, Text, Divider } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import get from 'lodash/get'

import ModalActions from './ModalActions'

import { categoriesList, otherIcon } from '../utils/constants'
import { COLORS } from '../assets/constants'

import { getAmountDetails } from './service'

import styles from './CustomListItemStyles'

const CustomListItem = ({ info, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)

  const categoryDetails = categoriesList.find(item => item.name === info.categoryName)

  return (
    <>
      <View>
        <ListItem
          onPress={() => {
            console.log('pressed')
            setModalVisible(true)
          }}
        >
          <View style={styles.left}>
            <MaterialIcons
              name={get(categoryDetails, 'icon', otherIcon)}
              size={24}
              color={COLORS.primaryColor}
            />
          </View>

          <ListItem.Content>
            <ListItem.Title
              style={{ fontWeight: 'bold', textTransform: 'capitalize' }}
            >
              {info?.transactionMode}
            </ListItem.Title>
            <ListItem.Subtitle>
              {info?.transactionMadeOn}
            </ListItem.Subtitle>
          </ListItem.Content>

          <View>

            <Text style={getAmountDetails(info).style}>
              {getAmountDetails(info).symbol}{getAmountDetails(info).amount}
            </Text>
          </View>
        </ListItem>

        <Divider style={{ backgroundColor: 'lightgrey' }} />
      </View >

      <ModalActions
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
        info={info}
      />
    </>
  )
}

export default CustomListItem
