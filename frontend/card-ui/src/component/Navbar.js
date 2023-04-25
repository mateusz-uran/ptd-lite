
import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Divider from '@mui/material/Divider';
import CardsList from './card/CardsList';
import { useKeycloak } from '@react-keycloak/web';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar(props) {
    const navigate = useNavigate();
    const { isLogin, username } = props;
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

    const handleLogout = () => {
        navigate('/');
        keycloak.logout();
    }

    useEffect(() => {
        let availableTheme = JSON.parse(localStorage.getItem('theme'));
        availableTheme && setDarkMode(availableTheme);
    }, []);

    return (
        <div className={`${darkMode ? 'dark bg-slate-700' : 'bg-blue-200'}`}>
            <ThemeProvider theme={darkTheme}>
                <div className='p-4 flex justify-between items-center'>
                    <div>
                        &nbsp;
                    </div>
                    <div className='flex'>
                        <div className='mx-2'>
                            {isLogin ? <Button onClick={() => handleLogout()} variant="contained" sx={{ fontWeight: 'bold' }}>Logout</Button> : null}
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
                </div>
                <Divider sx={{ borderBottomWidth: 2, marginBottom: 0 }} />
                {isLogin &&
                    <CardsList
                        user={username}
                        mode={darkMode}
                    />
                }
            </ThemeProvider>
        </div>
    );
}

export default Navbar;
