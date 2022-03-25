import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons'

import CustomListItem from '../components/CustomListItem'
import { COLORS } from '../assets/constants'

import styles from './HomeScreenStyles'

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Expense Tracker',
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => { }}>
            <Text style={{ fontWeight: 'bold' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      ),
    })
  }, [navigation])

  // transactions
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      referenceId: 10000,
    }
  ])
  // useEffect(() => {
  //   const unsubscribe = db
  //     .collection('expense')
  //     .orderBy('timestamp', 'desc')
  //     .onSnapshot(
  //       (snapshot) =>
  //         setTransactions(
  //           snapshot.docs.map((doc) => ({
  //             id: doc.id,
  //             data: doc.data(),
  //           }))
  //         ) &
  //         setTotalIncome(
  //           snapshot.docs.map((doc) =>
  //             doc.data()?.email === auth.currentUser.email &&
  //               doc.data()?.type == 'income'
  //               ? doc.data().price
  //               : 0
  //           )
  //         ) &
  //         setTotalExpense(
  //           snapshot.docs.map((doc) =>
  //             doc.data()?.email === auth.currentUser.email &&
  //               doc.data()?.type == 'expense'
  //               ? doc.data().price
  //               : 0
  //           )
  //         )
  //     )

  //   return unsubscribe
  // }, [])

  // stuff
  const [totalIncome, setTotalIncome] = useState([])
  const [income, setIncome] = useState(0)
  const [totalExpense, setTotalExpense] = useState([])
  const [expense, setExpense] = useState(0)
  const [totalBalance, setTotalBalance] = useState(0)

  useEffect(() => {
    if (totalIncome) {
      if (totalIncome?.length == 0) {
        setIncome(0)
      } else {
        setIncome(totalIncome?.reduce((a, b) => Number(a) + Number(b), 0))
      }
    }
    if (totalExpense) {
      if (totalExpense?.length == 0) {
        setExpense(0)
      } else {
        setExpense(totalExpense?.reduce((a, b) => Number(a) + Number(b), 0))
      }
    }
  }, [totalIncome, totalExpense, income, expense])

  useEffect(() => {
    if (income || expense) {
      setTotalBalance(income - expense)
    } else {
      setTotalBalance(0)
    }
  }, [totalIncome, totalExpense, income, expense])

  const [filter, setFilter] = useState([])

  return (
    <>
      <View style={styles.container}>
        <StatusBar style='dark' />
        <View style={styles.fullName}>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>Welcome</Text>
            <Text h4 style={{ color: COLORS.mainColor }}>
              Ragavi
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={{ textAlign: 'center', color: COLORS.primaryColor }}>
              Total Balance
            </Text>
            <Text h3 style={{ textAlign: 'center', color: COLORS.primaryColor }}>
              ₹ {totalBalance.toFixed(2)}
            </Text>
          </View>
          <View style={styles.cardBottom}>
            <View>
              <View style={styles.cardBottomSame}>
                <Feather name='arrow-down' size={18} color={COLORS.green} />
                <Text
                  style={{
                    textAlign: 'center',
                    marginLeft: 5,
                  }}
                >
                  Income
                </Text>
              </View>
              <Text h4 style={{ textAlign: 'center' }}>
                {`₹ ${income?.toFixed(2)}`}
              </Text>
            </View>
            <View>
              <View style={styles.cardBottomSame}>
                <Feather name='arrow-up' size={18} color={COLORS.red} />
                <Text style={{ textAlign: 'center', marginLeft: 5 }}>
                  Expense
                </Text>
              </View>
              <Text h4 style={{ textAlign: 'center' }}>
                {`₹ ${expense?.toFixed(2)}`}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.recentTitle}>
          <Text h4 style={{ color: COLORS.secondaryColor }}>
            Recent Transactions
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('All')}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {filter?.length > 0 ? (
          <View style={styles.recentTransactions}>
            {filter?.slice(0, 3).map((info) => (
              <View key={info.id}>
                <CustomListItem
                  info={info.data}
                  navigation={navigation}
                  id={info.id}
                />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.containerNull}>
            <FontAwesome5 name='list-alt' size={24} color={COLORS.mainColor} />
            <Text h4 style={{ color: COLORS.secondaryColor }}>
              No Transactions
            </Text>
          </View>
        )}
      </View>

      <View style={styles.addButton}>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => navigation.navigate('Add')}
          activeOpacity={0.5}
        >
          <AntDesign name='plus' size={24} color={COLORS.primaryColor} />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default HomeScreen
