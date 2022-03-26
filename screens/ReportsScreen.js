import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, TouchableOpacity, SafeAreaView, ScrollView, View } from 'react-native'
import { Text as TextSvg } from 'react-native-svg'
import { PieChart } from 'react-native-svg-charts'
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import { ListItem, Divider } from 'react-native-elements'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import get from 'lodash/get'

import { COLORS } from '../assets/constants';

import styles from './ReportsScreenStyles';

import {
    selectExpenseList,
    getExpenseList,
    setErrorMessage,
    selectErrorMessage,
} from "../slice/ReportScreen.slice";

const ReportsScreen = () => {

  const dispatch = useDispatch();
  const expenseList = useSelector(selectExpenseList)

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    dispatch(getExpenseList({month: moment(date).format('YYYY MM DD')}));    
  }, [dispatch]);

  useEffect(() => {
    const data = [];    
    if (expenseList?.length > 0) {
      expenseList.forEach((value, index) => {
        if (get(value, 'list', []).length > 0) {
          data.push({
            ...value,
            svg: {
              fill: COLORS.mainColor,
              fillOpacity: (1 - (0.1 * index)),
              onPress: () => console.log('press', index),
            },
            key: `pie-${index}`,
          });
        }
      });
      setFilteredList(data)
    }
  }, [expenseList]);

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
          {(parseInt(data.percentage)).toFixed(0) + '%'}
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

  console.log('filteredList==', filteredList)

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
        />
      )}

      {filteredList.length > 0 ? (
        <View>
          <PieChart
          style={styles.pieChart}
          valueAccessor={({ item }) => item.percentage}
          outerRadius={'70%'}
          innerRadius={10}
          data={filteredList}
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
          {filteredList?.map((dataSet) => (
            <View key={dataSet.key}>
              {getListItem({
                key: dataSet.key,
                label: dataSet?.categoryName,
                value: `₹ ${dataSet.total} - ${dataSet.percentage}%`,
                titleStyle: {},
              })}

              <Divider style={{ backgroundColor: COLORS.lightgrey }} />
            </View>
          ))}
        </ScrollView >
        </View> 
      ): (
        <View style={styles.containerNull}>
          <FontAwesome5 name="list-alt" size={24} color={COLORS.mainColor} />
          <Text h4 style={{ color: COLORS.secondaryColor }}>
            No Transactions
          </Text>
        </View>
      )}
    </SafeAreaView >
  )
}

export default ReportsScreen
