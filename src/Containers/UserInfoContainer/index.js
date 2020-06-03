import React from 'react';
import Button from 'react-bootstrap/Button';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';

class UserInfoContainer extends React.Component {
	constructor(props){
		super(props);
	}

	shortName = name => name.length > 30 ? name.substring(0, 30) + '...' : name;
	
	render(){
		const { name, age, email, newsletter } = this.props;
		console.log(name.length);
		return (
			<div>
				<div class="TitleInfo">Bem vindo(a), <span class="NameInfo">{ this.shortName(name) }</span>!</div>
				<br/>
				Sua conta foi criada com sucesso!
				<hr/>
				<b>Idade</b>: { age > 1 ? age + ' anos' : age + ' ano' } <br/>
	     		<b>Email</b>: { email } <br/>
	     		<b>Newsletter</b>: { newsletter } <br/>
	     		<hr/>
	     		<Button variant="outline-primary" onClick={() => this.props.onHide()}>Fechar</Button>

			</div>
		);
	}
}

export default UserInfoContainer;