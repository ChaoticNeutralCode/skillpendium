export const AppStyles = (theme) => ({
  actionsArea: {
    textAlign: 'center'
  },
  logoText: {
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    hyphens: 'auto'
  },
  welcomeText: {
    margin: '2em',
    textAlign: 'center'
  },
  skillsArea: {
    overflow: 'auto',
    [theme.breakpoints.up('lg')]: {
      maxHeight: '100vh' 
    }
  },
  masonryContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: 'auto',
    margin: '0.5em',
  },
  masonryColumn: {
    padding: '0 0.5em'
  },
  masonryItem: {
    marginBottom: '1em'
  }
});

export const masonryBreakpoints = {
  default: 3,
  1500: 2,
  900: 1
};