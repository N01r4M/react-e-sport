import React from "react"

export default class Home extends React.Component {
    render() {
        console.log(this.props);
        return (
            <>
                <div>
                    <h2>Tes derniers paris</h2>
                </div>

                <div>
                    <h2>Les ligues suivies</h2>
                </div>
                
                <div>
                    <h2></h2>
                </div>
            </>
        );
    }
}