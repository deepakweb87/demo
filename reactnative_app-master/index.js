import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    processColor,
    Platform
} from 'react-native';
import update from 'immutability-helper';
import { RkButton, RkText, RkTextInput, RkTheme } from 'react-native-ui-kitten';
import {PieChart} from 'react-native-charts-wrapper';
import directionL from '../../assets/image/directionL.png';
import directionR from '../../assets/image/directionR.png';
import Icon from 'react-native-vector-icons/Ionicons';

import MonthPicker from '../MonthPicker'

import styles from "./styles"

RkTheme.setType('RkText', 'title', {
    color: 'black',
    fontSize: 14,
    fontWeight: 300
});

RkTheme.setType('RkButton', 'custom', {
    content: {
        color: '#333333'
    }
});


export default class ProductMonth extends Component {

    constructor(props) {
        super(props);

        let total_months = [];
        Object.keys(this.props.data).map((key) => {
            var monthNames = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var d = new Date(key);
            total_months[key] = monthNames[d.getMonth()];
        });

        // let nCount = 0, dataValue = {}, mvalues = [];
        // const result = Object.keys(this.props.data).map((key) => {
        //     nCount++;
        //     mvalues = [];
        //     mCount = 0;
        //     const rsult = Object.keys(this.props.data[key]).map((nkey) => {
        //         dataValue = {};
        //         dataValue.value = parseInt(this.props.data[key][nkey]);
        //         dataValue.label = nkey;
        //         mvalues.push(dataValue);
        //     });
        // });

        let mvalues = [{value: 40, label: 'VIP'},
            {value: 21, label: 'Classic'},
            {value: 15, label: 'Platinum'},
            {value: 9, label: 'Silver'},
            {value: 15, label: 'Gold'}]

        console.log(Object.keys(total_months).first);
        this.state = {
            legend: {
                enabled: true,
                textSize: 12,
                form: "SQUARE",
                formSize: 12,
                xEntrySpace: 5,
                yEntrySpace: 10,
                textColor: processColor('gray'),
                wordWrapEnabled: true,
                formToTextSpace: 5,
                position: 'BELOW_CHART_CENTER'
            },
            data: {
                dataSets: [{
                    values: mvalues,
                    label: '',
                    config: {
                        colors: [ processColor('#1877ef'),
                                processColor('#86cb4c'), 
                                processColor('#fe6caa'), 
                                processColor('#d9d9d7'), 
                                processColor('#fdc147')],
                        valueTextSize: 20,
                        valueTextColor: processColor('green'),
                        sliceSpace: 5,
                        selectionShift: 13
                    }
                }],
            },
            description: {
                text: '',
                textSize: 15,
                textColor: processColor('darkgray'),
            },
            showFilter: false,
            selectedMonth: total_months['2017-10-01']
        };

    }

    handleSelect(event) {
        // let entry = event.nativeEvent
        // if (entry == null) {
        // this.setState({...this.state, selectedEntry: null})
        // } else {
        // this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
        // }
    }

    render() {
        console.log(this.state);
        return (
        <View style={styles.container}>
            <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 20}}>
                <RkText rkType='title' style={{fontSize: 16, color:'#616161'}}>Product of the Month</RkText>
                <MonthPicker selectedMonth = { this.state.selectedMonth } />
            </View>

            <View style={styles.chartcontainer}>
                <View style={styles.contain}>
                    <PieChart
                        style={styles.chart}
                        logEnabled={true}
                        chartBackgroundColor={processColor('#ffffff')}
                        chartDescription={this.state.description}
                        data={this.state.data}
                        legend={this.state.legend}

                        entryLabelColor = {processColor('transparent')}
                        entryLabelTextSize = {0}

                        rotationEnabled={false}
                        drawSliceText={true}
                        usePercentValues={false}
                        centerText={''}
                        centerTextRadiusPercent={100}
                        holeRadius={85}
                        holeColor={processColor('#ffffffff')}
                        maxAngle={360}
                        onSelect={this.handleSelect.bind(this)}
                    ></PieChart>

                    <View style={styles.circle}>
                        <RkText style={styles.middletext.top}>578</RkText>
                        <RkText style={styles.middletext.mid}>Packages</RkText>
                        <RkText style={styles.middletext.bottom}>{this.state.selectedMonth}</RkText>
                    </View>
                </View>
            </View>

            {/* <View style={styles.chartcontainer}>
            <View style={styles.contain}>
                
            </View>
            <Image style={styles.hdirectionL} source={directionL} />
            <Image style={styles.hdirectionR} source={directionR} />
            </View> */}

        </View>
        );
    }
}