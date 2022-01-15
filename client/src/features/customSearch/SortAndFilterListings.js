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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

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
      <Accordion sx={{background: 'transparent'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography component="h3" variant="h6">Custom search</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box component="form"
          noValidate
          onSubmit={handleOnSubmit}
          >
            <Box
              sx={{ mt: 1, my: 5, display: "flex", justifyContent: "space-evenly", alignItems: "center" }}
            >
              <Box sx={{ width: 300 }}>
                <FormControl fullWidth sx={{m:2}}>
                  <InputLabel id="sort-listings">Sort Listings by</InputLabel>
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
                <FormControl component="fieldset" sx={{m:2}}>
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
              <Box sx={{width: 400}}>
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
            
            </Box>
              <Button type="submit" variant="contained" sx={{ mt: 1, mb: 2, m:"auto", display: 'block' }}>
                Search
              </Button>
          </Box>
          
        </AccordionDetails>
      </Accordion>
    </Container>
  )
}
