import React from "react"
import Box from "@mui/material/Box"
import {
  FormControlLabel,
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
} from "@mui/material"

export const SortAndFilterListings = ({
  allTopicOptions,
  handleTopicsChange,
  topics,
  handleOnSubmit,
  handleSortParametersChange,
  sortParameters,
}) => {
  return (
    <Container sx={{ mb: 2 }}>
      <Box
        component="form"
        noValidate
        onSubmit={handleOnSubmit}
        sx={{ mt: 1, my: 5 }}
      >
        <Box sx={{ width: 300 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort Listings by</InputLabel>
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
          <FormControl component="fieldset">
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
        <Box>
          <Autocomplete
            id="country"
            multiple
            options={allTopicOptions}
            value={topics}
            onChange={handleTopicsChange}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Topic" />}
          />
        </Box>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Search
        </Button>
      </Box>
    </Container>
  )
}
