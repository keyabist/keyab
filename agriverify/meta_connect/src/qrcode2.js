import React, { Component } from 'react';
import QRCode from 'react-qr-code';

class Data extends Component {
    state={
        value:"qrcode dynamic scanner"
    }
    render() {
        return (
            <div>
                <h1>
                    QR Code
                </h1><br></br>
                <QRCode
                id='farmers details and certification'
                value={this.state.value}
                />
            </div>
        );
    }
}

export default Data