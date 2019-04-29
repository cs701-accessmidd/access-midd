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
  View, Button, TextInput, StyleSheet, Text
} from 'react-native';
import PropTypes from 'prop-types';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import { BuildingShape } from './Details';

MapboxGL.setAccessToken('pk.eyJ1IjoiY3N0ZXJuYmVyZyIsImEiOiJjanQ1M3FranEwMmU0NDNzMHV6N25hNTlnIn0.7UHYWxI_GveY_mUZxiYAhA');

const styles = StyleSheet.create({
  textbox: {
    paddingTop: '10%',
    borderBottomColor: 'blue'

  },
});


class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.building ? props.building.name : '',
      code: props.building ? props.building.code : '',
      coord: props.building ? props.building.coord : null,
      other: props.building ? props.building.other : '',
    };

    // This binding is necessary to make `this` work in the callback, without
    // creating a new callback in each render
    // https://reactjs.org/docs/handling-events.html
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  addCoord(coordinates) {
    this.setState({
      coord: coordinates
    });
  }
  changeCoord(coordinate, place) {
    const {coord} = this.state
    coordinates = coord ? (coord):[0, 0];
    coordinates[place] = coordinate
    this.setState({
      coord: coordinates
    });
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
    const {
      name, code, coord, other
    } = this.state;
    const nameInput = (
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        value={name}
        placeholder="Name must be set"
        onChangeText={(text) => { this.setState({ name: text }); }}
      />
    );
    const latValue = coord ? coord[0]: '';
    const longValue = coord ? coord[1]: '';
    const latInput = (
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        keyboardType='numeric'
        clearButtonMode =  'always'
        value={String(latValue)}
        placeholder="Latitude"
        onChangeText={(text) => { this.changeCoord(Number(text), 0); }}
        />
    );
    const longInput = (
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        keyboardType='numeric'
        clearButtonMode =  'always'
        value={String(longValue)}
        placeholder="Longtitude"
        onChangeText={(text) => { this.changeCoord(Number(text), 1); }}
      />
    );

    const marker = coord
      ? (
        <MapboxGL.PointAnnotation
          id={code}
          title={name}
          key={code}
          coordinate={coord}
        >
          <MapboxGL.Callout
            title={name}
          />
        </MapboxGL.PointAnnotation>
      ) : null;

    const coordInput = (
      <MapboxGL.MapView
        style={{ flex: 1 }}
        zoomLevel={14.5}
        centerCoordinate={[-73.177628, 44.007619]}
        zoomEnabled
        scrollEnabled
        onPress={e => this.addCoord(e.geometry.coordinates)}
      >
        {marker}
      </MapboxGL.MapView>
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
      <View style={{ flex: 1 }}>
        {coordInput}
        <Text>Click to Add or Move Pin (Must be Set)</Text>
              <Text>Latitude:</Text>
              {latInput}
              <Text>Longitude:</Text>
              {longInput}
        <View style={styles.textbox}>
          <Text>Name:</Text>
          {nameInput}
          <Text>Code:</Text>
          {codeInput}
          <Text>Other:</Text>
          {otherInput}
          <View>
            <Button disabled={!(name !== '' && coord)} onPress={this.handleSave} title="Save" />
            <Button onPress={this.handleCancel} title="Cancel" />
          </View>
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
