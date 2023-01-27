import React, { useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import { useGetUserQuery } from 'state/api'

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isOpen, setIsOpen] = useState(true);

  const userId = useSelector((state) => state.global.userId)

  const { data } = useGetUserQuery(userId)


  return (
    <Box width="100%" height="100%" display={isNonMobile ? "flex" : "block"}>
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={data || {}}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
