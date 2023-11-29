import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { InterfaceAdmin } from '../../typescript/admin'
import { Box, Button, Input, Text } from '@chakra-ui/react'
import axios from '../../axios'

const AdminDetails = () => {

  const navigate = useNavigate()
  const pagePurpose = window.location.pathname.split('/')[3] // add or edit

  const { id } = useParams()

  const [data, setData] = useState<InterfaceAdmin | null>(null)

  function getData() {
    axios.get(`http://localhost:5001/admin/${id}`).then(res => {
      setData(res.data)
    }).catch(err => {
      console.log(err)
      navigate("/admin/admins")
    })
  }
  
  useEffect(() => {
    if(pagePurpose === "edit") getData()
  }, [id])

  function handleInputs(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setData(prev => ({...prev,[name]: value}))
  }

  function handleUpdate() {

    axios.put(`http://localhost:5001/admin/${id}`, data).then(res => {
      navigate("/admin/admins")
    }).catch(err => {
      console.log(err)
    })
    
  }

  function handleAdd() {
    
    axios.post('http://localhost:5001/admin/', data).then(res => {
      navigate("/admin/admins")
    }).catch(err => {
      console.log(err)
    })
    
  }

  function handleDelete(){
      
      axios.delete(`http://localhost:5001/admin/${id}`).then(res => {
        navigate("/admin/admins")
      }).catch(err => {
        console.log(err)
      })
  }
  
  return (
    <>
      <Box>
        <Box mb="10px" display="flex" alignItems="center" justifyContent="center">
          <Box w="33.33%">
            <Button as={Link} to="/admin/admins" colorScheme="gray" fontSize="14px">Back</Button>
          </Box>
          <Box w="33.33%" textAlign="center">
            <Text fontSize="22px" fontWeight="bold">Admin {pagePurpose === "edit" ? "Edit" : "Add"}</Text>
          </Box>
          <Box w="33.33%"/>
        </Box>
        {pagePurpose === "edit" && (
          <Box mb="10px">
            <Text fontSize="14px">Admin ID</Text>
            <Input fontSize="14px" name="id" defaultValue={data?._id} disabled/>
          </Box>
        )}
        <Box mb="10px">
          <Text fontSize="14px">Name</Text>
          <Input fontSize="14px" name="name" defaultValue={data?.name} onChange={handleInputs} />
        </Box>
        <Box mb="10px">
          <Text fontSize="14px">Email</Text>
          <Input fontSize="14px" name="email" defaultValue={data?.email} onChange={handleInputs} />
        </Box>
        {pagePurpose === "add" && (
          <Box mb="10px">
            <Text fontSize="14px">Password</Text>
            <Input fontSize="14px" name="password" defaultValue={data?.password} onChange={handleInputs}/>
          </Box>
        )}
        <Box mb="10px">
          {pagePurpose === "edit" && <Button colorScheme="red" fontSize="14px" mr="10px" onClick={handleDelete}>Delete</Button>}
          <Button colorScheme="blue" fontSize="14px" onClick={pagePurpose === "edit" ? handleUpdate : handleAdd}>{pagePurpose === "edit" ? "Update" : "Add"}</Button>
        </Box>
      </Box>
    </>
  )
}

export default AdminDetails