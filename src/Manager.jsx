import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Table, Button, Container, FormGroup,
    Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";

const data = [
    { id: 1, bookName: "Harry Potter", author: "J.K. Rowling", ISBN: "978-3-16-148410-0", realeaseDate: "1997-06-26", available: true },
    { id: 2, bookName: "The Alchemist", author: "Paulo Coelho", ISBN: "978-0-06-112241-5", realeaseDate: "1988-05-01", available: true },
    { id: 3, bookName: "Alice in Wonderland", author: "Lewis Carroll", ISBN: "978-0-19-283374-0", realeaseDate: "1865-11-26", available: true },
    { id: 4, bookName: "To Kill a Mockingbird", author: "Harper Lee", ISBN: "978-0-06-112008-4", realeaseDate: "1960-07-11", available: true },
    { id: 5, bookName: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", ISBN: "978-0-06-231609-7", realeaseDate: "2011-09-04", available: true },
    { id: 6, bookName: "1984", author: "George Orwell", ISBN: "978-0-452-28423-4", realeaseDate: "1949-06-08", available: true },
    { id: 7, bookName: "Pride and Prejudice", author: "Jane Austen", ISBN: "978-0-19-953556-2", realeaseDate: "1813-01-28", available: true },
];

class Manager extends React.Component {
    state = {
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
            id: "",
            bookName: "",
            author: "",
            ISBN: "",
            realeaseDate: "",
            available: false,
        },
    };

    mostrarModalActualizar = (dato) => {
        this.setState({
            form: dato,
            modalActualizar: true,
        });
    };

    cerrarModalActualizar = () => {
        this.setState({modalActualizar: false});
    };

    mostrarModalInsertar = () => {
        this.setState({
            modalInsertar: true,
        });
    };

    cerrarModalInsertar = () => {
        this.setState({modalInsertar: false});
    };

    editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
            if (dato.id === registro.id) {
                arreglo[contador].bookName = dato.bookName;
                arreglo[contador].author = dato.author;
                arreglo[contador].ISBN = dato.ISBN;
                arreglo[contador].realeaseDate = dato.realeaseDate;
                arreglo[contador].available = dato.available;
            }
            contador++;
        });
        this.setState({data: arreglo, modalActualizar: false});
    };

    eliminar = (dato) => {
        let opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
        if (opcion === true) {
            let contador = 0;
            let arreglo = this.state.data;
            arreglo.map((registro) => {
                if (dato.id === registro.id) {
                    arreglo.splice(contador, 1);
                }
                contador++;
            });
            this.setState({data: arreglo, modalActualizar: false});
        }
    };

    insertar = () => {
        let valorNuevo = {...this.state.form};
        valorNuevo.id = this.state.data.length + 1;
        let lista = this.state.data;
        lista.push(valorNuevo);
        this.setState({modalInsertar: false, data: lista});
    };

    handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: value,
            },
        });
    };

    render() {
        return (
            <>
                <Container>
                    <h1>Library management system!!!!</h1>
                    <br />
                    <Button color="success" onClick={this.mostrarModalInsertar}>Crear</Button>
                    <br />
                    <br />
                    <Table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Book name</th>
                            <th>Author</th>
                            <th>ISBN</th>
                            <th>Realease date</th>
                            <th>Available</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map((dato) => (
                            <tr key={dato.id}>
                                <td>{dato.id}</td>
                                <td>{dato.bookName}</td>
                                <td>{dato.author}</td>
                                <td>{dato.ISBN}</td>
                                <td>{dato.realeaseDate}</td>
                                <td>{
                                    dato.available ? "Available" : "Not Available"
                                }</td>
                                <td>
                                    <Button color="primary" onClick={() => this.mostrarModalActualizar(dato)}>Editar</Button>{" "}
                                    <Button color="danger" onClick={() => this.eliminar(dato)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Container>
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div><h3>Insertar nombre</h3></div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>Id: </label>
                            <input className="form-control" readOnly type="text" value={this.state.data.length+1} />
                        </FormGroup>
                        <FormGroup>
                            <label>Book name: </label>
                            <input className="form-control" name="bookName" type="text" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>Author: </label>
                            <input className="form-control" name="author" type="text" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>ISBN: </label>
                            <input className="form-control" name="ISBN" type="text" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>Realease date: </label>
                            <input className="form-control" name="realeaseDate" type="text" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup check className="mb-3">
                            <label className="form-check-label">
                                <input
                                    className="form-check-input"
                                    name="available"
                                    type="checkbox"
                                    onChange={this.handleChange}
                                    checked={this.state.form.available || false}
                                />{' '}
                                Available
                            </label>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.insertar}>Insertar</Button>
                        <Button className="btn btn-danger" onClick={this.cerrarModalInsertar}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalActualizar}>
                    <ModalHeader>
                        <div><h3>Editar Registro</h3></div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>Id:</label>
                            <input className="form-control" readOnly type="text" value={this.state.form.id} />
                        </FormGroup>
                        <FormGroup>
                            <label>Nombre:</label>
                            <input
                                className="form-control"
                                name="bookName"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.bookName}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Edad:</label>
                            <input
                                className="form-control"
                                name="author"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.author}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Empresa:</label>
                            <input
                                className="form-control"
                                name="ISBN"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.ISBN}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Correo electronico:</label>
                            <input
                                className="form-control"
                                name="realeaseDate"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.realeaseDate}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Available:</label>
                            <input
                                className="form-control"
                                name="available"
                                type="checkbox"
                                onChange={this.handleChange}
                                checked={this.state.form.available || false}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.editar(this.state.form)}>Editar</Button>
                        <Button color="danger" onClick={this.cerrarModalActualizar}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default Manager;