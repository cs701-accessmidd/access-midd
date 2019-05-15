/*
  BuildingContainer displays the title of the building and details of
  building if clicked

  props:
    building: building info
    edit: A callback to change View type of main app (editor view),
          and change detail point state to current building
*/

import React, { Component } from 'react';
import {
  View, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Details, { BuildingShape } from './Details';

class BuildingContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detail: false,
    };
  }

  render() {
    const { detail } = this.state;
    const { building, edit } = this.props;
    const detailView = detail
      ? (
        <Details
          view={bool => this.setState({ detail: bool })}
          building={building}
          edit={(detailPoint) => { edit(detailPoint); }}
          viewType="list"
        />
      ) : (
        <Text onPress={() => this.setState({ detail: !detail })}>
          {building.name}
        </Text>
      );

    return (
      <View style={{ flex: 1 }}>
        {detailView}
      </View>
    );
  }
}


BuildingContainer.propTypes = {
  building: BuildingShape.isRequired,
  edit: PropTypes.func.isRequired,
};

export default BuildingContainer;
