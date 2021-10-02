import React, {useState} from 'react';
import useStyles from "./styles";

export default function PieDePagina() {
    const classes = useStyles();

    return (
        <div className={`${classes.footerContainer}`}>
            <footer>
                <p>
                    W3Schools está optimizado para el aprendizaje, las pruebas y la formación. Los ejemplos pueden
                    simplificarse para mejorar la lectura y la comprensión básica. Los tutoriales, las referencias y los
                    ejemplos se revisan constantemente para evitar errores, pero no podemos garantizar la total
                    corrección
                    de todo el contenido. Al utilizar este sitio, acepta haber leído y aceptado nuestros términos de uso
                    ,
                    cookies y política de privacidad .
                </p>
                <p>
                    Copyright 1999-2021 de Refsnes Data. Reservados todos los derechos.
                </p>
            </footer>
        </div>
    );
}
