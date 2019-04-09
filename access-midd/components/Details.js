/*
  Details displays the name, and other info of a building passed
  down in its props.
  props:
    building: Building to display
    view:
    edit:
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
  const { building } = props;
  return (
    <View style={styles.detail}>
      <Text style={styles.buildingName}>{building.name}</Text>
      <Text style={styles.buildingCode}>{building.code}</Text>
      <Text>{building.other}</Text>
      <Text>Detailed info will be here</Text>
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
  coord: PropTypes.array,
  other: PropTypes.string,
});


Details.propTypes = {
  building: BuildingShape.isRequired,
  view: PropTypes.func.isRequired,
};

export default Details;
