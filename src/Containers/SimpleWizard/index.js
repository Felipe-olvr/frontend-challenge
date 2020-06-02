import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';

class SimpleWizard extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			age: '',
			email: '',
			newsletter: 'daily',
			errors: [],
			nextPressed: false,
		};
	}

	closeModal = () => {
		this.clearState();
		this.props.onHide();
	}

	clearState = () => {
		this.setState({
			name: '',
			age: '',
			email: '',
			newsletter: 'daily',
			errors: [],
			nextPressed: false,
		});
	}

	setName = userName => this.setState({ name: userName });

	setAge = userAge => this.setState({ age: userAge });

	setEmail = userEmail => this.setState({ email: userEmail });

	setNewsletter = userNewsletter => this.setState({ newsletter: userNewsletter });

	goNextStep = () => {
		let error = [];
		if(this.state.name === '') error.push('Faltou o nome!');
		if(this.state.age === '') error.push('Faltou a idade!');
		else if(isNaN(this.state.age)) error.push('A idade do usuário precisa ser um número!');
		
		if (error.length > 0) this.setState({ errors: error });
		else this.setState({ nextPressed: true })
	}

	goBack = () => this.setState({ nextPressed: false });

	render(){
		return (
			<Modal show={this.props.show} onHide={this.closeModal}>
				<Modal.Header closeButton>
          			<Modal.Title>Criar Conta</Modal.Title>
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
									<span>Atenção! </span><br/>
									{this.state.errors.map(error => (<div>{error}</div>))}
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
						</>
					)}
					
				</Modal.Body>
			
				<Modal.Footer>
					{!this.state.nextPressed ? (
						<Button variant="outline-primary" onClick={() => this.goNextStep()}>Próximo</Button>
					) : (
						<>
							<Button variant="outline-primary" onClick={() => this.goBack()}>Voltar</Button>
							<Button variant="outline-primary">Finalizar</Button>
						</>
					)}
				</Modal.Footer>
			</Modal>
		);
	}
}

export default SimpleWizard;