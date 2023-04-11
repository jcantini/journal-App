import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import  Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css' // es el estilo que va a usar sweetalert2

import { ImageGallery } from "../components";
import { useForm } from '../../hooks';
import { saveNote, setActiveNote, startDeletingNote, startUploadingFiles } from "../../store/journal";


export const NoteView = () => {
     
    const dispatch = useDispatch();

    // Tomo la nota activa del state: active y la renombro a note
    const { active: note, messageSaved, isSaving} = useSelector( state => state.journal );

    const { title, body, date, onInputChange, formState } = useForm( note );

    const dateString = useMemo( () => {
        const newDate = new Date( date );
        return newDate.toUTCString(); // convierto un objato date a un string.
    }, [date]) // Como la fecha no cambia mucho pero si cambia mucho el form,le porngo un useMemo 

    // Necesito el campo de input para pedir las imagenes que quiero subir. Pero como le puse display:none
    // para que no se vea. Para poder accederlo necesito usar un useRef para mantener la referencia 
    // al input para poder dispararle un click.
    const fileInputRef = useRef();

    useEffect(() => {
        dispatch( setActiveNote( formState ) );
    }, [ formState ]);

    useEffect(() => {
        if (messageSaved.length > 0 ) {
            Swal.fire('Nota actualizada', messageSaved, 'success' );
        }
    }, [ messageSaved ]);

    const onSaveNote = () => {
        dispatch( saveNote() ); //Disparo un thunk xq esto es asíncrono
    }

    const onFileInputChange = ( { target }) => {
        if (target.files === 0 ) return; // no se seleccionaron imagenes

        dispatch( startUploadingFiles( target.files ));
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

  return (
    <Grid container 
        direction='row' 
        justifyContent='space-between' 
        alignItems='center' 
        sx={{ mb: 1 }}
        className='animate__animated animate__fadeIn animate__faster'
    >
        <Grid item >
            <Typography fontSize={ 20 } fontWeight='ligth' >{ dateString }</Typography>
        </Grid>
        <Grid item>
            {/* Para poder seleccionar las imagenes, con multiple permito seleccionar varias imagenes
                El display none es para que no se vea. */}
            <input 
                type="file" 
                multiple 
                ref ={ fileInputRef }
                onChange={ onFileInputChange }
                style={{ display: 'none'}}    
            /> 
            <Tooltip title="Load images"> 
                <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }  // Simulo un click en el input
                >
                    <UploadOutlined/>
                </IconButton>
            </Tooltip>
            <Button 
                disabled= { isSaving }
                onClick={ onSaveNote }
                color="primary" sx={{ padding: 2}}
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Guardar
            </Button>
        </Grid>
        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Write a title"
                label="Title"
                sx={{ border: 'none', mb: 1 }}
                name="title"
                value={ title}
                onChange={ onInputChange }
            />
             <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Today highlights"
                multiline
                minRows= {5} 
                name="body"
                value={ body}
                onChange={ onInputChange }
            />
        </Grid>


        <Grid container justifyContent='end'>
            <Button
                onClick={ onDelete }
                sx={{ mt:2 }}
                color="error"
            >
                <DeleteOutline />
                Borrar
            </Button>

        </Grid>

        {/* Image gallery */}  
        <ImageGallery images={ note.imageUrls }/>

    </Grid>
  )
}

// variant="filled" es para que lo muestre en gris
// fullWidth toma todo el ancho

// <Tooltip title="Load images"> {/* Texto que se muestra cuando hago hover sobre el icono */}

