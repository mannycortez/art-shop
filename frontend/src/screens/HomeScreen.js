import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'


const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    
    const pageNumber =  match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
      dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
      <>
      <Meta />
      {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>
        Go Back
        </Link>}
        <br />
          <h1 style={{'textAlign': 'center'}}>About Terrapin Moon</h1>
          <p style={{'textAlign': 'center'}}>Heirloom tumeric tumblr, 
          crucifix kale chips hashtag hot chicken man braid. Offal whatever meditation, 
          cloud bread fam woke DIY PBR chicharrones cred selvage next level brooklyn prism. 
          Artisan fixie freegan occupy migas godard pabst flannel vice green juice. 
          Everyday carry distillery readymade, tattooed mumblecore irony chartreuse vexillologist 
          fingerstache brunch gastropub kale chips meditation.</p>
          <br />
          <p style={{'textAlign': 'center'}}>-Jenna</p>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
            <>
            <Row>
            {products.map((product) => (
                    <Col key={ product._id }sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
            ))}     
          </Row>
          <Paginate 
            pages={pages} 
            page={page} 
            keyword={keyword ? keyword : ''}/>
          </>
          )}  
      </>
    )
}

export default HomeScreen
