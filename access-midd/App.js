
import React, {Component} from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken('pk.eyJ1IjoiY3N0ZXJuYmVyZyIsImEiOiJjanQ1M3FranEwMmU0NDNzMHV6N25hNTlnIn0.7UHYWxI_GveY_mUZxiYAhA');

const styles = StyleSheet.create({
    callout: {
        backgroundColor: "white",
        borderColor: "darkblue",
        borderWidth: 1,
        borderRadius: 5,
    },
    detail: {
        backgroundColor: "white",
        borderColor: "darkblue",
        borderWidth: 1,
        borderRadius: 5,
        flex: 1,
    },
    buildingName: {
        fontSize: 16,
    },
})

export default class App extends Component<{}> {
    constructor() {
        super();

        this.state = {
            showDetail: false,
            detailPoint: null,
        };
    }

    render () {
        const detailView = this.state.showDetail ?
            <View style={styles.detail}>
                <Text style={styles.buildingName}>{this.state.detailPoint.name}</Text>
                <Text>Detailed info will be here</Text>
                <Button
                    title="close"
                    onPress={() => this.setState({ showDetail: false })}
                />
            </View> : null;
        return (
            <View style={{flex: 1}}>
                <MapboxGL.MapView
                    style={{flex: 1}}
                    zoomLevel={15}
                    centerCoordinate={midd.coord}
                    zoomEnabled={true}
                    scrollEnabled={true}>
                    {places.map(point => {
                        return (
                        <MapboxGL.PointAnnotation
                            id={point.code}
                            title={point.name}
                            key={point.code}
                            selected={true}
                            coordinate={point.coord}>
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
                        );
                    })}
                </MapboxGL.MapView>
                {detailView}
            </View>
        );
    }
}

const places = [
    {
      "name": "Middlebury",
      "code": "Midd",
      "coord": [-73.172999308, 44.005333312]
    },
    {
      "name": "Adirondack Circle",
      "code": "ADK",
      "coord": [-73.180033, 44.010527]
    },
    {
      "name": "Middlebury College Bookstore",
      "code": "Bookstore",
      "coord": [-73.179679, 44.009501]
    },
];
