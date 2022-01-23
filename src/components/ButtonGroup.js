import {styled} from "@material-ui/styles";

export const CHANGE_BUTTONS_COLOR = {
    "&.MuiButton-root": {
        border: "2px black solid"
    },
    "&.MuiButton-text": {
        color: "grey"
    },
    "&.MuiButton-contained": {
        color: "yellow"
    },
    "&.MuiButton-outlined": {
        color: "brown"
    }
}
export const ButtonGroup = styled('div')(({theme}) => ({
    padding: theme.spacing(2),
    flexDirection: "row",
    "& > *": {
        backgroundColor: "#009682",
        color: 'black',
    },
    "& > *:not(:last-child)": {
        marginRight: theme.spacing(20),

    },

}));