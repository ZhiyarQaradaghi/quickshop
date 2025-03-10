import { Drawer, IconButton, Grid } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterSidebar from "./FilterSidebar";

function MobileFilterDrawer({ open, toggleDrawer, filterProps }) {
  return (
    <>
      <Grid item xs={2}>
        <IconButton
          onClick={toggleDrawer(true)}
          color="primary"
          sx={{ border: 1, borderColor: "divider", borderRadius: 1 }}
        >
          <FilterListIcon />
        </IconButton>
      </Grid>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <FilterSidebar {...filterProps} />
      </Drawer>
    </>
  );
}

export default MobileFilterDrawer;
