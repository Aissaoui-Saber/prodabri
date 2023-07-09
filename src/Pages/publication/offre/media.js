import './Media.css';
import '../../../Assets/Styles/global_Style.css';
import pictureIcon from './../../../Assets/images/icons/picture.png';
import { useState, useRef, useEffect } from 'react';
import functions from '../../../Utils/Functions';

function Media() {
    const [images, setImages] = useState([]);

    let imagePickerRef = useRef();

    function openImagesPicker() {
        if (images.length<10){
            imagePickerRef.current.click();
        }   
    }
    //console.log(functions.imageFileSize(5242880));

    function loadImages(e) {
        let inputs = [...e.target.files];
        let validImages = [];
        if (inputs.length <= 10){
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
        }else{
            alert(`Vous avez séléctionné ${inputs.length} fichiers, Merci de ne pas dépasser 10 images`)
        }
        
    }

    function deleteImage(e){
        let imageIndex = parseInt(e.target.attributes.data.value);
        let temp = images;
        temp.splice(imageIndex, 1);
        //console.log(temp);
        setImages([...temp]);
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
                images.forEach((img,index)=>{
                    if (index === 0){
                        temp.push(<div className="step__media__grid__image step__media__grid__image--main" style={{ backgroundImage: `url(${URL.createObjectURL(img)})` }} onClick={deleteImage} data={index}></div>);
                    }else{
                        temp.push(<div className="step__media__grid__image" style={{ backgroundImage: `url(${URL.createObjectURL(img)})` }} onClick={deleteImage} data={index}></div>);
                    }
                });
                for (let i=images.length; i<10; i++){
                    if (i === 0){
                        temp.push(<div className="step__media__grid__image step__media__grid__image--main" style={{ backgroundImage: `url(${pictureIcon})` }}></div>);
                    }else{
                        temp.push(<div className="step__media__grid__image" style={{ backgroundImage: `url(${pictureIcon})` }}></div>);
                    }
                }
                return temp.map(img =>{
                    return img;
                })
                
            })()}
        </div>

        <div className='step__media__header'>
            <h1 className='step__title'>Vidéo (0 / 1)</h1>
            <input className='button button--green step__media__add' type='button' value="AJOUTER" ></input>
        </div>
        <div className="step__media__grid">
            <div className="step__media__grid__image"></div>
        </div>
    </div>
}
export default Media;