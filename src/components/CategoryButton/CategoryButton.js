import React, { Component } from 'react';
import { Button, withStyles } from '@material-ui/core';
import { CategoryButtonStyles } from './CategoryButtonStyles';

class CategoryButton extends Component {
  onClick() {
    const { categoryId, onClick } = this.props;

    if(onClick) onClick(categoryId);
  }

  render() {
    const { category, selected, classes } = this.props;

    return (
      <Button className={classes.button} variant={selected ? 'contained' : 'outlined'} onClick={() => this.onClick()}>{category}</Button>
    );
  }
}

export default withStyles(CategoryButtonStyles)(CategoryButton);