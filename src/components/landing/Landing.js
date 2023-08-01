import './landing.css'
import About from './about/About';
import BestSellerProducts from '../feature-products/bestsellerproducts';
import ProductsWithDiscount from '../feature-products/productsWithDiscount';
import Footer from '../footer/footer';
const Landing = ( { user } ) => {
 
  return (
    <>
    <div id="landing-container">
      <About />
      <ProductsWithDiscount user={user}/>
      <BestSellerProducts user={user} />

    </div>
    </>
  )
}

export default Landing