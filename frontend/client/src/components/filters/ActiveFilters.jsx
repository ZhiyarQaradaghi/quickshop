import { Box, Chip } from "@mui/material";

function ActiveFilters({ filters, removeFilter, clearAllFilters }) {
  return (
    <Box sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
      {filters.map((filter) => (
        <Chip
          key={filter}
          label={filter}
          onDelete={() => removeFilter(filter)}
          size="small"
          color="primary"
          variant="outlined"
        />
      ))}
      <Chip
        label="Clear All"
        onClick={clearAllFilters}
        size="small"
        color="secondary"
      />
    </Box>
  );
}

export default ActiveFilters;
