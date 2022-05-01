import styled from "@emotion/styled";
import React from "react";
import MapPage from "../mappage";
import Home from "../index";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const HeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ;
  height: 40px;
  padding: 1px;
  box-sizing: border-box;
  margin: 0px;
`;
export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }} style={{}}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#598493", color: "white" }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ fontFamily: "unset" }}
          >
            Til Topps
          </Typography>
          <Typography
            variant="h6"
            component="div"
            style={{ marginRight: "60px" }}
          >
            <Link href="/">
              <a style={{ fontFamily: "unset" }}>Home</a>
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            style={{ marginRight: "60px" }}
          >
            <Link href="/mappage">
              <a style={{ fontFamily: "unset" }}>Map</a>
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            style={{ marginRight: "60px" }}
          >
            <Link href="/upload">
              <a style={{ fontFamily: "unset" }}>Upload File</a>
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            style={{ marginRight: "60px" }}
          >
            <Link href="/mountainfilter">
              <a style={{ fontFamily: "unset" }}>Filter Mountains</a>
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            style={{ marginRight: "60px" }}
          >
            <Link href="/about">
              <a style={{ fontFamily: "unset" }}>About</a>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
