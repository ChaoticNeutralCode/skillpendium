import React, { Component } from 'react';
import data from '../data.json';
import Skill from '../components/Skill/Skill';
import { Grid, withStyles, Box, Typography } from '@material-ui/core';
import { AppStyles, masonryBreakpoints } from '../AppStyles';
import Masonry from 'react-masonry-css';
import CategoryButton from '../components/CategoryButton/CategoryButton';
import Search from '../components/Search/Search';
import Logo from '../components/Logo/Logo';
import { withRouter } from 'react-router-dom';

const defaultFilter = {
  categories: new Set(),
  text: ''
};

class Home extends Component {
  state = {
    filter: defaultFilter
  }

  categoryClicked(id) {
    const newCategories = new Set(this.state.filter.categories);

    if(newCategories.has(id)) {
      newCategories.delete(id);
    } else {
      newCategories.add(id);
    }

    this.setState({filter:{
      ...this.state.filter,
      categories: newCategories
    }});
  }

  updateTextFilter(text) {
    this.setState({filter:{
      ...this.state.filter,
      text: text.toLowerCase()
    }});
  }

  getSkills() {
    const { filter } = this.state,
          urlFilter = this.props.match.params.skillId;

    if(!filter.categories.size && !filter.text && !urlFilter) return [];

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
          || s.description.toLowerCase().includes(filter.text)
          || s.tag.includes(filter.text);
      });
    }

    if(!filter.categories.size && !filter.text && urlFilter) {
      skills = skills.filter(s => {
        return s.id.includes(urlFilter);
      });
    }

    return skills;
  }

  clearFilters() {
    this.setState({
      filter: defaultFilter
    });
  }

  render() {
    const skills = this.getSkills(),
          { classes } = this.props,
          { text } = this.state.filter;

    return (
      <Grid 
        container
      >
        <Grid 
          item
          className={classes.actionsArea}
          xl={4}
          lg={5}
          sm={12}
        >
          <Logo/>
          <Box m={2}>
            <Search startingText={text} onUpdate={this.updateTextFilter.bind(this)} />
          </Box>
          <Box>
            {data.categories.map((c, i) => (
              <CategoryButton 
                key={i}
                category={c}
                categoryId={i}
                selected={this.state.filter.categories.has(i)}
                onClick={this.categoryClicked.bind(this)}
              />
            ))}
          </Box>
        </Grid>
        <Grid 
          item 
          className={classes.skillsArea} 
          xl={8}
          lg={7}
          sm={12}
        >
          {skills.length ? (
              <Masonry
                breakpointCols={masonryBreakpoints}
                className={classes.masonryContainer}
                columnClassName={classes.masonryColumn}
              >
                {skills.map(s => (
                  <Skill 
                    key={s.tag} 
                    className={classes.masonryItem}
                    skill={s}
                    onSelect={this.clearFilters.bind(this)}
                  />
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

export default withStyles(AppStyles)(withRouter(Home));
