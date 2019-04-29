/*
  Details displays the name, and other info of a building passed
  down in its props.
  props:
    view: A callback to display details
    building: Building to display
    edit: A callback to change View type of main app (editor view),
          and change detail point state to  current building
*/

import React from 'react';
import {
  View, StyleSheet, Text, Button, WebView
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
      <WebView
        source={{ uri: 'http://www.middlebury.edu/media/view/148241/original/AdirondackView20-JapaneseHse.pdf' }}
        style={{ marginTop: 20 }}
      />
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
};


export default Details;
