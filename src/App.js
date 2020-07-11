import React, { Component } from 'react';
import './App.css';
import data from './data.json';
import Skill from './components/Skill/Skill';
import { Grid, withStyles, Box, Typography } from '@material-ui/core';
import { AppStyles } from './AppStyles';
import Masonry from 'react-masonry-css';
import CategoryButton from './components/CategoryButton/CategoryButton';
import Search from './components/Search/Search';

class App extends Component {
  state = {
    filter: {
      categories: new Set(),
      text: ''
    }
  }

  updateCategoryFitler(id, isActive) {
    const newCategories = new Set(this.state.filter.categories);

    if(isActive) {
      newCategories.add(id);
    } else {
      newCategories.delete(id);
    }

    this.setState({filter:{
      ...this.state.filter,
      categories: newCategories
    }});
  }

  updateTextFilter(text) {
    this.setState({filter:{
      ...this.state.filter,
      text
    }});
  }

  getSkills() {
    const { filter } = this.state;

    if(!filter.categories.size && !filter.text) return [];

    let skills = data.skills;
    if(filter.categories.size) {
      skills = skills.filter(s => {
          return !!s.categories
            .filter(c => {
              return filter.categories.has(c)
            }).length;
        });
    }

    if(filter.text) {
      skills = skills.filter(s => {
        return s.name.toLowerCase().includes(filter.text) 
          || s.description.toLowerCase().includes(filter.text);
      });
    }

    return skills;
  }

  render() {
    const skills = this.getSkills(),
          { classes } = this.props;

    return (
      <Grid container>
        <Grid item className={classes.actionsArea}>
          <Typography variant="h1">Skillpendium</Typography>
          <Box m={2}>
            <Search onUpdate={this.updateTextFilter.bind(this)} />
          </Box>
          <Box>
            {data.categories.map((c, i) => (
              <CategoryButton key={i} category={c} categoryId={i} onToggle={this.updateCategoryFitler.bind(this)}/>
            ))}
          </Box>

        </Grid>
        <Grid item className={classes.skillsArea}>
          {skills.length ? (
              <Masonry
                breakpointCols={3}
                className={classes.masonryContainer}
                columnClassName={classes.masonryColumn}
              >
                {skills.map(s => (
                  <Skill key={s.tag} className={classes.masonryItem} skill={s}/>
                ))}
              </Masonry>
            ) : (
              <Typography variant="h6" className={classes.welcomeText}>To get started select some categories or enter a search.</Typography>
            )}
        </Grid>
        
      </Grid>
          
    )
  }
}

export default withStyles(AppStyles)(App);
