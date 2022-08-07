import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function RowRadioButtonsGroup(props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.handleChange.onRadioButtonClick((event.target as HTMLInputElement).value);
  };
  
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue= {props.defaultValue}
        onChange={handleChange}
      >
        <FormControlLabel value="0" control={<Radio />} label="Last Hour" />
        <FormControlLabel value="1" control={<Radio />} label="Last Day" />
        <FormControlLabel value="2" control={<Radio />} label="Last Month" />
        <FormControlLabel value="3" control={<Radio />} label="Last Year" />
        <FormControlLabel value="4" control={<Radio />} label="Last Decade" />
      </RadioGroup>
    </FormControl>
  );
}
