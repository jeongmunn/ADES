import * as React from 'react';
import Slider from '@mui/material/Slider';

export default function StreakSlider() {
  return <Slider
  aria-label="Streaks"
  defaultValue={10}
  step={10}
  valueLabelDisplay="auto"
  marks={30}
/>;
}