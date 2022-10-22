import { styled } from '@mui/material/styles';
import {
    Button,
    ButtonProps
} from '@mui/material';

export const HeaderButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
    paddingInline: "15px",
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

export const ActionButton1 = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    paddingInline: "10px",
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));


export const ActionButton2 = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
    paddingInline: "10px",
    borderRadius: "30px",
    padding: "10px",
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));