import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, InputAdornment, Box, Typography } from "@mui/material";

const KontenEditor = ({ content_a, setcontent_a }) => {
  return (
    <Box className="w-full">
      <label className="font_weight600 textsize12 mb-2 d-block ml-5">
        Masukkan Konten
      </label>

      <Box
        className="bg-blue rad15"
        sx={{
          position: "relative",
          border: "1px solid #ccc",
          "&:hover": { borderColor: "#999" },
          "& .ql-container": {
            borderRadius: "0 0 15px 15px",
            minHeight: "150px",
          },
          "& .ql-toolbar": {
            borderRadius: "15px 15px 0 0",
          },
        }}
      >
        <ReactQuill
          theme="snow"
          value={content_a}
          onChange={setcontent_a}
          placeholder="Tulis konten di sini..."
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
          }}
        />

        {/* Tombol Clear */}
        {content_a && (
          <InputAdornment
            position="end"
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <IconButton onClick={() => setcontent_a("")} size="small">
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        )}
      </Box>
    </Box>
  );
};

export default KontenEditor;
