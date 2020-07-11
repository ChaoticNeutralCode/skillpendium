import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { categories } from '../../data.json';
import { Box, withStyles } from '@material-ui/core';
import { SkillStyles } from './SkillStyles';

const Skill = ({ skill, classes, className }) => {
  const categoriesString = skill.categories
                            .map(s => categories[s])
                            .join(', ');

  return (
    <Card className={className} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {skill.name}
        </Typography>
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