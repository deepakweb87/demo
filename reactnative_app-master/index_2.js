import React, { Component } from 'react';
import { View, StyleSheet, processColor, Platform } from 'react-native';
import { RkButton, RkText, RkTheme } from 'react-native-ui-kitten';
import {BarChart} from 'react-native-charts-wrapper';
import Moment from 'moment';
import styles from './styles.js';
import DateRange from '../DateRange';
import Icon from 'react-native-vector-icons/Ionicons';

RkTheme.setType('RkText', 'title', {
    color: '#616161',
    fontSize: 16,
    fontWeight: 300
});

RkTheme.setType('RkText', 'subtitle', {
    color: 'black',
    fontSize: 12,
    fontWeight: 300
});

RkTheme.setType('RkButton', 'filter', {
    borderRadius: 8,
    textAlign: 'left',
    color: '#d3d3d3'
});

export default class RevenueBar extends Component {

    constructor(props) {
        super(props);

        let bar_chart_months = [];
        Object.keys(this.props.data['sales']).map((key) => {
            var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var d = new Date(key);
            bar_chart_months.push(monthNames[d.getMonth()]);
        });

        let bar_chart_dataset_values = [];
        for (i = 0; i <= 11; i++) {
            let loop_counter = 2;
            let yData = [];
            let markerData = [];

            Object.keys(this.props.data).map((key) => {

                yData[loop_counter] = parseInt(Object.values(this.props.data[key])[i]);
                markerData[loop_counter] = Object.values(this.props.data[key])[i];

                data = { y:yData, x:i, marker:markerData }
                bar_chart_dataset_values[i] = data;
                loop_counter = loop_counter-1;
            });
        }

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
                //position: 'left',
                formToTextSpace: 5,
                position: 'BELOW_CHART_CENTER'
            },
            data: {
                dataSets: [{
                  values: bar_chart_dataset_values,
                  label: '',
                  mDrawValues: false,
                  config: {
                    colors: [processColor('#f16eaa'), processColor('#8bca4c'),processColor('#1877ef')],
                    stackLabels: ['Bonus','For my pocket', 'Sales' ]
                  }
                }],
            },
            xAxis: {
                valueFormatter: bar_chart_months,
                granularityEnabled: true,
                granularity: 1,
                position: 'BOTTOM'
            },
            compoentFlag: false,
            showFilter: false
        };

    }

    handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
            this.setState({...this.state, selectedEntry: null})
        } else {
            this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
        }
    }

    toggleFilter = () => {
        this.setState({showFilter: !this.state.showFilter });
    }

    onApply = () => {
        this.setState({showFilter: false});
    }


    render() {

        return (
            <View style={styles.container}>
                <View style={styles.titleheader}>
                    <RkText rkType='title' style={{fontSize: 16, color:'#616161'}}>Revenue Statistics</RkText>
                    <RkButton
                        rkType='outline small filter'
                        activeOpacity={0.5}
                        style={{ 
                                backgroundColor: 'white', 
                                borderColor: '#e3e3e3', 
                                borderWidth: 2,
                                marginTop: 10
                            }}
                        contentStyle={{color: 'black'}}
                        onPress={this.toggleFilter}>
                            <RkText style={ styles.filtertext }>Date</RkText>
                            { this.state.showFilter ? <Icon 
                                style={styles.arrowdown} 
                                name='ios-arrow-up'
                                size={22}
                                color="#ccc" /> :
                                <Icon 
                                style={styles.arrowdown} 
                                name='ios-arrow-down'
                                size={22}
                                color="#ccc" /> }
                    </RkButton>

                </View>
                
                { this.state.showFilter ? <DateRange onApply={this.onApply} /> : null }

                {/*<View style={{justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 50, paddingRight: 50}}>
                    <RkText rkType='subtitle'>Revenue</RkText>
                    <RkText rkType='subtitle'>Future income</RkText>
                </View> */}
                <View style={{paddingTop:10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15}}>
                    {/* <View style={{position: 'absolute', right: 30, top: 50, backgroundColor: 'rgb(51, 51, 51)', width: '50%', height: '57%'}}></View> */}
                    <View style={{backgroundColor: 'rgba(255, 255, 255, 0.01)'}}>
                        <BarChart
                            style={styles.chart}
                            xAxis={this.state.xAxis}
                            yAxis={this.state.yAxis}
                            data={this.state.data}
                            legend={this.state.legend}
                            drawValueAboveBar={true}
                            marker={{
                                enabled: true,
                                markerColor: processColor('#eeeeee'),
                                textColor: processColor('black'),
                                markerFontSize: 12,
                                markerBorderRadius: 3
                            }}
                            doubleTapToZoomEnabled={false}
                            onSelect={this.handleSelect.bind(this)}
                            animation={{durationX: 0}}
                            chartDescription={{
                                    text: "Revenue Statistics"
                                }}
                             />
                    </View>
                    
                </View>
                
            </View>
        );
    }
}