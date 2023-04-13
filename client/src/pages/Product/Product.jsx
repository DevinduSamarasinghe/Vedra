import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import "./Product.css";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import Reviews from "../../components/Reviews/Reviews";

export default function Product() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [imagePreview, setImagePreview] = useState(
    item.image && item.image.length > 0 && item.image[0]
  );

  const [disableCart, setDisableCart] = useState(false);
  const [response, setResponse] = useState({});

  const avgStar =
    item.star && item.star.reviewers && item.star.reviewers.length > 0
      ? item.star.total / item.star.reviewers.length
      : 0;

  const minusCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addCount = () => {
    setCount(count + 1);
  };

  async function AddtoCart() {
    const email = "abc@gmail.com";
    const status = "cart";
    const itemID = item._id;

    if (disableCart) {
      return;
    } else {
      console.log(response);

      const Neworder = {
        email: email,
        items: [
          {
            itemID: item._id,
            name: item.name,
            quantity: count,
            price: item.price,
            image: item.image[0],
          },
        ],
        total: item.price * count,
        status: status,
        address: "kandy",
        shippingMethod: "PayPal",
      };

      if (response.length > 0) {
        await axios
          .patch(`http://localhost:8083/orders/${response._id}`, response)
          .then((res) => {
            console.log(res);
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await axios
          .post(`http://localhost:8083/orders`, Neworder)
          .then((res) => {
            console.log(res);
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      setDisableCart(true);
    }
  }

  // useEffect(() => {
  //   async function fetchData() {
  //     const response1 = await fetch(`http://localhost:8081/items/${id}`);
  //     const data1 = await response1.json().then((res) => {
  //       console.log(res);
  //       setItem(res);

  //       if (item != null) {
  //         console.log(item._id);
  //       }
  //     });
  // setItem(data1);

  // await axios
  //   .get(`http://localhost:8081/items/${id}`)
  //   .then((res) => {
  //     setItem(res.data);

  //     if (item != null) {
  //       const email = "abc@gmail.com";
  //       const status = "cart";
  //       const itemID = item._id;
  //       console.log(item._id);

  //       axios
  //         .get(
  //           `http://localhost:8083/orders/${email}/${status}/${item._id}`
  //         )
  //         .then((res) => {
  //           // console.log(res);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     } else {
  //       console.log("item is null");
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // const email = "abc@gmail.com";
  // const status = "cart";

  // console.log(email, status, item._id);
  // const response3 = await axios
  //   .get(`http://localhost:8083/orders/${email}/${status}/${item._id}`)
  //   .then((res) => {
  //     console.log(res);
  //     if (res.data.isSuccess) {
  //       setDisableCart(true);
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // const response2 = await fetch(
  //   `http://localhost:8083/orders/${email}/${status}`
  // );
  // const data2 = await response2.json();
  // // console.log(data2);
  // setResponse(data2.order);

  //     setIsLoading(false);
  //   }
  //   fetchData();
  // }, [id]);

  // useEffect(() => {
  //   async function fetchData() {
  //     if (item !== null) {
  //       const email = "";
  //       const status = "cart";
  //       const itemID = item._id;

  //       const response = await fetch(
  //         `http://localhost:8083/orders/${email}/${status}/${item._id}`
  //       );
  //       const data = await response.json();
  //       console.log(data);
  //     } else {
  //       console.log("item is null");
  //     }
  //   }
  // }, [item]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch(`http://localhost:8081/items/${id}`);
  //     const data = await response.json();
  //     setItem(data);
  //     setIsLoading(false);
  //   }
  //   fetchData();
  // }, [id]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8081/items/${id}`);
      const data = await response.json();
      setItem(data);
      setIsLoading(false);
      return data; // Return the item data from the function
    }

    // Call the fetchData function and wait for the item data to be returned
    fetchData().then((item) => {
      async function checkCart() {
        if (item !== null) {
          const email = "abc@gmail.com"; // Replace with current user's email
          const status = "cart";
          const itemID = item._id;
          const response = await fetch(
            `http://localhost:8083/orders/${email}/${status}/${itemID}`
          );
          const data = await response.json();
          setDisableCart(data.isSuccess);
        } else {
          console.log("item is null");
        }
      }
      checkCart();
    });
  }, [id]);

  return (
    <>
      <Navbar />
      <div
        className="product"
        style={{
          paddingBottom: "80px",
          // backgroundColor: "#34fafc",
        }}
      >
        <div className="container">
          <div className="flex justify-center items-center lg:flex-row flex-col gap-9">
            <div className="w-full sm:w-96 md:w-8/12 lg:w-7/12 items-center">
              <p className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">
                Home / {"<<Category>>"}
              </p>
              <h2
                className="font-semibold lg:text-4xl text-3xl mt-4"
                style={{
                  lineHeight: "3.5rem",
                  color: "#1a202c",
                }}
              >
                {item.name}
              </h2>

              <div className=" flex flex-row justify-between  mt-5">
                <div className=" flex flex-row space-x-3">
                  <StarRatings
                    starDimension="35px"
                    starSpacing="0px"
                    rating={avgStar}
                    starRatedColor="#feb400"
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
                <p className="focus:outline-none font-normal text-base leading-4 text-gray-700  duration-100 mr-5">
                  {item.star &&
                  item.star.reviewers &&
                  item.star.reviewers.length > 0
                    ? item.star.reviewers.length
                    : 0}{" "}
                  reviews
                </p>
              </div>

              <p className=" font-normal text-base leading-6 text-gray-600 mt-7">
                {item.description}
              </p>
              <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6">
                ${item.price}
              </p>

              <div className="lg:mt-11 mt-10">
                <div
                  className="flex flex-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p
                    className=" font-medium text-base leading-4 text-gray-600"
                    style={{
                      marginRight: "50px",
                    }}
                  >
                    Select quantity
                  </p>
                  <div
                    className="flex"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <button
                      onClick={minusCount}
                      className="focus:outline-none cursor-pointer w-7 h-7 flex items-center justify-center bg-[#3ea7ac] text-white hover:bg-[#278a9e] rounded-l-lg"
                    >
                      -
                    </button>
                    <input
                      id="counter"
                      aria-label="input"
                      className="border border-gray-300 h-full text-center w-14 mx-2"
                      type="text"
                      value={count}
                      disabled
                    />
                    <button
                      onClick={addCount}
                      className="focus:outline-none cursor-pointer w-7 h-7 flex items-center justify-center bg-[#3ea7ac] text-white hover:bg-[#278a9e] rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {disableCart ? (
                <button
                  className="bg-[#3ea7ac] hover:bg-[#278a9e] text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center w-full mt-9"
                  onClick={AddtoCart}
                  disabled
                >
                  Added
                </button>
              ) : (
                <button
                  className="bg-[#3ea7ac] hover:bg-[#278a9e] text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center w-full mt-9"
                  onClick={AddtoCart}
                >
                  Add to Shopping Cart
                </button>
              )}
            </div>

            <div
              className=" w-full sm:w-96 md:w-8/12  lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-8"
              style={{
                marginLeft: "50px",
              }}
            >
              <div className=" w-full lg:w-8/12 bg-white flex justify-center items-center">
                <img
                  src={
                    imagePreview
                      ? imagePreview
                      : item.image && item.image.length > 0 && item.image[0]
                  }
                  alt="Wooden Chair Previw"
                />
              </div>
              <div className=" w-full lg:w-4/12 grid lg:grid-cols-1 sm:grid-cols-4 grid-cols-2 gap-6">
                <div className="bg-white flex justify-center items-center py-4 cursor-pointer">
                  <img
                    src={item.image && item.image.length > 0 && item.image[0]}
                    alt="Wooden chair - preview 1"
                    onClick={() => {
                      setImagePreview(item.image[0]);
                    }}
                  />
                </div>
                <div className="bg-white flex justify-center items-center py-4 cursor-pointer">
                  <img
                    src={item.image && item.image.length > 0 && item.image[1]}
                    alt="Wooden chair - preview 2"
                    onClick={() => {
                      setImagePreview(item.image[1]);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Reviews
        reviews={
          item.star && item.star.reviewers && item.star.reviewers.length > 0
            ? item.star
            : 0
        }
      />
      <Footer />
    </>
  );
}
