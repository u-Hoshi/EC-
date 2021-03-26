import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  formControl: {
    marginBottom: 16,
    minWidth: 128,
    width: '100%',
  },
});

const SelectBox = (props) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={props.value}
        required={props.required}
        onChange={(event) => props.select(event.target.value)}
      >
        {props.options.map((option) => {
          return (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
