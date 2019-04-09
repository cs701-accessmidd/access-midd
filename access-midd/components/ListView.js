/*
  ListView displays buildings in the form of a list.

  props:
    filteredData: Data to list
*/

import React from 'react';
import {
  View, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { BuildingShape } from './Details';
import BuildingContainer from './BuildingContainer';


function ListView(props) {
  const { filteredData } = props;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ height: 50, borderColor: 'gray', borderWidth: 1.5 }}
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <BuildingContainer
            building={item}
            edit={(detailPoint) => { props.edit(detailPoint); }}
          />
        )}
      />
    </View>
  );
}

ListView.propTypes = {
  filteredData: PropTypes.arrayOf(BuildingShape).isRequired,
};


export default ListView;
