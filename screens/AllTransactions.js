import React, { useEffect, useLayoutEffect, useState } from 'react'
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

  const [transactions, setTransactions] = useState([])

  const [filter, setFilter] = useState([])

  return (
    <>
      {filter?.length > 0 ? (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            {filter?.map((info) => (
              <View key={info.id}>
                <CustomListItem
                  info={info.data}
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
      )}
    </>
  )
}

export default AllTransactions

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryColor,
    padding: 0,
    marginTop: -23,
  },
  containerNull: {
    flex: 1,
    backgroundColor: COLORS.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
