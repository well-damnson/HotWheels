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
import DBFunc from '../database/DatabaseFunction';
export default class Homepage extends Component {
  state = {
    isSearching: false,
    Brand: undefined,
    Manufacture: undefined,
    Name: undefined,
    Tahun: undefined,
    Series: undefined,
    Data: {
      brand: [],
      merk: [],
      name: [],
      tahun: [],
      series: [],
    },
  };
  async componentDidMount() {
    await this.fetchData();
    if (__DEV__) alert('Development Mode');
    WDSTools.EE.on('refreshData', this.fetchData);
  }
  componentWillUnmount() {
    WDSTools.EE.removeListener('refreshData', this.fetchData);
  }

  fetchData = async () => {
    let Data = await DBFunc.filterList();
    this.setState({Data});
  };

  _fetchName = async () => {
    let filter = [];
    if (this.state.Manufacture) {
      filter.push({by: 'merk', value: this.state.Manufacture});
    }
    if (this.state.Tahun) {
      filter.push({by: 'tahun', value: this.state.Tahun});
    }
    if (this.state.Series) {
      filter.push({by: 'series', value: this.state.Series});
    }
    let name = await DBFunc.filterName({filter});
    this.setState({Data: {...this.state.Data, name}});
  };

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
          {/* start Manufacture */}
          <View style={styles.flexbutrow}>
            <View style={styles.thespacer}>
              <Text style={styles.defaulter}>Brand </Text>
              <Text style={styles.defaulter}>:</Text>
            </View>
            <View style={styles.pickapsulated}>
              <Picker
                selectedValue={this.state.Manufacture}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({Manufacture: itemValue}, async () => {
                    await this._fetchName();
                  });
                }}
              >
                <Picker.Item label="All" value={undefined} />
                {this.state.Data &&
                  this.state.Data.merk &&
                  this.state.Data.merk.map((val, index) => {
                    return <Picker.Item label={val} value={val} key={index} />;
                  })}
              </Picker>
            </View>
          </View>
          {/* start Tahun */}
          <View style={styles.flexbutrow}>
            <View style={styles.thespacer}>
              <Text style={styles.defaulter}>Year </Text>
              <Text style={styles.defaulter}>:</Text>
            </View>
            <View style={styles.pickapsulated}>
              <Picker
                selectedValue={this.state.Tahun}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({Tahun: itemValue}, async () => {
                    await this._fetchName();
                  })
                }
              >
                <Picker.Item label="All" value={undefined} />
                {this.state.Data &&
                  this.state.Data.tahun &&
                  this.state.Data.tahun.map((val, index) => {
                    return <Picker.Item label={val} value={val} key={index} />;
                  })}
              </Picker>
            </View>
          </View>
          {/* start Series */}
          <View style={styles.flexbutrow}>
            <View style={styles.thespacer}>
              <Text style={styles.defaulter}>Series </Text>
              <Text style={styles.defaulter}>:</Text>
            </View>
            <View style={styles.pickapsulated}>
              <Picker
                selectedValue={this.state.Series}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({Series: itemValue}, async () => {
                    await this._fetchName();
                  })
                }
              >
                <Picker.Item label="All" value={undefined} />
                {this.state.Data &&
                  this.state.Data.series &&
                  this.state.Data.series.map((val, index) => {
                    return <Picker.Item label={val} value={val} key={index} />;
                  })}
              </Picker>
            </View>
          </View>
          {/* start Name */}
          <View style={styles.flexbutrow}>
            <View style={styles.thespacer}>
              <Text style={styles.defaulter}>Name </Text>
              <Text style={styles.defaulter}>:</Text>
            </View>
            <View style={styles.pickapsulated}>
              <Picker
                selectedValue={this.state.Name}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({Name: itemValue})
                }
              >
                <Picker.Item label="All" value={undefined} />
                {this.state.Data &&
                  this.state.Data.name &&
                  this.state.Data.name.map((val, index) => {
                    return <Picker.Item label={val} value={val} key={index} />;
                  })}
              </Picker>
            </View>
          </View>
          <View style={{flex: 1}} />
          <View style={styles.flexbutrow}>
            <View style={{flex: 1}} />
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                this.setState({isSearching: true});
                let filter = [
                  {by: 'merk', value: this.state.Manufacture},
                  {by: 'name', value: this.state.Name},
                  {by: 'brand', value: this.state.Brand},
                  {by: 'tahun', value: this.state.Tahun},
                  {by: 'series', value: this.state.Series},
                ];
                let data = await DBFunc.find({filter});
                // console.log(data);
                // console.log(data.length);
                this.setState({isSearching: false});
                this.props.navigation.navigate('SearchList', {
                  data: [...data],
                  filter,
                });
                // TODO: NAVIGATE WITH PROPS
                // this.props.navigation.navigate('SamplePage');
              }}
              disabled={this.state.isSearching}
            >
              <Text>
                {this.state.isSearching === false
                  ? 'Search'
                  : 'Searching . . .'}
              </Text>
            </TouchableOpacity>
            <View style={{flex: 1}} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.setState({
                  Brand: undefined,
                  Manufacture: undefined,
                  Name: undefined,
                  Tahun: undefined,
                  Series: undefined,
                });
                // this.props.navigation.navigate('SamplePage');
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
    padding: 15,
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
    fontSize: 30,
  },
  //for default text preset👇
  defaulter: {
    // flex: 1,
    fontSize: 20,
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
    fontSize: 20,
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
