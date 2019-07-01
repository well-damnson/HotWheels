import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Screen from './view/index';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
// import {Ionicons} from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Color from './Color';

class App extends React.Component {
  componentDidMount() {
    console.log('Current Mode: ' + __DEV__);
    // console.log('List of Pages:' + Screen);
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar hidden={true} /> */}
        <Text>Open up App.js to start working on your app!</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ModalTest');
          }}
        >
          <Text>new data</Text>
        </TouchableOpacity>
        <Text>{__DEV__ ? 'Development Mode' : 'Production Mode'}</Text>
        <Text>Open up App.js to start working on your app!</Text>
        <Ionicons name={'ios-information-circle'} size={25} color="tomato" />
        <MaterialCommunityIcons
          name={'buffer'}
          size={25}
          color={Color.accent}
        />
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
    screen: Screen.Homepage,
  },
  SamplePage: {
    screen: Screen.SamplePage,
  },
  ModalTest: {
    screen: Screen.Modular,
  },
  NotSample: {
    screen: Screen.NotSample,
  },
  DevPage: {screen: App},
});

const SandStack = createStackNavigator({
  SandBox: {
    screen: Screen.Sandboxui,
  },
  SamplePage: {
    screen: Screen.SamplePage,
  },
  ModalTest: {
    screen: Screen.Modular,
  },
  NotSample: {
    screen: Screen.NotSample,
  },
  DevPage: {screen: App},
});

const getTabBarIcon = (navigation, focused, tintColor) => {
  const {routeName} = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
    iconName = `ios-information-circle`;
  } else if (routeName === 'SandBox') {
    iconName = `ios-options${focused ? '' : '-outline'}`;
  }
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

export default createAppContainer(
  createBottomTabNavigator({
    Home: {screen: HomeStack},
    SandBox: {screen: SandStack},
  }),
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      showIcon: true,
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
