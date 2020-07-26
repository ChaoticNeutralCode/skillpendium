import React, { Component, createRef } from 'react';
import { TextField } from '@material-ui/core';

class Search extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.textField = createRef();
  }

  emit() {
    if(this.props.onUpdate) {
      this.props.onUpdate(this.textField.current.value);
    }
  }

  onSubmit(evt) {
    evt.preventDefault();

    this.textField.current.blur();
    this.emit();
  }

  onChange(evt) {
    if(!this.state.update) {
      this.setState({
        update: setTimeout(() => { 
          this.emit();
          this.setState({ update:null });
        }, 1000)
      });
    }
  }

  componentDidUpdate() {
    if(this.props.clear && this.textField.current) {
      this.textField.current.value = '';
    }
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit.bind(this)}
      >
        <TextField
          id="outlined-required"
          label="Find a Skill"
          variant="outlined"
          fullWidth
          onChange={this.onChange.bind(this)}
          inputRef={this.textField}
        />
      </form>
    );
  }
}

export default Search;