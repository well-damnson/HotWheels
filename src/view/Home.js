import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Picker,
} from 'react-native';
import Color from '../Color';

export default class Homepage extends Component {
  state = {Brand: '-', Manufacture: '-', Type: '-', Series: '-'};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.UpperBracket}>
          <View style={{flex: 1}} />
          <View style={[styles.LowerBracket, {flex: 2}]}>
            <Text style={styles.centerizer}>Apa yang anda Cari?</Text>
          </View>
          <View style={{flex: 1}} />
        </View>
        <View style={styles.LowerBracket}>
          {/* start Brand */}
          <View style={styles.flexbutrow}>
            <View style={styles.thespacer}>
              <Text style={styles.defaulter}>Brand </Text>
              <Text style={{fontSize: 25}}>:</Text>
            </View>
            <View style={styles.pickapsulated}>
              <Picker
                selectedValue={this.state.Brand}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({Brand: itemValue})
                }
              >
                <Picker.Item label="All" value="-" />
                <Picker.Item label="Hotwheels" value="hotwheels" />
                <Picker.Item label="Mattel" value="mattel" />
              </Picker>
            </View>
          </View>
          {/* start Manufacture */}
          <View style={styles.flexbutrow}>
            <View style={styles.thespacer}>
              <Text style={styles.defaulter}>Manufacture </Text>
              <Text style={{fontSize: 25}}>:</Text>
            </View>
            <View style={styles.pickapsulated}>
              <Picker
                selectedValue={this.state.Manufacture}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({Manufacture: itemValue})
                }
              >
                <Picker.Item label="All" value="-" />
                <Picker.Item label="Aston Martin" value="aston martin" />
                <Picker.Item label="BMW" value="bmw" />
              </Picker>
            </View>
          </View>
          {/* start Type */}
          <View style={styles.flexbutrow}>
            <View style={styles.thespacer}>
              <Text style={styles.defaulter}>Type </Text>
              <Text style={{fontSize: 25}}>:</Text>
            </View>
            <View style={styles.pickapsulated}>
              <Picker
                selectedValue={this.state.Type}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({Type: itemValue})
                }
              >
                <Picker.Item label="All" value="-" />
                <Picker.Item label="Car" value="car" />
                <Picker.Item label="Planes" value="planes" />
              </Picker>
            </View>
          </View>
          {/* start Series */}
          <View style={styles.flexbutrow}>
            <View style={styles.thespacer}>
              <Text style={styles.defaulter}>Series </Text>
              <Text style={{fontSize: 25}}>:</Text>
            </View>
            <View style={styles.pickapsulated}>
              <Picker
                selectedValue={this.state.Series}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({Series: itemValue})
                }
              >
                <Picker.Item label="All" value="-" />
                <Picker.Item label="None" value="none" />
                <Picker.Item label="Fast&Furious" value="fnf" />
              </Picker>
            </View>
          </View>
          <View style={{flex: 1}} />
          <View style={styles.flexbutrow}>
            <View style={{flex: 1}} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate('SamplePage');
              }}
            >
              <Text>Search</Text>
            </TouchableOpacity>
            <View style={{flex: 1}} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate('SamplePage');
              }}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <View style={{flex: 1}} />
          </View>
        </View>
      </View>
    );
  }
}

// TODO: Bikin view untuk border di Picker

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  UpperBracket: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LowerBracket: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexbutrow: {
    flex: 1,
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 30,
    backgroundColor: Color.accent,
    fontSize: 20,
    borderRadius: 15,
  },
  // if center fails use this style👇
  centerizer: {
    alignSelf: 'center',
    fontSize: 25,
  },
  //for default text preset👇
  defaulter: {
    flex: 1,
    fontSize: 25,
  },
  pickapsulated: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: Color.main,
    marginHorizontal: 5,
  },
  picker: {
    flex: 1,
    fontSize: 25,
    // backgroundColor: Color.main,
    borderRadius: 5,
    // marginHorizontal: 5,
  },
  //for (:) spacer👇
  thespacer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
});
