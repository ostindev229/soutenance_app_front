import React from "react";
import {
  TextField,
  IconButton,
  Button,
  Box,
  Grid,
  Paper,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { BiTimeFive } from "react-icons/bi";
import { searchJobByValue } from "../actions/jobs";

import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";

function Search(prop) {
  const [category, setCategory] = React.useState("");
  const [typeTemps, setTypeTemps] = React.useState("");
  const [location, setLocation] = React.useState("");

  const handleJobTypeChange = (event) => {
    setTypeTemps(event.target.value);
  };

  const handleClear = (setter) => () => {
    setter("");
  };

  const handleSearch = async () => {
    const posts = await searchJobByValue(category, typeTemps, location);
    prop.setJobs(posts);
  };

  return (
    <Box
      sx={{
        padding: { xs: "1rem", sm: "2rem" },
        backgroundColor: "grey.200",
        borderRadius: "10px",
      }}
    >
      <Paper
        component="form"
        sx={{
          padding: { xs: "1rem", sm: "2rem" },
          boxShadow: 3,
          borderRadius: "8px",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <AiOutlineSearch
                style={{
                  fontSize: "24px",
                  marginRight: "8px",
                  color: "#a5a6a6",
                }}
              />
              <TextField
                fullWidth
                variant="standard"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Search Job By Category..."
                InputProps={{
                  endAdornment: category && (
                    <IconButton
                      onClick={handleClear(setCategory)}
                      sx={{ position: "absolute", right: 0 }}
                    >
                      <AiOutlineCloseCircle
                        style={{ fontSize: "24px", color: "#a5a6a6" }}
                      />
                    </IconButton>
                  ),
                  disableUnderline: true,
                  sx: { fontSize: "1rem", color: "blue" },
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                position: "relative",
              }}
            >
              <BiTimeFive
                style={{
                  fontSize: "24px",
                  marginRight: "8px",
                  color: "#a5a6a6",
                }}
              />
              <FormControl fullWidth variant="standard">
                <Select
                  value={typeTemps}
                  onChange={handleJobTypeChange}
                  displayEmpty
                  disableUnderline
                  sx={{
                    fontSize: "1rem",
                    color: typeTemps ? "blue" : "grey",
                    ".MuiSelect-icon": { fontSize: "1.5rem" },
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    "&:before": { borderBottom: 0 },
                    "&:after": { borderBottom: 0 },
                    ".MuiSelect-select:focus": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    <span style={{ color: "rgba(0, 0, 255, 0.4)" }}>
                      Search By Job Type...
                    </span>
                  </MenuItem>
                  <MenuItem value="full-time">full-time</MenuItem>
                  <MenuItem value="part-time">part-time</MenuItem>
                </Select>
              </FormControl>
              {typeTemps && (
                <IconButton
                  onClick={handleClear(setTypeTemps)}
                  sx={{ position: "absolute", right: 0 }}
                >
                  <AiOutlineCloseCircle
                    style={{ fontSize: "24px", color: "#a5a6a6" }}
                  />
                </IconButton>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <CiLocationOn
                style={{
                  fontSize: "24px",
                  marginRight: "8px",
                  color: "#a5a6a6",
                }}
              />
              <TextField
                fullWidth
                variant="standard"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search By Location..."
                InputProps={{
                  endAdornment: location && (
                    <IconButton
                      onClick={handleClear(setLocation)}
                      sx={{ position: "absolute", right: 0 }}
                    >
                      <AiOutlineCloseCircle
                        style={{ fontSize: "24px", color: "#a5a6a6" }}
                      />
                    </IconButton>
                  ),
                  disableUnderline: true,
                  sx: { fontSize: "1rem", color: "blue" },
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={
                <AiOutlineSearch
                  style={{ color: "white", fontSize: "1.5rem" }}
                />
              }
              sx={{
                padding: { xs: "10px 20px", sm: "15px 30px" },
                borderRadius: "10px",
                backgroundColor: "blue",
                "&:hover": {
                  backgroundColor: "blue.300",
                },
                fontSize: "1rem",
                width: { xs: "100%", sm: "80%" },
              }}
              onClick={() => handleSearch()}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Search;
