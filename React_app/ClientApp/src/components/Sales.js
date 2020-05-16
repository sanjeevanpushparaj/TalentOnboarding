import React, { Component } from 'react';

export class Sales extends Component {

    constructor(props) {
        super(props);
        this.state = { sale: [] }
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        fetch('api/sales')
            .then(response => response.json())
            .then(data => {
                this.setState({ sale: data });
            });
    }

    render() {
        const { sale } = this.state;
        return (
            <table className='ui celled selectable table'>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Customer ID</th>
                        <th>Store ID</th>
                        <th>Date Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {sale.map(sale =>
                        <tr key={sale.salesId} >
                            <td>{sale.productId}</td>
                            <td>{sale.customerId}</td>
                            <td>{sale.storeId}</td>
                            <td>{sale.dateSold}</td>
                            <td><button>edit</button></td>
                            <td><button>delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
}