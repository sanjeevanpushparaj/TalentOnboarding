import React, { Component } from 'react';
import * as $ from 'jquery';
import { Button } from 'semantic-ui-react';

import CustomerCreate from './CustomerCreate';
import CustomerDelete from './CustomerDelete';
import CustomerUpdate from './CustomerUpdate';



export class CustomerTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			CustomerList: [],
			Success: { Data: '' },

			showCreateModel: false,

			showDeleteModal: false,
			deleteId: 0,

			CustomerId: '',
			CustomerName: '',
			CustomerAddress: '',

			showUpdateModel: false,
			updateId: 0,

			Success: [],
			errors: {}
		};

		this.loadData = this.loadData.bind(this);

		this.handleDelete = this.handleDelete.bind(this);
		this.closeDeleteModal = this.closeDeleteModal.bind(this);

		this.showCreateModel = this.showCreateModel.bind(this);
		this.closeCreateModel = this.closeCreateModel.bind(this);
		this.onChange = this.onChange.bind(this);

		this.showUpdateModel = this.showUpdateModel.bind(this);
		this.closeUpdateModel = this.closeUpdateModel.bind(this);
		this.onUpdateSubmit = this.onUpdateSubmit.bind(this);

	}

	componentDidMount() {
		this.loadData();
	}

	//Get products
	loadData() {
		$.ajax({
			url: "customer/getcustomer",
			state:"GET",
			success: function (data) {
				this.setState({ CustomerList: data })
			}.bind(this),
		});
	}

	//Delete    
	handleDelete(id) {

		this.setState({ showDeleteModal: true });
		this.setState({ deleteId: id });
	}

	closeDeleteModal() {
		this.setState({ showDeleteModal: false });
		window.location.reload()
	}

	//Create
	showCreateModel() {
		this.setState({ showCreateModel: true });
	}

	closeCreateModel() {
		this.setState({ showCreateModel: false });
		window.location.reload()
	}

	onChange(e) {

		this.setState({ [e.target.name]: e.target.value });
	}

	//Update
	showUpdateModel(id) {
		this.setState({ showUpdateModel: true });
		this.setState({ updateId: id });
		$.ajax({
			url: "Customer/getacustomer",
			data: { 'id': id },
			state:"GET",
			success: function (data) {
				//var obj = JSON.parse(data)
				//this.setState({ CustomerId: obj.cusId, CustomerName: obj.name, CustomerAddress: obj.address })
				this.setState({ CustomerId: data.cusId, CustomerName: data.name, CustomerAddress: data.address })
			}.bind(this)
		});


	}

	closeUpdateModel() {
		this.setState({ showUpdateModel: false });
		window.location.reload()
	}

	validateForm() {

		console.log(this.state.CustomerName, this.state.CustomerAddress);

		let errors = {};

		let formIsValid = true;
		if (!this.state.CustomerName) {
			formIsValid = false;
			errors['CustomerName'] = '*Please enter the Customer Name.';
		}

		if (typeof this.state.CustomerName !== "undefined") {
			if (!this.state.CustomerName.match(/^[a-zA-Z ]*$/)) {
				formIsValid = false;
				errors["CustomerName"] = "*Please enter alphabet characters only.";
			}
		}

		if (!this.state.CustomerAddress) {
			formIsValid = false;
			errors['CustomerAddress'] = '*Please enter the Customer Address'
		}

		this.setState({
			errors: errors
		});
		return formIsValid
	}

	onUpdateSubmit() {
		if (this.validateForm()) {

			let data = { 'cusId': this.state.CustomerId, 'name': this.state.CustomerName, 'address': this.state.CustomerAddress };
			
			$.ajax({
				url: "customer/putCustomer",
				data: data,
				state: "POST",
				success: function (data) {
					this.setState({ Success: data })
					window.location.reload()
				}.bind(this)
			});

		}
	}

	render() {
		//console.log(this.state.ProductId, this.state.ProductName, this.state.ProductPrice);

		let list = this.state.CustomerList;
		let tableData = null;
		if (list != "") {
			tableData = list.map(Customer =>
				<tr key={Customer.cusId}>
					<td className="four wide">{Customer.name}</td>
					<td className="four wide">{Customer.address}</td>

					<td className="four wide">
						<Button className="ui yellow button" onClick={this.showUpdateModel.bind(this, Customer.cusId)}><i className="edit icon"></i>EDIT</Button>
					</td>

					<td className="four wide">
						<Button className="ui red button" onClick={this.handleDelete.bind(this, Customer.cusId)}><i className="trash icon"></i>DELETE</Button>
					</td>

				</tr>

			)

		}
		return (
			<React.Fragment>
				<br />
				<div>
					<div><Button primary onClick={this.showCreateModel}>New Customer</Button></div>
					<CustomerCreate onChange={this.onChange} onClose={this.closeCreateModel}
						onCreateSubmit={this.onCreateSubmit} showCreateModel={this.state.showCreateModel} />

				</div>
				<br />
				<br />
				<br />
				<div>
					<CustomerDelete delete={this.state.deleteId} onClose={this.closeDeleteModal}
						onDeleteSubmit={this.onDeleteSubmit} showDeleteModal={this.state.showDeleteModal} />

					<CustomerUpdate onChange={this.onChange} update={this.state.updateId}
						onClose={this.closeUpdateModel} onUpdateSubmit={this.onUpdateSubmit}
						showUpdateModel={this.state.showUpdateModel} Id={this.state.CustomerId}
						Name={this.state.CustomerName} Address={this.state.CustomerAddress}
						errors={this.state.errors} />

					<table className="ui striped table">
						<thead>
							<tr>
								<th className="four wide">Name</th>
								<th className="four wide">Address</th>
								<th className="four wide">Actions</th>
								<th className="four wide">Actions</th>
							</tr>
						</thead>
						<tbody>
							{tableData}
						</tbody>
					</table>
				</div>
			</React.Fragment>
		)
	}

}