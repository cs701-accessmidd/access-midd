
import React, {Component} from 'react';
import {View} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken('pk.eyJ1IjoiY3N0ZXJuYmVyZyIsImEiOiJjanQ1M3FranEwMmU0NDNzMHV6N25hNTlnIn0.7UHYWxI_GveY_mUZxiYAhA');

const middCoordinates = [
  -73.172999308, 44.005333312
];


export default class App extends Component<{}> {
  render () {
    return (
      <View style={{flex: 1}}>
          <MapboxGL.MapView
          style={{flex: 1}}
          zoomLevel={13}
          centerCoordinate={middCoordinates}
          zoomEnabled={true}
          scrollEnabled={true}
        />
      </View>
      );
  }
}
