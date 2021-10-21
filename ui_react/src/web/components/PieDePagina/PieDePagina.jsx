import React, {useState} from 'react';
import useStyles from "./styles";

export default function PieDePagina() {
    const classes = useStyles();

    return (
        <div className={`${classes.footerContainer}`}>
            <footer>
                <p>
                    Cómo lo hacemos
                    Diseñamos el mejor proceso de selección de personal para nuestros clientes eligiendo de entre todos
                    los candidatos los mejores profesionales que se adapten a cada puesto de trabajo.
                    Aplicamos las últimas tendencias de reclutamiento en cada proceso realizando un análisis directo y
                    parametrizado a través de los principales portales de empleo y metabuscadores tanto si son
                    candidatos en búsqueda activa de empleo como si no.
                    Para ello, analizamos las necesidades de cada puesto definiendo una estrategia, realizamos el
                    reclutamiento, evaluamos a los candidatos y realizamos procesos de selección digitalizados por
                    nuestros mejores expertos en psicología. Finalmente elaboramos unos informes reflejando los
                    resultados obtenidos y analizándolos para poder presentar las candidaturas al cliente.
                    Nuestro objetivo en la selección de personal es encontrar profesionales de éxito que ayuden a las
                    empresas a avanzar y a crecer.
                    Estamos tan seguros de nuestro método que nuestros servicios cuentan con una garantía de 6 meses en
                    puestos técnicos y mandos intermedios, 9 meses en puestos directivos y 1 año en perfiles Ejecutivos.
                    .
                </p>
                <p>
                    Copyright 1999-2021 de Refsnes Data. Reservados todos los derechos.
                </p>
            </footer>
        </div>
    );
}
