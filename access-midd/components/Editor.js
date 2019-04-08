/*
  Editor implements a form for creating a new buildig or editing an existing
  building.
  props:
    building: The building to be edited [optional]
    complete: A callback to add or save building
  The complete callback should have one optional argument. Calling complete
  with no arguemnts cancels the operation. Otherwise complete is invoked with
  the article object to be added or updated.
*/

import React, { Component } from 'react';
import {
  View, Button, TextInput, StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { BuildingShape } from './Details';

const styles = StyleSheet.create({
  textbox: {
    paddingTop: '10%',

  },
});

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.building ? props.building.name : '',
      code: props.building ? props.building.code : '',
      coord: props.building ? props.building.coord : '',
      other: props.building ? props.building.other : '',
    };

    // This binding is necessary to make `this` work in the callback, without
    // creating a new callback in each render
    // https://reactjs.org/docs/handling-events.html
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSave() {
    const {
      name, code, coord, other
    } = this.state;
    const newBuilding = {
      name,
      code,
      coord,
      other,
    };
    const { complete } = this.props;
    complete(newBuilding);
  }

  handleCancel() {
    const { complete } = this.props;
    complete();
  }

  render() {
    // We need to create new callbacks here to pass the additional arguments to handleTextUpdate, or
    // we could create simple wrappers like for handleCancel
    const { name, code, other } = this.state;
    const nameInput = (
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        value={name}
        placeholder="Name must be set"
        onChangeText={(text) => { this.setState({ name: text }); }}
      />
    );
    const codeInput = (
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        value={code}
        placeholder="Code"
        onChangeText={(text) => { this.setState({ code: text }); }}
      />
    );

    const otherInput = (
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        value={other}
        placeholder="Other"
        onChangeText={(text) => { this.setState({ other: text }); }}
      />
    );

    return (
      <View style={styles.textbox}>
        {nameInput}
        {codeInput}
        {otherInput}
        <View>
          <Button disabled={name === ''} onPress={this.handleSave} title="Save" />
          <Button onPress={this.handleCancel} title="Cancel" />
        </View>
      </View>
    );
  }
}

Editor.propTypes = {
  building: BuildingShape,
  complete: PropTypes.func.isRequired,
};

Editor.defaultProps = {
  building: null,
};

export default Editor;
