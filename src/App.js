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
import WDSTools from './WDSTools';

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
  NotSample: {
    screen: Screen.NotSample,
  },
  EditEntry: {
    screen: Screen.EditEntry,
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
  NotSample: {
    screen: Screen.NotSample,
  },
  EditEntry: {
    screen: Screen.EditEntry,
  },
  DevPage: {screen: App},
});

const AddStack = createStackNavigator({
  AddEntry: {
    screen: Screen.AddEntry,
  },
  SamplePage: {
    screen: Screen.SamplePage,
  },
  NotSample: {
    screen: Screen.NotSample,
  },
  DevPage: {screen: App},
  EditEntry: {
    screen: Screen.EditEntry,
  },
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Screen.Profile,
  },
  NotSample: {
    screen: Screen.NotSample,
  },
  EditEntry: {
    screen: Screen.EditEntry,
  },
  DevPage: {screen: App},
});

const getTabBarIcon = (navigation, tintColor) => {
  const {routeName} = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = 'ios-home';
  } else if (routeName === 'List') {
    iconName = 'ios-aperture';
  } else if (routeName === 'Add') {
    iconName = 'ios-add';
  } else if (routeName === 'Profile') {
    iconName = 'logo-google';
  }
  return <IconComponent name={iconName} size={10} color={Color.accent} />;
};

export default createAppContainer(
  createBottomTabNavigator({
    Home: {screen: HomeStack},
    List: {screen: SandStack},
    Add: {screen: AddStack},
    Profile: {screen: ProfileStack},
  }),
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({tintColor}) => getTabBarIcon(navigation, tintColor),
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
