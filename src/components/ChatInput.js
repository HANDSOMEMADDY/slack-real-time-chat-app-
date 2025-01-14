import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components';
import { db } from '../firebase';
import firebase from 'firebase';

function ChatInput({channelId,channelName}) {

  const [input,setinput] = useState('')

    const sendMessage = (e) => {
        e.preventDefault();

        if(!channelId){
          return false;
        }
        db.collection('rooms').doc(channelId).collection("messgaes").add({
          message: input,
          timestamp:firebase.firestore.FieldValue.serverTimestamp(),
          user:"saurabh Dayma",
          userImage: ''
        })
        setinput('')
      }
  return (
    <ChatInputContainer>
    <form>
        <input  value={input} onChange={(e) => setinput(e.target.value) } placeholder={`message #${channelName}`}/>
        <Button  type="submit" onClick={sendMessage}>
            Send
        </Button>
    </form>
    </ChatInputContainer>
  )
}
export default ChatInput;

const ChatInputContainer = styled.div`  
  border-radius: 20px;
  > form {
      position: relative;
      display: flex;
      justify-content: center;
  }
  > form > input {
      position: fixed;
      bottom: 30px;
      width: 60%;
      border: 1px solid gray;
      border-radius: 3px;
      padding: 20px;
      outline: none;
  }
  > form > button {
    display: none;
  }
`;
