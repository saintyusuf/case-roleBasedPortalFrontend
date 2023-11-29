import {Link} from "react-router-dom"
import { Box, Button, Text } from "@chakra-ui/react"
import DatatableStyled from "../../components/datatableStyled"
import axios from "../../axios"
import { useEffect, useState } from "react"
import { InterfaceUser } from "../../redux/slices/user"

const Customers = () => {

  const columns = [
    {
      name: 'ID',
      selector: (row:any) => row._id,
      sortable: true,
      width: "150px"
    },
    {
      name: 'Name',
      selector: (row:any) => row.name,
      sortable: true,
      width: "150px"
    },
    {
      name: 'Email',
      selector: (row:any) => row.email,
      sortable: true,
      width: "150px"
    },
    {
      name: 'Projects',
      selector: (row:any) => row.projects,
      sortable: true,
      width: "150px",
      cell: (row:any) => (
        <Text>{row.projects.length}</Text>
      )
    },
    {
      name: 'Messages',
      selector: (row:any) => row.messages,
      sortable: true,
      width: "150px",
      cell: (row:any) => (
        <Text>{row.messages.length}</Text>
      )
    },
    {
      name: 'Actions',
      selector: (row:any) => row.id,
      width: "150px",
      cell: (row:any) => (
        <Box display="flex">
          <Box as={Link} to={`/admin/customers/edit/${row._id}`} mr="5px">Edit</Box>
        </Box>
      )
    },
  ]

  const [data, setData] = useState<InterfaceUser[]>([])

  function getDatas(){

    axios.get('http://localhost:5001/customer').then(res => {
      setData(res.data)
    }).catch(err => {
      console.log(err)
    })
    
  }

  useEffect(()=>{
    getDatas()
  },[])
  
  return (
    <>
      <Box mb="10px" display="flex" alignItems="center">
        <Box w="33.33%"/>
        <Box w="33.33%" textAlign="center">
          <Text fontSize="22px" fontWeight="bold">Customers</Text>
        </Box>
        <Box w="33.33%" display="flex" justifyContent="end">
          <Button as={Link} to="/admin/customers/add" colorScheme="blue" fontSize="14px">Add Customer</Button>
        </Box>
      </Box>
      <DatatableStyled columns={columns} data={data} pagination/>
    </>
  )
}

export default Customers