import React from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { styles } from './style';

import { getData } from '../../actions/index';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.props.getData(); //call our action
  }

  render() {
    if (this.props.loading) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator animating={true}/>
          <Text>Good</Text>
        </View>
      );
    } else {
      return (
        <View style={{flex:1, backgroundColor: '#F5F5F5', paddingTop:20}}>
          <FlatList
            ref='listRef'
            data={this.props.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}/>
        </View>
      );
    }
  }

  renderItem({item, index}) {
    return (
      <View style={styles.row}>
        <Text style={styles.title}>
          {(parseInt(index) + 1)}{". "}{item.title}
        </Text>
        <Text style={styles.description}>
          {item.description}
        </Text>
      </View>
    )
  }
}



// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state) {
  return {
    loading: state.dataReducer.loading,
    data: state.dataReducer.data
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getData,
    },
    dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Home);