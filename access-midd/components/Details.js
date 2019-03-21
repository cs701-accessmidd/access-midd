/*
  Details displays the name, and other info of a building passed
  down in its props.
  props:
    building: Building to display
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
});

function Details(props) {
  const { building } = props;
  return (
    <View style={styles.detail}>
      <Text style={styles.buildingName}>{building.name}</Text>
      <Text>Detailed info will be here</Text>
      <Button
        title="close"
        onPress={() => props.view(false)}
      />
    </View>
  );
}


Details.propTypes = {
  building: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ])).isRequired,
  view: PropTypes.func.isRequired,
};

export default Details;
