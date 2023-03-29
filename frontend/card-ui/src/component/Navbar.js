
import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Divider from '@mui/material/Divider';
import CardsList from './CardsList';
import { useKeycloak } from '@react-keycloak/web';
import { Button } from '@mui/material';

function Navbar(props) {
    const { token, isLogin, username } = props;
    const { keycloak } = useKeycloak();

    const [darkMode, setDarkMode] = useState(false);

    const handleChangeTheme = (event) => {
        setDarkMode(event.target.checked);
        localStorage.setItem('theme', JSON.stringify(event.target.checked));
    }

    const darkTheme = createTheme(darkMode ?
        {
            palette: {
                mode: 'dark',
            },
        } : {
            palette: {
                mode: 'light',
            }
        }
    )

    useEffect(() => {
        let availableTheme = JSON.parse(localStorage.getItem('theme'));
        availableTheme && setDarkMode(availableTheme);
    }, []);

    return (
        <div className={`${darkMode ? 'dark bg-slate-700' : 'bg-blue-200'}`}>
            <ThemeProvider theme={darkTheme}>
                <div className='p-4 flex justify-end items-center'>
                    <div className='mx-2'>
                        {isLogin ? <Button onClick={() => keycloak.logout()} variant="contained" sx={{ fontWeight: 'bold' }}>Logout</Button> : null}
                    </div>
                    <div className='flex items-center'>
                        <WbSunnyIcon className={darkMode ? 'text-blue-200' : 'text-white'} />
                        <Switch
                            checked={darkMode}
                            onChange={handleChangeTheme}
                        />
                        <DarkModeIcon className={darkMode ? 'text-white' : ''} />
                    </div>
                </div>
                <Divider sx={{ borderBottomWidth: 2, marginBottom: 0 }} />
                {isLogin && token &&
                    <CardsList
                        user={username}
                        mode={darkMode}
                        token={token}
                    />
                }
            </ThemeProvider>
        </div>
    );
}

export default Navbar;
