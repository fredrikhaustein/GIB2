import styled from "@emotion/styled";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import FileDownload from "./fileDownload";
import Link from "next/link";
import {
  circleRadiusState,
  cirlceFilterState,
  mountainNameState,
} from "../../state/atoms";

const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 700px;
  box-sizing: border-box;
  border: "groove";
`;
export const Sidebar = () => {
  const [circleRadiusRecoil, setCircleRadiusRecoil] =
    useRecoilState(circleRadiusState);
  const [circleRadiusStateRecoil, setCircleRadiusStateRecoil] =
    useRecoilState(cirlceFilterState);

  const mountainName = useRecoilValue(mountainNameState);

  const handleOnChange = (e) => {
    setCircleRadiusRecoil(e.target.value);
    console.log(circleRadiusRecoil);
  };

  const handleCheckbox = (e) => {
    const newValue = !circleRadiusStateRecoil;
    setCircleRadiusStateRecoil(newValue);
    console.log(circleRadiusStateRecoil);
  };

  return (
    <SidebarStyled style={{ border: "groove", borderColor: "black" }}>
      <Link href="/skredvarsling">
        <a
          style={{
            fontFamily: "fantasy",
            borderBottom: "Solid",
            display: "flex",
            alignSelf: "center",
            fontSize: "20px",
            textAlign: "center",
            backgroundColor: "white",
            height: "67px",
          }}
        >
          Skredvarsling for: {"\n"} {mountainName}
        </a>
      </Link>
      <br />
      <div
        style={{
          display: "grid",
          alignSelf: "center",
          width: "inherit",
        }}
      >
        <FormGroup
          style={{
            alignSelf: "center",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox defaultChecked={false} onChange={handleCheckbox} />
            }
            label="Filtrer på radius fra hus"
          />
        </FormGroup>
        <TextField
          id="outlined-basic"
          label="Radius"
          variant="outlined"
          style={{ marginTop: "5px", alignSelf: "center" }}
          onChange={handleOnChange}
        />
      </div>
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
