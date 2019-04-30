
import React, { Component } from 'react';
import {
  View, TextInput, Text,
} from 'react-native';

import Editor from './components/Editor';
import ListView from './components/ListView';
import MapView from './components/MapView';
import Menu from './components/Menu';

export default class App extends Component<{}> {
  constructor() {
    super();

    this.state = {
      detailPoint: null,
      filteredData: [],
      mode: 'view',
      listView: false,
      directionsView: false,
      menu: false,
      buildings: [],
      errorMessage: '',
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
    }).then(response => response.json()).then((data) => {
      this.setState({ buildings: data, filteredData: data });
    }).catch(() => {
      this.setState({ errorMessage: 'Network error: Unable to fetch buildings' });
    });
  }

  handleChange(e) {
    const { buildings: currentList } = this.state;
    let filtered;
    if (e !== '') {
      filtered = currentList.filter((item) => {
        const lc = item.name.toLowerCase();
        return lc.includes(e.toLowerCase());
      });
    } else {
      filtered = currentList;
    }
    this.setState({ filteredData: filtered });
  }

  handleEditorReturn(newBuilding) {
    if (newBuilding) {
      const { detailPoint, buildings } = this.state;
      const i = buildings.indexOf(detailPoint);
      if (i !== -1) { // if editing an existing building
        fetch(`http://localhost:3000/building/${detailPoint.id}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newBuilding),
        }).then((response) => {
          if (response.status === 200) {
            this.setState({ errorMessage: '' });
            this.getBuildings();
          } else {
            this.setState({ errorMessage: 'Unable to update building' });
          }
        });
      } else { // adding a new building
        fetch('http://localhost:3000/buildings/new', {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newBuilding),
        }).then((response) => {
          if (response.status === 201) {
            this.setState({ errorMessage: '' });
            this.getBuildings();
          } else if (response.status === 409) {
            this.setState({ errorMessage: 'Building with this name already exists' });
          } else {
            this.setState({ errorMessage: 'Unable to create building' });
          }
        });
      }
    }
    this.setState({ mode: 'view' });
  }


  render() {
    const {
      detailPoint, filteredData, mode, listView, menu, directionsView, errorMessage
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
    const message = errorMessage !== ''
      ? <Text>{errorMessage}</Text>
      : null;

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
          {message}
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
