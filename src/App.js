import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Screen from './view';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';
import Color from './Color';

class App extends React.Component {
  componentDidMount() {
    console.log('Current Mode: ' + __DEV__);
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar hidden={true} /> */}
        <Text>Open up App.js to start working on your app!</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('SamplePage');
          }}
        >
          <Text>new data</Text>
        </TouchableOpacity>
        <Text>{__DEV__ ? 'Development Mode' : 'Production Mode'}</Text>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: {
    screen: App,
  },
  SamplePage: {
    screen: Screen.SamplePage,
  },
});

const SandStack = createStackNavigator({
  SandBox: {
    screen: Screen.Sandboxui,
  },
  SamplePage: {
    screen: Screen.SamplePage,
  },
});

export default createAppContainer(
  createBottomTabNavigator({
    Home: {screen: HomeStack},
    SandBox: {screen: SandStack},
  }),
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'SandBox') {
          iconName = `ios-appstore${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: Color.accent,
      inactiveTintColor: Color.sub,
    },
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
