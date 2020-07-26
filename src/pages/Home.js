import React, { Component } from 'react';
import Skill from '../components/Skill/Skill';
import { Grid, withStyles, Box, Typography } from '@material-ui/core';
import { AppStyles, masonryBreakpoints } from '../AppStyles';
import Masonry from 'react-masonry-css';
import CategoryButton from '../components/CategoryButton/CategoryButton';
import Search from '../components/Search/Search';
import Logo from '../components/Logo/Logo';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchData, toggleCategoryFilter, updateTextFilter, setIdFilter, clearFilters } from '../actions';

class Home extends Component {
  componentDidMount() {
    const idInURL = this.props.match.params.skillId;

    if(idInURL) {
      this.props.filterById(idInURL);
    }
    
    this.props.fetchData();
  }

  render() {
    const { categories, skills, classes } = this.props;

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
          <Link 
            to="/"
            onClick={this.props.clearFilters}
          >
            <Logo/>
          </Link>
          <Box m={2}>
            <Search 
              onUpdate={this.props.onTextSearch}
              clear={this.props.clearTextSearch}
            />
          </Box>
          <Box>
            {categories.map((c, i) => (
              <CategoryButton 
                key={i}
                category={c}
                categoryId={i}
                selected={this.props.selectedCategories.has(i)}
                onClick={this.props.onToggleCategory}
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
                    categories={categories}
                    onSelect={this.props.filterById}
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

const mapStateToProps = state => {
  return {
    categories: state.data.categories,
    selectedCategories: state.filters.categories,
    clearTextSearch: state.clearTextSearch,
    skills: state.skills
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData()),
    onToggleCategory: id => dispatch(toggleCategoryFilter(id)),
    onTextSearch: text => dispatch(updateTextFilter(text)),
    filterById: id => dispatch(setIdFilter([id])),
    clearFilters: () => dispatch(clearFilters())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(AppStyles)(withRouter(Home)));
