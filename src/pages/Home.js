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
import { fetchData, toggleCategoryFilter, updateTextFilter, setIdFilter, clearFilters, toggleSkillInUserCollection } from '../actions';

class Home extends Component {
  state = {
    selectedCollection: null
  }

  componentDidMount() {
    const idInURL = this.props.match.params.skillId;

    if(idInURL) {
      this.props.filterById(idInURL);
    }
    
    this.props.fetchData();
  }

  onSelectCollection(collectionId, ids) {
    if(this.state.selectedCollection === collectionId) {
      this.props.filterByCollection([]);
      this.setState({ selectedCollection:null });
    } else {
      this.props.filterByCollection([...ids]);
      this.setState({ selectedCollection:collectionId });
    }
  }

  render() {
    const { categories, skills, classes, userCollections } = this.props;

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
            {userCollections.map((c, i) => (
              <CategoryButton 
                key={i}
                category={c.name}
                categoryId={i}
                selected={this.state.selectedCollection === i}
                onClick={() => this.onSelectCollection(i, c.ids)}
              />
            ))

            }
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
                    userCollections={
                      userCollections.reduce((skillCollections, c, i) => {
                        if(c.ids.has(s.id)) skillCollections.push(i);
                        return skillCollections;
                      }, [])
                    }
                    onToggleCollection={this.props.toggleUserSkill}
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
    skills: state.skills,
    userCollections: state.userCollections
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData()),
    onToggleCategory: id => dispatch(toggleCategoryFilter(id)),
    onTextSearch: text => dispatch(updateTextFilter(text)),
    filterById: id => dispatch(setIdFilter([id])),
    filterByCollection: ids => dispatch(setIdFilter(ids)),
    clearFilters: () => dispatch(clearFilters()),
    toggleUserSkill: (collectionId, skillId) => dispatch(toggleSkillInUserCollection(collectionId, skillId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(AppStyles)(withRouter(Home)));
