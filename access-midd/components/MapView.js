/*
  ListView displays buildings in the form of a list.

  props:
    filteredData: Data to list
*/

import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Button,
} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import PropTypes from 'prop-types';
import Details, { BuildingShape } from './Details';

MapboxGL.setAccessToken('pk.eyJ1IjoiY3N0ZXJuYmVyZyIsImEiOiJjanQ1M3FranEwMmU0NDNzMHV6N25hNTlnIn0.7UHYWxI_GveY_mUZxiYAhA');

const styles = StyleSheet.create({
  callout: {
    backgroundColor: 'white',
    borderColor: 'darkblue',
    borderWidth: 1,
    borderRadius: 5,
  },
});

class MapView extends Component {
  constructor() {
    super();


    this.state = {
      showDetail: false,
      detailPoint: null,
    };
  }


  render() {
    const { filteredData, edit } = this.props;
    const { showDetail, detailPoint } = this.state;

    const detailView = showDetail
      ? (
        <Details
          view={bool => this.setState({ showDetail: bool })}
          building={detailPoint}
          edit={(building) => { edit(building); }}
        />

      ) : null;


    return (
      <View style={{ flex: 1 }}>
        <MapboxGL.MapView
          style={{ flex: 1 }}
          zoomLevel={14.5}
          centerCoordinate={[-73.177628, 44.007619]}
          zoomEnabled
          scrollEnabled
        >
          {filteredData.map(point => (
            <MapboxGL.PointAnnotation
              id={point.code}
              title={point.name}
              key={point.code}
              selected
              coordinate={point.coord}
              onSelected={() => this.setState({ detailPoint: point })}
            >
              <MapboxGL.Callout>
                <View style={styles.callout}>
                  <Text>{point.name}</Text>
                  <Button
                    title="Details"
                    onPress={() => this.setState({ showDetail: true, detailPoint: point })}
                  />

                </View>
              </MapboxGL.Callout>
            </MapboxGL.PointAnnotation>
          ))}
        </MapboxGL.MapView>
        {detailView}
      </View>
    );
  }
}

MapView.propTypes = {
  filteredData: PropTypes.arrayOf(BuildingShape).isRequired,
};


export default MapView;
