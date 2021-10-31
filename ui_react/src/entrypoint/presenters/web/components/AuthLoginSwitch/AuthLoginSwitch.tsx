import useStyles from "../../pages/Principal/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import React from "react";

export function AuthLoginSwitch(props: { authMode: boolean }) {
    const classes = useStyles();
    const {authMode} = props;

    return (
        <Container className={classes.container} maxWidth="xs">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Button
                        color="secondary"
                        fullWidth
                        type="submit"
                        variant="contained"
                    >
                        {authMode ? "crear nueva cuenta" : "volver"}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}