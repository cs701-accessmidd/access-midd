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
  View, Button, TextInput, StyleSheet, Text, Switch
} from 'react-native';
import PropTypes from 'prop-types';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import { BuildingShape } from './Details';

MapboxGL.setAccessToken('pk.eyJ1IjoiY3N0ZXJuYmVyZyIsImEiOiJjanQ1M3FranEwMmU0NDNzMHV6N25hNTlnIn0.7UHYWxI_GveY_mUZxiYAhA');

const styles = StyleSheet.create({
  textbox: {
    paddingTop: '10%',

  },
  switchLabels: {
    fontSize: 14,
    color: 'gray',
    fontWeight: 'bold',
  },
  labels: {
    fontSize: 12,
    color: 'gray',
    fontWeight: 'bold',
  },
});


class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.building ? props.building.name : '',
      code: props.building ? props.building.code : '',
      coord: props.building ? props.building.coord : null,
      acc_entry: props.building ? props.building.acc_entry : null,
      acc_restroom: props.building ? props.building.acc_restroom : null,
      elevator: props.building ? props.building.elevator : null,
      comment: props.building ? props.building.comment : '',
      plan_url: props.building ? props.building.plan_url : '',
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
    const { coord } = this.state;
    const coordinates = coord || ['', ''];
    coordinates[place] = coordinate;
    this.setState({ coord: coordinates });
  }

  handleSave() {
    const {
      name, code, coord, acc_entry, acc_restroom, comment, plan_url, elevator
    } = this.state;
    const newBuilding = {
      name,
      code,
      comment,
      plan_url,
      acc_entry: acc_entry ? 1 : 0,
      acc_restroom: acc_restroom ? 1 : 0,
      elevator: elevator ? 1 : 0,
      coord: [Number(coord[0]), Number(coord[1])]
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
      name, code, coord, acc_entry, acc_restroom, elevator, comment, plan_url
    } = this.state;
    const nameInput = (
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        value={name}
        placeholder="Name must be set"
        onChangeText={(text) => { this.setState({ name: text }); }}
      />
    );
    const marker = coord
      ? (
        <MapboxGL.PointAnnotation
          id={code}
          title={name}
          key={code}
          coordinate={[Number(coord[0]), Number(coord[1])]}
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
    const lat = coord ? String(coord[0]) : null;
    const long = coord ? String(coord[1]) : null;

    const latInput = (
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        keyboardType="numeric"
        value={lat}
        placeholder="Latitude"
        onChangeText={(text) => { this.changeCoord(text, 0); }}
      />
    );
    const longInput = (
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        keyboardType="numeric"
        value={long}
        placeholder="Longitude"
        onChangeText={(text) => { this.changeCoord(text, 1); }}
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
    entry = !!acc_entry;
    const entryInput = (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.switchLabels}>Accessible Entry?:             </Text>
        <Switch
          onValueChange={(text) => { this.setState({ acc_entry: !acc_entry }); }}
          value={entry}
        />
        <Text>
          {' '}
          {acc_entry ? 'Yes' : 'No'}
          {' '}
        </Text>
      </View>
    );

    rest = !!acc_restroom;
    const restroomInput = (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.switchLabels}>Accessible Restroom?:      </Text>
        <Switch
          onValueChange={(text) => { this.setState({ acc_restroom: !acc_restroom }); }}
          value={rest}
        />
        <Text>
          {' '}
          {acc_restroom ? 'Yes' : 'No'}
          {' '}
        </Text>
      </View>
    );

    elev = !!elevator;
    const elevatorInput = (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.switchLabels}>Public Elevator?:                </Text>
        <Switch
          onValueChange={(text) => { this.setState({ elevator: !elevator }); }}
          value={elev}
        />
        <Text>
          {' '}
          {elevator ? 'Yes' : 'No'}
          {' '}
        </Text>
      </View>
    );

    const commentInput = (
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        value={comment}
        placeholder="Comment"
        onChangeText={(text) => { this.setState({ comment: text }); }}
      />
    );
    const urlInput = (
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        value={plan_url}
        placeholder="url"
        onChangeText={(text) => { this.setState({ plan_url: text }); }}
      />
    );

    return (
      <View style={{ flex: 1 }}>
        {coordInput}
        <Text>Click to Add or Move Pin (Must be Set)</Text>
        <Text style={styles.labels}>Latitude:</Text>
        {latInput}
        <Text style={styles.labels}>Longitude:</Text>
        {longInput}
        <View style={styles.textbox}>
          <Text style={styles.labels}>Name:</Text>
          {nameInput}
          <Text style={styles.labels}>Code:</Text>
          {codeInput}
          {entryInput}
          {restroomInput}
          {elevatorInput}
          <Text style={styles.labels}>Comment:</Text>
          {commentInput}
          <Text style={styles.labels}>Floor Plan URL:</Text>
          {urlInput}
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
