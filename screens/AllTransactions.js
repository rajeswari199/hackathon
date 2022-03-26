import React, { useLayoutEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'
import { Text } from 'react-native-elements'
import { FontAwesome5 } from '@expo/vector-icons'

import { COLORS } from '../assets/constants'

const AllTransactions = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'All Transactions',
    })
  }, [])

  const mock = [
    {
      "id": 1,
      "transactionMadeOn": "2022-03-24",
      "transactionAmount": 40,
      "transactionType": "debit",
      "categoryName": "Food",
      "source": "**9746",
      "currency": "INR",
      "description": null,
      "transactionMode": "UPI"
    },
    {
      "id": 2,
      "transactionMadeOn": "2022-03-24",
      "transactionAmount": 100,
      "transactionType": "debit",
      "categoryName": "Home",
      "source": null,
      "currency": "INR",
      "description": null,
      "transactionMode": "Debit Card"
    }
  ]

  const [transactions, setTransactions] = useState(mock)

  return (
    transactions?.length > 0 ? (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {transactions?.map((info) => (
            <View key={info.id}>
              <CustomListItem
                info={info}
                navigation={navigation}
                id={info.id}
              />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    ) : (
      <View style={styles.containerNull}>
        <FontAwesome5 name='list-alt' size={24} color={COLORS.mainColor} />
        <Text h4 style={{ color: COLORS.secondaryColor }}>
          No Transactions
        </Text>
      </View>
    )
  )
}

export default AllTransactions

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryColor,
    padding: 0,
    flex: 1,
  },
  containerNull: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
