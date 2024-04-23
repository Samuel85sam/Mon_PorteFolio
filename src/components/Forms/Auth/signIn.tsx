import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CRUD from "../../../business/api-requests/CRUD";
import { useNavigate } from "react-router-dom";
import { NewUserData, useAuthStore } from "../../../store-zustand/authStore";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Group,
  Button,
} from '@mantine/core';

const SignIn = () => {
  const setUserData = useAuthStore((state) => state.addUserData);
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    adressMail: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(6, 'must be min 6 char')
      .required('Required')
  })

  const formik = useFormik({

    initialValues: {
      adressMail: 'samuel@gmail.com2',
      password: "password"
    },
    validationSchema: SignupSchema,

    onSubmit: async (values) => {

      const response = await CRUD.auth(values);

      if (response?.status === 401) {
        console.log('adresse mail ou password incorrect')
        alert('adresse mail ou password incorrect')
        navigate('/auth')
      }
      if (response?.status === 404) {
        navigate('/auth')
      } else {
        if (response !== undefined) {
          const userData: NewUserData = {
            currentUser: response.data.id,
            jwt: response.data.jwt,
            isAuthenticated: true
          }
          setUserData(userData)
          navigate('/posts')
        }
      }
    }
  });
  console.log(formik);

  return (
    <>
      <Container size={420} my={40}>
        <form
          onSubmit={formik.handleSubmit}
        >
          <Title ta="center" >
            Welcome back!
          </Title>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="Email" placeholder="you@mantine.dev" required
              id="email"
              name="adressMail"
              type="email"
              error={formik.errors.adressMail}
              onChange={formik.handleChange}

              value={formik.values.adressMail} />
            <PasswordInput label="Password" placeholder="Your password" required mt="md"
              id="password"
              name="password"
              type="password"
              error={formik.errors.password}
              onChange={formik.handleChange}
              value={formik.values.password} />
            <Group justify="space-between" mt="lg">
            </Group>
            <Button
              fullWidth mt="xl"
              type="submit"
            >
              Se connecter
            </Button>
          </Paper>
        </form>
      </Container>
    </>

  )
}


export default SignIn


