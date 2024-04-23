/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */
import { AppShell, Burger, Group, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './home.module.css';
import Logo from '../Logo/logo';

const Home = () => {
    const [main, setMain] = useState<any>(); // Définition de main comme de type any
    const navigate = useNavigate();

    const [opened, { toggle }] = useDisclosure();

    const home = () => {
        navigate('/');
        setMain('');
    };

    const gallery = () => setMain('photo');

    const contact = () => setMain('contact pop-up');

    const backOffice = () => {
        navigate('back_office');
    };


    return (
        <AppShell
          header={{ height: 60 }}
          navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
          padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Group justify="space-between" style={{ flex: 1 }}>
                        <Logo />
                        <Group ml="xl" gap={0} visibleFrom="sm">
                            <UnstyledButton
                              className={classes.control}
                              onClick={home}
                            >Home
                            </UnstyledButton>
                            <UnstyledButton
                              className={classes.control}
                              onClick={gallery}
                            >Gallerie Photo
                            </UnstyledButton>
                            <UnstyledButton
                              className={classes.control}
                              onClick={contact}
                            >Contacts
                            </UnstyledButton>
                            <UnstyledButton
                              className={classes.control}
                              onClick={backOffice}
                            >Admin
                            </UnstyledButton>
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar py="md" px={4}>
                <UnstyledButton
                  className={classes.control}
                  onClick={home}
                >Home
                </UnstyledButton>
                <UnstyledButton
                  className={classes.control}
                  onClick={gallery}
                >Gallerie Photo
                </UnstyledButton>
                <UnstyledButton
                  className={classes.control}
                  onClick={contact}
                >Contact
                </UnstyledButton>
                <UnstyledButton
                  className={classes.control}
                  onClick={backOffice}
                >Admin
                </UnstyledButton>
            </AppShell.Navbar>

            <AppShell.Main>
                {main}
            </AppShell.Main>
        </AppShell>
    );
};
export default Home;
