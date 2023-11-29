import {useNavigate} from 'react-router-dom'
import { Box, Button, Heading, Input, Switch, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, useColorMode } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import { login } from '../redux/slices/user'
import { jwtDecode } from 'jwt-decode'

const Login = () => {

  const [inputs, setInputs] = useState({
    admin: {
      email: '',
      password: ''
    },
    customer: {
      email: '',
      password: ''
    }
  })

  const [tabIndex, setTabIndex] = useState(0)

  function hangleInputs(e: any) {
    const {name, value} = e.target
    if(tabIndex === 0) setInputs({...inputs, customer: {...inputs.customer,[name]: value}})
    else if(tabIndex === 1) setInputs({...inputs, admin: {...inputs.admin,[name]: value}})
  }
  
  const navigate = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode()
  
  function loginCustomer() {
    
    axios.post('http://localhost:5001/customer/login', inputs.customer).then(res => {
      const decodedToken:any = jwtDecode(res.data)
      localStorage.setItem("token", res.data)
      localStorage.setItem("_id", decodedToken.user._id)
      window.location.reload()
      navigate("/customer")
    }).catch(err => {
      console.log(err)
    })
    
  }
  
  function loginAdmin() {

    axios.post('http://localhost:5001/admin/login', inputs.admin).then(res => {
      const decodedToken:any = jwtDecode(res.data)
      localStorage.setItem("token", res.data)
      localStorage.setItem("_id", decodedToken.user._id)
      window.location.reload()
      navigate("/admin")
    }).catch(err => {
      console.log(err)
    })
    
  }
  
  return (
    <>
      <Box pos="relative" h="100vh">
          <Box pos="absolute" right="0" top="0" h="7vh" display="flex" alignItems="center" px="10px">
            <Switch isChecked={colorMode === "light" ? false : true} ml="auto" onChange={toggleColorMode} />
          </Box>
        
        <Box pos="absolute" left="50%" top="50%" transform="translate(-50%,-50%)" w="300px" border="1px solid var(--borderColor)" borderRadius="15px">
          <Box py="10px" borderBottom="1px solid var(--borderColor)">
            <Heading textAlign="center" fontSize="25px" color="var(--textColor1)">Login</Heading>
          </Box>
          <Tabs position="relative" variant="unstyled" onChange={(index)=>setTabIndex(index)}>
            <TabList>
              <Tab w="50%" color="var(--textColor2)">Customer</Tab>
              <Tab w="50%" color="var(--textColor2)">Admin</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="blue.500"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
                <Input placeholder="Email" type="email" mb="10px" name="email" value={inputs.customer.email} onKeyDown={(e)=>e.key === "Enter" && loginAdmin()} onChange={hangleInputs} />
                <Input placeholder="Password" type="password" mb="10px" name="password" value={inputs.customer.password} onKeyDown={(e)=>e.key === "Enter" && loginAdmin()} onChange={hangleInputs} />
                <Button w="100%" colorScheme="blue" onClick={loginCustomer}>Login</Button>
              </TabPanel>
              <TabPanel>
                <Input placeholder="Email" type="email" mb="10px" name="email" value={inputs.admin.email} onKeyDown={(e)=>e.key === "Enter" && loginAdmin()} onChange={hangleInputs} />
                <Input placeholder="Password" type="password" mb="10px" name="password" value={inputs.admin.password} onKeyDown={(e)=>e.key === "Enter" && loginAdmin()} onChange={hangleInputs} />
                <Button w="100%" colorScheme="blue" onClick={loginAdmin}>Login</Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </>
  )
}

export default Login