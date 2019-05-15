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
      entry: props.building ? props.building.acc_entry : null,
      restroom: props.building ? props.building.acc_restroom : null,
      elevator: props.building ? props.building.elevator : null,
      comment: props.building ? props.building.comment : '',
      url: props.building ? props.building.plan_url : '',
    };

    this.addCoord = this.addCoord.bind(this);
    this.changeCoord = this.changeCoord.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.buildBooleanInput = this.buildBooleanInput.bind(this);
    this.buildTextInput = this.buildTextInput.bind(this);
    this.buildNumericInput = this.buildNumericInput.bind(this);
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
      name, code, coord, entry, restroom, comment, url, elevator
    } = this.state;
    const newBuilding = {
      name,
      code,
      comment,
      plan_url: url,
      acc_entry: entry ? 1 : 0,
      acc_restroom: restroom ? 1 : 0,
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

  buildBooleanInput(text, stateValue, update) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.switchLabels}>{text}</Text>
        <Switch
          onValueChange={update}
          value={!!stateValue}
        />
        <Text>
          {' '}
          {stateValue ? 'Yes' : 'No'}
          {' '}
        </Text>
      </View>
    );
  }

  buildTextInput(stateValue, placeholder, update) {
    return (
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        value={stateValue}
        placeholder={placeholder}
        onChangeText={update}
      />
    );
  }

  buildNumericInput(stateValue, placeholder, update) {
    return (
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        keyboardType="numeric"
        value={stateValue}
        placeholder={placeholder}
        onChangeText={update}
      />
    );
  }

  render() {
    const {
      name, code, coord, entry, restroom, elevator, comment, url
    } = this.state;

    const marker = coord
      ? (
        <MapboxGL.PointAnnotation
          id={code}
          title={name}
          key={code}
          coordinate={[Number(coord[0]), Number(coord[1])]}
        >
          <MapboxGL.Callout title={name}/>
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

    return (
      <View style={{ flex: 1 }}>
        {coordInput}
        <Text>Click to Add or Move Pin (Must be Set)</Text>
        <Text style={styles.labels}>Latitude:</Text>
        {this.buildNumericInput(lat, "Latitude", (text) => { this.changeCoord(text, 0); })}
        <Text style={styles.labels}>Longitude:</Text>
        {this.buildNumericInput(long, "Longitude", (text) => { this.changeCoord(text, 1); })}
        <View style={styles.textbox}>
          <Text style={styles.labels}>Name:</Text>
          {this.buildTextInput(name, "Name must be set", (text) => {
            this.setState({ name: text });
          })}
          <Text style={styles.labels}>Code:</Text>
          {this.buildTextInput(code, "Code", (text) => { this.setState({ code: text }); })}
          {this.buildBooleanInput("Accessible Entry?:", entry, () => {
            this.setState({ entry: !entry });
          })}
          {this.buildBooleanInput("Accessible Restroom?:", restroom, () => {
            this.setState({ restroom: !restroom });
          })}
          {this.buildBooleanInput("Public Elevator?:", elevator, () => {
            this.setState({ elevator: !elevator });
          })}
          <Text style={styles.labels}>Comment:</Text>
          {this.buildTextInput(comment, "Comment", (text) => { this.setState({ comment: text }); })}
          <Text style={styles.labels}>Floor Plan URL:</Text>
          {this.buildTextInput(url, "url", (text) => { this.setState({ url: text }); })}
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
