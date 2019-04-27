/*
  ListView displays buildings in the form of a list.

  props:
    filteredData: Data to list
    edit: A callback to change View type of main app (editor view),
          and change detail point state to  current building
*/

import React from 'react';
import {
  View, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { BuildingShape } from './Details';
import BuildingContainer from './BuildingContainer';

const nameSort = (obj1, obj2) => {
  const s1 = obj1.name.toLowerCase();
  const s2 = obj2.name.toLowerCase();
  if (s1 < s2) return -1;
  if (s1 > s2) return 1;
  return 0;
};

function ListView(props) {
  const { filteredData } = props;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ height: 50, borderColor: 'gray', borderWidth: 1.5 }}
        data={filteredData.sort(nameSort)}
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
  edit: PropTypes.func.isRequired,
};


export default ListView;
