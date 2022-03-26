import React from 'react'
import {
  Modal,
  Pressable,
  View,
  Text,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import get from 'lodash/get'

import styles from './ModalActionsStyles'
import { getAmountDetails } from './service'

const fieldsList = [
  {
    key: 'mode',
    label: 'Transaction Mode',
    pathName: 'transactionMode'
  },
  {
    key: 'date',
    label: 'Date',
    pathName: 'transactionMadeOn'
  },
  {
    key: 'category',
    label: 'Category',
    pathName: 'categoryName'
  },
  {
    key: 'source',
    label: 'Source',
    pathName: 'source'
  },
  {
    key: 'amount',
    label: 'Amount',
    pathName: 'transactionAmount'
  },
]

const ModalActions = ({ modalVisible, setModalVisible, info }) => {
  const getValuesByKey = row => {
    if (row.key === 'amount') {
      return (
        <Text style={getAmountDetails(info).style}>
          {getAmountDetails(info).symbol}{Number(info?.transactionAmount)?.toFixed(2)}
        </Text>
      )
    }
    return get(info, row.pathName, null) ? get(info, row.pathName) : 'N/A'
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              Transaction Details
            </Text>

            <View style={styles.closeIcon}>
              <Pressable
                style={[styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <FontAwesome5 name='times-circle' size={24} color='black' />
              </Pressable>
            </View>

            <View
              style={styles.contentBody}
            >
              {fieldsList.map(item => (
                <View
                  key={item.key}
                  style={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'row',
                    marginTop: 8,
                    marginBottom: 8,
                  }}
                >
                  {/* Label */}
                  <Text style={styles.contentLabel}>
                    {item.label}:
                  </Text>

                  {/* Value */}
                  <Text
                    style={styles.contentValue}
                  >
                    {getValuesByKey(item)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ModalActions
