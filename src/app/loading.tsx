import CircurlarProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading() {
  return (
    <Box sx={{ display: "flex", padding: "1rem" }}>
      <CircurlarProgress sx={{ color: "#db2777" }} />
    </Box>
  );
}
