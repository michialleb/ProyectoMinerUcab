import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalCompraCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggleAlert = this.toggleAlert.bind(this);
  }

  toggleAlert() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
          <div className="ingresarUsuario">
        <Button color="danger" onClick={this.toggleAlert}>Ingresar </Button>
        </div>
        <Modal isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
          toggle={this.toggleAlert} className={this.props.className}>
          <ModalHeader toggle={this.toggleAlert}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleAlert}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggleAlert}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalCompraCliente;