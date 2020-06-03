import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';
import UserInfoContainer from '../UserInfoContainer';
import { createUser } from '../../sdk';

const initialState = {
	name: '',
	age: '',
	email: '',
	newsletter: 'daily',
	errors: [],
	nextPressed: false,
	showInfo: false,
};

class SimpleWizard extends React.Component {
	constructor(props){
		super(props);
		this.state = initialState;
	}

	closeModal = () => {
		this.clearState();
		this.props.onHide();
	}

	clearState = () => {
		this.setState(initialState);
	}

	setName = userName => this.setState({ name: userName });

	setAge = userAge => this.setState({ age: userAge });

	setEmail = userEmail => this.setState({ email: userEmail });

	setNewsletter = userNewsletter => this.setState({ newsletter: userNewsletter });

	setShowInfo = value => this.setState({ showInfo: value });

	goNextStep = () => {
		let error = [];
		if(this.state.name === '') error.push('Falta preencher o nome do usuário!');
		if(this.state.age === '') error.push('Falta preencher a idade do usuário!');
		else if(isNaN(this.state.age) || this.state.age < 0) error.push('A idade do usuário precisa ser um número válido!');
		
		if (error.length > 0) this.setState({ errors: error });
		else this.setState({ errors: [], nextPressed: true })
	};

	goBack = () => this.setState({ nextPressed: false });

	finish = () => {
		let error = [];
		if(this.state.email === '') error.push('Falta preencher o email do usuário!');
		else if(!this.validateEmail(this.state.email)) error.push('Email inválido!');

		if (error.length > 0) this.setState({ errors: error });
		else {
			this.setState({ errors: []});
			this.saveData();
		}
	};

	validateEmail = email => {
		const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		console.log(email.match(pattern));
		if(email.match(pattern)) return true;
		return false;
	};

	saveData = () => {
		createUser(this.state)
			.then(() => this.props.onHide())
			.catch(() => alert('ERRO! Não foi possível criar nova conta de usuário!'))
			.finally(() => this.showMessageInfo());
	};

	showMessageInfo = () => {
		this.setShowInfo(true);
	};


	render(){
		if (this.props.show && this.state.showInfo) this.clearState();
		return (
			<>
			<Modal show={this.props.show} onHide={this.closeModal} id="wizardModal">
				<Modal.Header closeButton>
          			<Modal.Title><span className="TitleStyled">Criar Conta</span></Modal.Title>
        		</Modal.Header>

				<Modal.Body>
					{!this.state.nextPressed ? (
						<>
							<Form>
								<Form.Group as={Row} controlId="formName">
									<Col sm="2"><Form.Label>Nome: </Form.Label></Col>
									<Col>
										<Form.Control 
											type='text'
											value={this.state.name}
											onChange={ev => this.setName(ev.currentTarget.value)}
										/>
									</Col>
								</Form.Group>

								<Form.Group as={Row} controlId="formAge">
									<Col sm="2"><Form.Label>Idade: </Form.Label></Col>
									<Col>
										<Form.Control 
											type='text'
											value={this.state.age} 
											onChange={ev => this.setAge(ev.currentTarget.value)}
										/>
									</Col>
								</Form.Group>
							</Form>

							<div>
								{this.state.errors.length > 0 && (
									<>
									<span className="errorMessages">Atenção!</span><br/>
									{this.state.errors.map(error => (<div className="errorMessages">- {error}</div>))}
									</>
								)}
							</div>
						</>
					) : (
						<>
							<Form>
								<Form.Group as={Row} controlId="formEmail">
									<Col sm="2"><Form.Label>Email: </Form.Label></Col>
									<Col>
										<Form.Control 
											type='text'
											value={this.state.email}
											placeholder='exemplo@mail.com'
											onChange={ev => this.setEmail(ev.currentTarget.value)}
										/>
									</Col>
								</Form.Group>

								<Form.Group as={Row} controlId="formNewsletter">
									<Col sm="3"><Form.Label>Newsletter: </Form.Label></Col>
									<Col sm="4">
										<Form.Control as="select" onChange={ev => this.setNewsletter(ev.currentTarget.value)}>
											<option value="daily">daily</option>
											<option value="weekly">weekly</option>
											<option value="monthly">monthly</option>
										</Form.Control>
									</Col>
								</Form.Group>
							</Form>

							<div>
								{this.state.errors.length > 0 && (
									<>
									<span className="errorMessages">Atenção!</span><br/>
									{this.state.errors.map(error => (<div className="errorMessages">- {error}</div>))}
									</>
								)}
							</div>
						</>
					)}
					
				</Modal.Body>
			
				<Modal.Footer>
					{!this.state.nextPressed ? (
						<Button variant="outline-primary" onClick={() => this.goNextStep()}>Próximo</Button>
					) : (
						<>
							<Button variant="outline-primary" onClick={() => this.goBack()}>Voltar</Button>
							<Button variant="outline-primary" onClick={() => this.finish()}>Finalizar</Button>
						</>
					)}
				</Modal.Footer>
			</Modal>

			{this.state.showInfo && (
				<div className="UserInfoStyled">
					<UserInfoContainer
						onHide={this.clearState}
						name={this.state.name}
						age={this.state.age} 
						email={this.state.email} 
						newsletter={this.state.newsletter} />
				</div>
			)}
			</>
		);
	}
}

export default SimpleWizard;