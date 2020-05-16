import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'semantic-ui-react';
import * as $ from 'jquery';

export default class StoresDelete extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};

		this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	onDeleteSubmit(id) {
		$.ajax({
			url: "/Store/DeleteStore",
			data: { 'id': id },
			state: "POST",
			success: function (data) {
			this.setState({ Success: data })
			window.location.reload()
			}.bind(this)
		});
		
	}

	onClose() {
		this.setState({ showDeleteModal: false });
		window.location.reload()
	}

	render() {

		return (
			<React.Fragment>
				<Modal open={this.props.showDeleteModal} onClose={this.props.onClose} size='small'>
					<Modal.Header>Delete Store</Modal.Header>
					<Modal.Content>
						<h4>
							Are you sure?
                        </h4>
					</Modal.Content>
					<Modal.Actions>
						<Button onClick={this.props.onClose} secondary >Cancel
                            </Button>
						<Button onClick={() => this.onDeleteSubmit(this.props.delete)} className="ui red button">Delete
                            <i className="x icon"></i>
						</Button>
					</Modal.Actions>
				</Modal>
			</React.Fragment>
		)
	}
}