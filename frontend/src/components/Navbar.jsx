import React, { useState } from 'react'
import {
  LightModeOutlined, DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined
} from '@mui/icons-material'
import FlexBetween from './FlexBetween'
import { useDispatch } from 'react-redux'
import { setMode } from 'state'
import profileImg from 'assets/ronnie.jpg'
import { AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'

const Navbar = ({ isOpen, setIsOpen, user }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl)

  const handleClick = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)
  return (
    <AppBar sx={{
      position: "static",
      background: "none",
      boxShadow: "none"
    }}>
      <Toolbar sx={{
        justifyContent: "space-between",
        display: isNonMobile ? "flex" : "block",
        m: "0.6rem 0"
      }}>
        <FlexBetween>
          <IconButton onClick={() => setIsOpen(!isOpen)}>
            <MenuIcon sx={{ fontSize: "25px" }} />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p=".1rem 1.5rem"
          >
            <InputBase placeholder='Search...' />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <FlexBetween>
            <Button onClick={handleClick} sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textTransform: 'none',
              gap: '1rem'
            }}>
              <Box
                component="img"
                alt="profile"
                src={profileImg}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: 'cover' }}
              />
              <Box textAlign="left">
                <Typography fontWeight="bold" fontSize=".85rem"
                  sx={{ color: theme.palette.secondary[100] }}>
                  {user?.name}
                </Typography>
                <Typography fontWeight="bold" fontSize=".75rem"
                  sx={{ color: theme.palette.secondary[200] }}>
                  {user?.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px"
                }}
              />
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClick}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
