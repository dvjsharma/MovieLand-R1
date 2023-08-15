import React from "react"
import "./App.css"
import searchIcon from "./search.svg"
import MovieCard from "./Movie"

export default function App(){
    const url=`https://www.omdbapi.com?apikey=c032e2d7`
    const [Moviearray, setMoviearray]=React.useState([])
    const [searchKey, setSearchKey]=React.useState("")
    React.useEffect(()=>{
        SearchMovie("batman")
    },[])
    const SearchMovie =(title)=>{
        const data=fetch(`${url}&s=${title}`)
        .then((res)=>res.json())
        .then((data)=>{
            setMoviearray(data.Search)
            console.log(Moviearray) 
            console.log(data.Search)
        })
    }
    const handelChange=()=>{
        SearchMovie(searchKey)
    }
    const Display=()=>Moviearray.map((movie)=>(
            <MovieCard movie={movie} key={movie.imdbID}/>
    ))
    return(
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input
                    placeholder="Search for Movies"
                    onChange={(e)=> setSearchKey(e.target.value)}
                    onKeyDown={(e)=> e.key==="Enter" && handelChange()}
                    value={searchKey}
                />
                <img src={searchIcon} alt="" onClick={handelChange}/>
            </div>
            <div className="container">
            {Moviearray!==undefined ? (
            Display()
            ) : (
            <h1>No Movies Found</h1>
            )}
            </div>
        </div>
    )
}