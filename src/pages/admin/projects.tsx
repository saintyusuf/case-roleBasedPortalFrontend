import {Link } from "react-router-dom"
import { Box, Button, Text } from "@chakra-ui/react"
import DatatableStyled from "../../components/datatableStyled"
import { InterfaceProject, projectStatus } from "../../typescript/customer"
import { useEffect, useState } from "react"
import axios from "../../axios"

const Projects = () => {

  const pageFor = window.location.pathname.split('/')[1] // admin or customer
  
  const columns = [
    {
      name: 'Customer ID',
      selector: (row:any) => row?._id,
      sortable: true,
      width: "150px"
    },
    {
      name: 'ID',
      selector: (row:any) => row?.project?._id,
      sortable: true,
      width: "150px"
    },
    {
      name: 'Name',
      selector: (row:any) => row?.project?.name,
      sortable: true,
      width: "150px"
    },
    {
      name: 'Description',
      selector: (row:any) => row?.project?.description,
      sortable: true,
      width: "150px",
    },
    {
      name: 'Status',
      selector: (row:any) => row?.project?.status,
      sortable: true,
      width: "150px",
      cell: (row:any) => (
        <Text bg={projectStatus(row?.project?.status)?.color} color="#fff" p="2px" borderRadius="5px">{projectStatus(row?.project?.status)?.name}</Text>
      )
    },
    {
      name: 'Actions',
      selector: (row:any) => row.id,
      width: "150px",
      cell: (row:any) => (
        <Box display="flex">
          <Box as={Link} to={`/admin/projects/edit/${row?._id}/${row?.project?._id}`} mr="5px">Edit</Box>
        </Box>
      )
    },
  ]

  const [data, setData] = useState<InterfaceProject[]>([])

  function getDatas(){

    /* pageFor === "admin" ?  */axios.get('http://localhost:5001/project').then(res => {
      setData(res.data)
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
    // : axios.get(`http://localhost:5001/project/${localStorage.getItem("_id")}`).then(res => {
    //   setData(res.data)
    //   console.log(res.data)
    // }).catch(err => {
    //   console.log(err)
    // })
    
  }

  useEffect(()=>{
    getDatas()
  },[])
  
  return (
    <>
      <Box mb="10px" display="flex" alignItems="center" h="40px">
        <Box w="33.33%"/>
        <Box w="33.33%" textAlign="center">
          <Text fontSize="22px" fontWeight="bold">Projects</Text>
        </Box>
        <Box w="33.33%" display="flex" justifyContent="end">

        </Box>
      </Box>
      <DatatableStyled columns={columns} data={data} pagination/>
    </>
  )
}

export default Projects