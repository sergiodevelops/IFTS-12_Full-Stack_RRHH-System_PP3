import { makeStyles } from '@material-ui/core/styles';
import backgroundImage from "../../assets/images/select.jpg";

export default makeStyles(theme => ({
    root:{
        // backgroundImage: `url(${backgroundImage})`,
        minHeight: "1000px",
        // backgroundRepeat: "no-repeat, repeat",
        // backgroundSize: "cover",
},
    content:{
        // minHeight: "1000px",
        // width: '100%',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        padding: theme.spacing(3),
    },
}));
