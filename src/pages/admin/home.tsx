import {Link} from "react-router-dom"
import { Box, Text } from '@chakra-ui/react'
import { useEffect, useState } from "react"
import axios from "../../axios"

const Home = () => {

  const pageFor = window.location.pathname.split("/")[1] // admin or customer

  const [data, setData] = useState({
    customerLength: 0,
    projectLength: 0
  })

  function getDatas(){

    axios.get('http://localhost:5001/customer/length').then(res => {
      setData({projectLength: res.data.projectLength, customerLength: res.data.customerLength})
    }).catch(err => {
      console.log(err)
    })
    
  }

  useEffect(()=>{
    getDatas()
  },[])

  const cards = [
    {
      title: "Customers",
      value: data.customerLength,
      path: `/${pageFor}/customers`,
      visibleFor: ["admin"]
    },
    {
      title: "Projects",
      value: data.projectLength,
      path: `/${pageFor}/projects`,
      visibleFor: ["admin", "customer"]
    }
  ]
  
  return (
    <>
      <Box display="flex" flexWrap="wrap">
        {
          cards.filter(card=>card.visibleFor.includes(pageFor)).map((card, index) => (
            <Card key={index} title={card.title} value={card.value} path={card.path} />
          ))
        }
      </Box>
    </>
  )
}

export default Home

function Card(props: {title: string, value: number, path: string}){

  return (
    <Box width="25%" aspectRatio="1/1" p="5px">
      <Box as={Link} to={props.path} display="block" border="1px solid var(--borderColor)" w="100%" h="100%" borderRadius="15px">
        <Box h="35px" borderBottom="1px solid var(--borderColor)" display="flex" alignItems="center" justifyContent="center">
          <Text color="var(--textColor1)">{props.title}</Text>
        </Box>
        <Box h="calc(100% - 35px)" display="flex" alignItems="center" justifyContent="center">
          <Text color="var(--textColor2)">{props.value}</Text>
        </Box>
      </Box>
    </Box>
  )
}