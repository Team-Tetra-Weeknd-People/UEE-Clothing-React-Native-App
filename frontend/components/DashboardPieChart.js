import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import ItemOrderService from '../services/ItemOrder.Service';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const chartConfig = {
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    legendFontFamily: 'Montserrat-Bold',
};

const CustomLegend = ({ data }) => (
    <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        {data.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, paddingVertical: 3 }}>
                <View style={{ width: 20, height: 20, backgroundColor: item.color, marginRight: 5 }} />
                <Text style={{ fontFamily: 'Aldrich-Regular', fontSize: 12 }}>{item.name.toUpperCase()}</Text>
            </View>
        ))}
    </View>
);

const DashboardPieChart = () => {
    const [orders, setOrders] = useState([]);
    const [received, setReceived] = useState(0);
    const [assured, setAssured] = useState(0);
    const [seller, setSeller] = useState({});
    const [isFontLoaded, setIsFontLoaded] = useState(false); // Define isFontLoaded state

    useEffect(() => {
        try {
            // Use AsyncStorage to retrieve seller data
            AsyncStorage.getItem('seller').then((value) => {
                setSeller(JSON.parse(value));
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        ItemOrderService.getItemOrderBySellerId(seller._id)
            .then((res) => {
                setOrders(res.data);
                res.data.forEach((order) => {
                    if (order.status === 'Received') {
                        setReceived((prevReceived) => prevReceived + 1);
                    } else if (order.status === 'Assured') {
                        setAssured((prevAssured) => prevAssured + 1);
                    }
                });
                setIsFontLoaded(true); // Set isFontLoaded to true after fetching data
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
            });
    }, [seller._id]);

    const chartData = [
        {
            name: 'Received',
            population: received,
            color: '#FF5B50',
            legendFontColor: 'black',
            legendFontSize: 15,
        },
        {
            name: 'Assured',
            population: assured,
            color: '#14D2B8',
            legendFontColor: 'black',
            legendFontSize: 15,
        },
    ];

    return (
        <View style={{ flexDirection: 'row', width: 'auto', alignItems: 'center', paddingVertical: 20 }}>
            <PieChart
                data={chartData}
                width={400}
                height={200}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                hasLegend={false}
                style={{ flex: 1 }}
            />
            <CustomLegend data={chartData} />
        </View>
    );
};

export default DashboardPieChart;
