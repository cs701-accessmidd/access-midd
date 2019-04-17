
import React, { Component } from 'react';
import {
  View, Button, TextInput
} from 'react-native';

import Editor from './components/Editor';
import ListView from './components/ListView';
import MapView from './components/MapView';

export default class App extends Component<{}> {
  constructor() {
    super();

    this.state = {
      detailPoint: null,
      filteredData: [],
      mode: 'view',
      listView: false,
      buildings: [],
    };

    this.getBuildings = this.getBuildings.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
      this.getBuildings();
  }

  getBuildings() {
      fetch('http://localhost:3000/buildings', {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json' }),
      }).then((response) => {
        return response.json();
      }).then((data) => {
        const buildings = data.map((obj) => {
          return {
            name: obj.name,
            code: obj.code,
            plan_url: obj.plan_url,
            coord: [obj.longitude, obj.latitude],
          };
        });
        this.setState({ buildings, filteredData: buildings });
      }).catch(err => console.log(err));
  }

  handleChange(e) {
    // Variable to hold the original version of the list

    const currentList = this.state.buildings;
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
      const { detailPoint, buildings } = this.state;
      const i = buildings.indexOf(detailPoint);
      if (i !== -1) { // if editing an existing building
        // delete term from data
        buildings.splice(i, 1);// removes article from data
      }
      buildings.push(newBuilding);
      this.setState({ buildings });
    }
    this.setState({ mode: 'view' });
  }


  render() {
    const {
      detailPoint, filteredData, mode, listView
    } = this.state;

    const view = listView
      ? (<ListView filteredData={filteredData} edit={(building) => { this.handleChange(''); this.setState({ detailPoint: building, mode: 'edit' }); }} />)
      : (<MapView filteredData={filteredData} edit={(building) => { this.handleChange(''); this.setState({ detailPoint: building, mode: 'edit' }); }} />);
    const viewButtonTitle = listView ? ('Map View') : ('ListView');
    const viewButton = (
      <Button
        title={viewButtonTitle}
        onPress={() => this.setState({ listView: !listView })}
      />
    );
    const newButton = (
      <Button
        title="New Building"
        onPress={() => { this.handleChange(''); this.setState({ mode: 'edit', detailPoint: null }); }}
      />
    );

    if (mode === 'view') {
      return (
        <View style={{ flex: 1 }}>
          {view}
          {viewButton}
          {newButton}
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
