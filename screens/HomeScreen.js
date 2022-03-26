import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, Image } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons'

import CustomListItem from '../components/CustomListItem'
import Footer from './Footer'

import { COLORS } from '../assets/constants'
import { ROUTES } from '../utils/constants'

import styles from './HomeScreenStyles'

const HeaderLogo = () => {
  const logo = require("../assets/logo.png");
  return (
    <Image
      style={{
        resizeMode: "contain",
        height: 40,
        width: 85,
      }}
      source={logo}
    />
  )
}

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (
        <HeaderLogo />
      ),
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => { }}>
            <MaterialIcons
              name="logout"
              size={24}
            />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => null
    })
  }, [navigation])

  // transactions
  const [transactions, setTransactions] = useState([
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
    },
    {
      "id": 6,
      "transactionMadeOn": "2022-03-24",
      "transactionAmount": 1000,
      "transactionType": "credit",
      "categoryName": "Home",
      "source": null,
      "currency": "INR",
      "description": null,
      "transactionMode": "Debit Card"
    }
  ])

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
            onPress={() => navigation.navigate(ROUTES.allTransactions)}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {transactions?.length > 0 ? (
          <View style={styles.recentTransactions}>
            {transactions?.slice(0, 3).map((info) => (
              <View key={info.id}>
                <CustomListItem
                  info={info}
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

      <Footer navigation={navigation} />
    </>
  )
}

export default HomeScreen
