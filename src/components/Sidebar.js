import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import AppsIcon from '@material-ui/icons/Apps'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import  CreateIcon from '@material-ui/icons/Create'
import  FiberManualRecordIcon  from '@material-ui/icons/FiberManualRecord'
import React from 'react'
import styled from 'styled-components'
import SidebarOption from './SidebarOption'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import {useCollection} from "react-firebase-hooks/firestore"
import { db } from '../firebase';

function Sidebar() {

    const[channels] = useCollection(db.collection('rooms'))
  return (
    <SidebarContainer>
        <SidebarHeader>
            <SidebarInfo>
                <h2>React Dev</h2>
                <h3>
                    <FiberManualRecordIcon/>
                    saurabh dayma
                </h3>
            </SidebarInfo>
            <CreateIcon/>
        </SidebarHeader>

        <SidebarOption Icon={InsertCommentIcon} title="Threads"/>
        <SidebarOption Icon={InboxIcon} title="Mentions & reactions"/>
        <SidebarOption Icon={DraftsIcon} title="Saved items"/>
        <SidebarOption Icon={BookmarkBorderIcon} title="Channel Browser"/>
        <SidebarOption Icon={PeopleAltIcon} title="people & user groups"/>
        <SidebarOption Icon={AppsIcon} title="Apps"/>
        <SidebarOption Icon={FileCopyIcon} title="File browser"/>
        <SidebarOption Icon={ExpandLessIcon} title="Show tess"/>
        <hr/>
        <SidebarOption Icon={ExpandMoreIcon} title='show more'/>
        <hr/>
        <SidebarOption Icon={AddIcon} addchanneloption title='Add Chennels'/>
        
      {channels?.docs.map(doc => (
          <SidebarOption key={doc.id} id={doc.id} title={doc.data().name}/>
      ))}
    </SidebarContainer>
  )
}

export default Sidebar

const SidebarContainer = styled.div`
 background-color: #3f0f40;
 color: white;
 flex: 0.3;
 border-top: 1px solid #49274b;
 max-width: 260px;
 margin-top: 60px;

 >hr {
     margin-top: 10px;
     margin-bottom: 10px;
     border: 1px solid #49274b;
 }
`;
const SidebarHeader = styled.div`
 display: flex;
 border-bottom: 1px solid #49274b;
 padding: 13px;

 > .MuiSvgIcon-root {

     border-radius: 999px;
     color: #49274b;
     background-color: white;
 }
`;
const SidebarInfo = styled.div`
 flex: 1;
 > h2 {
     font-size: 15px;
     font-weight: 900;
     margin-bottom: 5px;
 }
 > h3 {
     display: flex;
     font-size: 13px;
     font-weight: 400;
     align-items: center;
}
> h3 > .MuiSvgIcon-root {

    font-size: 14px;
    margin-bottom: 1px;
    margin-right: 2px;
    color: green;
}
`;