import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Input from "react-bootstrap";
import "./style.scss";

export default function SelectLabels(props) {
  const data = props.item;
  const getSelectedValue = props.getSelectedValue;
  const handleSortValue = (e) => {
    let value = e.target.value;
    if (getSelectedValue != undefined) getSelectedValue(value);
  };
  return (
    <>
      <select className="listing-select" onChange={(e) => handleSortValue(e)}>
        {data.map((value, index) => (
          <option value={value}>{value}</option>
        ))}
      </select>
    </>
  );
}
