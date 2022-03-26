import React, { useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'
import { Text } from 'react-native-elements'
import { FontAwesome5 } from '@expo/vector-icons'
import { useSelector } from 'react-redux'

import { selectTransactionList } from "../slice/HomeScreen.slice";

import { COLORS } from '../assets/constants'

const AllTransactions = ({ navigation }) => {
  const transactionsList = useSelector(selectTransactionList)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'All Transactions',
    })
  }, [])

  return (
    transactionsList?.length > 0 ? (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {transactionsList?.map((info) => (
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
