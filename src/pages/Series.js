import React, { Component } from "react"
import axios from "axios"
import styled from 'styled-components'
const SeriesApi = axios.create({
  baseURL:
    "https://api.themoviedb.org/3/tv/popular?api_key=ed08dec0710908154785f33458be1126"
})

const T2 = styled.div`
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
const Shows = styled.div`
    display: flex;
    align-items:center;
    justify-content:center;
    display: inline-block;
`

const Showbox = styled.div`
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
  width:3vw;
  font-size:1.2vw;
  margin: 10px 10px 10px 10px;
`

class Series extends Component {
  state = {
    series: [],
    inputSeries:[]
  };

  componentDidMount() {
    this.getSeries();
  }

  getSeries = async () => {
    const response = await SeriesApi.get();
    console.log("Series:", response.data.results);

    const completeSeries = response.data.results.map((item) => {
      return {
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`
      };
    });

    this.setState({
      series: completeSeries,
      inputSeries: completeSeries
    })
  }

  filtrarseries = (ev) => {
    const {series} = this.state

    if(ev.target.value === ""){
      this.setState({
        inputSeries:series
      })
      return
    }

    const convertSeries = series.filter((item) => {
      if(item.name.toLowerCase().includes(ev.target.value.toLowerCase())){
        return true
      }
    })

    this.setState({
      inputSeries:convertSeries
    })
  }



  render() {
    return (
      <section>
        <Input type="text" placeholder="digite um filme..." onChange={this.filtrarseries}/>
          <T2 id="voltar">SERIES</T2>
          <Shows>
          {this.state.inputSeries.map((item, id) => (
            <Showbox key={id}>
              <img src={item.poster_path} alt={"Baner do Filme: ${item.name}"} />
              <h3>{item.name}</h3>
              <p>{item.overview}</p>
            </Showbox>
          ))}
        </Shows>
        <Button><a href="#voltar">Voltar ao topo</a></Button>
      </section>
    );
  }
}

export default Series;
