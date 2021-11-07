import React, { useEffect } from "react";
import Principal from "./entrypoint/presenters/web/pages/Principal/Principal";
import WebFont from 'webfontloader';

function App() {
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Nunito Sans', 'sans-serif']
            }
        });
    }, []);

    return <Principal/>
}

export default App;