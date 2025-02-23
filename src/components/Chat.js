
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import React from 'react'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import { selectRoomId } from '../feature/appSlice';
import { db } from '../firebase';
import ChatInput from './ChatInput';
import Message from './Message';

function Chat() {
    
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
  )
  const [roomMessages] = useCollection(
    roomId && db.collection('rooms').doc(roomId).collection("messages").orderBy('timeStamp',"asc")
  )

  console.log(roomDetails?.data())
  console.log(roomMessages)

  return (
    <ChatContainer>
    <Header>
     <HeaderLeft>
         <h4><strong>#{roomDetails?.data().name}</strong></h4>
         <StarBorderOutlinedIcon/>
     </HeaderLeft>
     <HeaderRight>
      <p>
          <InfoOutlinedIcon/>Details
      </p>
     </HeaderRight>
    </Header>

    <ChatMessage>
      {roomMessages?.docs.map(doc => {
        const {message,timestamp,user,userImage} = doc.data();

        return(
          <Message
          key={doc.id}
          message={message}
          timestamp={timestamp}
          user={user}
          userImage={userImage}
          />
        )
      })}
    </ChatMessage>
    <ChatInput channelName={roomDetails?.data().name} channelId={roomId}/>
    </ChatContainer>

  )
}

export default Chat;

const ChatMessage = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
   display: flex;
   align-items: center;
   margin-right: 10px;

 > h4 {
     display: flex;
     text-transform: lowercase;
 }
 >h4 > .MuiSvgIcon-root {
     margin-left: 20px;
     font-size: 18px;
     margin-right: 10px;
 }
`;
const HeaderRight = styled.div`

> p {
  display: flex;
  align-items: center;
  font-size: 14px;

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
}
`;
const ChatContainer = styled.div`
 flex: 0%.7;
 flex-grow: 1;
 overflow: scroll;
 margin-top: 60px;
`;