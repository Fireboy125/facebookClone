// // import React from 'react';
// // import { useEffect } from 'react';
// // import './messenger.css';
// // // import Provider from 'react-redux'
// // // import Layout from '../../components/Layout'
// // import {useDispatch,useSelector} from 'react-redux'
// // import { getRealTimeUsers } from './actions/user.actions';
// // const Messenger = (props) => {
// //     const dispatch = useDispatch();
// //     const auth=useSelector(state=>state.auth);
// //     const user=useSelector(state=>state.user);

// //     useEffect(() =>{
// //         dispatch(getRealTimeUsers(auth.uid))
// //     },[])
// //     // console.log(user);
// //     return (
// //         <>
// //         <section className="container">
// //             <div className="listOfUsers">
                
// //                 {
// //                     user.users.length>0?
// //                     user.users.map(user=>{
// //                         return(
// //                             <div className="displayName">
// //                                 <div className="displayPic">
// //                                     <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
// //                                 </div>
// //                                 <div style={{display:"flex",color:"white", flex:1,justifyContent:"space-between",margin: '0 10px'}}>
// //                                     <span style={{fontWeight: 500}}>{user.firstName}{user.LastName}</span>
// //                                     <span>{user.isOnline ? 'online' : 'offline'}</span>
// //                                 </div>
// //                             </div>
// //                         );
// //                     }):null
// //                 }
                        
// //             </div>
// //             <div className="chatArea">
// //                 <div className="chatHeader"> Rizwan Khan </div>
// //                 <div className="messageSections">

// //                     <div style={{ textAlign: 'left' }}>
// //                         <p className="messageStyle" >Hello User</p>
// //                     </div>

// //                 </div>
// //                 <div className="chatControls">
// //                     <textarea />
// //                     <button>Send</button>
// //                 </div>
// //             </div>
// //         </section>
// //     </>
// //     );
// // }

// // export default Messenger;

// import React from 'react';
// import { useEffect,useState } from 'react';
// import './messenger.css';
// // import Provider from 'react-redux'
// // import Layout from '../../components/Layout'
// import {useDispatch,useSelector} from 'react-redux'
// import { updateMessage, getRealtimeConversations  } from './actions/user.actions';
// // import {getRealTimeUsers} from "./"
// import { getRealTimeUsers } from './actions/user.actions';
// const User = (props) => {

  
//   const {user, onClick} = props;

//   return (
//     <div onClick={() => onClick(user)} className="displayName">
//                   <div className="displayPic">
//                       <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
//                   </div>
//                   <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
//                       {/* <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span> */}
//                       <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
//                       <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}></span>
//                   </div>
//               </div>
//   );
// }

// const Messenger = (props) => {
//   const dispatch = useDispatch();
//   const auth = useSelector(state => state.auth);
//   const user = useSelector(state => state.user);
//   const [chatStarted, setChatStarted] = useState(false);
//   const [chatUser, setChatUser] = useState('');
//   const [message, setMessage] = useState('');
//   const [userUid, setUserUid] = useState(null);
//   let unsubscribe;
  
//   useEffect(()=>{
//     dispatch(getRealTimeUsers())
//   },[]);


// //   useEffect(() => {

// //     unsubscribe = dispatch(getRealTimeUsers(auth.uid))
// //     .then(unsubscribe => {
// //       return unsubscribe;
// //     })
// //     .catch(error => {
// //       console.log(error);
// //     })

    


// //   }, []);

//   //console.log(user);

//   //componentWillUnmount
// //   useEffect(() => {
// //     return () => {
// //       //cleanup
// //       unsubscribe.then(f => f()).catch(error => console.log(error));

// //     }
// //   }, []);


//   const initChat = (user) => {

//     setChatStarted(true)
//     setChatUser(`${user.firstName} ${user.lastName}`)
//     setUserUid(user.uid);

//     console.log(user);

//     dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }));

//   }

//   const submitMessage = (e) => {

//     const msgObj = {
//       user_uid_1: auth.uid,
//       user_uid_2: userUid,
//       message
//     }


//     if(message !== ""){
//       dispatch(updateMessage(msgObj))
//       .then(() => {
//         setMessage('')
//       });
//     }

//     //console.log(msgObj);

//   }


//   return (
//       <section className="container">

//         <div className="listOfUsers">


//           {
//             user.length > 0 ?
//             user.map(user => {
//               return (
//                 <User 
//                   onClick={initChat}
//                   key={user.uid} 
//                   user={user} 
//                   />
//               );
//             }) : null
//           }

            
                    
