import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../Color';
import Fsize from '../FontSize';
import Modal from 'react-native-modal';
import DBFunc from '../database/DatabaseFunction';

export default class Sandboxui extends Component {
  // state = {Brand: '-', Manufacture: '-', Type: '-', Series: '-'};
  state = {
    isModalVisible: false,
    Data: [],
    Filter: [],
    selectedItemToRemove: {},
    useListener: false,
  };

  toggleModal = (itemToRemove) => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      selectedItemToRemove: itemToRemove || {},
    });
  };

  async componentDidMount() {
    let Data =
      this.props.navigation.state.params &&
      this.props.navigation.state.params.data;
    let Filter =
      this.props.navigation.state.params &&
      this.props.navigation.state.params.filter;
    if (Data) {
      this.setState({Data, Filter});
    } else {
      await this.fetchData();

      this.setState({useListener: true});
    }
    WDSTools.EE.on('refreshData', this.fetchData);
  }
  componentWillUnmount() {
    WDSTools.EE.removeListener('refreshData', this.fetchData);
  }

  fetchData = async () => {
    let Filter =
      this.state.Filter.length > 0 ? {filter: this.state.Filter} : {};
    let Data = await DBFunc.find(Filter);
    // console.log(Data);
    this.setState({Data});
  };

  MyCardView = ({item}) => {
    // console.log(item);
    return (
      <View style={styles.Cardmaster}>
        <View style={styles.Cardslave}>
          <View style={styles.flexbutrow}>
            <Text style={styles.defaulter}>Name:</Text>
            <Text style={styles.defaulter2}>{item.data.name}</Text>
          </View>
        </View>
        <View style={styles.Cardslave}>
          <View style={styles.flexbutrow}>
            <Text style={styles.defaulter}>Brand:</Text>
            <Text style={styles.defaulter2}>{item.data.merk}</Text>
          </View>
        </View>
        <View style={styles.Cardslave}>
          <View style={styles.flexbutrow}>
            <Text style={styles.defaulter}>Tahun:</Text>
            <Text style={styles.defaulter2}>{item.data.tahun}</Text>
          </View>
        </View>
        <View style={styles.Cardslave}>
          <View style={styles.flexbutrow}>
            <Text style={styles.defaulter}>Color:</Text>
            <Text style={styles.defaulter2}>{item.data.color}</Text>
          </View>
        </View>
        <View style={styles.Cardslave}>
          <View style={styles.flexbutrow}>
            <Text style={styles.defaulter}>Series:</Text>
            <Text style={styles.defaulter2}>{item.data.series}</Text>
          </View>
        </View>
        <View style={[styles.Cardslave2, {flex: 2}]}>
          <View style={styles.flexbutrow2}>
            <Text style={styles.defaulter}>Notes:</Text>
            <Text style={styles.defaulter2}>{item.data.notes}</Text>
          </View>
        </View>
        <View style={styles.flexbutrow}>
          <View style={{flex: 1}} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('EditEntry', item);
            }}
          >
            <Ionicons name={'md-create'} size={15} color="black">
              <Text>Edit</Text>
            </Ionicons>
          </TouchableOpacity>
          <View style={{flex: 1}} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.toggleModal(item);
            }}
          >
            <Ionicons name={'md-close-circle-outline'} size={15} color="tomato">
              <Text>Delete</Text>
            </Ionicons>
          </TouchableOpacity>
          <View style={{flex: 1}} />
        </View>
      </View>
    );
  };

  _keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={styles.container}>
        {/* Modal Start */}
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => {
            this.toggleModal();
          }}
          onBackButtonPress={() => {
            this.toggleModal();
          }}
          animationIn={'zoomIn'}
          animationOut={'zoomOut'}
        >
          <View style={styles.ModalContainer}>
            <View style={{flex: 2}} />
            <View style={styles.ModalSlave}>
              <View style={{flex: 1}} />
              <Text style={{fontSize: 15, color: Color.shadow}}>
                Are You Sure You Want to Delete This?
              </Text>
              <View style={{flex: 1}} />
              <View style={styles.flexbutrow}>
                <View style={{flex: 1}} />
                <TouchableOpacity
                  onPress={() => {
                    DBFunc.remove(this.state.selectedItemToRemove._id);
                    this.toggleModal();
                  }}
                  style={styles.button}
                >
                  <Text>Yes..</Text>
                </TouchableOpacity>
                <View style={{flex: 1}} />
                <TouchableOpacity
                  onPress={() => {
                    this.toggleModal();
                  }}
                  style={styles.button}
                >
                  <Text>No!</Text>
                </TouchableOpacity>
                <View style={{flex: 1}} />
              </View>
              <View style={{flex: 1}} />
            </View>
            <View style={{flex: 2}} />
          </View>
        </Modal>
        {/* Modal End */}
        {/* Real View Starts Here */}
        <View style={{flex: 1}} />
        <FlatList
          data={this.state.Data}
          renderItem={(item) => (
            <View style={{backgroundColor: 'grey'}}>
              <View style={{flex: 1}} />
              {this.MyCardView(item)}
              <View style={{flex: 1}} />
            </View>
          )}
          keyExtractor={this._keyExtractor}
          contentContainerStyle={{
            width: Dimensions.get('window').width,
          }}
        />
        <View style={{flex: 1}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Cardmaster: {
    width: '95%',
    // borderWidth: 3,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
    backgroundColor: Color.main,
    padding: 10,
    flex: 1,
    flexGrow: 2,
    flexBasis: 10,
    margin: 10,
  },

  Cardslave: {
    flex: 1,
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Cardslave2: {
    flex: 1,
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  flexbutrow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flexbutrow2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  button: {
    flex: 2,
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 30,
    backgroundColor: Color.accent,
    fontSize: 15,
    borderRadius: 15,
  },
  centaur: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // if center fails use this style👇
  centerizer: {
    alignSelf: 'center',
    flex: 1,
    // fontSize: 25,
  },
  //for default text preset👇
  defaulter: {
    flex: 1,
    fontSize: 15,
  },
  defaulter2: {
    flex: 2,
    fontSize: 15,
  },
  //for (:) spacer👇
  thespacer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },

  // styles for modals here
  ModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalSlave: {
    flex: 1,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.sub,
    borderRadius: 5,
  },
});
