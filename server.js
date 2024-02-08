const express = require('express');
const cors = require('cors');
const fetch = require('cross-fetch');

const app = express();
const port = process.env.PORT  || 3000;
app.use(cors());


app.get('/api/restaurants', async(req, res) => {
  const { lat, lng } = req.query;
  console.log(req.query);
  // const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;
  const url=`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`

  const data= await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    
    }
  })
  const json=await data.json();
  console.log(json)
  res.json(json)
});

app.get('/api/menu', async(req, res) => {
  const { lat, lng, restaurantId } = req.query;
  console.log(req.query);

  /* OLD SWIGGY API
  const url = `https://www.swiggy.com/dapi/menu/v4/full?lat=${lat}&lng=${lng}&menuId=${menuId}`;
  */ 

  // const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&submitAction=ENTER&restaurantId=${restaurantId}`;

  const url=`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`
 const data=await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    
    }
  })
  const json=await data.json()
  console.log(json)
  res.json(json)
    
});





app.get('/', (req, res) =>{
  res.json({"test":"hello instafood lovers !!! "});
})
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
