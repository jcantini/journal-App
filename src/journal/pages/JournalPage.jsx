import { useDispatch, useSelector } from "react-redux";

import { IconButton, Tooltip } from "@mui/material";         // que 1ero me queden las importaciones de Materials y despues
import { AddOutlined } from "@mui/icons-material";  // las de  los iconos

import { JournalLayout } from "../layout/JournalLayout";
import { NothingSelectedView, NoteView } from "../views";
import { Box } from "@mui/system";
import { startNewNote } from "../../store/journal";



export const JournalPage = () => {

  const { isSaving, active } = useSelector( state => state.journal ); 

  const dispatch = useDispatch();

  const onClickNewNote = () => {
      dispatch( startNewNote() );
  };

  return (
    <JournalLayout>
        
      {
        ( !!active )
        ? <NoteView /> 
        : <NothingSelectedView />
      }  

      <IconButton
        onClick={ onClickNewNote }
        disabled={ isSaving } 
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <Tooltip title="Add a Note">
          <AddOutlined sx={{ fontSize: 20 }} />
        </Tooltip>
      </IconButton>

    </JournalLayout>

  )
}


