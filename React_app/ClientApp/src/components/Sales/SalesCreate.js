import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';
import * as $ from 'jquery';

export default class SalesCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Success: { Data: '' },

			ProductId: '',
			StoreId: '',
			CustomerId: '',
			DateSold: '',

			CustomerDropdownList: [],
			ProductDropdownList: [],
			StoresDropdownList: [],

			Sucess: [],
			errors: {}
		};

		this.onCreateSubmit = this.onCreateSubmit.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onChange = this.onChange.bind(this);

		this.CustomersDropdown = this.CustomersDropdown.bind(this);
		this.ProductsDropdown = this.ProductsDropdown.bind(this);
		this.StoresDropdown = this.StoresDropdown.bind(this);
	}

	componentDidMount() {
		this.CustomersDropdown();
		this.ProductsDropdown();
		this.StoresDropdown();
	}

	validateForm() {

		let errors = {}

		let formIsValid = true
		if (!this.state.CustomerId) {
			formIsValid = false;
			errors['CustomerId'] = '*Please select the Customer.';
		}

		if (!this.state.ProductId) {
			formIsValid = false;
			errors['ProductId'] = '*Please select the Product.'
		}

		if (!this.state.StoreId) {
			formIsValid = false;
			errors['StoreId'] = '*Please select the Store.'
		}

		if (!this.state.DateSold) {
			formIsValid = false;
			errors['DateSold'] = '*Please provide the sale date.'
		}

		this.setState({
			errors: errors
		});
		return formIsValid
	}

	onCreateSubmit(e) {
		e.preventDefault();
		if (this.validateForm()) {
			let data = {
				'customerId': this.state.CustomerId,
				'productId': this.state.ProductId,
				'storeId': this.state.StoreId,
				'dateSold': this.state.DateSold
			};

			$.ajax({
				url: "/Sales/postSales",
				data: data,
				state:"POST",
				success: function (data) {
					this.setState({ Success: data })
					window.location.reload()
				}.bind(this)
			});
		}
	}

	onClose() {
		this.setState({ showDeleteModal: false });
		window.location.reload()
	}

	onChange(e) {
		console.log(e.target.value)
		this.setState({ [e.target.name]: e.target.value });
	}

	CustomersDropdown() {
		$.ajax({
			url: "/Sales/GetCustomers",
			state:"GET",
			success: function (data) {
				this.setState({ CustomerDropdownList: data })
			}.bind(this)
		});
	}

	ProductsDropdown() {
		$.ajax({
			url: "/Sales/GetProducts",
			state:"GET",
			success: function (data) {
				this.setState({ ProductDropdownList: data })
			}.bind(this)
		});
	}

	StoresDropdown() {
		$.ajax({
			url: "/Sales/GetStores",
			state:"GET",
			success: function (data) {
				this.setState({ StoresDropdownList: data })
			}.bind(this)
		});
	}

	render() {
		let CustomerDataList = [{ customerId: '', customerName: 'Select Customer' }].concat(this.state.CustomerDropdownList);
		let ProductDataList = [{ productId: '', productName: 'Select Product' }].concat(this.state.ProductDropdownList);
		let StoreDataList = [{ storeId: '', storeName: 'Select Store' }].concat(this.state.StoresDropdownList);

		return (
			<React.Fragment>
				<Modal open={this.props.showCreateModel} onClose={this.props.onClose} size='small'>
					<Modal.Header> Create Sales </Modal.Header>
					<Modal.Content>
						<Form>
							<Form.Field>
								<label>Customer Name</label>
								<select name="CustomerId" onChange={this.onChange} value={this.state.CustomerId}>
									{CustomerDataList.map((Cust) => <option key={Cust.cusId} value={Cust.cusId}>{Cust.customerName}</option>)}
								</select>
								<div style={{ color: 'red' }}>
									{this.state.errors.CustomerId}
								</div>
							</Form.Field>
							<Form.Field>
								<label>Product Name</label>
								<select name="ProductId" onChange={this.onChange} value={this.state.ProductId}>
									{ProductDataList.map((Prod) => <option key={Prod.productId} value={Prod.productId}>{Prod.productName}</option>)}
								</select>
								<div style={{ color: 'red' }}>
									{this.state.errors.ProductId}
								</div>
							</Form.Field>
							<Form.Field>
								<label>Store Name</label>
								<select name="StoreId" onChange={this.onChange} value={this.state.StoreId}>
									{StoreDataList.map((Str) => <option key={Str.storeId} value={Str.storeId}>{Str.storeName}</option>)}
								</select>
								<div style={{ color: 'red' }}>
									{this.state.errors.StoreId}
								</div>
							</Form.Field>
							<Form.Field>
								<label>Date Sold</label>
								<input type="text" name="DateSold" placeholder='YYYY/MM/DD' onChange={this.onChange} />
								<div style={{ color: 'red' }}>
									{this.state.errors.DateSold}
								</div>
							</Form.Field>
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button onClick={this.props.onClose} secondary >Cancel
                        </Button>
						<Button onClick={this.onCreateSubmit} className="ui green button">Create
                        <i className="check icon"></i>
						</Button>
					</Modal.Actions>
				</Modal>
			</React.Fragment>
		)
	}
}