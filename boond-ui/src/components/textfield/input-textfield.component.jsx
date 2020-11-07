import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  input:{
    color: "#467DE3",
    appearance:"textfield"
  }
}));
const CssTextField = withStyles({
  root: {
    '& label':{
      color:"white"
    },
    '& label.Mui-focused': {
      color: "#467DE3",
       textShadow: "0 0 5px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6)",
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: "#467DE3",
      boxShadow:"inset 0 0 5px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6)"
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: "#467DE3",
      },
      '&:hover fieldset': {
        borderColor: "#467DE3",
      },
      '&.Mui-focused fieldset': {
        borderColor: "#467DE3",
        textShadow:"0 0 150px #467DE3",
        boxShadow:"inset 0 0 5px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6)"
      },
    },
  },
})(TextField);


export default function InputTextField(props) {
  const classes = useStyles();
  const {type, label, variant, icon, width} = props;
  return (
    <div>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item style={{
            paddingBottom:"5px"
          }}>
            {icon}
          </Grid>
          <Grid item>
            <CssTextField
            className={classes.margin}
            label={label}
            type={type}
            variant={variant}
            id={`${label}-text`}
            inputProps={{

              style:{
                width:`${width}px`,
                color:`white !important`
              },
              className:classes.input
            }}
            {...props}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

InputTextField.propTypes = {
  type : PropTypes.string.isRequired,

};