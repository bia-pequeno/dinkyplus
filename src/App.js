import React, {Component} from "react"
import { BrowserRouter as Router, Link, Routes, Route, NavigationType } from "react-router-dom"
import styled from 'styled-components'
import { createGlobalStyle } from "styled-components"
import Movies from "./pages/Movies"
import Series from "./pages/Series"
import Home from "./pages/Home"

const GlobalStyle = createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
        list-style:none;
        text-decoration: none;
    }
    body{
        background-color:#000;
        color:#fff;
    }
`
const Navigation = styled.nav`
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: space-evenly;
    ul{
      width: 70%;
      display: flex;
      justify-content: space-evenly;
   }
    li{
      font-size: 1.6vw;
      color: #D9D9D9;
      }
`

export default class App extends Component{
  render(){
    return(
      <Router>
      <GlobalStyle/>
      <Navigation>
        <ul>
          <li><Link to="home">Home</Link></li>
          <li><Link to="movies">Movies</Link></li>
          <li><Link to="series">Series</Link></li>
        </ul>
      </Navigation>
      <Routes>
        <Route path="home" element={<Home/>}/>
        <Route path="movies" element={<Movies/>}/>
        <Route path="series" element={<Series/>}/>
        </Routes>
      </Router>
    )
  }
}