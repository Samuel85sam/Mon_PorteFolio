/* eslint-disable @typescript-eslint/no-shadow */
import * as React from 'react';
import { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CRUD from '@/Business/API-requests/C.R.U.D./CRUD';
import { Post } from '@/Types-Interfaces/CRUD-Types/CRUD.types';

const Gallery = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    const itemData = async () => {
        const posts = await CRUD.getForm('posts/', { populate: ['img', 'author'], type: 'Intérieur' });
        if (posts !== undefined && Array.isArray(posts)) {
            //console.log({ posts });
            setPosts(posts);
            console.log('posts' + JSON.stringify(posts.img));
        }
    };

    useEffect(() => {
        itemData();
    }, []);

    return (
        <ImageList
          sx={{ width: 'auto' }}
          variant="woven"
          cols={3}
          gap={8}
            >
            {posts.map((item) => (
                <ImageListItem key={item._id}>
                    <img
                      srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item.img}?w=161&fit=crop&auto=format`}
                      alt={item.title}
                      loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};

export default Gallery;
