import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1);

  const fetchproducts = async ()=>{
    const res =await fetch("https://dummyjson.com/products?limit=100")
    const data = await res.json()

    // console.log(data);
    if(data && data.products){
      setProducts(data.products)
      
  }
  
}
  // console.log(products);

  

  useEffect(()=>{
    fetchproducts()
  },[])

  const selectpage = (selectedpage)=>{
    if(selectedpage>1 && selectedpage<=products.length/10 && selectedpage!==page)
    setPage(selectedpage)
  }
  return (
    <div>
      {
        products.length>0 && <div className='products'>
          {
            products.slice(page*10-10, page*10).map((prod)=>{
              return <span className='products__single' key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title}/>
                <span>{prod.title}</span>
                </span>
            })
          }
          </div>
      }
      {
        products.length>0 && <div className='pagination'>
          <span onClick={()=>selectpage(page-1)}
            className={page>1 ?"":"pagination_disable"}
            >◀ </span>
          {
            [...Array(products.length/10)].map((_,i)=>{
              return <span  
              className={page===i+1?"pagination__selected": ""}
              onClick={()=>selectpage(i+1)} key={i}>{i+1}  </span>
            })
          }
          
          <span onClick={()=>selectpage(page+1)}
            className={page<products.length/10?"":"pagination_disable"}
            >▶</span>
        </div>
      }
    </div>
  )
}

export default App
