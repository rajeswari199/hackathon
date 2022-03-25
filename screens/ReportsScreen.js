import React, {useState} from 'react'
import { Text, TouchableOpacity, SafeAreaView} from 'react-native'
import { Text as TextSvg } from 'react-native-svg'
import { PieChart } from 'react-native-svg-charts'
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';

const ReportsScreen = () => {
    const data = [
        {
            key: 1,
            value: 53,
            name: 'Education',
            amount: '10,000',
            svg: { fill: '#f4982a' },
            onPress: () => { console.log('pressed')}
        },
        {
            key: 2,
            value: 18,
            name: 'Beauty & Care',
            amount: '5,000',
            svg: { fill: '#F5A442' },
            onPress: () => { console.log('pressed')}
        },
        {
            key: 3,
            value: 15,
            name: 'Child',
            amount: '12,000',
            svg: { fill: '#F7AF5A' },
            onPress: () => { console.log('pressed')}
        },
        {
            key: 4,
            value: 12,
            name: 'Food',
            amount: '14,000',
            svg: { fill: '#F8BB73' },
            onPress: () => { console.log('pressed')}
        }
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
                    {data.value + '%'}
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
                minimumDate={new Date()}
                maximumDate={new Date(2025, 5)}
                />
            )}
            <PieChart
                style={{ height: 500 }}
                valueAccessor={({ item }) => item.value}
                outerRadius={'70%'}
                innerRadius={10}
                data={data}
                spacing={0}
            >
                <Labels/>
            </PieChart>
            {data.map(dataSet => (
                <SafeAreaView key={dataSet.key} style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }} >
                    <Text>{dataSet.name}</Text>
                    <Text>{`${dataSet.amount} - ${dataSet.value}%`}</Text>
                </SafeAreaView>                
            ))}
            
        </SafeAreaView>      
    )
}

export default ReportsScreen
