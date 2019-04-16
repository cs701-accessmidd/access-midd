
import React, { Component } from 'react';
import {
  View, Button, TextInput
} from 'react-native';

import Editor from './components/Editor';
import ListView from './components/ListView';
import MapView from './components/MapView';

import data from './data/buildings.json';

export default class App extends Component<{}> {
  constructor() {
    super();
    this.data = data;

    this.state = {
      detailPoint: null,
      filteredData: data,
      mode: 'view',
      listView: false,
    };

    this.getBuildings = this.getBuildings.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
      this.getBuildings();
  }

  getBuildings() {
      fetch('http://localhost:3000/buildings', { method: 'GET' }).then((response) => {
          console.log(response)
          // this.setState( { buildings: });
      });
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
      const { detailPoint } = this.state;
      const i = this.data.indexOf(detailPoint);
      if (i !== -1) { // if editing an existing building
        // delete term from data
        this.data.splice(i, 1);// removes article from data
      }
      this.data.push(newBuilding);
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
