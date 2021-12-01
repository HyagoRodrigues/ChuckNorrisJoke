import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Flex,
  Box,
  Container,
  FormControl,
  FormLabel,
  Select,
  
}  from '@chakra-ui/react'
import Logo from '../../assets/logo.png';

import api from '../../services/api'


const Header = () => {
  const [main, setMain] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    api.get('categories').then(
      res => {
        setMain(res.data)
      }
    )
  }, [])

  const handleCategory = (e) => {
    navigate(`/categories/${e.target.value}`)
  }

  return(
    <nav>
      <Container  bg='#edecea' maxW='container.lg'>
        <Flex justify='space-around' >
          <Box pt='20px'>
            <Link to='/'>
              <img src={Logo} className="logo" alt="Logo" />
            </Link>
          </Box>

          <Box m='50px 20px'>
            <FormControl>
              <FormLabel>Categorias</FormLabel>
               <Select pt='10px' onChange={handleCategory}>
                {main?.map( (item, index) => (
                  <option key={index} value={item}> {item} </option>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export default Header;