import styled from "@emotion/styled";
import React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "slategrey" }}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            The mountain guide Norway
          </Typography>
          <Typography
            variant="h6"
            component="div"
            style={{ marginRight: "60px" }}
          >
            <Link href="/">
              <a>Home</a>
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            style={{ marginRight: "60px" }}
          >
            <Link href="/mappage">
              <a>Map</a>
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            style={{ marginRight: "60px" }}
          >
            <Link href="/about">
              <a>About</a>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
