/*
  Details displays the name, and other info of a building passed
  down in its props.
  props:
    view: A callback to display details
    building: Building to display
    edit: A callback to change View type of main app (editor view),
          and change detail point state to  current building
    viewType: Type of view user is in either 'list' or 'map'
  optional props:
    directionsTo: A callback to save building as destination (for direction purposes)
    directionsFrom: A callback to save building as origin (for direction purposes)
*/

import React from 'react';
import {
  View, StyleSheet, Text, Button
} from 'react-native';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  detail: {
    backgroundColor: 'white',
    borderColor: 'darkblue',
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
  },
  buildingName: {
    fontSize: 16,
  },
  buildingCode: {
    fontSize: 12,
    color: 'gray',
  },
});

function Details(props) {
  const { building, viewType } = props;
  let dir = null;
  if (viewType === 'map') {
    dir = (
      <View>
        <Button
          title="Directions To"
          onPress={() => props.directionsTo(building)}
        />
        <Button
          title="Directions From"
          onPress={() => props.directionsFrom(building)}
        />
      </View>
    );
  }

  return (
    <View style={styles.detail}>
      <Text style={styles.buildingName}>{building.name}</Text>
      <Text style={styles.buildingCode}>{building.code}</Text>
      <Text>{building.other}</Text>
      <Text>Detailed info will be here</Text>
      {dir}
      <Button
        title="Edit"
        onPress={() => props.edit(building)}
      />
      <Button
        title="close"
        onPress={() => props.view(false)}
      />
    </View>
  );
}
// Article PropType used repeatedly in application, export to DRY it up
export const BuildingShape = PropTypes.shape({
  name: PropTypes.string,
  code: PropTypes.string,
  coord: PropTypes.arrayOf(PropTypes.number),
  other: PropTypes.string,
});


Details.propTypes = {
  building: BuildingShape.isRequired,
  view: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  viewType: PropTypes.oneOf([
    'map',
    'list',
  ]).isRequired,
  directionsTo: PropTypes.func,
  directionsFrom: PropTypes.func,
};

Details.defaultProps = {
  directionsTo: null,
  directionsFrom: null,
};


export default Details;
