/*
  Mapview displays buildings on Map

  props:
    filteredData: Data to list
    edit: A callback to change View type of main app (editor view),
          and change detail point state to  current building (sent to Details.js)
*/

import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Button,
} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import PropTypes from 'prop-types';
import Details, { BuildingShape } from './Details';
import Directions from './Directions';

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
      dest: null,
      origin: null

    };
  }

  render() {
    const { filteredData, edit } = this.props;
    const {
      showDetail, detailPoint, origin, dest
    } = this.state;

    const detailView = showDetail
      ? (
        <Details
          view={bool => this.setState({ showDetail: bool })}
          building={detailPoint}
          edit={(building) => { edit(building); }}
          viewType="map"
          directionsTo={building => this.setState({ dest: building.coord })}
          directionsFrom={building => this.setState({ origin: building.coord })}

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

          <Directions
            accessToken="pk.eyJ1IjoiY3N0ZXJuYmVyZyIsImEiOiJjanQ1M3FranEwMmU0NDNzMHV6N25hNTlnIn0.7UHYWxI_GveY_mUZxiYAhA"
            origin={origin}
            destination={dest}
            type="walking"
          />
        </MapboxGL.MapView>
        {detailView}
      </View>
    );
  }
}

MapView.propTypes = {
  filteredData: PropTypes.arrayOf(BuildingShape).isRequired,
  edit: PropTypes.func.isRequired,
};


export default MapView;
