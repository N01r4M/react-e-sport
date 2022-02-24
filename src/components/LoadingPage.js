import React from "react"
import { TailSpin } from "react-loader-spinner";

export default class LoadingPage extends React.Component {
    render() {
        return (
            <div className="loader-container">
                <div className="loader-child">
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