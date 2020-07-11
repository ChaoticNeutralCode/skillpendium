import React, { Component } from 'react';
import { Button, withStyles } from '@material-ui/core';
import { CategoryButtonStyles } from './CategoryButtonStyles';

class CategoryButton extends Component {
  state = {
    active: false
  };

  onClick() {
    const toggledActive = !this.state.active,
          { categoryId, onToggle } = this.props;

    if(onToggle) onToggle(categoryId, toggledActive);

    this.setState({
      active: toggledActive
    });
  }

  render() {
    const { category, classes } = this.props,
          { active } = this.state;

    return (
      <Button color="primary" className={classes.button} variant={active ? 'contained' : 'text'} onClick={() => this.onClick()}>{category}</Button>
    );
  }
}

export default withStyles(CategoryButtonStyles)(CategoryButton);