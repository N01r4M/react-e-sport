import React from "react"
import { TailSpin } from "react-loader-spinner";

export default class LoadingPage extends React.Component {
    render() {
        return (
            <div style={{ position: "relative", height: "100vh", width: '100vw' }}>
                <div style={{ position: "absolute", top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <TailSpin
                        height="100"
                        width="100"
                        color="grey"
                        ariaLabel="Chargement ..."
                    />
                    <p>Chargement ...</p>
                </div>
            </div>
        );
    }
}