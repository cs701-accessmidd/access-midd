/*
  Menu displays the name, and other info of a building passed
  down in its props.
  props:
    currentView: Current View; either 'map' or 'list'
    directionsView: A callback to display directions View
    changeViewType: A callback to display either list or map view
    newBuilding: A callback to display editing view
    direction:
*/

import React from 'react';
import {
  View, Button
} from 'react-native';
import PropTypes from 'prop-types';


function Menu(props) {
  const { currentView, direction, menu } = props;
  let buttons = null;
  if (currentView === 'list') {
    buttons = (
      <View>
        <Button
          title="Directions"
          onPress={() => props.directionsView()}
        />
        <Button
          title="List View"
          onPress={() => props.changeViewType()}
        />
      </View>
    );
  } else {
    buttons = (
      <Button
        title="Map View"
        onPress={() => props.changeViewType()}
      />
    );
  }
  const menuButton = direction ? (
    <Button
      title="< Back"
      onPress={() => props.directionsView()}
    />
  ) : (
    <Button
      title="Menu"
      onPress={() => props.showMenu()}
    />
  );
  if (menu && !direction) {
    return (
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button
            title="< Exit Menu"
            onPress={() => props.showMenu()}
          />
        </View>
        {buttons}
        <Button
          title="New Building"
          onPress={() => props.newBuilding()}
        />
      </View>
    );
  }
  return (
    <View style={{ alignItems: 'center' }}>
      {menuButton}
    </View>
  );
}


Menu.propTypes = {
  currentView: PropTypes.oneOf([
    'map',
    'list',
  ]).isRequired,
  directionsView: PropTypes.func.isRequired,
  changeViewType: PropTypes.func.isRequired,
  newBuilding: PropTypes.func.isRequired,
  direction: PropTypes.bool.isRequired,
};

Menu.defaultProps = {

};


export default Menu;
