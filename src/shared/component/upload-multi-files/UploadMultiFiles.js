import React, {Component} from 'react';
import PropTypes from 'prop-types';

class UploadMultiFiles extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <form>
                        <h3>React Multiple File Upload</h3>
                        <div className="form-group">
                            <input type="file" multiple/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

UploadMultiFiles.propTypes = {};

export default UploadMultiFiles;
