
import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Button, TextInput, Alert
} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import Details from './components/Details';
import Editor from './components/Editor';
import data from './data/buildings.json';


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
    this.data = data;


    this.state = {
      showDetail: false,
      detailPoint: null,
      filteredData: data,
      mode: 'view',
    };
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e) {
    // Variable to hold the original version of the list

    const currentList = this.data;
    // Variable to hold the filtered list before putting into state
    let filtered = {};

    // If the search bar isn't empty
    if (e !== '') {
      const term = e.toLowerCase();

      filtered = currentList.filter((item) => {
        // change current item to lowercase
        const lc = item.name.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(term);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      filtered = currentList;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      filteredData: filtered,
    });
  }

  handleEditorReturn(newBuilding) {
    if (newBuilding) { // Not a cancel
      let message = '';
      const { showDetail, detailPoint } = this.state;
      if (showDetail) { // if something selected
        // delete term from data
        const i = this.data.indexOf(detailPoint);
        this.data.splice(i, 1);// removes article from data
        message = 'Building Changed';
      } else {
        message = 'Building Added';
      }
      this.data.push(newBuilding);
      /* eslint-disable no-console */
      Alert.alert(
        message,
        'Continue as you will',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
      /* eslint-enable no-console */
    }
    this.setState({ mode: 'view', showDetail: false });
  }


  render() {
    const {
      showDetail, detailPoint, filteredData, mode
    } = this.state;
    const detailView = showDetail
      ? (
        <Details
          view={bool => this.setState({ showDetail: bool })}
          building={detailPoint}
        />

      ) : null;
    const newButton = <Button title="New Building" onPress={() => this.setState({ mode: 'edit', showDetail: false, detailPoint: null })} />;
    const editButton = <Button title="Edit Building" onPress={() => this.setState({ mode: 'edit' })} />;
    // const searchBar = ();
    const buttons = showDetail ? (<View>{editButton}</View>) : (<View>{newButton}</View>);

    if (mode === 'view') {
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
          {buttons}
          <TextInput
            style={{ height: 50, borderColor: 'gray', borderWidth: 1.5 }}
            onChangeText={(text) => { this.handleChange(text); }}
            placeholder="Search Buildings..."
          />
        </View>
      );
    }
    // We are editing
    return (
      <Editor
        building={detailPoint}
        complete={(newBuilding) => { this.handleEditorReturn(newBuilding); }}
      />
    );
  }
}
