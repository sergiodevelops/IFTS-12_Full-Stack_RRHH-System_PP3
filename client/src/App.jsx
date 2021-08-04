import React, {useEffect, useState} from "react";
import PaginaLogin from "./entrypoint/presenters/web/pages/PaginaLogin/PaginaLogin";

function App() {
    // const [backendData, setBackendData] = useState([{}])

    /*
    useEffect(() => {
        fetch("/api")
            .then(res => res.json())
            .then(data => {
                setBackendData(data);
            })
    }, [])
    */
    return (
        <PaginaLogin></PaginaLogin>

        /*<div>
            {
                (typeof backendData.users === 'undefined')
                    ?
                    (<p>Loading...</p>)
                    :
                    (backendData.users.map((user, index) =>
                        (<p key={`user${index}`}>{user}</p>)
                    ))
            }
        </div>*/
    )
}

export default App;