import React,{useState,useEffect} from 'react';
import './App1.css';
import {Link} from 'react-router-dom';
import {Accordion, Spinner,Toast} from'react-bootstrap';
import {connect} from 'react-redux';
import {login, logout, current} from './store/action'




function Popular(props) {
  console.log("Redux data==>",props);
  const username = props.user_name;
  const image = props.image;
 
  const [Search,setSearch]=useState("");
  const [movies,setMovie]=useState([]);
  const [spin,setSpin]=useState(false);
  const [show, setShow] = useState(false);
  
  const obj={
    user_name:username,
    image:image
  }
  
  var get_id=[];
  var arr_movie=[];


  //default movies
  const def=async()=>{
    try{
      let find="marvel"
      setMovie([])
      setSpin(true)
      const result=await fetch(`https://www.omdbapi.com/?s=${find}&apikey=c65a24f`);
      const final_result=await result.json();
    //get movie id
      for (let index = 0; index < final_result.Search.length; index++) {
        get_id=[...get_id,final_result.Search[index].imdbID];
        
      }
  
      //console.log(get_id)
    //get movie details
      for (let index = 0; index < get_id.length; index++) {
      const result1=await fetch(`https://www.omdbapi.com/?i=${get_id[index]}&apikey=c65a24f`);
      const final_result1=await result1.json();
      arr_movie=[...arr_movie,final_result1];
      }
      setMovie(arr_movie)
      //console.log("data3===>",arr_movie);
      setSpin(false);
      
      
    }
    catch(err){
      setSpin(false);
      if(err.message){
        setShow(true)
      }
    }
  }
  useEffect(()=>{
    def();
    props.current();
    
  },[]);


  // search function
  const al=async()=>{
    if(obj.user_name!==null){
      try{
        get_id=[];
        setMovie([])
        setSpin(true)
        const result=await fetch(`https://www.omdbapi.com/?s=${Search}&apikey=c65a24f`);
        const final_result=await result.json();
      //get movie id
        for (let index = 0; index < final_result.Search.length; index++) {
          get_id=[...get_id,final_result.Search[index].imdbID];
          
        }
      //console.log(get_id)
      //get movie details
        for (let index = 0; index < get_id.length; index++) {
        const result1=await fetch(`https://www.omdbapi.com/?i=${get_id[index]}&apikey=c65a24f`);
        const final_result1=await result1.json();
        arr_movie=[...arr_movie,final_result1];
        }
        setMovie(arr_movie)
        //console.log("data3===>",arr_movie);
        setSpin(false);
        
      }
      catch(err){
        setSpin(false);
        if(err.message){
          setShow(true)
        }
      }
    }
    else{
      alert("Please login for searching")
    }
  }
    
    


  return (
    
    <div className="App"style={{backgroundColor:"#83709e"}}>

        {/* Navbar */}
    <div className="container-fluid" id="main">
      <div className="row">
        <div className="col-md-10 col-12 mx-auto">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/" id="heading"><i className="fa fa-film" style={{fontSize:"20px",color:"red"}}></i> Movies App</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link" id="pop" onClick={def}>Popular movies</Link>
                </li>
              </ul>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearch(e.target.value)}/>
              </form>
              <br />
              <button className="btn btn-dark" style={{marginRight:"10px"}} onClick={al} >Search</button>
              <br />
              <br />
              {obj.user_name?<div className="dropdown">
              <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src={obj.image} alt="" style={{width:"30px",height:"30px",borderRadius:"20px"}}/>{" "+obj.user_name}
              </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <button className="dropdown-item" onClick={()=>props.logout()}>Logout</button>
                </div>
              </div>:
              <button className="btn btn-dark" type="submit" data-toggle="modal" data-target="#exampleModal">Login</button>}
            </div>
          </div>
        </nav>
        </div>
     </div>
    </div>
 
    

<br />

{/* middle body */}
    <div className="container-fluid" style={{backgroundColor:"#83709e"}}>
      <div className="row">
        <div className="col-md-10 col-12 mx-auto">
          <div className="row">
          {spin?<Spinner animation="grow" variant="dark" style={{width:"5rem",height:"5rem",margin:"0 auto",position:"relative",top:"11rem"}} />:null}
              {movies.map((v,i)=>{
                return  <div className="col-md-3" id="check" key={i} >
                <br />
                <div className="card mx-auto" 
                style={{width:"15.5rem",height:"25rem",
                overflow:"auto", borderRadius:"10px",boxShadow:"-2px 9px 29px -3px",
                backgroundColor:"#b9a7d4"}}>
                <img className="card-img-top" src={v.Poster} id="image" alt="Card image cap"/>
                  <div className="card-body  justify-content-center">
                    <h5 className="card-title">{v.Title}</h5>
                    <p className="card-text">Year: {v.Year}</p>
                    <p className="card-text">Type: {v.Type}</p>
                    <Accordion id="accordion">
                      <Accordion.Item style={{backgroundColor:"black"}} eventKey="0">
                        <Accordion.Header style={{backgroundColor:"black"}}>Read More</Accordion.Header>
                          <Accordion.Body id="acc_body">
                            <p>Actors: {v.Actors}</p>
                            <p>Director: {v.Director}</p>
                            <p>Genre: {v.Genre}</p>
                            <p>Language: {v.Language}</p>
                            <p>Runtime: {v.Runtime}</p>
                            <p>Rating: <i className="fa fa-star" aria-hidden="true"></i>{v.imdbRating}</p>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <br/>
                      <br/>
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
      <br />
    </div>


    {/* Toast error */}
    {show?
    <Toast onClose={() => setShow(false)} show={show} delay={10000} autohide style={{margin:"0 auto",position:"relative",top:"7rem"}}>
          <Toast.Header>
            
            <strong className="me-auto">Attention!</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body>Something went wrong <i className="fa fa-exclamation-triangle" aria-hidden="true"></i></Toast.Body>
    </Toast>:null}



    {/* login Modal */}
<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header" style={{justifyContent:"center"}}>
        <h5 className="modal-title" id="exampleModalLabel">Login Form</h5>
      </div>
      <div className="modal-body"style={{textAlign:"center"}}>
        <button className="btn btn-danger" data-dismiss="modal" onClick={()=>props.login()}><i className="fa fa-google"></i> - Login with google</button>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>


    {/* Footer */}
    <footer id="foot">
        <p>CREATED WITH <span style={{color:"red",fontSize:'20px'}}> ♥ </span> BY UMAIR</p>
    </footer>
    </div>
  );
}
const mapStateToProps=(state)=>({
  user_name:state.auth.name,
  image:state.auth.image
});
const mapDispatchToProps=(dispatch)=>({
  login: ()=>dispatch(login()),
  logout: ()=>dispatch(logout()),
  current: ()=>dispatch(current())
});

export default connect(mapStateToProps,mapDispatchToProps) (Popular);
