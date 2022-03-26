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
  const data = [
    {
      key: 1,
      value: 53,
      name: 'Education',
      amount: '10,000',
      svg: { fill: '#f4982a' },
      onPress: () => { console.log('pressed') }
    },
    {
      key: 2,
      value: 18,
      name: 'Beauty & Care',
      amount: '5,000',
      svg: { fill: '#F5A442' },
      onPress: () => { console.log('pressed') }
    },
    {
      key: 3,
      value: 15,
      name: 'Child',
      amount: '12,000',
      svg: { fill: '#F7AF5A' },
      onPress: () => { console.log('pressed') }
    },
    {
      key: 4,
      value: 12,
      name: 'Food',
      amount: '14,000',
      svg: { fill: '#F8BB73' },
      onPress: () => { console.log('pressed') }
    },
  ];

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = (value) => setShow(value);

  const onValueChange = (event, newDate) => {
    const selectedDate = newDate || date;

    showPicker(false);
    setDate(selectedDate);
    console.log("hello", selectedDate)
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
          {data.value + '%'}
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
        valueAccessor={({ item }) => item.value}
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
              value: `₹ ${dataSet.amount} - ${dataSet.value}%`,
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
