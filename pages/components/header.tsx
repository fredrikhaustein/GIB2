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
    <Box
      sx={{ flexGrow: 1 }}
      style={{ textDecorationLine: "underline", textDecorationColor: "white" }}
    >
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "slategrey" }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ fontFamily: "fantasy" }}
          >
            Til Topps
          </Typography>
          <Typography
            variant="h6"
            component="div"
            style={{ marginRight: "60px" }}
          >
            <Link href="/">
              <a style={{ fontFamily: "fantasy" }}>Home</a>
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            style={{ marginRight: "60px" }}
          >
            <Link href="/mappage">
              <a style={{ fontFamily: "fantasy" }}>Map</a>
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            style={{ marginRight: "60px" }}
          >
            <Link href="/mountainfilter">
              <a style={{ fontFamily: "fantasy" }}>Filter Mountains</a>
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            style={{ marginRight: "60px" }}
          >
            <Link href="/about">
              <a style={{ fontFamily: "fantasy" }}>About</a>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    // <HeaderStyled>
    //   <ul>
    //     <li>
    //       <Link href="/">
    //         <a>Home</a>
    //       </Link>
    //     </li>
    //     <li>
    //       <Link href="/mappage">
    //         <a>Map Us</a>
    //       </Link>
    //     </li>
    //   </ul>
    // </HeaderStyled>
  );
};

export default Header;
