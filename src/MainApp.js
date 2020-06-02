import React from 'react';
import Button from 'react-bootstrap/Button';
import './MainApp.css';
//import 'bootstrap/dist/css/bootstrap.css';

import SimpleWizard from './Containers/SimpleWizard';

class MainApp extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showWizard: false,
		}
	}

	onOpenWizard = () => this.setState({ showWizard: true });
	onCloseWizard = () => this.state.showWizard && this.setState({ showWizard: false });

	render(){
		return (
			<div className="MainStyle">
				<h2>Frontend Challenge!</h2>
				<Button variant="outline-primary" onClick={() => this.onOpenWizard()}>Primary</Button>
				<SimpleWizard show={this.state.showWizard} onHide={this.onCloseWizard} />
			</div>
		);
	}
}

export default MainApp;