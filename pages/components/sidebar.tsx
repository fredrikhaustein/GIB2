import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import React from "react";
import { RecoilRoot, RecoilState, useRecoilValue } from "recoil";
import FileDownload from "./fileDownload";
import Link from "next/link";
import { mountainNameState, latlngMountainState } from "../../state/atoms";

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
  const mountainNameSkred = useRecoilValue(mountainNameState);
  return (
    <SidebarStyled>
      <TextField
        id="outlined-basic"
        label="Review"
        variant="outlined"
        style={{ marginTop: "5px" }}
      />
      {/* <Link href="/skredvarsling">
        <a style={{ border: "solid", marginLeft: "12px", marginTop: "10px" }}>
          Skredvarsling {mountainNameSkred}
        </a>
      </Link> */}

      {/* <p>Info:</p>
      <p>Galdhøpiggen er norges høyeste fjell med en høyde på 2469 moh</p>
      <p>
        Det er 5 ulike ruter man kan gå til toppen. Under finner du
        alternativene:
      </p>
      <li>Rute 1</li>
      <li>Rute 2</li>
      <li>Rute 3</li>
      <li>Rute 4</li>
      <li>Rute 5</li> */}
    </SidebarStyled>
  );
};

export default Sidebar;
