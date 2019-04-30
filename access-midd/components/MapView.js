/*
  Mapview displays buildings on Map

  props:
    directionsView: type of view (true or false)
    filteredData: Data to list
    edit: A callback to change View type of main app (editor view),
          and change detail point state to  current building (sent to Details.js)
*/

import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Button, Animated, Picker
} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import PropTypes from 'prop-types';
import Details, { BuildingShape } from './Details';
import Directions from './Directions';

MapboxGL.setAccessToken('pk.eyJ1IjoiY3N0ZXJuYmVyZyIsImEiOiJjanQ1M3FranEwMmU0NDNzMHV6N25hNTlnIn0.7UHYWxI_GveY_mUZxiYAhA');

const panther = require('../data/bluePanther.png');

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

    this.springValue = new Animated.Value(0.3);

    this.state = {
      showDetail: false,
      detailPoint: null,
      dest: null,
      origin: null,
      currentLat: null,
      currentLong: null,
      error: null,
      destBuilding: null,
      originBuilding: null,

    };
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          currentLat: position.coords.latitude,
          currentLong: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10
      },
    );
    this.spring();
  }


  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  spring() {
    this.springValue.setValue(0.3);
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 2.5
      }
    ).start(this.spring.bind(this));
  }

  pickerChange(type, index) {
    const { filteredData } = this.props;
    filteredData.map((v, i) => {
      if (index === i) {
        if (type === 'dest') {
          this.setState({
            dest: filteredData[index].coord,
            destBuilding: filteredData[index].name
          });
        } else {
          this.setState({
            origin: filteredData[index].coord,
            originBuilding: filteredData[index].name
          });
        }
      }
      return null;
    });
  }


  filterPoints() {
    // Variable to hold the original version of the list
    const { destBuilding, originBuilding } = this.state;
    const { filteredData } = this.props;
    const currentList = filteredData;
    // Variable to hold the filtered list before putting into state
    let filtered = {};
    let filtered2 = {};
    let term;

    // If the search bar isn't empty
    if (destBuilding) {
      term = destBuilding.toLowerCase();
      filtered = currentList.filter((item) => {
        // change current item to lowercase
        const lc = item.name.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(term);
      });
    }
    if (originBuilding) {
      // If the search bar is empty, set newList to original task list
      term = originBuilding.toLowerCase();
      filtered2 = currentList.filter((item) => {
        // change current item to lowercase
        const lc = item.name.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(term);
      });
    }
    if (destBuilding && originBuilding) {
      if (destBuilding === originBuilding) {
        return filtered;
      }
      const two = filtered2.pop();
      filtered.push(two);
      return filtered;
    } if (!originBuilding && destBuilding) {
      return filtered;
    } if (!destBuilding && originBuilding) {
      return filtered2;
    }
    return currentList;
  }

  render() {
    const { filteredData, edit, directionsView } = this.props;
    const {
      showDetail, detailPoint, origin, dest, error, currentLat,
      currentLong, destBuilding, originBuilding
    } = this.state;
    let directions = null;
    let pinData = filteredData;
    let directionPicker = null;
    if (directionsView) {
      directionPicker = (
        <View>
          <Text>From:</Text>
          <Picker
            itemStyle={{ height: 44 }}
            selectedValue={originBuilding}
            onValueChange={(itemValue, itemIndex) => this.pickerChange('origin', itemIndex)}
          >
            {
            filteredData.map(v => <Picker.Item label={v.name} key={v.code} value={v.name} />)
           }
          </Picker>
          <Text>To:</Text>
          <Picker
            itemStyle={{ height: 44 }}
            selectedValue={destBuilding}
            onValueChange={(itemValue, itemIndex) => this.pickerChange('dest', itemIndex)}
          >
            {
            filteredData.map(v => <Picker.Item label={v.name} key={v.code} value={v.name} />)
           }
          </Picker>
        </View>
      );
      const newData = this.filterPoints();
      pinData = newData;
      directions = (
        <Directions
          accessToken="pk.eyJ1IjoiY3N0ZXJuYmVyZyIsImEiOiJjanQ1M3FranEwMmU0NDNzMHV6N25hNTlnIn0.7UHYWxI_GveY_mUZxiYAhA"
          origin={origin}
          destination={dest}
          type="walking"
        />
      );
    }
    const detailView = showDetail
      ? (
        <Details
          view={bool => this.setState({ showDetail: bool })}
          building={detailPoint}
          edit={(building) => { edit(building); }}
        />

      ) : null;

    const currentLocation = error ? null
      : (
        // <Text>{currentLat}</Text>);
        <MapboxGL.PointAnnotation
          id="currentLocation"
          title="Current Location"
          key="currentLocation"
          coordinate={[Number(currentLat), Number(currentLong)]}
        >
          <Animated.Image
            style={{ width: 30, height: 30, transform: [{ scale: this.springValue }] }}
            source={panther}
          />
        </MapboxGL.PointAnnotation>
      );

    return (
      <View style={{ flex: 1 }}>
        {directionPicker}
        <MapboxGL.MapView
          style={{ flex: 1 }}
          zoomLevel={14.5}
          centerCoordinate={[-73.177628, 44.007619]}
          zoomEnabled
          scrollEnabled
        >
          {directions}
          {currentLocation}
          {pinData.map(point => (
            <MapboxGL.PointAnnotation
              id={point.code}
              title={point.name}
              key={point.id}
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
  edit: PropTypes.func.isRequired,
};


export default MapView;
