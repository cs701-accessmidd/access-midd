
import React, { Component } from 'react';
import {
  View, TextInput
} from 'react-native';

import Editor from './components/Editor';
import ListView from './components/ListView';
import MapView from './components/MapView';
import Menu from './components/Menu';

import data from './data/buildings.json';

export default class App extends Component<{}> {
  constructor() {
    super();
    this.data = data;
    this.data.sort((a, b) => ((a.name > b.name) ? 1 : -1));


    this.state = {
      detailPoint: null,
      filteredData: data,
      mode: 'view',
      listView: false,
      directionsView: false,
      menu: false,
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
      const { detailPoint } = this.state;
      const i = this.data.indexOf(detailPoint);
      if (i !== -1) { // if editing an existing building
        // delete term from data
        this.data.splice(i, 1);// removes article from data
      }
      this.data.push(newBuilding);
      this.data.sort((a, b) => ((a.name > b.name) ? 1 : -1));
    }
    this.setState({ mode: 'view' });
  }


  render() {
    const {
      detailPoint, filteredData, mode, listView, menu, directionsView
    } = this.state;

    const view = listView
      ? (<ListView filteredData={filteredData} edit={(building) => { this.handleChange(''); this.setState({ detailPoint: building, mode: 'edit' }); }} />)
      : (<MapView filteredData={filteredData} directionsView={directionsView} edit={(building) => { this.handleChange(''); this.setState({ detailPoint: building, mode: 'edit' }); }} />);
    const viewButtonTitle = listView ? ('map') : ('list');
    const searchBar = menu || directionsView ? null
      : (
        <TextInput
          style={{
            height: 35, width: '75%', borderColor: 'gray', borderWidth: 1.5, justifyContent: 'flex-start'
          }}
          onChangeText={(text) => { this.handleChange(text); }}
          placeholder="Search Buildings..."
        />
      );

    if (mode === 'view') {
      return (
        <View style={{ flex: 1, paddingTop: '10%' }}>
          <View style={{ flexDirection: 'row' }}>
            {searchBar}
            <Menu
              style={{ justifyContent: 'flex-end', width: '25%' }}
              showMenu={() => this.setState({ menu: !menu })}
              menu={menu}
              direction={directionsView}
              currentView={viewButtonTitle}
              directionsView={() => { this.handleChange(''); this.setState({ directionsView: !directionsView, menu: !menu }); }}
              changeViewType={() => this.setState({ listView: !listView, menu: !menu })}
              newBuilding={() => { this.handleChange(''); this.setState({ mode: 'edit', detailPoint: null, menu: !menu }); }}
            />
          </View>
          {view}
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
