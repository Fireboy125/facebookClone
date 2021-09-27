import React,{useState} from 'react';
import './ImageUpload.css';
import Dialog from '@material-ui/core/Dialog';
import {storage,db} from './firebase';
// import CloseIcon from '@material-ui/icons/Close'; 
import firebase from 'firebase';
function ImageUpload() {
  const user = firebase.auth().currentUser;
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [noLikes, setNoLikes] = useState(0);
    const [scroll, setScroll] = React.useState('paper'); //built in for dialog
    
    //handling only one photo
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
        setImageURL(URL.createObjectURL(e.target.files[0]));
    };
    const uploadFileWithClick = () => {
        document.getElementsByClassName('four')[0].click();
    }
    //opening Dialog box
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };
    //closing Dialog box

    const handleClose = () => {
        setOpen(false);
        setImage("");
        setImageURL("");
    };
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);
    const handleUpload = (event) => {
        if (document.getElementsByClassName('hidden')[0]) {
            document.getElementsByClassName('hidden')[0].classList.remove('hidden');
        }
        document.getElementsByClassName('postButton').disabled = true;
        document.getElementsByClassName('postButton')[0].classList.add('disabled');

        if (caption == "" && imageURL == "") {
            console.log("Prevented Access to Photo or Caption Submission")
    //opening Dialog box
        } else { 
            event.preventDefault();
            if (imageURL == '') {
                db.collection("posts").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: caption,
                    imageUrl: "",
                    noLikes: noLikes,
                    username: user?.displayName,
                    uid: user?.uid
                });
                handleClose();
                setProgress(0);
                setCaption("");
                setImage(null);
            } else {
                //in storage making a folder called images and adding image into that folder
                const uploadTask = storage.ref(`images/${image.name}`).put(image);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress);
                    },
                    (error) => {
                        console.log(error);
                        alert(error.message);
                    },
                    () => {
                        storage
                            .ref("images")
                            .child(image.name)
                            .getDownloadURL()
                            .then(url => {
                                db.collection("posts").add({
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    caption: caption,
                                    imageUrl: url,
                                    noLikes: noLikes,
                                    username: user?.displayName,
                                    uid: user?.uid
                                });
                                handleClose();
                                setProgress(0);
                                setCaption("");
                                setImage(null);
                            })
                    }
                )
            }
        }

    }
  return (
    <div className="imageupload">
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
            >
                <div class="makeStyles-paper-1">
                    <div class="modalInit">
                        <h1>Create Post</h1>
                        <img class="closeModalIcon" onClick={handleClose} />
                    </div>
                    <div class="hr2" />
                    <div class="profileHead">
                        <img src={user?.photoURL} className="Avatar" />
                        <h1>{user?.displayName}</h1>
                    </div>
                    <div class="inputForUpload">
                        <input onChange={handleChange} type="file" accept="image/*" className='four' />
                        <textarea value={caption} onChange={(e) => setCaption(e.target.value)} rows="4" placeholder={`What's on your mind, ${user?.displayName}?`} />
                    </div>
                    <div class={`previewImage ${!image && "vanish"}`}>
                        <img src={imageURL} className="previewImaage" />
                    </div>
                    <img alt="" class="colorAlpha" src="https://facebook.com/images/composer/SATP_Aa_square-2x.png"></img>

                    <progress value={progress} className="hidden" max="100" />

                    <div className="publishOptions">
                        <div class="left">
                            <h1>Add to your post</h1>
                        </div>
                        <div class="right">
                            <i class="Icon roomIcon" onClick={uploadFileWithClick} />
                            <i class="Icon photoIcon" onClick={uploadFileWithClick} />
                            <i class="Icon friendsIcon"  onClick={uploadFileWithClick}/>
                            <i class="Icon feelingIcon" onClick={uploadFileWithClick}/>
                            <i class="Icon tagIcon" onClick={uploadFileWithClick}/>
                            <i class="Icon moreIcon" onClick={uploadFileWithClick}/>
                        </div>
                    </div>
                    <button onClick={handleUpload} type="submit" class={`postButton ${caption.length < 1 && "disabled"} ${imageURL != "" && "visible"}`}>Post</button>
                </div>
            </Dialog>

            <div class="imageupload__container">
                <div class="postArea">
                    <img src={user?.photoURL} class="Avatar" />
                    <input value={caption} onChange={(e) => setCaption(e.target.value)} onClick={handleClickOpen('body')} placeholder={`What's on your mind, ${user?.displayName}?`} />
                </div>
                <div class="hr" />
                <div class="options">
                    <div class="liveVideo" onClick={handleClickOpen('body')}>
                        <i class="liveVideoIcon" />
                        <h2>Live video</h2>
                    </div>
                    <div class="photo" onClick={handleClickOpen('body')}>
                        <i class="photoIcon" />
                        <h2>Photo/Video</h2>
                    </div>
                    <div class="feeling" onClick={handleClickOpen('body')}>
                        <i class="feelingIcon" />
                        <h2>Feeling/Activity</h2>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ImageUpload
