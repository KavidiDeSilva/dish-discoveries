import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import {motion} from 'framer-motion';
import {Link, useParams} from 'react-router-dom';

function Cuisine() {

  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  useEffect(() => {
      getCuisine(params.type);
      console.log(params.type);
  }, [params.type]);

  const getCuisine = async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`)
    const recipes = await data.json();
    setCuisine(recipes.results);

  }


  return (
    <Grid
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{opacity:0}}
    >
    {cuisine.map((item) => {
      return(
        <Card key={item.id}>
          <Link to={"/recipe/" + item.id}>
          <img src={item.image} alt='' />
          <h4>{item.title}</h4>
          </Link>
        </Card>
      )
    })}
    </Grid>
  )
}


const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 2rem;
   
`;

const Card = styled.div`
  img{
    width:100%;
    border-radius:2rem;
  }
  a{
    text-decoration: none;
  }
  h4{
    text-align: center;
    padding:1rem;
  }
`;

export default Cuisine