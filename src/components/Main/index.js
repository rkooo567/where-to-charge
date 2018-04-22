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
  Text,
} from 'react-native';

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
        <View>
          <Text>Main page</Text>
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