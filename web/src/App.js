import React, { Component } from 'react';
import { filter } from 'lodash';
import fuse from 'fuse.js';
import users from './users';

// "first_name": "Hildagarde",
// "last_name": "Brenard",
// "email": "hbrenard0@dion.ne.jp",
// "ip_address": "81.247.172.91"

function search(data, keys, searchInput) {
  let options = {
    shouldSort: true,
    keys,
    tokenize: true,
    matchAllTokens: true,
    threshold: 0.3,
  };
  let fuzzy = new fuse(data, options)
  return fuzzy.search(searchInput);
}

class Search extends Component {
  state = {
    searchInput: '',
    users: [],
  };

  handleChange = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  componentDidMount() { this.setState({ users }); }

  render() {
    const { searchInput, users } = this.state; 
    let filteredUsers = (this.state.searchInput.length !== 0) ? search(this.state.users, this.state.searchInput) : this.state.users;
    return(
      <div>
        <label>
          Search
          <input value={this.state.value} onChange={this.handleChange} />
        </label>
        <p>
          {filteredUsers.length}
          {JSON.stringify((searchInput.length > 0) ? search(users, ["first_name", "last_name", "email", "ip_address"], searchInput) : users)}
        </p>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Search />
      </div>
    );
  }
}

export default App;
