import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/icons/LogoAL.svg';

const Wrapper = styled.div`
  cursor: pointer;
  
    &:hover{
    #fill{
      fill:#fff;
    }
    p{
      color: #fff;
    }
  }

  #fill{
    fill:#abb2bf;
  }

  .logo {
  width: 6.25rem;
  height: 2.5rem;
  display: flex;
  align-items: center;

    svg {
      flex: 0 0 50%;
      height: 100%;
      object-fit: cover;
    }
  }

  .name{
    text-align: center;
  }

  p{
    color: #abb2bf;
    font-weight: 700;
  }
`;

function LogoLira() {
  return (
    <Wrapper>
      <Link to="/" className="logo">
        <Logo />
        <div className="name">
          <p>Lira</p>
          <p>Artem</p>
        </div>
      </Link>
    </Wrapper>
  );
}

export default LogoLira;
