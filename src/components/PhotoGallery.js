import React, { useState } from 'react';
import PropTypes from "prop-types";

import Gallery from 'react-grid-gallery';
import { Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import axios from "axios";

import { BASE_URL, TOKEN_KEY } from "../constants";

const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    maxHeight: "240px",
    overflow: "hidden",
    position: "absolute",
    bottom: "0",
    width: "100%",
    color: "white",
    padding: "2px",
    fontSize: "90%"
};

const wrapperStyle = {
    display: "block",
    minHeight: "1px",
    width: "100%",
    border: "1px solid #ddd",
    overflow: "auto"
};

function PhotoGallery(props) {

    const [images, setImages] = useState(props.images);
    const [curImgIdx, setCurImgIdx] = useState(0);

    const imageArr = props.images
        .map( image => {
            return  {
                ...image,
                customOverlay: (
                    <div style={captionStyle}>
                        <div>{ `${image.user}: ${image.caption}`}</div>
                    </div>
                )
            }
        });

    const onCurrentImageChange = (index) => {
        setCurImgIdx(index);
    }

    const deleteImage = () => {
        // step1: confirm to delete
        // step2: find the current selected image
        // step3: make a delete request to the server
        if (window.confirm(`Are you sure you want to delete this image?`)) {
            const curImg = images[curImgIdx];
            const newImageArr = images.filter((img, index) => index !== curImgIdx);
            // console.log(newImageArr);

            const opt = {
                method:  "DELETE",
                url: `${BASE_URL}/post/${curImg.postId}`,
                header: {
                    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
                }
            }

            axios(opt)
                .then( res => {
                    if(res.status === 200) {
                        setImages(newImageArr)
                    }
                })
                .catch( err => {
                    message.error("Fetch posts failed!");
                    console.log("fetch posts failed: ", err.message);
                })
        }
    }
    return (
        <div>
            <Gallery
                images={imageArr}
                enableImageSelection={false}
                backdropClosesModal={true}
                currentImageWillChange={onCurrentImageChange}

                customControls={[
                    <Button
                        style={{ marginTop: "10px", marginLeft: "5px"}}
                        key="deleteImage"
                        type="primary"
                        size="small"
                        onClick={deleteImage}
                        icon={<DeleteOutlined />}
                    >Delete Image</Button>
                ]}
            />;
        </div>
    );
}

// development testing:
// https://reactjs.org/docs/typechecking-with-proptypes.html
PhotoGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            postId: PropTypes.string.isRequired,
            user: PropTypes.string.isRequired,
            caption: PropTypes.string.isRequired,
            src: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
            thumbnailWidth: PropTypes.number.isRequired,
            thumbnailHeight: PropTypes.number.isRequired
        })
    ).isRequired
};

export default PhotoGallery;