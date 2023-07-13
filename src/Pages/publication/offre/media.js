import './Media.css';
import '../../../Assets/Styles/global_Style.css';
import pictureIcon from './../../../Assets/images/icons/picture.png';
import vidoeIcon from './../../../Assets/images/icons/video.png';
import { useState, useRef, useEffect } from 'react';
import functions from '../../../Utils/Functions';

function Media({data, handleChanges}) {
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);

    let imagePickerRef = useRef();
    let videoPickerRef = useRef();

    function openImagesPicker() {
        if (images.length < 10) {
            imagePickerRef.current.click();
        }
    }
    //console.log(functions.imageFileSize(5242880));

    function loadImages(e) {
        let inputs = [...e.target.files];
        let validImages = [];
        if (inputs.length <= 10) {
            inputs.forEach(img => {
                if (img.type !== "image/jpeg" && img.type !== "image/png") {
                    alert(`Le fichier "${img.name}" n'est pas une image`);
                } else {
                    if (img.size > 5242880) {
                        alert(`Vous ne pouvez pas ajouter l'image "${img.name}" car la taille de l'image est ${functions.imageFileSize(img.size)}.\nAttention, La taille de l'image ne doit pas dépasser 5 Mo`);
                    } else {
                        validImages.push(img);
                    }
                }
            });
            setImages([...images, ...validImages]);
            handleChanges({ images: [...images, ...validImages], videos: videos });
            e.target.value = "";
        } else {
            alert(`Vous avez séléctionné ${inputs.length} fichiers, Merci de ne pas dépasser 10 images`)
        }

    }

    function openVideosPicker() {
        if (videos.length < 3) {
            videoPickerRef.current.click();
        }
    }
    //console.log(functions.imageFileSize(52428800));

    function loadVideos(e) {
        let inputs = [...e.target.files];
        let validVideos = [];
        if (inputs.length <= 3) {
            inputs.forEach(video => {
                if (!video.type.startsWith("video/")) {
                    alert(`Le fichier "${video.name}" n'est pas une video`);
                } else {
                    if (video.size > 52428800) {
                        alert(`Vous ne pouvez pas ajouter la video "${video.name}" car la taille de la video est ${functions.imageFileSize(video.size)}.\nAttention, La taille de la video ne doit pas dépasser 50 Mo`);
                    } else {
                        validVideos.push(video);
                    }
                }
            });
            setVideos([...videos, ...validVideos]);
            handleChanges({ images: images, videos: [...videos, ...validVideos] });
            e.target.value = "";
        } else {
            alert(`Vous avez séléctionné ${inputs.length} fichiers, Merci de ne pas dépasser 3 videos`)
        }

    }


    function deleteImage(e) {
        let imageIndex = parseInt(e.target.attributes.data.value);
        let temp = [...images];
        temp.splice(imageIndex, 1);
        setImages([...temp]);
        handleChanges({ images: [...temp], videos: videos });

    }
    function deleteVideo(e) {
        let videoIndex = parseInt(e.target.attributes.data.value);
        let temp = [...videos];
        temp.splice(videoIndex, 1);
        setVideos([...temp]);
        handleChanges({ images: images, videos: [...temp] });

    }

    return <div className="step step__media">
        <div className='step__media__header'>
            <h1 className='step__title'>Images ({images.length} / 10)</h1>
            <input className='button button--green step__media__add' type='button' value="AJOUTER" onClick={openImagesPicker}></input>
            <input ref={imagePickerRef} type="file" style={{ display: "none" }} accept='.jpg, .jpeg, .png' multiple onChange={loadImages}></input>
        </div>
        <div className="step__media__grid">
            {(() => {
                let temp = [];
                images.forEach((img, index) => {
                    if (index === 0) {
                        temp.push(<div key={index} className="step__media__grid__image--main" style={{ backgroundImage: `url(${URL.createObjectURL(img)})` }} onClick={deleteImage} data={index}></div>);
                    } else {
                        temp.push(<div key={index} className="step__media__grid__image" style={{ backgroundImage: `url(${URL.createObjectURL(img)})` }} onClick={deleteImage} data={index}></div>);
                    }
                });
                for (let i = images.length; i < 10; i++) {
                    if (i === 0) {
                        temp.push(<div key={i} className="step__media__grid__image--main--empty" style={{ backgroundImage: `url(${pictureIcon})` }}></div>);
                    } else {
                        temp.push(<div key={i} className="step__media__grid__image--empty" style={{ backgroundImage: `url(${pictureIcon})` }}></div>);
                    }
                }
                return temp.map(img => {
                    return img;
                })

            })()}
        </div>

        <div className='step__media__header'>
            <h1 className='step__title'>Vidéo ({videos.length} / 3)</h1>
            <input className='button button--green step__media__add' type='button' value="AJOUTER" onClick={openVideosPicker}></input>
            <input ref={videoPickerRef} type="file" style={{ display: "none" }} accept='video/*' multiple onChange={loadVideos}></input>
        </div>
        <div className="step__media__grid">
            {(() => {
                let temp = [];
                videos.forEach((video, index) => {
                    temp.push(<div key={index} className="step__media__grid__video" onClick={deleteVideo} data={index}>
                        <video autoPlay muted loop data={index} src={URL.createObjectURL(video)} />
                    </div>);
                });
                for (let i = videos.length; i < 3; i++) {
                    temp.push(<div key={i} className="step__media__grid__image--empty" style={{ backgroundImage: `url(${vidoeIcon})` }}></div>);
                }
                return temp.map(video => {
                    return video;
                })

            })()}
        </div>
    </div>
}
export default Media;