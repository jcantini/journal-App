import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { TurnedInNot } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import { setActiveNote } from "../../store/journal"


export const SideBarItem = ( { title = '', body, id, date, imageUrls = []  }) => {

    const dispatch = useDispatch();

    const newTitle = useMemo( () => {
        return title.length > 17  //Lo hago por si el título es muy largo para que no quede feo en el sidebar. Lo acorto
                ? title.substring(0,17) + '...' // pero con useMemo solo lo recalculo cuando el título cambie.
                : title;
    }
    , [ title ]);

    const onClickNote = () => { // cargo la nota seleccionada/activa en el state
        dispatch(setActiveNote( { title, body, id, date, imageUrls} ))
    }

  return (
    <ListItem disablePadding>
        <ListItemButton onClick={ onClickNote }>
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ newTitle } />
                <ListItemText secondary={ body } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}


