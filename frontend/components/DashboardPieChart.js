import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const data = [
    {
      name: 'Received',
      population: 20,
      color: '#FF5B50',
      legendFontColor: 'black',
      legendFontSize: 15,
    },
    {
      name: 'Assured',
      population: 25,
      color: '#14D2B8',
      legendFontColor: 'black',
      legendFontSize: 15,
    },
    {
      name: 'Placed',
      population: 40,
      color: '#FFC542',
      legendFontColor: 'black',
      legendFontSize: 15,
    },
  ];
  
const chartConfig = {
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    legendFontFamily: 'Montserrat-Bold',
  };
  const CustomLegend = () => (
    <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
      {data.map((item, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, paddingVertical: 3}}>
          <View style={{ width: 20, height: 20, backgroundColor: item.color, marginRight: 5 }} />
          <Text style={{fontFamily:'Aldrich-Regular', fontSize:12}}>{item.name.toUpperCase()}</Text>
        </View>
      ))}
    </View>
  );
  
const DashboardPieChart = () => (
  <View style={{ flexDirection: 'row', width:'auto' ,alignItems:'center',paddingVertical: 20 }}>
    <PieChart
      data={data}
      width={400}
      height={200}
      chartConfig={chartConfig}
      accessor="population"
      backgroundColor="transparent"
      hasLegend={false}
      style={{flex:1}}
    />
     <CustomLegend />
  </View>
);

export default DashboardPieChart;
