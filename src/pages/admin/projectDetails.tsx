import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Input, Select, Text } from '@chakra-ui/react'
import { InterfaceProject, InterfaceProjectApi, TypeProjectStatus, projectStatusData } from '../../typescript/customer'
import axios from '../../axios'

const ProjectDetails = () => {

  const pageFor = window.location.pathname.split('/')[1] // admin or customer

  const navigate = useNavigate()
  const pagePurpose = window.location.pathname.split('/')[3] // add or edit

  const { customerId, projectId } = useParams()

  const [data, setData] = useState<InterfaceProjectApi | null>({
    _id: customerId ?? "",
    project: {
      _id: projectId ?? "",
      name: "",
      description: "",
      status: 0
    }
  })

  function getData() {
    axios.get(`/project/${customerId}/${projectId}`).then(res => {
      setData(res.data)
    }).catch(err => {
      navigate("/admin/projects")
    })
  }
  
  useEffect(() => {
    if(pagePurpose === "edit") getData()
  }, [customerId])

  function handleInputs(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target
    
    if (name === "status") setData({...data, project: {...data?.project, [name]: parseInt(value) as TypeProjectStatus }})
    else setData({...data, [name]: value, project: {...data?.project, [name]: value}})
    
  }

  function handleAdd() {

    axios.post(`/project/${customerId}`, {
      name: data?.project.name,
      description: data?.project.description,
      status: data?.project.status
    }).then(res => {
      navigate(`/${pageFor}/projects`)
    }).catch(err => {
      console.log(err)
    })
    
  }

  function handleUpdate() {

    axios.put(`/project/${customerId}/${projectId}`, {
      name: data?.project.name,
      description: data?.project.description,
      status: data?.project.status
    }).then(res => {
      navigate(`/${pageFor}/projects`)
    }).catch(err => {
      console.log(err)
    })
    
  }

  function handleDelete(){
      
      axios.delete(`/project/${customerId}/${projectId}`).then(res => {
        navigate("/admin/projects")
      }).catch(err => {
        console.log(err)
      })
  }
  
  return (
    <>
      <Box>
        <Box mb="10px" display="flex" alignItems="center" justifyContent="center">
          <Box w="33.33%">
            <Button as={Link} to={`/${pageFor}/projects`} colorScheme="gray" fontSize="14px">Back</Button>
          </Box>
          <Box w="33.33%" textAlign="center">
            <Text fontSize="22px" fontWeight="bold">Project {pagePurpose === "edit" ? "Edit" : "Add"}</Text>
          </Box>
          <Box w="33.33%"/>
        </Box>
        <Box mb="10px">
          <Text fontSize="14px">Customer ID</Text>
          <Input fontSize="14px" name="_id" defaultValue={data?._id} disabled />
        </Box>
        {pagePurpose === "edit" && (
          <Box mb="10px">
            <Text fontSize="14px">Project ID</Text>
            <Input fontSize="14px" name="_id" defaultValue={data?.project._id} disabled />
          </Box>
        )}
        <Box mb="10px">
          <Text fontSize="14px">Name</Text>
          <Input fontSize="14px" name="name" defaultValue={data?.project.name} onChange={handleInputs} />
        </Box>
        <Box mb="10px">
          <Text fontSize="14px">Description</Text>
          <Input fontSize="14px" name="description" defaultValue={data?.project.description} onChange={handleInputs} />
        </Box>
        <Box mb="10px">
          <Text fontSize="14px">Status</Text>
          <Select fontSize="14px" name="status" defaultValue={data?.project.status} onChange={handleInputs}>
            {
              projectStatusData.map((status,i) => (
                <option key={i} value={status.id} selected={data?.project.status === status.id}>{status.name}</option>
              ))
            }
          </Select>
        </Box>
        <Box mb="10px">
          {pagePurpose === "edit" && <Button colorScheme="red" fontSize="14px" mr="10px" onClick={handleDelete}>Delete</Button>}
          <Button colorScheme="blue" fontSize="14px" onClick={pagePurpose === "edit" ? handleUpdate : handleAdd}>{pagePurpose === "edit" ? "Save" : "Add"}</Button>
        </Box>
      </Box>
    </>
  )
}

export default ProjectDetails