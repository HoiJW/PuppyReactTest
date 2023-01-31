import { useEffect, useState } from 'react';
import './App.css';
import DisplayPics from './components/DisplayPics';
import Form from './components/Form';

function App() {
  //state item
  const[photos, setPhotos] = useState([])
  const[filteredPhotos, setFilteredPhotos ] = useState([])
  //hook into the first render of app to fetch pup pics
  useEffect(() => {

    
    const fetchData = async () => {
      const url = new URL ('https://api.unsplash.com/search/photos');
      url.search = new URLSearchParams({
        client_id: "J1V4wCnwMGpGIhtu1o2hyLuGMVWlEb6sbV1bfTFnoHs",
        query: 'puppies',
        per_page: 30,
      });
      
      
      try {
        const data = await fetch(url);
        const response = await data.json();
        console.log(response.results);
      

        // photo oruebtation calculation
        const photosWithOrientation = response.results.map(photo => {
          const ratio = photo.width / photo.height;
          let orientation = 'square';

          if (ratio < 0.75){
            orientation = 'portrait';
          }else if (ratio > 1.35){
            orientation = 'landscape';
          }

          return { 
            ...photo,
            //spread photo array 
            orientationProperty: orientation 
            //add new property to array then return !
          
          }


        })


        setPhotos(photosWithOrientation);
      } catch(error){

      }
    
    }

    fetchData();
  
  
  },[]);

  const handleSubmit = (userChoice) => {
    //console.log(userChoice);
    const filteredPhotos = photos.filter(photos => photos.orientationProperty === userChoice)
    setFilteredPhotos(filteredPhotos)
    console.log(filteredPhotos);

  };
  
  return (
    <div className="App">
      <h1>View the pups !</h1>
      <Form handleSubmit={handleSubmit} />
      <DisplayPics photos={filteredPhotos} />
    </div>
  );
}

export default App;


//J1V4wCnwMGpGIhtu1o2hyLuGMVWlEb6sbV1bfTFnoHs