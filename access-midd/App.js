
import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Button
} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import Details from './components/Details';


MapboxGL.setAccessToken('pk.eyJ1IjoiY3N0ZXJuYmVyZyIsImEiOiJjanQ1M3FranEwMmU0NDNzMHV6N25hNTlnIn0.7UHYWxI_GveY_mUZxiYAhA');

const styles = StyleSheet.create({
  callout: {
    backgroundColor: 'white',
    borderColor: 'darkblue',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default class App extends Component<{}> {
  constructor() {
    super();

    this.state = {
      showDetail: false,
      detailPoint: null,
    };
  }

  render() {
    const { showDetail, detailPoint } = this.state;
    const detailView = showDetail
      ? (
        <Details
          view={bool => this.setState({ showDetail: bool })}
          building={detailPoint}
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
          {places.map(point => (
            <MapboxGL.PointAnnotation
              id={point.code}
              title={point.name}
              key={point.code}
              selected
              coordinate={point.coord}
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

const places = [
  {
    name: 'Middlebury',
    code: 'Midd',
    coord: [-73.172999308, 44.005333312]
  },
  {
    name: 'Adirondack Circle',
    code: 'ADK',
    coord: [-73.180033, 44.010527]
  },
  {
    name: 'Middlebury College Bookstore',
    code: 'Bookstore',
    coord: [-73.179679, 44.009501]
  },
];
