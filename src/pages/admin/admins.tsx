import {Link} from "react-router-dom"
import { Box, Button, Text } from "@chakra-ui/react"
import DatatableStyled from "../../components/datatableStyled"
import { useEffect, useState } from "react"
import axios from "../../axios"
import { InterfaceAdmin } from "../../typescript/admin"

const Admins = () => {

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
      name: 'Actions',
      selector: (row:any) => row.id,
      width: "150px",
      cell: (row:any) => (
        <Box display="flex">
          <Box as={Link} to={`/admin/admins/edit/${row._id}`} mr="5px">Edit</Box>
        </Box>
      )
    },
  ]

  const [data, setData] = useState<InterfaceAdmin[]>([])

  function getDatas(){

    axios.get('http://localhost:5001/admin').then(res => {
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
          <Text fontSize="22px" fontWeight="bold">Admin</Text>
        </Box>
        <Box w="33.33%" display="flex" justifyContent="end">
          <Button as={Link} to="/admin/admins/add" colorScheme="blue" fontSize="14px">Add Admin</Button>
        </Box>
      </Box>
      <DatatableStyled columns={columns} data={data} pagination/>
    </>
  )
}

export default Admins