import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Slider from '@material-ui/core/Slider';

const styles = theme => ({
  root: {

  },
});

class StreakSlider extends React.Component {
  render() {
    const { classes } = this.props;
    const marks = [
      {
        value: 0,
        label: '0',
      },
      {
        value: 1,
        label: '1',
      },
      {
        value: 2,
        label: '2',
      },
      {
        value: 3,
        label: '3',
      },
      {
        value: 4,
        label: '4',
      },
      {
        value: 5,
        label: '5',
      }
    ];

    return (
      <Slider
        className={classes.root}
        aria-label="Always visible"
        defaultValue={0}
        step={1}
        marks={marks}
        valueLabelDisplay="on"
      />);
  }
}

StreakSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StreakSlider);
