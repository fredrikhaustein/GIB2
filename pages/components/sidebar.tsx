import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import React from "react";
import * as greenimage from "./image/Green_mountains_icon.png";

const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: ;
  height: 700px;
  padding: 1px;
  box-sizing: border-box;
  margin: 10px;
`;
export const Sidebar = () => {
  return (
    <SidebarStyled>
      <img src={greenimage} />
      <p style={{ marginTop: "80px" }}>Info:</p>
      <p>Galdhøpiggen er norges høyeste fjell med en høyde på 2469 moh</p>
      <br />
      <p>
        Det er 5 ulike ruter man kan gå til toppen. Under finner du
        alternativene:
      </p>
      <li>Rute 1</li>
      <TextField
        id="outlined-basic"
        label="Review"
        variant="outlined"
        style={{}}
      />
      <li>Rute 2</li>
      <li>Rute 3</li>
      <li>Rute 4</li>
      <li>Rute 5</li>
      <br />
    </SidebarStyled>
  );
};

export default Sidebar;
