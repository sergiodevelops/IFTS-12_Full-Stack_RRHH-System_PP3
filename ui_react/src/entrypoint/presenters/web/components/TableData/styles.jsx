import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    root:{},
    queryTable:{
        textAlign: 'center',
    },
    tableHeaderRow:{
        fontWeight: 'bold',
    },
    tableBodyRow:{
        cursor:'pointer',
        '&:hover':{
            outline: '-webkit-focus-ring-color auto 1px',
        },
    },
    arrowChangeQueryPage:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#2a77d20d',
        cursor: 'pointer',
    },
    containerMsgQueryResults:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    msgQueryResults:{
        color: '#ff000073',
    },
}));
