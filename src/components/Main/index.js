/*
* smart component
* 
* @class Main
* @classDesc The main part of the page.
* 
* consists of: 
*   openMapButton
* 
* */

import React from 'react';
import {
  View,
  Button,
} from 'react-native';

import Expo from 'expo';

import Loading from '../Loading/index';
import Error from '../Error/index';

//import { bindActionCreators } from 'redux';
//import { connect } from 'react-redux';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  buttonHandler() {
    const option = {
      language: 'en',
    };
    Expo.Speech.speak("Don't go Yuiya...", option);
  }

  render() {
    /*if (this.props.error) {
      return (
        <Error />
      );
    } else if (this.props.loading) {
      return (
        <Loading />
      );
    } else {*/
      return (
        <View style={{padding: 60}}>
          <Button
            onPress={() => this.buttonHandler()}
            title={"voice"}
          />
        </View>
      );
    }
  //}
}

/*function mapStateToProps(state) {
  return {
    loading: state.dataReducer.loading,
    data: state.dataReducer.data,
    error: state.dataReducer.error,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getData,
    },
    dispatch);
}*/

//Connect everything
//export default connect(mapStateToProps, mapDispatchToProps)(Home);

export default Main;