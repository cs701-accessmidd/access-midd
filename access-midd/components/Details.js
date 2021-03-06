/*
  Details displays the name and other info of a building passed
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

const boolToEnglish = bool => (bool ? 'Yes' : 'No');

function Details(props) {
  const { building } = props;
  const entry = boolToEnglish(building.acc_entry);
  const restroom = boolToEnglish(building.acc_restroom);
  const elevator = boolToEnglish(building.elevator);
  const comment = building.comment ? building.comment : 'N/A';
  const floorplans = building.plan_url
    ? (<WebView source={{ uri: building.plan_url }} style={{ marginTop: 20 }} />)
    : (<Text>*No floorplans Available at this time.</Text>);

  return (
    <View style={styles.detail}>
      <Text style={styles.buildingName}>{building.name}</Text>
      <Text style={styles.buildingCode}>{building.code}</Text>
      <Text>Details:</Text>
      <Text>{`Accessible Entry?:  ${entry}`}</Text>
      <Text>{`Accessible Restroom?:  ${restroom}`}</Text>
      <Text>{`Public Elevator?:  ${elevator}`}</Text>
      <Text>{`Comments:  ${comment}`}</Text>
      {floorplans}
      <Button title="Edit" onPress={() => props.edit(building)} />
      <Button title="close" onPress={() => props.view(false)} />
    </View>
  );
}

// BuildingShape PropType used repeatedly in application, export to DRY it up
export const BuildingShape = PropTypes.shape({
  name: PropTypes.string,
  code: PropTypes.string,
  coord: PropTypes.arrayOf(PropTypes.number),
  acc_entry: PropTypes.number,
  acc_restroom: PropTypes.number,
  elevator: PropTypes.number,
  comment: PropTypes.string,
  plan_url: PropTypes.string
});

Details.propTypes = {
  building: BuildingShape.isRequired,
  view: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
};

export default Details;
