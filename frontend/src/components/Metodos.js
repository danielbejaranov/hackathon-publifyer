import React, { Component } from 'react'
import axios from 'axios'

export default class Metodos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        };
    }

    handleFileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { selectedFile } = this.state;
        if (selectedFile) {
            try {
                const formData = new FormData();
                formData.append('video', selectedFile);
                formData.append('id', 'opcion1');
                await axios.post('http://localhost:4000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Archivo enviado exitosamente.');
            } catch (error) {
                console.error('Error al enviar el archivo:', error);
            }
        }
    };

    render() {
        return (
            <div>
                <section class="left-section">
                    <h2>Sección izquierda</h2>
                    <form onSubmit={this.handleSubmit}>
                        <h2>Opciones de edicion:</h2>
                        <p>Selecciona una o más opciones:</p>
                        <input type="checkbox" id="opcion1" name="opciones" value="opcion1"></input>
                        <label for="opcion1">Redimensionar</label><br />
                        <input type="checkbox" id="opcion2" name="opciones" value="opcion2"></input>
                        <label for="opcion2">Mejorar calidad de video</label><br />
                        <input type="checkbox" id="opcion3" name="opciones" value="opcion3"></input>
                        <label for="opcion3">Mejorar calidad de audio</label><br />
                        <br />
                        <section class="center-section">
                            <h2>Video</h2>
                            <input type="file" onChange={this.handleFileChange} />
                            <br/>
                            <button type="submit">Subir archivo</button>
                        </section>
                    </form>

                </section>

                <section class="right-section">
                    <h2>Contenido de publicación: </h2>
                    <div class="input-container">
                        <input type="text" id="inputText" name="inputText"></input>
                    </div>

                </section>
            </div>
        )
    }
}
