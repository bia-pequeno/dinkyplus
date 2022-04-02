import React from "react"
import axios from "axios"
import styled from 'styled-components'
import { createGlobalStyle } from "styled-components"

const apiFilmes = axios.create({
  baseURL:
    "https://api.themoviedb.org/3/movie/popular?api_key=ed08dec0710908154785f33458be1126"
})

const GlobalStyle = createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
    body{
        background-color:#000;
        
    }
`
const Title = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-evenly;
   font-size: 3vw;
   color:#3C6E71;
`
const Input = styled.input`
    width: 30%;
    height: 30px;
    background-color: whitesmoke;
    border:none;
    padding: 0 1vw;
    margin-top: 10vh; 
    border-radius: 1vw;
`
const Movies = styled.div`
    display: flex;
    align-items:center;
    justify-content:center;
    display: inline-block
`

const MovieBox = styled.div`
   margin-top:10vh;
   display:flex;
   align-items:center;
   justify-content:center;
   width:75%;
   height:35vh;
   margin-left:3vw;
    
    img{
      width: 19.8%;
      padding-right:0.5vw;
      display: flex;
      height: 110%;
      align-items: flex-start;
      transition: 0.5s;
      &:hover{
        height: 35vh;
        width: 15vw;
      }
    }
    h3{
      display:flex;
      height:100%;
      margin-right:5vw;
      margin-top: 3vh;
      font-size:2vw;
    }
    p{
      margin-right:10vw;
      width:45vw;
    }
`
const Button = styled.button`
  background-color:whitesmoke;
  border-radius:5px;
  border: none;
  height:5vh;
  width:3vw
  font-size:1.2vw;
  margin: 10px 10px 10px 10px;
`



export default class App extends React.Component {
  state = {
    listMovies: [],
    inputMovies:[]
  }

  async componentDidMount(){
    this.getMovies()
  }


  getMovies = async () => {
    const response = await apiFilmes.get();
    console.log(response.data.results);

    const movies = response.data.results.map((item) => {
      return {
        ...item,
        poster: `https://image.tmdb.org/t/p/w300/${item.poster_path}`
      }
    })

    this.setState({
      listMovies: movies,
      inputMovies: movies
    })
  }

  filtrarmovies = (ev) => {
    const {listMovies} = this.state

    if(ev.target.value === ""){
      this.setState({
        inputMovies:listMovies
      })
      return
    }

    const convertMovies = listMovies.filter((item) => {
      if(item.title.toLowerCase().includes(ev.target.value.toLowerCase())){
        return true
      }
    })

    this.setState({
      inputMovies:convertMovies
    })
  }

  render() {
    return (
      <div>
        <GlobalStyle/>
        <Input type="text" placeholder="digite um filme..." onChange={this.filtrarmovies}/>
          <Title id="voltar">Movies</Title>   
        <Movies>
          {this.state.inputMovies.map((item) => (
          <MovieBox key={item.id}>
             <img src={item.poster} alt={"Baner do Filme: ${item.title}"} />
            <h3>{item.title}</h3>
            <p>{item.overview}</p>
          </MovieBox>
          ))}  
        </Movies>
          <Button><a href="#voltar">Voltar ao topo</a></Button>
      </div>
    )
  }
}
