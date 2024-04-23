//TODO: spliter le fichier en 1) 
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
    TextInput,
    Paper,
    Title,
    Container,
    Button,
    Textarea,
    Group,
    Center,
    Radio,
} from '@mantine/core';
import * as Yup from 'Yup';
import CRUD from '../../../Business/API-requests/C.R.U.D./CRUD';
import { CreatePostPayload, Post, User } from '../../../Types-Interfaces/CRUD-Types/CRUD.types';
import { useAuthStore } from '../../../Zustand/authStore';

interface PostFormProps {
    post: Post | undefined
}
//TODO: postFormValues ???
interface PostFormValues {
    type: Post['type']
    title: Post['title'],
    body: Post['body'],
    img?: Pick<File, 'name' | 'type' | 'size'>,
    author: User['_id']
}

const PostForm: React.FC<PostFormProps> = ({ post }) => {
    const currentUser = useAuthStore(state => state.currentUser);
    const jwt = useAuthStore(state => state.jwt);
    const navigate = useNavigate();
    const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${jwt}`,
    };

    const [value, setValue] = useState('autre');
    const SignupSchema = Yup.object().shape({
        type: Yup.string().required(),
        title: Yup.string().required(),
        body: Yup.string().required(),
        img: Yup.mixed(),
    });

    const formik = useFormik({

        initialValues: {
            type: post?.type || 'Autre',
            title: post?.title || '',
            body: post?.body || '',
            img: undefined,
            author: post?.author._id || currentUser!,
        },

        validationSchema: SignupSchema,

        onSubmit: async (values) => {
            sendPost(values);
        },
    });

    const sendPost = async (data: CreatePostPayload) => {
        console.log('sendPost');

        if (post === undefined) {
            const route = 'posts';
            await CRUD.postForm(route, data, headers);

            navigate('/posts');
        } else {
            const route = `posts/${post._id}`;
            await CRUD.patchFormById(route, data, headers);

            navigate('/posts');
        }
    };

    const redirect = () => {
        navigate('/posts');
    };

    useEffect(() => {
    }, []);

    return (
        <Container size="md" my={40}>
            <form
              encType="multipart/form-data"
              onSubmit={formik.handleSubmit}
            >
                <Title ta="center">
                    Nouvel Article:
                </Title>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <Radio.Group
                      id="type"
                      name="type"
                      label="séléctionnez la zone concernée"
                      description="zones:"
                      value={formik.values.type}
                      onChange={(e) => { console.log({ e }); formik.setFieldValue('type', e); }}
                      withAsterisk
                      required
                    >
                        <Group mt="xs">
                            <Radio value="Intérieur" label="Intérieur" />
                            <Radio value="Extérieur" label="Extérieur" />
                            <Radio value="Piscine" label="Piscine" />
                            <Radio value="Autre" label="Autre" />
                        </Group>
                    </Radio.Group>
                    <label htmlFor="title">titre</label>
                    <TextInput
                      id="title"
                      name="title"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                    />
                    <label htmlFor="body">description</label>
                    <Textarea
                      id="body"
                      name="body"
                      rows={8}
                      cols={50}
                      onChange={formik.handleChange}
                      value={formik.values.body}>
                    </Textarea>
                    <br />
                    <label htmlFor="img">image</label>
                    <TextInput
                      id="img"
                      name="uploaded_file"
                      type="file"
                      accept="image/*"
                      onChange={
                            (event) => {
                                if (event.currentTarget.files) {
                                    formik.setFieldValue('uploaded_file', event.currentTarget.files[0]);
                                } else {
                                    formik.setFieldValue('uploaded_file', null);
                                }
                            }
                        }

                    />

                    <br />
                    <Center>
                        <Group
                          justify="center"
                          gap="xl"
                        >
                            <Button
                              type="submit"
                              variant="gradient"
                              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                            >
                                Publier
                            </Button>
                            <Button
                              type="reset"
                              variant="gradient"
                              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                              onClick={redirect}
                              size="medium">
                                Retour à la liste
                            </Button>
                        </Group>
                    </Center>
                </Paper>
            </form>
        </Container>

    );
};

export default PostForm;
