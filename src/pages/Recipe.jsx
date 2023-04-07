import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import styled from "styled-components";


function Recipe() {

  let params = useParams();
  const [details, setDetails] = useState([]);
  const [activeTabs, setActiveTabs] = useState('instructions');
  

    const fetchDetails = async() => {
        const data =await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const detailData = await data.json();
        setDetails(detailData);
        console.log(detailData);
    };

    useEffect(() => {
      fetchDetails();
    }, [params.name]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button className={activeTabs === "instructions" ? "active" : ""} onClick={() => setActiveTabs("instructions")}>Instructions</Button>
        <Button className={activeTabs === "ingrediants" ? "active" : ""} onClick={() => setActiveTabs("ingrediants")}>Ingrediants</Button>
        {activeTabs === 'instructions' && (
          <div>
            <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
            <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
          </div>
        )};

        {activeTabs === 'ingrediants' && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )};
       
          

      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top:5rem;
  margin-bottom:5rem;
  display:flex;
  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2{
    margin-bottom:2rem;
  }
  img{
    width: 400px;
  }
  li{
    font-size:1.2rem;
    line-height:2.5rem;
  }
  ul{
    margin-top:2rem;
  }

`;

const Button = styled.button`
  padding:0.5rem 1rem;
  color:#313131;
  background: white;
  border:2px solid black;
  margin-right:1rem;
  font-weight:600;
`;

const Info = styled.div`
  margin-left:4rem;
`;

export default Recipe