import React, {useEffect, useState} from 'react';

import {
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react'

import api from '../../services/api';

import Loader from '../../assets/loader.gif'

const App = () => {
  const [data, setData] = useState({});
  const [allJokes, setAllJokes] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [searchJoke, setSearchJoke] = useState('');

  useEffect(() => {
    setIsLoad(true)
    api.get('random').then(
      response => {
        setData(response.data)
      }
    )
    .catch( e => console.error(e))
    .finally( () => setTimeout(() => {
      setIsLoad(false)
    }, 2500))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoad(true)
    api.get(`search?query=${searchJoke}`).then(
      res => {
        setIsSearch(true)
        setAllJokes(res.data)
      }
    )
    .catch( err => console.error(err))
    .finally( () => setIsLoad(false))
  }

  if(isLoad) {
    return(
      <div className="loader">
        <img src={Loader} alt="Loader" />
      </div>
    )
  }

  return(
    <div className="home-component">
       <div className='search'>
        <form onSubmit={handleSubmit}>
          <FormLabel mb='20px' display='flex' justifyContent='center' alignItems='center' >Pesquise sua piada</FormLabel>
          <Input maxW='container.lg' type="text" onChange={e => setSearchJoke(e.target.value)} />
          <Button color='#000' mt='20px' type="submit">Pesquisar</Button>
        </form>
      </div>
      { !isSearch ? (
        <div className="jokes">
          
          <h3>{data?.value}</h3>
        </div>
      ) : (
        <>
          { allJokes?.result.map( (item, index) => (
            <div key={index} className="jokes">
             
              <h3>{item?.value}</h3>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default App