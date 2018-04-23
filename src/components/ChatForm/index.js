/*
* smart component
*
* @class ChatForm
* @classDesc The form that is for interacting with DialogFlow
*
* */

import React from 'react';
import {
  Text
} from 'react-native';
import { Item, Input, Button, Icon, Form } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Error from '../Error/index';
import { dialogIntentRequest } from '../../actions/index';

class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  buttonHandler() {
    this.props.dialogIntentRequest(this.state.text);
    this.setState({
      text: ""
    });
  }

  inputHandler(text) {
    this.setState({
      text
    });
  }

  render() {
    if (this.props.error) {
      return <Error/>;
    } else {
      return (
          <Form>
            <Item regular>
              <Input
                placeholder='Ask questions'
                onChangeText={(text) => this.inputHandler(text)}
                value={this.state.text}
              />
            </Item>
            <Button
              success
              onPress={() => this.buttonHandler()}
              iconLeft
            >
              <Icon name="navigate"/>
              <Text>  Enter   </Text>
            </Button>
          </Form>
      );
    }
  }
}

function mapStateToProps(state) {
  // bring redux (global) state here
  return {

  }
}

function mapDispatchToProps(dispatch) {
  // bring actions you need here
  return bindActionCreators(
    {
      dialogIntentRequest,
    },
    dispatch);
}

//Connect actions & reducers to the component
export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);
