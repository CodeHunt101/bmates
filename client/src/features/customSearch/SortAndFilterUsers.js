import React from "react"
import {
  Box,
  Slider,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  TextField,
  Container,
  FormLabel,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material"

function valuetext(value) {
  return `${value} years old`
}

export const SortAndFilterUsers = ({
  handleCurrentCountryValue,
  handleCountryChange,
  allCountriesOptions,
  handleAgeChange,
  ageRange,
  handleGendersCheck,
  handleOnSubmit,
  handleSortParametersChange,
  sortParameters,
}) => {
  return (
    <Container sx={{ mb: 2 }}>
      <Accordion sx={{ background: "transparent" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography component="h3" variant="h6">
            Custom search
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            noValidate
            onSubmit={handleOnSubmit}
            sx={{ mt: 1, my: 5 }}
          >
            <Box
              sx={{
                mt: 1,
                my: 5,
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: 300 }}>
                <FormControl fullWidth sx={{ m: 2 }}>
                  <InputLabel id="demo-simple-select-label">
                    Sort Mates by
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortParameters.method}
                    label="Sort Mates by"
                    onChange={handleSortParametersChange}
                    name="method"
                  >
                    <MenuItem value={"modified"}>Modified</MenuItem>
                    <MenuItem value={"created"}>Created</MenuItem>
                    <MenuItem value={"rating"}>Rating</MenuItem>
                  </Select>
                </FormControl>
                <FormControl component="fieldset" sx={{ m: 2 }}>
                  <FormLabel component="legend">Order</FormLabel>
                  <RadioGroup
                    aria-label="order"
                    defaultValue="descending"
                    name="order"
                    value={sortParameters.order}
                    onChange={handleSortParametersChange}
                  >
                    <FormControlLabel
                      value="descending"
                      control={<Radio />}
                      label="Descending"
                    />
                    <FormControlLabel
                      value="ascending"
                      control={<Radio />}
                      label="Ascending"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box sx={{ width: 300 }}>
                <Box sx={{ m: 2 }}>
                  <Typography
                    component="h2"
                    variant="subtitle2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                  >
                    Age range
                  </Typography>
                  <Slider
                    getAriaLabel={() => "Minimum distance"}
                    value={ageRange}
                    onChange={handleAgeChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={18}
                    disableSwap
                  />
                </Box>
                <Box sx={{ m: 2 }}>
                  <FormLabel component="legend">Select Genders</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox name="male" onChange={handleGendersCheck} />
                      }
                      label="Male"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox name="female" onChange={handleGendersCheck} />
                      }
                      label="Female"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox name="other" onChange={handleGendersCheck} />
                      }
                      label="Other"
                    />
                  </FormGroup>
                </Box>
                <Box sx={{ m: 2 }}>
                  <Autocomplete
                    disablePortal
                    id="country"
                    options={allCountriesOptions}
                    value={handleCurrentCountryValue(allCountriesOptions)}
                    onChange={handleCountryChange}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField {...params} label="Country" />
                    )}
                  />
                </Box>
              </Box>
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 1, mb: 2, m: "auto", display: "block" }}
            >
              Search
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Container>
  )
}
