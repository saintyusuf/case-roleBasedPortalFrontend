import React, { FC, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, Switch, useColorMode } from '@chakra-ui/react'
import { FaAngleRight as IconRight, FaRegUser as IconUser } from "react-icons/fa";

interface Props {
  children: React.ReactNode
  role: "admin" | "customer"
}

const CustomerLayout:FC<Props> = (props) => {

  const { colorMode, toggleColorMode } = useColorMode()
  const location = useLocation()

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const refUserMenu = useRef<any>(null)
  
  function collapseUserMenu() {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      
      if(refUserMenu.current){
        if(!refUserMenu.current?.contains(e.target)){
          setIsUserMenuOpen(false)
        }
      }

      document.addEventListener("keydown", (e)=>{
        if(e.keyCode === 27){
          setIsUserMenuOpen(false)
        }
      })
      
    })
  }, [])
  
  return (
    <>
      <Box display="flex" w="100vw" h="100vh">
        <Box w="20vw" h="100vh" borderRight="1px solid var(--borderColor)">
          <Box display="flex" justifyContent="center" alignItems="center" h="7vh" borderBottom="1px solid var(--borderColor)">
            <Box as={Link} to={props.role === "admin" ? "/admin" : "/customer"} textDecoration="none!important" color="var(--textColor1)">
              {props.role === "admin" ? "Admin" : "Customer"} Panel
            </Box>
          </Box>
          <Box display="flex" flexDir="column" h="calc(100vh - 7vh)">
            {
              (props.role === "admin" ? [...menus.admin.left] : [...menus.customer.left]).map((item, i) => {
                return (
                  <Box key={i} w="100%" borderBottom="1px solid var(--borderColor)" display="flex" alignItems="center" px="10px">
                    <Box as={Link} to={item.path} h="45px" fontSize="14px" textDecoration="none!important" display="flex" alignItems="center" w="100%" color="var(--textColor1)">
                      {item.name} {location.pathname === item.path && <Box as={IconRight} ml="auto" color="var(--textColor2)"/>}
                    </Box>
                  </Box>
                )
              })
            }
          </Box>
        </Box>
        <Box display="flex" flexDir="column">
          <Box w="80vw" h="7vh" borderBottom="1px solid var(--borderColor)" display="flex" alignItems="center" px="10px">
            
            <Box pos="relative" ml="auto" ref={refUserMenu}>
              <Box p="5px" border="1px solid var(--textColor1)" borderRadius="7.5px" cursor="pointer" onClick={collapseUserMenu}>
                <Box as={IconUser} color="var(--textColor1)"/>
              </Box>

              {
                isUserMenuOpen && 
                <Box pos="absolute" zIndex={10} right="-20px" top="35px" w="150px" bg="var(--bgColor1)" border="1px solid var(--borderColor)" borderRadius="15px" p="5px">
                  {
                    (props.role === "admin" ? [...menus.admin.user] : [...menus.customer.user]).map((item, i) => {
                      return (
                        <Box key={i} w="100%" borderBottom="1px solid var(--borderColor)" display="flex" alignItems="center" px="10px" sx={{"&:last-child": {borderBottom: "0px"}}}>
                          <Box as={Link} to={item.path} h="35px" fontSize="14px" textDecoration="none!important" display="flex" alignItems="center" w="100%" color="var(--textColor1)">
                            {item.name}
                          </Box>
                        </Box>
                      )
                    })
                  }
                </Box>
              }
            </Box>

            <Switch isChecked={colorMode === "light" ? false : true} ml="10px" onChange={toggleColorMode} />
          </Box>

          <Box w="80vw" h="calc(100vh - 7vh)" p="10px">
            {
              props.children
            }
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default CustomerLayout

const menus = {
  admin: {
    left: [
      {
        name: 'Dashboard',
        path: '/admin'
      },
      {
        name: 'Customers',
        path: '/admin/customers'
      },
      {
        name: 'Projects',
        path: '/admin/projects'
      }
    ],
    user: [
      {
        name: 'Messages',
        path: '/admin/messages'
      },
      {
        name: 'Admins',
        path: '/admin/admins'
      },
      {
        name: 'Logout',
        path: '/logout'
      }
    ]
  },
  customer: {
    left: [
      {
        name: 'Dashboard',
        path: '/customer'
      },
      {
        name: 'Projects',
        path: '/customer/projects'
      }
    ],
    user: [
      {
        name: 'Messages',
        path: '/customer/messages'
      },
      {
        name: 'Profile',
        path: `/customer/profile/edit/${localStorage.getItem("_id")}`
      },
      {
        name: 'Logout',
        path: '/logout'
      }
    ]
  }
}