import React, { Component } from 'react';
import * as $ from 'jquery';
import { Button } from 'semantic-ui-react';

import ProductCreate from './ProductCreate';
import ProductDelete from './ProductDelete';
import ProductUpdate from './ProductUpdate';



export class ProductTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ProductList: [],
			Success: { Data: '' },

			showCreateModel: false,

			showDeleteModal: false,
			deleteId: 0,

			ProductId: '',
			ProductName: '',
			ProductPrice: '',

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
			url: "product/getproduct",
			state:"GET",
			success: function (data) {
				this.setState({ ProductList: data })
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
			url: "Product/getaproduct",
			data: { 'id': id },
			state: "GET",
			success: function (data) {
				//var obj = JSON.parse(data)
				//this.setState({ ProductId: obj.productId, ProductName: obj.productName, ProductPrice: obj.productPrice})

				this.setState({ ProductId: data.productId, ProductName: data.productName, ProductPrice: data.productPrice })
			}.bind(this)
		});


	}

	closeUpdateModel() {
		this.setState({ showUpdateModel: false });
		window.location.reload()
	}

	validateForm() {
		console.log(this.state.ProductName, this.state.ProductPrice);
		let errors = {}

		let formIsValid = true
		if (!this.state.ProductName) {
			formIsValid = false;
			errors['ProductName'] = '*Please enter the Product Name.';
		}

		if (!this.state.ProductPrice) {
			formIsValid = false;
			errors['ProductPrice'] = '*Please enter the Product Price'
		}

		if (typeof this.state.ProductPrice !== "undefined" && typeof this.state.ProductPrice !== "number") {
			if (!this.state.ProductPrice.match(/^\d+(\.\d{1,2})?$/)) {
				formIsValid = false;
				errors["ProductPrice"] = "*Please enter numbers only.";
			}
		}

		this.setState({
			errors: errors
		});
		return formIsValid
	}

	onUpdateSubmit() {
		if (this.validateForm()) {

			let data = { 'productId': this.state.ProductId, 'productName': this.state.ProductName, 'productPrice': this.state.ProductPrice };

			$.ajax({
				url: "/Product/putProduct",
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
		let list = this.state.ProductList;
		let tableData = null;
		if (list != "") {
			tableData = list.map(product =>
				<tr key={product.productId}>
					<td className="four wide">{product.productName}</td>
					<td className="four wide">{product.productPrice}</td>

					<td className="four wide">
						<Button className="ui yellow button" onClick={this.showUpdateModel.bind(this, product.productId)}><i className="edit icon"></i>EDIT</Button>
					</td>

					<td className="four wide">
						<Button className="ui red button" onClick={this.handleDelete.bind(this, product.productId)}><i className="trash icon"></i>DELETE</Button>
					</td>

				</tr>

			)

		}
		return (
			<React.Fragment>
                <br/>
				<div>
					<div><Button primary onClick={this.showCreateModel}>New Product</Button></div>
					<ProductCreate onChange={this.onChange} onClose={this.closeCreateModel}
						onCreateSubmit={this.onCreateSubmit} showCreateModel={this.state.showCreateModel} />

				</div>
				<br />
				<br />
				<br />
				<div>
					<ProductDelete delete={this.state.deleteId} onClose={this.closeDeleteModal}
						onDeleteSubmit={this.onDeleteSubmit} showDeleteModal={this.state.showDeleteModal} />

					<ProductUpdate onChange={this.onChange} update={this.state.updateId}
						onClose={this.closeUpdateModel} onUpdateSubmit={this.onUpdateSubmit}
						showUpdateModel={this.state.showUpdateModel} Id={this.state.ProductId}
						Name={this.state.ProductName} Price={this.state.ProductPrice}
						errors={this.state.errors} />

					<table className="ui striped table">
						<thead>
							<tr>
								<th className="four wide">Name</th>
								<th className="four wide">Price ($)</th>
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