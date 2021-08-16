import { Snackbar } from "@material-ui/core";
import { SNACKBAR_DURATION } from "../../constants/constants";
import { styles } from "../../styles/styles";

type Props = {
  children: any;
  show: boolean;
  closeHandler: () => void;
};

const CustomSnackbar = ({ show, closeHandler, children }: Props) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={show}
      autoHideDuration={SNACKBAR_DURATION}
      onClose={closeHandler}
      style={styles.snackbar}
    >
      {children}
    </Snackbar>
  );
};

export default CustomSnackbar;
