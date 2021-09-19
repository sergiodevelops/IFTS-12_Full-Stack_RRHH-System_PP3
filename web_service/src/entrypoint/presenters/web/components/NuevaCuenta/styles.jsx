import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    titulo:{
        textAlign: "center",
    },
    formControl: {
        minWidth: '100%',
        '& .MuiAutocomplete-root':{
            minWidth: '100%',
        },
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

}));
