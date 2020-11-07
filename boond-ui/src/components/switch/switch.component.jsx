import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {withStyles} from '@material-ui/styles';

const GreenSwitch = withStyles({
    switchBase: {
      color: "#467DE3",
      '&$checked': {
        color: "#467DF4",
      },
      '&$checked + $track': {
        backgroundColor: "#467DF4",
      },
    },
    checked: {},
    track: {},
  })(Switch);

export default function SwitchLabels({name, checked, onChange, label, marginLeft}) {
  return (
      <FormControlLabel
        control={<GreenSwitch checked={checked} onChange={onChange} name={name}   />}
        label={label}
        style={{marginLeft:`${marginLeft}px`}}
      />

  );
}
