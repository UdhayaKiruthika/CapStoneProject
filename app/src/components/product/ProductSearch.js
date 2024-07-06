import { Fragment, useEffect, useState } from "react";
import MetaData from "../Layouts/MetaData";
import { getProducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layouts/Loader";
import Product from "../product/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import "rc-slider/assets/index.css";

export default function ProductSearch() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 50000]);
  const [priceChanged, setPriceChanged] = useState(price);
  const [category, setCategory] = useState(null);
  const { keyword } = useParams();
  const [rating, setRating] = useState(0);
  const categories = [
    "Mobile Phones",
    "Watch",
    "Laptops",
    "Headphones",
    "Shoes",
    "Smart Watch",
    "Books",
  ];
  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }

    dispatch(getProducts(keyword, priceChanged, category, rating, currentPage));
  }, [error, dispatch, currentPage, keyword, priceChanged, category, rating]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Buy Best Products`} />
          <h2 id="products_heading">Search Products</h2>
          <section id="products" className="container mt-5">
            <div className="row">
              <div className="col-6 col-md-3 mb-5 mt-5">
                {/* Price filter */}
                <h3 className="mb-3">Price filter</h3>
                <div className="px-5" onMouseUp={() => setPriceChanged(price)}>
                  <Slider
                    range={true}
                    marks={{ 1: "Rs.1", 50000: "Rs.50000" }}
                    min={1}
                    max={50000}
                    defaultValue={price}
                    onChange={(price) => {
                      setPrice(price);
                    }}
                    handleRender={(renderProps) => {
                      return (
                        <Tooltip
                          overlay={`Rs.${renderProps.props["aria-valuenow"]}`}
                        >
                          <div {...renderProps.props}></div>
                        </Tooltip>
                      );
                    }}
                  />
                </div>
                <hr className="my-5" />
                {/* Category Filter */}
                <div className="mt-5">
                  <h3 className="mb-3">Categories</h3>
                  <ul className="pl-0">
                    {categories.map((category) => (
                      <li
                        style={{
                          cursor: "pointer",
                          listStyleType: "none",
                        }}
                        key={category}
                        onClick={() => {
                          setCategory(category);
                        }}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Rating Filter */}
                <hr className="my-5" />
                <h3 className="mb-3">Ratings filter</h3>
                <ul className="pl-0">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <li
                      style={{
                        cursor: "pointer",
                        listStyleType: "none",
                      }}
                      key={star}
                      onClick={() => {
                        setRating(star);
                      }}
                    >
                      <div className="rating-outer">
                        <div
                          className="rating-inner"
                          style={{ width: `${star * 20}%` }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-6 col-md-9 mb-5 mt-5">
                <div className="row">
                  {products &&
                    products.map((product) => (
                      <Product col={4} key={product._id} product={product} />
                    ))}
                </div>
              </div>
            </div>
          </section>

          {productsCount > 0 && productsCount > resPerPage ? (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
}
