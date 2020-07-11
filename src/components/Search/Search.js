import React, { Component } from 'react';
import { TextField } from '@material-ui/core';

class Search extends Component {
  render() {
    return (
      <TextField
        id="outlined-required"
        label="Find a Skill"
        variant="outlined"
        fullWidth
      />
    );
  }
}

export default Search;