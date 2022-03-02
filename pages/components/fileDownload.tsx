import { Button } from "@mui/material";
import React from "react";

const fileDownload = () => {
  return (
    <div>
      <Button variant="contained" component="label">
        Last inn GPX-fil
        <input type="file" hidden />
      </Button>
    </div>
  );
};

export default fileDownload();
