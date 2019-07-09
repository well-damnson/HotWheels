import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../Color';
import Fsize from '../FontSize';
import Modal from 'react-native-modal';

export default class AddEntry extends Component {
  // state = {Brand: '-', Manufacture: '-', Type: '-', Series: '-'};
  state = {
    isModalConfirmVisible: false,
    isModalListVisible: false,
    names: [
      {name: 'Ben', id: 1},
      {name: 'Susan', id: 2},
      {name: 'Robert', id: 3},
      {name: 'Mary', id: 4},
      {name: 'Daniel', id: 5},
      {name: 'Laura', id: 6},
      {name: 'John', id: 7},
      {name: 'Debra', id: 8},
      {name: 'Aron', id: 9},
      {name: 'Ann', id: 10},
      {name: 'Steve', id: 11},
      {name: 'Olivia', id: 12},
    ],
  };

  toggleModalConfirm = () => {
    this.setState({isModalConfirmVisible: !this.state.isModalConfirmVisible});
  };
  toggleModalList = () => {
    this.setState({isModalListVisible: !this.state.isModalListVisible});
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Modal Start */}
        <Modal
          isVisible={this.state.isModalConfirmVisible}
          onBackdropPress={() => {
            this.toggleModalConfirm();
          }}
          onBackButtonPress={() => {
            this.toggleModalConfirm();
          }}
          animationIn={'zoomIn'}
          animationOut={'zoomOut'}
        >
          <View style={styles.ModalContainer}>
            <View style={{flex: 2}} />
            <View style={styles.ModalSlave}>
              <View style={{flex: 1}} />
              <Text style={{flex: 1, fontSize: 15, color: Color.shadow}}>
                Are You Sure You Want to Cancel This?
              </Text>
              <View style={{flex: 1}} />
              <View style={styles.flexbutrow}>
                <View style={{flex: 1}} />
                <TouchableOpacity
                  onPress={() => {
                    this.toggleModalConfirm();
                  }}
                  style={styles.button}
                >
                  <Text>Yes..</Text>
                </TouchableOpacity>
                <View style={{flex: 1}} />
                <TouchableOpacity
                  onPress={() => {
                    this.toggleModalConfirm();
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
        {/* Modal 2 Start */}
        <Modal
          isVisible={this.state.isModalListVisible}
          onBackdropPress={() => {
            this.toggleModalList();
          }}
          onBackButtonPress={() => {
            this.toggleModalList();
          }}
          animationIn={'zoomIn'}
          animationOut={'zoomOut'}
        >
          <View style={styles.ModalContainer}>
            <View style={{flex: 2}} />
            <ScrollView>
              {this.state.names.map((item, index) => (
                <View key={item.id} style={styles.item}>
                  <Text>{item.name}</Text>
                </View>
              ))}
            </ScrollView>
            <View style={{flex: 2}} />
          </View>
        </Modal>
        {/* Modal 2 End */}
        {/* Real View Starts Here */}
        <View style={styles.incontain}>
          <View style={styles.flexbutrow}>
            <Text style={styles.defaulter}>Name:</Text>
            {/* TODO: FIND AN ALTERNATIVE FOR THIS PIECE OF SHEET vvvvv */}
            <TextInput style={styles.texin} placeholder="ex: '69 camaro z28" />
            <View style={{flex: 0.2}} />
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                this.toggleModalList();
              }}
            >
              <Ionicons name={'md-search'} size={15} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.incontain}>
          <View style={styles.flexbutrow}>
            <Text style={styles.defaulter}>Brand:</Text>
            <TextInput
              style={styles.texin}
              placeholder="ex: HotWheels, Mattel, etc."
            />
            <View style={{flex: 0.2}} />
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                this.toggleModalList();
              }}
            >
              <Ionicons name={'md-search'} size={15} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.incontain}>
          <View style={styles.flexbutrow}>
            <Text style={styles.defaulter}>Manufacture:</Text>
            <TextInput
              style={styles.texin}
              placeholder="ex: BMW, Honda, etc."
            />
            <View style={{flex: 0.2}} />
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                this.toggleModalList();
              }}
            >
              <Ionicons name={'md-search'} size={15} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.incontain}>
          <View style={styles.flexbutrow}>
            <Text style={styles.defaulter}>Type:</Text>
            <TextInput
              style={styles.texin}
              placeholder="ex: Car, Planes, Trucks,etc"
            />
            <View style={{flex: 0.2}} />
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                this.toggleModalList();
              }}
            >
              <Ionicons name={'md-search'} size={15} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.incontain}>
          <View style={styles.flexbutrow}>
            <Text style={styles.defaulter}>Color:</Text>
            <TextInput
              style={styles.texin}
              placeholder="ex: white, black, etc"
            />
            <View style={{flex: 0.2}} />
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                this.toggleModalList();
              }}
            >
              <Ionicons name={'md-search'} size={15} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.incontain}>
          <View style={styles.flexbutrow}>
            <Text style={styles.defaulter}>Series:</Text>
            <TextInput
              style={styles.texin}
              placeholder="ex: Fast & Furious Special"
            />
            <View style={{flex: 0.2}} />
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                this.toggleModalList();
              }}
            >
              <Ionicons name={'md-search'} size={15} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.incontain, {flex: 2}]}>
          <View style={styles.flexbutrow2}>
            <Text style={styles.defaulter}>Notes:</Text>
            <TextInput
              style={[styles.texin, {flex: 3}]}
              placeholder="input any notes here"
            />
          </View>
        </View>
        <View style={styles.flexbutrow}>
          <View style={{flex: 1}} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('NotSample');
            }}
          >
            <Ionicons name={'md-create'} size={15} color="black">
              <Text> Save</Text>
            </Ionicons>
          </TouchableOpacity>
          <View style={{flex: 1}} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.toggleModalConfirm();
            }}
          >
            <Ionicons name={'md-close-circle-outline'} size={15} color="tomato">
              <Text> Cancel</Text>
            </Ionicons>
          </TouchableOpacity>
          <View style={{flex: 1}} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    alignItems: 'center',
    padding: 10,
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
  },

  incontain: {
    flex: 1,
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },

  // incontain2: {
  //   flex: 1,
  //   fontSize: 15,
  //   justifyContent: 'center',
  //   alignItems: 'flex-start',
  // },

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
  button2: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    // paddingHorizontal: 5,
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
  //for (:) spacer👇
  thespacer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  pickapsulated: {
    flex: 1,
    // borderRadius: 5,
    // borderWidth: 1,
    // backgroundColor: Color.main,
    // marginHorizontal: 5,
  },
  picker: {
    flex: 1,
    fontSize: 20,
    // backgroundColor: Color.main,
    borderRadius: 5,
    // marginHorizontal: 5,
  },

  //Textinput
  texin: {
    flex: 2,
    fontSize: 15,
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'white',
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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#d2f7f1',
  },
});
