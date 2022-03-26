import React, { useState } from 'react'
import { Text, TouchableOpacity, SafeAreaView, ScrollView, View } from 'react-native'
import { Text as TextSvg } from 'react-native-svg'
import { PieChart } from 'react-native-svg-charts'
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import { ListItem, Divider } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'

import { COLORS } from '../assets/constants';

import styles from './ReportsScreenStyles'

const ReportsScreen = () => {
  const apiData = [
    {
      "id": 1,
      "categoryName": "Food",
      "list": [
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
        }
      ],
      "total": "10,000",
      "percentage": "22.22"
    },
    {
      "id": 2,
      "categoryName": "Shopping",
      "list": [],
      "total": "0.00",
      "percentage": "0.00"
    },
    {
      "id": 3,
      "categoryName": "Entertainment",
      "list": [],
      "total": "0.00",
      "percentage": "0.00"
    },
    {
      "id": 4,
      "categoryName": "Travel",
      "list": [
        {
          "id": 2,
          "transactionMadeOn": "2022-03-24",
          "transactionAmount": 100,
          "transactionType": "debit",
          "categoryName": "Travel",
          "source": null,
          "currency": "INR",
          "description": null,
          "transactionMode": "Debit Card"
        }
      ],
      "total": "20,000",
      "percentage": "55.56"
    },
    {
      "id": 5,
      "categoryName": "Salary",
      "list": [],
      "total": "0.00",
      "percentage": "0.00"
    },
    {
      "id": 6,
      "categoryName": "Rental",
      "list": [],
      "total": "0.00",
      "percentage": "0.00"
    },
    {
      "id": 7,
      "categoryName": "Others",
      "list": [
        {
          "id": 8,
          "transactionMadeOn": "2022-03-23",
          "transactionAmount": 40,
          "transactionType": "debit",
          "categoryName": "Others",
          "source": "**8416",
          "currency": "INR",
          "description": null,
          "transactionMode": "UPI"
        }
      ],
      "total": "25000",
      "percentage": "22.22"
    }
  ];

  const data = [];

  apiData.forEach((value, index) => {
    if (value.list.length !== 0) {
      data.push({
        ...value,
        svg: {
          fill: '#f4982a',
          fillOpacity: (1 - (0.1 * index)),
          onPress: () => console.log('press', index),
        },
        key: `pie-${index}`,
      });
    }
  });

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = (value) => setShow(value);

  const onValueChange = (event, newDate) => {
    const selectedDate = newDate || date;
    showPicker(false);
    setDate(selectedDate);
  };

  const Labels = ({ slices }) => (
    slices.map((slice, index) => {
      const { pieCentroid, data } = slice;
      return (
        <TextSvg
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fill={COLORS.primaryColor}
          fontSize={16}
          stroke={COLORS.primaryColor}
          strokeWidth={0.2}
        >
          {data.percentage + '%'}
        </TextSvg>
      )
    })
  )

  const getListItem = (item) => {
    return (
      <ListItem key={item.key} >
        <ListItem.Content
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <ListItem.Title
            style={{
              textTransform: 'capitalize',
              ...item.titleStyle
            }}
          >
            {item.label}
          </ListItem.Title>

          <ListItem.Subtitle
            style={{
              fontWeight: 'bold',
            }}
          >
            {item.value}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    )
  }

  return (
    <SafeAreaView style={styles.container} >
      {/* DATE PICKER */}
      <TouchableOpacity onPress={() => showPicker(true)}>
        <View
          style={styles.monthPickerView}
        >
          <MaterialIcons
            name="calendar-today"
            size={24}
            color={COLORS.secondaryColor}
          />
          <Text style={styles.monthPickerText}>
            {moment(date).format("MMM YYYY")}
          </Text>
        </View>
      </TouchableOpacity>

      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          minimumDate={new Date()}
          maximumDate={new Date(2025, 5)}
        />
      )}

      <PieChart
        style={styles.pieChart}
        valueAccessor={({ item }) => item.percentage}
        outerRadius={'70%'}
        innerRadius={10}
        data={data}
        spacing={0}
      >
        <Labels />
      </PieChart>

      {/* TOTAL EXPENSE */}
      {getListItem({
        key: 'total',
        label: 'Total',
        value: `₹ 50000.00`, // TODO - update with api
        titleStyle: { fontWeight: 'bold' },
      })}

      <ScrollView>
        {data?.map((dataSet) => (
          <View key={dataSet.key}>
            {getListItem({
              key: dataSet.key,
              label: dataSet?.name,
              value: `₹ ${dataSet.total} - ${dataSet.percentage}%`,
              titleStyle: {},
            })}

            <Divider style={{ backgroundColor: COLORS.lightgrey }} />
          </View>
        ))}
      </ScrollView >
    </SafeAreaView >
  )
}

export default ReportsScreen
