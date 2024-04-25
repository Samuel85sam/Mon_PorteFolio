import React, { useEffect, useState } from 'react';
import { Img } from '@/Types-Interfaces/CRUD-Types/CRUD.types';
import CRUD from '@/Business/API-requests/C.R.U.D./CRUD';
import { Grid } from '@mantine/core';

const Gallery = () => {

    const [imgs, setImgs] = useState<Img[]>([]);

    // const galleryImgs = async () => {
    //     const tabImgs = await CRUD.getForm('imgs/', { populate: ['img']})
    //     if (tabImgs !== undefined && Array.isArray(tabImgs)) {
    //         //console.log({ tabImgs });
    //         setImgs(tabImgs)
    //     }
    // }

    const galleryImgs = async () => {
        const imgs = await CRUD.getImgs('imgs/')
        if (imgs !== undefined && Array.isArray(imgs)) {
            //console.log({ imgs });
            setImgs(imgs)
        }
    };



        useEffect(() => {
            galleryImgs()
        }, []);
        
//TODO: reprendre la méthode de storage des images dans un fichier "upload" et recupérer ces images via img.path ==> cela comprend un post de chaque image via l'UI.

        return (
            <>
               <Grid
               >
                <img
                {imgs.map((img) => {
                     key:{img.originalname}
                })}>
                {img.}
                </img>  
               </Grid>
            </>
        )
    }

    export default Gallery;
