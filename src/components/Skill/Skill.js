import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box, withStyles, Grid, IconButton } from '@material-ui/core';
import { SkillStyles } from './SkillStyles';
import LinkIcon from '@material-ui/icons/Link';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import { Link } from 'react-router-dom';

const Skill = ({ skill, categories, classes, className, onSelect, userCollections, onToggleCollection }) => {
  const categoriesString = skill.categories
                            .map(s => categories[s])
                            .join(', ');

  return (
    <Card className={className} variant="outlined">
      <CardContent>
        <Grid container>
          <Grid item className={classes.skillActions}>
            <Typography variant="h5" component="h2">
              {skill.name}
            </Typography>
          </Grid>
          <Grid 
            item 
          >
            <IconButton 
              aria-label="add to My Skills" 
              component="a" 
              className={classes.permalink}
              onClick={() => onToggleCollection ? onToggleCollection(0, skill.id) : null}
            >
              {(userCollections && userCollections.length) ?
                <RemoveCircleOutlineRoundedIcon color="secondary"/> : <AddCircleOutlineRoundedIcon/>
              }
              
            </IconButton>
            <Link 
              to={'/' + skill.id} 
              onClick={(onSelect ? () => onSelect(skill.id) : null)}
              className={classes.permalink}
            >
              <LinkIcon/>
            </Link>
          </Grid>
        </Grid>

        <Typography color="textSecondary">
          {categoriesString}
        </Typography>
        {skill.bases ? (
          <Typography color="textSecondary">
            {skill.bases.join('% / ')}% + {skill.perLevel}% a level
          </Typography>
          ) : (
            ''
        )}
        <Box className={classes.description} dangerouslySetInnerHTML={{__html:skill.description}}/>
        
      </CardContent>
    </Card>
  );
};

export default withStyles(SkillStyles)(Skill);