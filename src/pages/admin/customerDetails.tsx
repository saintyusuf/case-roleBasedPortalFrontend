import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Input, Text } from '@chakra-ui/react'
import axios from '../../axios'
import { InterfaceCustomer, InterfaceProject, projectStatus } from '../../typescript/customer'

const CustomerDetails = () => {

  const navigate = useNavigate()
  const pagePurpose = window.location.pathname.split('/')[3] // add or edit
  const pageFor = window.location.pathname.split('/')[1] // admin or customer

  const { id } = useParams()

  const [data, setData] = useState<InterfaceCustomer | null>(null)

  function getData() {
    axios.get(`http://localhost:5001/customer/${id}`).then(res => {
      setData(res.data)
    }).catch(err => {
      console.log(err)
      navigate("/admin/customers")
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

    axios.put(`http://localhost:5001/customer/${id}`, data).then(res => {
      pageFor === "admin" ? navigate("/admin/customers") : navigate("/customer")
    }).catch(err => {
      console.log(err)
    })
    
  }

  function handleAdd() {

    axios.post('http://localhost:5001/customer/', data).then(res => {
      navigate("/admin/customers")
    }).catch(err => {
      console.log(err)
    })
    
  }

  function handleDelete(){
      
      axios.delete(`http://localhost:5001/customer/${id}`).then(res => {
        navigate("/admin/customers")
      }).catch(err => {
        console.log(err)
      })
  }
  
  return (
    <>
      <Box>
        <Box mb="10px" display="flex" alignItems="center" justifyContent="center">
          <Box w="33.33%">
            {
              pageFor === "admin" &&
              <Button as={Link} to="/admin/customers" colorScheme="gray" fontSize="14px">Back</Button>
            }
          </Box>
          <Box w="33.33%" textAlign="center">
            <Text fontSize="22px" fontWeight="bold">Customer {pagePurpose === "edit" ? "Edit" : "Add"}</Text>
          </Box>
          <Box w="33.33%"/>
        </Box>
        {pagePurpose === "edit" && (
          <Box mb="10px">
            <Text fontSize="14px">Customer ID</Text>
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
            <Input fontSize="14px" name="password" defaultValue={data?.password} onChange={handleInputs} />
          </Box>
        )}
        {
          pagePurpose === "edit" && 
          <Box mb="10px">
            <Box display="flex" alignItems="center">
              <Text fontSize="14px" mr="10px">Projects</Text>
              <Button as={Link} to={`/${pageFor}/projects/add/${id}`} fontSize="14px" size="xs">Create</Button>
            </Box>
            <Box display="flex" flexWrap="wrap">
              {
                data?.projects?.map((project: InterfaceProject, i: number) => 
                  <Box key={i} w="25%" p="5px">
                    <Box border="1px solid var(--borderColor)" borderRadius="5px" p="5px">
                      <Box display="flex">
                        <Text fontSize="14px" color="var(--textColor3)" mr="5px">Project ID:</Text>
                        <Text fontSize="14px" color="var(--textColor1)">{project._id}</Text>
                      </Box>
                      <Box display="flex">
                        <Text fontSize="14px" color="var(--textColor3)" mr="5px">Name:</Text>
                        <Text fontSize="14px" color="var(--textColor1)">{project.name}</Text>
                      </Box>
                      <Box display="flex">
                        <Text fontSize="14px" color="var(--textColor3)" mr="5px">Description:</Text>
                        <Text fontSize="14px" color="var(--textColor1)">{project.description}</Text>
                      </Box>
                      <Box display="flex">
                        <Text fontSize="14px" color="var(--textColor3)" mr="5px">Status:</Text>
                        <Text fontSize="14px" color="#fff" bgColor={projectStatus(project.status)?.color} px="4px" borderRadius="4px">{projectStatus(project.status)?.name}</Text>
                      </Box>
                      <Button as={Link} to={`/${pageFor}/projects/edit/${data._id}/${project._id}`} size="xs" fontSize="12px" mt="5px">Edit</Button>
                    </Box>
                  </Box>
                )
              }
            </Box>
          </Box>
        }
        <Box mb="10px">
          {pagePurpose === "edit" && pageFor === "admin" && <Button colorScheme="red" fontSize="14px" mr="10px" onClick={handleDelete}>Delete</Button>}
          <Button colorScheme="blue" fontSize="14px" onClick={pagePurpose === "edit" ? handleUpdate : handleAdd}>{pagePurpose === "edit" ? "Update" : "Add"}</Button>
        </Box>
      </Box>
    </>
  )
}

export default CustomerDetails