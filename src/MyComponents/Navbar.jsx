import React from 'react'
import styled from 'styled-components'
import elephant from '../Images/elephant3-fotor-20230825195427.jpg';

const NavContainer = styled.div`
    width: 100vw;
    /* background-color: #3a651e; */
    /* background: linear-gradient(90deg, rgba(58,101,30,1) 0%, rgba(58,101,30,1) 41%, rgba(39,255,0,0.11808473389355745) 100%); */
    /* background: linear-gradient(90deg, rgba(58,101,30,1) 0%, rgba(58,101,30,1) 35%, rgba(160,170,0,1) 100%); */
    /* background: linear-gradient(90deg, rgba(58,101,30,1) 0%, rgba(58,101,30,1) 40%, rgba(229,233,153,0.3701855742296919) 100%);    flex: 0.15; */
    background: linear-gradient(90deg, rgba(58,101,30,1) 0%, rgba(58,101,30,1) 40%, rgba(229,233,153,0.9360119047619048) 100%);
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow:hidden;
`;

const Logo = styled.div`
 width: 10rem;
 display: flex;
 align-items: center;
 color: black;
 font-weight: 500;
`
const Name = styled.h1`
  color: #cbc361;
  /* color:lightgray; */
  letter-spacing: 0.2rem;
  font-weight: 500;
`
const Filters = styled.div``

const Navbar = () => {
  return (
    <NavContainer>
      <Logo><img src={elephant} style={{height:'5rem',width:'7rem'}}></img>
          MYSORE ELEPHANT RESERVE
      </Logo>
      <Name>Monitoring Illegal Killing Of Elephants</Name>
      <Filters>Contact</Filters>
    </NavContainer>
  )
}

export default Navbar;
