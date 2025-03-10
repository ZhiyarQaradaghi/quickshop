import { Paper, Typography, Button } from "@mui/material";

function EmptyState({ title, description, actionText, onAction, icon: Icon }) {
  return (
    <Paper sx={{ p: 3, textAlign: "center" }}>
      {Icon && <Icon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />}
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {description}
      </Typography>
      {actionText && (
        <Button variant="outlined" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </Paper>
  );
}

export default EmptyState;
