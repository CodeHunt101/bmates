import React from "react"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  TextField,
  Container,
  FormLabel,
} from "@mui/material"

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
}) => {
  return (
    <Container sx={{ mb: 2 }}>
      <Box sx={{ width: 300 }}>
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
      <Box>
        <FormLabel component="legend">Select Genders</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox name="male" onChange={handleGendersCheck} />}
            label="Male"
          />
          <FormControlLabel
            control={<Checkbox name="female" onChange={handleGendersCheck} />}
            label="Female"
          />
          <FormControlLabel
            control={<Checkbox name="other" onChange={handleGendersCheck} />}
            label="Other"
          />
        </FormGroup>
      </Box>
      <Box>
        <Autocomplete
          disablePortal
          id="country"
          options={allCountriesOptions}
          value={handleCurrentCountryValue(allCountriesOptions)}
          onChange={handleCountryChange}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Country" />}
        />
      </Box>
    </Container>
  )
}
