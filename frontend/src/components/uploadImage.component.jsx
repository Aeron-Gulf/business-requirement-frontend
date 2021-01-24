import React, { Component } from 'react';

export default class FilesUploadComponent extends Component {

    constructor(props) {
        super(props);

        this.uploadedImage = React.createRef();
        this.imageUploader = React.createRef();

        this.handleImageUpload = this.handleImageUpload.bind(this);

        this.state = {
            profileImg: ''
        }
    };

    handleImageUpload(e) {
        const [file] = e.target.files;
        if (file) {
          const reader = new FileReader();
          const { current } = this.uploadedImage;
          current.file = file;
          reader.onload = e => {
            current.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
        this.setState({ profileImg: e.target.files[0]}, () => this.props.onChange(this.state.profileImg));
    };

    render() {
        return (
            <div className="container">
                <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={this.handleImageUpload}
                        ref={this.imageUploader}
                        style={{
                        display: "none"
                        }}
                    />
                    <div onClick={() => this.imageUploader.current.click()}>
                        <img
                        ref={this.uploadedImage}
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        className="profile-img-card"
                        alt="profile"
                        />
                    </div>
                    <p>Click to upload Image</p>
                </div>
            </div>
        );
    };
};