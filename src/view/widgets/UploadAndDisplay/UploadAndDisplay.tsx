import React, { Component } from "react";

class DisplayImage extends Component<{
    image?: string,
}, {
    image?: string
}> {
    constructor(props) {
        super(props);

        this.state = {
            image: this.props.image ? this.props.image : ""
        };

        // this.onImageChange = this.onImageChange.bind(this);
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            // Chequea el tipo de imagen
            if (event.target.files[0].type.match(/image.*/)) {
                // Si es una imagen, la muestra
                let img = event.target.files[0];
                this.setState({
                    image: URL.createObjectURL(img)
                });
            } else {
                alert("El archivo seleccionado no es una imagen");
                event.target.value = "";
                this.setState({
                    image: this.props.image ? this.props.image : ""
                });
            }
        };
    }

    render() {
        return (
            <>
                {/* Center the img */}
                <div className="d-flex justify-content-center">
                    <img src={this.state.image}
                        height={this.state.image && "300px"}
                        width={this.state.image && "300px"} />
                </div>
                <div className="justify-content-center">
                    <input type="file" name="image" onChange={this.onImageChange}/>
                </div>
            </>
        );
    }
}
export default DisplayImage;
