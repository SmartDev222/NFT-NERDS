import React, { memo } from "react";
import { Box, Tooltip, Typography, Divider } from "@mui/material";

//icons
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import "./style.scss";

const Property = (props) => {
  const trait = props.traitData;
  const collection = props.collection;
  return (
    <Box>
      <Box className="css-1ofqig9">
        <Box className="css-ej6s4n">
          <Typography variant="overline" className="css-7l96kh">
            {trait.trait_type}
          </Typography>
          <Typography variant="overline" className="css-m0afzo">
            {trait.trait_count / 100 + "%"}
          </Typography>
        </Box>
        <Box className="css-1t3oi0e">
          <Box>
            <Box className="css-70qvj9">
              <FilterAltOutlinedIcon className="filter-icon" />
              <Typography variant="body2" className="css-bt71rd">
                <span>{trait.value}</span>
              </Typography>
            </Box>
          </Box>
          <Box
            className="css-qe4sff"
            aria-label="Floor price for this trait is Ξ0.08"
          >
            <Tooltip
              title="Floor price for this trait is Ξ0.08"
              enterDelay={200}
              leaveDelay={70}
            >
              <Typography variant="body2" className="css-bt71rd">
                <span className="css-1baulvz">
                  {"Ξ" + collection.stats.floor_price}
                </span>
              </Typography>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      <Divider className="css-gf37ch" />
    </Box>
  );
};

export default memo(Property);
