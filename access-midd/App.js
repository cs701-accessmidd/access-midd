
import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Button
} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken('pk.eyJ1IjoiY3N0ZXJuYmVyZyIsImEiOiJjanQ1M3FranEwMmU0NDNzMHV6N25hNTlnIn0.7UHYWxI_GveY_mUZxiYAhA');

const styles = StyleSheet.create({
  callout: {
    backgroundColor: 'white',
    borderColor: 'darkblue',
    borderWidth: 1,
    borderRadius: 5,
  },
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
        <View style={styles.detail}>
          <Text style={styles.buildingName}>{detailPoint.name}</Text>
          <Text>Detailed info will be here</Text>
          <Button
            title="close"
            onPress={() => this.setState({ showDetail: false })}
          />
        </View>
      ) : null;
    return (
      <View style={{ flex: 1 }}>
        <MapboxGL.MapView
          style={{ flex: 1 }}
          zoomLevel={15}
          centerCoordinate={[-73.18126699999999,44.0134025]}
          zoomEnabled
          scrollEnabled
        >
          {points.map(point => (
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

const points = [
    {"name":"Adirondack House","code":"CCI","coord":[-73.1800513,44.0106866]},
    {"name":"Twilight Hall","code":"Twilight","coord":[-73.1721317,44.0108814]},
    {"name":"Carr Hall","code":"AFC","coord":[-73.1782455,44.0106152]},
    {"name":"Chellis House","code":"Chellis","coord":[-73.18051070000001,44.009383]},
    {"name":"Davis Library","code":"Davis","coord":[-73.1743542,44.0095548]},
    {"name":"Franklin Environmental Center at Hillcrest","code":"Hillcrest","coord":[-73.1773152,44.00825950000001]},
    {"name":"Freeman International Center","code":"FIC","coord":[-73.1800812,44.0139867]},
    {"name":"Gifford Hall","code":"Gifford","coord":[-73.1789313,44.0098584]},
    {"name":"Le Chateau","code":"Chateau","coord":[-73.17718239999999,44.0115601]},
    {"name":"McCardell Bicentennial Hall","code":"BiHall","coord":[-73.18126699999999,44.0134025]},
    {"name":"Munroe Hall","code":"Munroe","coord":[-73.17784069999999,44.0099865]},
    {"name":"Old Chapel","code":"Old Chapel","coord":[-73.1762631,44.0093156]},
    {"name":"Public Safety","code":"PubSafe","coord":[-73.1735379,44.0082049]},
    {"name":"Service Building","code":"Service Building","coord":[-73.1769786,44.00747639999999]},
    {"name":"Sunderland Language Center","code":"Sunderland","coord":[-73.17644299999999,44.01072]},{"name":"The Axinn Center at Starr Library","code":"Axinn","coord":[-73.1754587,44.00797900000001]},{"name":"Voter Hall","code":"Voter","coord":[-73.16905969999999,44.012253]},{"name":"Warner Hall","code":"Warner","coord":[-73.17535459999999,44.0101601]},{"name":"Wright Memorial Theatre","code":"Wright","coord":[-73.17694180000001,44.0119745]},
    {"name":"Ross Dining Hall","code":"Ross","coord":[-73.1811306,44.010665]},
    {"name":"Atwater Commons Dining Hall","code":"Atwater Dining","coord":[-73.1811306,44.010665]},
    {"name":"Allen Hall","code":"Allen","coord":[-73.1773424,44.012987]},
    {"name":"Atwater Residence Halls","code":"Atwater","coord":[-73.1789902,44.0131872]},
    {"name":"Battell Hall","code":"Battell","coord":[-73.1780382,44.0113345]},
    {"name":"Coffrin Hall","code":"Coffrin","coord":[-73.1789902,44.0131872]},
    {"name":"Hadley Hall","code":"Hadley","coord":[-73.1812384,44.0116242]},
    {"name":"Hepburn Hall","code":"Hepburn","coord":[-73.17883259999999,44.00852250000001]},
    {"name":"Kelly Hall","code":"Kelly","coord":[-73.181389,44.0120073]},
    {"name":"Lang Hall","code":"Lang","coord":[-73.1814009,44.0122414]},
    {"name":"LaForce Hall","code":"LaForce","coord":[-73.1807254,44.0104225]},
    {"name":"Milliken Hall","code":"Milliken","coord":[-73.1808056,44.0113669]},
    {"name":"Munford House","code":"Munford","coord":[-73.1756309,44.0062293]},
    {"name":"Starr Hall","code":"Starr","coord":[-73.1760273,44.0085227]},
    {"name":"Stewart Hall","code":"Stewart","coord":[-73.1787104,44.0079894]}
];
