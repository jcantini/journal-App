import { Grid, Typography } from "@mui/material";
import { StarOutline } from "@mui/icons-material";

export const NothingSelectedView = () => {
  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight:'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius: 1}}
    >
      <Grid item xs={12}>
          <StarOutline sx={{ fontSize: 50, color: 'white' }}/> {/* Esto es un icono */}
      </Grid>
      <Grid item xs={12}>
        <Typography color="white" variant='h5'>
          Select or Create a note
        </Typography>
      </Grid>
    </Grid>
  )
}


