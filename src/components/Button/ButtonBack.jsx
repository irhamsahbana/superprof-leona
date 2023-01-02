import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

export default function ButtonBack() {
  const navigate = useNavigate();

  return (
    <>
      <IconButton
        onClick={() => navigate(-1)}
        sx={{ pb: 1, pl: 0, pt: 0, pr: 0 }}
      >
        <ArrowBackIcon />
      </IconButton>
    </>
  );
}
