import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'semantic-ui-react';
import StoreCreate from './StoresCreate.js';
import StoreDelete from './StoresDelete.js';
import StoreUpdate from './StoresUpdate.js';
import * as $ from 'jquery';

//const app = document.getElementById('store');
//ReactDOM.render(<div>Hello World!</div>, app);

export class StoresTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			StoreList: [],
			Success: { Data: '' },

			showCreateModel: false,

			showDeleteModal: false,
			deleteId: 0,

			StoreId: '',
			StoreName: '',
			StoreAddress: '',

			showUpdateModel: false,
			updateId: 0,

			Success: [],
			errors: {}
		};

		this.loadData = this.loadData.bind(this);

		this.showCreateModel = this.showCreateModel.bind(this);
		this.closeCreateModel = this.closeCreateModel.bind(this);
		this.onChange = this.onChange.bind(this);

		this.handleDelete = this.handleDelete.bind(this);
		this.closeDeleteModal = this.closeDeleteModal.bind(this);

		this.showUpdateModel = this.showUpdateModel.bind(this);
		this.closeUpdateModel = this.closeUpdateModel.bind(this);
		this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
	}

	componentDidMount() {
		this.loadData();
	}

	//Get stores
	loadData() {
		$.ajax({
			url: "/Store/GetStore",
			state: "GET",
			success: function (data) {
				this.setState({ StoreList: data })
			}.bind(this),
		});
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

	Delete
	handleDelete(id) {

		this.setState({ showDeleteModal: true });
		this.setState({ deleteId: id });
	}

	closeDeleteModal() {
		this.setState({ showDeleteModal: false });
		window.location.reload()
	}

	//Update
	showUpdateModel(id) {
		this.setState({ showUpdateModel: true });
		this.setState({ updateId: id });

		$.ajax({
			url: "/Store/GetaStore",
			data: { 'id': id },
			state: "GET",
			success: function (data) {
				//var obj = JSON.parse(data);
				this.setState({ StoreId: data.storeId, StoreName: data.storeName, StoreAddress: data.storeAddress });
			}.bind(this)
		});

	}

	closeUpdateModel() {
		this.setState({ showUpdateModel: false });
		window.location.reload()
	}

	validateForm() {

		let errors = {}

		let formIsValid = true
		if (!this.state.StoreName) {
			formIsValid = false;
			errors['StoreName'] = '*Please enter the Store Name.';
		}

		if (typeof this.state.StoreName !== "undefined") {
			if (!this.state.StoreName.match(/^[a-zA-Z ]*$/)) {
				formIsValid = false;
				errors["StoreName"] = "*Please enter alphabet characters only.";
			}
		}

		if (!this.state.StoreAddress) {
			formIsValid = false;
			errors['StoreAddress'] = '*Please enter the Store Address'
		}

		this.setState({
			errors: errors
		});
		return formIsValid
	}

	onUpdateSubmit() {
		if (this.validateForm()) {

			let data = { 'storeId': this.state.StoreId, 'storeName': this.state.StoreName, 'storeAddress': this.state.StoreAddress };

			$.ajax({
				url: "Store/putStore",
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
		//console.log(this.state.StoreId, this.state.StoreName, this.state.StoreAddress);
		let list = this.state.StoreList;
		let tableData = null;
		if (list != "") {
			tableData = list.map(store =>
				<tr key={store.storeId}>
					<td className="four wide">{store.storeName}</td>
					<td className="four wide">{store.storeAddress}</td>

					<td className="four wide">
						<Button className="ui yellow button" onClick={this.showUpdateModel.bind(this, store.storeId)}><i className="edit icon"></i>EDIT</Button>
					</td>

					<td className="four wide">
						<Button className="ui red button" onClick={this.handleDelete.bind(this, store.storeId)}><i className="trash icon"></i>DELETE</Button>
					</td>

				</tr>

			)

		}
		return (
			<React.Fragment>
                <br/>
				<div>
					<div><Button primary onClick={this.showCreateModel}>New Store</Button></div>
					<StoreCreate onChange={this.onChange} onClose={this.closeCreateModel} onCreateSubmit={this.onCreateSubmit} showCreateModel={this.state.showCreateModel} />
				</div>
				<br />
				<br />
				<br />
				<div>
					<StoreDelete delete={this.state.deleteId} onClose={this.closeDeleteModal} onDeleteSubmit={this.onDeleteSubmit} showDeleteModal={this.state.showDeleteModal} />
					<StoreUpdate onChange={this.onChange} update={this.state.updateId} onClose={this.closeUpdateModel} onUpdateSubmit={this.onUpdateSubmit} showUpdateModel={this.state.showUpdateModel} Id={this.state.StoreId} Name={this.state.StoreName} Address={this.state.StoreAddress} errors={this.state.errors} />
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