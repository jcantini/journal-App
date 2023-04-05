
// Archivo para subie a cloudinary de un archivo a la vez. Este código pordría estar directamente
// en el thunk pero así lo dejo más prolijo sin tanto código.

export const fileUpload = async( file ) => {

    if (!file) throw new Error('There is no file to ulpoad');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/jcantini/upload';

    // Contruyo el form-data que va en em body
    const formData = new FormData() // es una funcion de js
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file );

    try {
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if ( !resp.ok ) throw new Error("Couldn't load image file");

        const cloudResp = await resp.json(); // serializo la respuesta

        return cloudResp.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error( error.message );
    }

}