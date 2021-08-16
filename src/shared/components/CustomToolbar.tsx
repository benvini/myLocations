import { ReactNode, useCallback } from "react";
import styled from "styled-components";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { Language } from "@material-ui/icons";
import i18n from "i18next";

import { setAppLanguage } from "../utils/localstorage";
import { styles } from "../../styles/styles";

type Props = {
  children: ReactNode;
};

const StyledToolBar = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const CustomToolbar = ({ children }: Props) => {
  const onChangeAppLanguage = useCallback(() => {
    const currentLang = i18n.language;

    if (currentLang === "en") {
      i18n.changeLanguage("he");
      setAppLanguage("he");
    } else {
      i18n.changeLanguage("en");
      setAppLanguage("en");
    }
  }, []);
  return (
    <StyledToolBar>
      <AppBar position="static">
        <Toolbar>
          {children ? children : null}
          <IconButton
            edge="end"
            color="inherit"
            style={styles.iconLanguage}
            onClick={onChangeAppLanguage}
          >
            <Language />
          </IconButton>
        </Toolbar>
      </AppBar>
    </StyledToolBar>
  );
};

export default CustomToolbar;
