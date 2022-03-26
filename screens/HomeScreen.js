import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { View, TouchableOpacity } from "react-native";
import { Text, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import get from 'lodash/get'

import CustomListItem from "../components/CustomListItem";
import { COLORS } from "../assets/constants";

import {
  selectTransactionDetails,
  getTransactionList,
} from "../slice/HomeScreen.slice";

import styles from "./HomeScreenStyles";

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
  );
};

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const transactionsDetails = useSelector(selectTransactionDetails)

  useEffect(() => {
    dispatch(getTransactionList());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: <HeaderLogo />,
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
            <MaterialIcons name="logout" size={24} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const totalBalance = get(transactionsDetails, 'monthIncome', 0) - get(transactionsDetails, 'monthExpenses', 0)

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.fullName}>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Welcome</Text>
            <Text h4 style={{ color: COLORS.mainColor }}>
              Ragavi
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={{ textAlign: "center", color: COLORS.primaryColor }}>
              Total Balance
            </Text>
            <Text
              h3
              style={{ textAlign: "center", color: COLORS.primaryColor }}
            >
              ₹ {totalBalance.toFixed(2)}
            </Text>
          </View>
          <View style={styles.cardBottom}>
            <View>
              <View style={styles.cardBottomSame}>
                <Feather name="arrow-down" size={18} color={COLORS.green} />
                <Text
                  style={{
                    textAlign: "center",
                    marginLeft: 5,
                  }}
                >
                  Income
                </Text>
              </View>
              <Text h4 style={{ textAlign: "center" }}>
                {`₹ ${get(transactionsDetails, 'monthIncome', 0)?.toFixed(2)}`}
              </Text>
            </View>
            <View>
              <View style={styles.cardBottomSame}>
                <Feather name="arrow-up" size={18} color={COLORS.red} />
                <Text style={{ textAlign: "center", marginLeft: 5 }}>
                  Expense
                </Text>
              </View>
              <Text h4 style={{ textAlign: "center" }}>
                {`₹ ${get(transactionsDetails, 'monthExpenses', 0)?.toFixed(2)}`}
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
            onPress={() => navigation.navigate("All")}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {get(transactionsDetails, 'list', [])?.length > 0 ? (
          <View style={styles.recentTransactions}>
            {get(transactionsDetails, 'list', [])?.slice(0, 3).map((info) => (
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
            <FontAwesome5 name="list-alt" size={24} color={COLORS.mainColor} />
            <Text h4 style={{ color: COLORS.secondaryColor }}>
              No Transactions
            </Text>
          </View>
        )}
      </View>

      <View style={styles.addButton}>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => navigation.navigate("Add")}
          activeOpacity={0.5}
        >
          <AntDesign name="plus" size={24} color={COLORS.primaryColor} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HomeScreen;
