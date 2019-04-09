/*

BuildingContainer displays the title of the building and details of
building if clicked

props:
  building: building info
  edit
*/

import React, { Component } from 'react';
import {
  View, Text,
} from 'react-native';

import Details, { BuildingShape } from './Details';


class BuildingContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detail: false,
    };
  }


  render() {
    // We need to create new callbacks here to pass the additional arguments to handleTextUpdate, or
    // we could create simple wrappers like for handleCancel
    const { detail } = this.state;
    const { building, edit } = this.props;
    const detailView = detail
      ? (
        <Details
          view={bool => this.setState({ detail: bool })}
          building={building}
          edit={(detailPoint) => { edit(detailPoint); }}
        />
      ) : (
        <Text
          onPress={() => this.setState({ detail: !detail })}
        >
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
};

export default BuildingContainer;
