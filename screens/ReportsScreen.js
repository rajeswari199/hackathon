import React, {useState} from 'react'
import { Text, TouchableOpacity, SafeAreaView} from 'react-native'
import { Text as TextSvg } from 'react-native-svg'
import { PieChart } from 'react-native-svg-charts'
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';

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
        if(value.list.length !== 0 ) {
            data.push({
                ...value,
                svg: {
                    fill: '#f4982a',
                    fillOpacity:  (1 - (0.1 * index)),
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
        console.log("hello", selectedDate)
    };

    const Labels = ({ slices }) => {
        return slices.map((slice, index) => {
            const { pieCentroid, data } = slice;
            return (
                <TextSvg
                    key={index}
                    x={pieCentroid[ 0 ]}
                    y={pieCentroid[ 1 ]}
                    fill={'white'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={24}
                    stroke={'black'}
                    strokeWidth={0.2}
                >
                    {data.percentage + '%'}
                </TextSvg>
            )
        })
    }


    return (
        <SafeAreaView>
            <Text>Month Picker</Text>
            <Text>{moment(date).format("MMM YYYY")}</Text>
            <TouchableOpacity onPress={() => showPicker(true)}>
                <Text>OPEN</Text>
            </TouchableOpacity>
            {show && (
                <MonthPicker
                onChange={onValueChange}
                value={date}
                />
            )}
            <PieChart
                style={{ height: 500 }}
                valueAccessor={({ item }) => item.percentage}
                outerRadius={'70%'}
                innerRadius={10}
                data={data}
                spacing={0}
            >
                <Labels/>
            </PieChart>
            {apiData.map(dataSet => (
                <SafeAreaView key={dataSet.key} style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }} >
                    <Text>{dataSet.categoryName}</Text>
                    <Text>{`${dataSet.total} - ${dataSet.percentage}%`}</Text>
                </SafeAreaView>                
            ))}
            
        </SafeAreaView>      
    )
}

export default ReportsScreen