//         </div>

//         <div className="chatArea">
            
//             <div className="chatHeader"> 
//             {
//               chatStarted ? chatUser : ''
//             }
//             </div>
//             <div className="messageSections">
//                 {
//                   chatStarted ? 
//                   user.conversations.map(con =>
//                     <div style={{ textAlign: con.user_uid_1 == auth.uid ? 'right' : 'left' }}>
//                     <p className="messageStyle" >{con.message}</p>
//                   </div> )
//                   : null
//                 }
                

//             </div>
//             {
//               chatStarted ? 
//               <div className="chatControls">
//                 <textarea 
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   placeholder="Write Message"
//                 />
//                 <button onClick={submitMessage}>Send</button>
//             </div> : null
//             }
            
//         </div>
//     </section>
//   );
// }

// export default Messenger;






import React, { useEffect, useState } from 'react';
import './messenger.css';
import {useDispatch, useSelector} from 'react-redux'
// import {getRealTimeUsers} from './actions/user.actions'
import {getRealtimeConversations, getRealTimeUsers, updateMessage} from './actions'


const User=(props)=>{
  const {user,onClick}=props;
  return(
    <div onClick={()=>onClick(user)} className="displayName">
        <div className="displayPic">
            <img src={user.photoURL} alt="" />

        </div>
        <div className="ab"style={{display: 'flex',justifyContent:"space-between",flex:1,margin: '0 10px',color:"rgb(226, 224, 224)"}}>
            <span style={{fontWeight: 500}}>{user.displayName}</span>
            <span className={user.isOnline ? `onlineStatus` :` off`}></span>
        </div>
    </div>
  )
}

const Messenger = (props) => {
  const dispatch=useDispatch();
  const auth = useSelector(state =>state.auth);
  const user=useSelector(state=>state.user);
  const [chatStarted,setChatStarted]=useState(false);
  const [chatUser,setChatUser]=useState('');
  const [message,setMessage]=useState('');
  const [userUid,setUserUid]=useState(null);
  let unsubscribe;

  useEffect(() => {

    unsubscribe=dispatch(getRealTimeUsers(auth.uid))
    .then(unsubscribe=>{
      return unsubscribe;
    })
    .catch(error => {
      console.log(error)
    })

  },[])
  // console.log(getRealTimeUsers)

  //ComponentWillUnmount
  useEffect(() => {
    return()=>{
      //cleanup
      unsubscribe.then(f=>f()).catch(error=>console.log(error));
    }
  },[]);

  const initChat=(user) =>{
    setChatStarted(true);
    setChatUser(`${user.displayName}`);
    setUserUid(user.uid);
    // console.log(user.uid);
    dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid}));
  }

  const submitMessage=()=>{
    const msgObj={
      user_uid_1:auth.uid,
      user_uid_2:userUid,
      message
    }

    if(message!==""){
      dispatch(updateMessage(msgObj))
      .then(() => {
        setMessage('')
      });
    }
    console.log(msgObj)
  }
  return (
    
    <section className="container">

      <div className="listOfUsers">
      <div className="cd">
        <div className="fl">
          <span className="h1">Chats</span>
        
          <span className="round1">
            <i className="dots"></i>
          </span><span className="round1">
            <i className="dots1"></i>
          </span><span className="round1">
            <i className="dots2"></i>
          </span>
        </div>
        
      </div>

      {
        user.users.length>0?
        user.users.map(user=>{
          return (
            <User 
            onClick={initChat}
            key={user.uid} 
            user={user}
            />
          );
        }):null
      }
          
                  
      </div>
      <div className="chatArea">
          
          
          
          <div className="chatHeader">
            {
              chatStarted? chatUser : ""
            }
          </div>
          <div className="messageSections">
            {
              chatStarted?
              // user.conversations.map(con=>
                <div style={{ textAlign: user.uid==auth.uid?'right' : 'left' }}>
                  <p className="messageStyle" >{message}</p>
                </div>
                // )
              : null
            }
              

          </div>
          {
            chatStarted?
            <div className="chatControls">
              <textarea 
                value={message}
                onChange={(e) =>setMessage(e.target.value)}
                placeholder="Write Message"
              />
              <button onClick={submitMessage}>Send</button>
            </div>: null
          }
          
      </div>
    </section>
  );
}

export default Messenger;

