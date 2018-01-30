import React, { Component } from 'react';
import { TouchableHighlight, View, Image, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import SideMenuScene from '../SideMenuScene';
import headerface from '../../assets/image/face.png';
import headertitle from '../../assets/image/Title.png';
import menu from '../../assets/image/menu.png';
import {
    salesAuthSelector,
    salesProfileSelector,
    menuItemsSelector,
    salesRingDataSelector
} from '../../redux/selector';

import JuvinesseRingHistory from '../../components/JuvinesseRingHistory/JuvinesseRing.js';

import ls from 'react-native-local-storage';
import JuvinesseRings from '../../components/JuvinesseRings';
import PersonalGoal from '../../components/PersonalGoal';

import {
    getRingData,
} from '../../redux/actions';

import styles from './styles';

const hTitle = <Image style={styles.htitle} source={headertitle} />;

class JuvinesseringScene extends Component {

    static navigationOptions = ({ navigation, screenProps }) => {
        const { state: { params } } = navigation;

        return ({
            headerTitle: hTitle,
            gesturesEnabled: false,
            headerRight: params ? <Image style={styles.hface} source={{uri: params.profileImage}} /> : <Image style={styles.hface} source={headerface} />,
            headerLeft:  <TouchableHighlight onPress={params ? params.onOpenSideMenu : () => {}}><Image style={styles.hdirection} source={menu} /></TouchableHighlight>,
            headerTitleStyle: {
                alignCenter: 'center'
            },
            headerStyle: {
                backgroundColor: 'white',
                height: 70,
                paddingLeft: 10,
                paddingRight: 10
            }
        });
    };

    state = {
        dataSource : null,
        allProducts: null,
        currentSet: 0,
        isOpen: false,
        selectedItem: ''
    };

    componentWillMount() {
        this.props.navigation.setParams({
            onOpenSideMenu: () => this.setState({isOpen: !this.state.isOpen}),
            profileImage: 'http:' + this.props.profile_pic 
        });

        ls.get('authentication_token').then( (token) => {

            this.props.getRingData( token, 'personal' );
            
        })

    }

    onSideMenuChange = (isOpen) => {
        this.setState({
            isOpen: isOpen
        })
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    onMenuItemSelected = item => {
        this.setState({
            selectedItem: item,
        });
        const { navigate } = this.props.navigation;
        this.props.navigation.navigate(item);
    }
    
    render() {
        const { dataSource, allProducts, currentSet } = this.state;
        const menu = <SideMenuScene menuItems={this.props.menus} onItemSelected={this.onMenuItemSelected} />;
        return (
        <SideMenu
            menu={menu}
            isOpen={this.state.isOpen}
            onChange={isOpen => this.updateMenuState(isOpen)}>
            
            <ScrollView style={styles.container}>
                <JuvinesseRings name = "Juvinesse Agent" ring_games = {this.props.my_ring_data} />
                <PersonalGoal />
                <JuvinesseRingHistory ring_type="personal"/>
            </ScrollView>
        </SideMenu>
        );
    }
}

const mapStateToProps = function mapStateToProps (state) {
    return {
        authToken : salesAuthSelector(state),
        menus : menuItemsSelector(state),
        my_ring_data : salesRingDataSelector(state)
    }
}

const mapDispatchToProps = function mapDispatchToProps (dispatch) {
    return {
        getRingData: (authToken, ringType) => dispatch(getRingData(authToken, ringType))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(JuvinesseringScene);
