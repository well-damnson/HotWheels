import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../Color';
import Fsize from '../FontSize';
import Modal from 'react-native-modal';

export default class AddEntry extends Component {
  // state = {Brand: '-', Manufacture: '-', Type: '-', Series: '-'};
  state = {
    isModalVisible: false,
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

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
              <Text style={{flex: 1, fontSize: 15, color: Color.shadow}}>
                Are You Sure You Want to Cancel This?
              </Text>
              <View style={{flex: 1}} />
              <View style={styles.flexbutrow}>
                <View style={{flex: 1}} />
                <TouchableOpacity
                  onPress={() => {
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
        <View style={styles.incontain}>
          <View style={styles.flexbutrow}>
            <Text style={styles.defaulter}>Name:</Text>
            {/* TODO: FIND AN ALTERNATIVE FOR THIS PIECE OF SHEET vvvvv */}
            <TextInput style={styles.texin} placeholder="ex: '69 camaro z28" />
          </View>
        </View>
        <View style={styles.incontain}>
          <View style={styles.flexbutrow}>
            <Text style={styles.defaulter}>Brand:</Text>
            <Text style={styles.defaulter}>Brand Placeholder</Text>
          </View>
        </View>
        <View style={styles.incontain}>
          <View style={styles.flexbutrow}>
            <Text style={styles.defaulter}>Manufacture:</Text>
            <Text style={styles.defaulter}>Manufacture Placeholder</Text>
          </View>
        </View>
        <View style={styles.incontain}>
          <View style={styles.flexbutrow}>
            <Text style={styles.defaulter}>Type:</Text>
            <Text style={styles.defaulter}>Type Placeholder</Text>
          </View>
        </View>
        <View style={styles.incontain}>
          <View style={styles.flexbutrow}>
            <Text style={styles.defaulter}>Color:</Text>
            <Text style={styles.defaulter}>Color Placeholder</Text>
          </View>
        </View>
        <View style={styles.incontain}>
          <View style={styles.flexbutrow}>
            <Text style={styles.defaulter}>Series:</Text>
            <Text style={styles.defaulter}>Series Placeholder</Text>
          </View>
        </View>
        <View style={[styles.incontain, {flex: 2}]}>
          <View style={styles.flexbutrow2}>
            <Text style={styles.defaulter}>Notes:</Text>
            <Text style={styles.defaulter}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
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
              this.toggleModal();
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
    flex: 1,
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
});
