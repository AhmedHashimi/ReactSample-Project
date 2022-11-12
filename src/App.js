import "./App.css";
import React, { useEffect, useState } from "react";
import "./styles/TopHeader.css";
import { getCart } from "./views/cart/cartApi";
import { isLoggedIn } from "./views/login/loginApi";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./views/home/home";
import Faqs from "./views/faqs/faqs";
import Login from "./views/login/login";
import SignUp from "./views/signUp/SignUp";
import Category from "./views/category/category";
import CategoryDetail from "./views/category/category-detail";
import Sitemap from "./views/sitemap/sitemap";
import Cart from "./views/cart/cart";
import Clinics from "./views/clinics/clinics";
import MyLessons from "./views/my-lessons/my-lessons";
import Media from "./views/media/media";
import MediaDetail from "./views/media/media-detail";
import Working from "./views/working-with-us/working";
import Contact from "./views/contact-us/contact";
import PrivacyPolicy from "./views/privacy-policy/privacy-policy";
import BrowseCategory from "./views/browse-category/browse-category";
import Checkout from "./views/checkout/checkout";
import Account from "./views/account/account";
import LessonInsight from "./views/lesson-insight/lesson-insight";
import HeaderTop from "./components/header-top/header-top";
import HeaderMain from "./components/header/header-main";
import FooterMain from "./components/footer/footer";
import { useDispatch } from "react-redux";
import { changeCount } from "./state/actions/cartActions";
import Search from "./views/Search/Search";
import "../src/components/fontawesome/index";
import { loadStripe } from "@stripe/stripe-js";
import ForgotPassword from "./views/forgotPassword/forgot-Password";
import Spinner from "./components/Spinner";
export const stripe = loadStripe(
  "pk_live_51KEIQOEW2UNJILNDDD0wzx0DRbqMyWkBbQXMg8aeXuppfC2mqIYmXutxnFACP1cGJkJpJzpgX88GwZT9JBw9knxn00oWni33au"
);
function App() {
  const isAuthenticated = isLoggedIn();
  // TURING CONSOLE OFF
  console.log = function () {};
  // const [isAuthentica ted, setAuthenticated] = useState(isLoggedIn());
  // console.log(isAuthenticated);
  //  [isAuthenticated,setAuthenticated] = useState(isLoggedIn())
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const sessionId = makeid(32);
    let session = sessionStorage.getItem("sessionId");

    if (!session) {
      sessionStorage.setItem("sessionId", sessionId);
    }
  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    user ? setUser(user) : setUser({});
    getNowCart();
  }, [isAuthenticated]);

  const makeid = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const getNowCart = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let sessionId = sessionStorage.getItem("sessionId");
    let body = { id: user ? user?.id : sessionId };
    console.log(!!user);

    const resp = await getCart(body);
    console.log("carrt", resp?.data?.cartDetails);
    let myCart = resp?.data?.cartDetails;
    if (myCart) {
      let count = myCart.length;
      console.log(count);
      dispatch(changeCount(count));
    }
  };
  console.log(user);
  return (
    <>
      <Router>
        <Spinner></Spinner>
        <HeaderTop></HeaderTop>
        <HeaderMain></HeaderMain>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route
            path="/login"
            element={<Login changeUser={(user) => setUser(user)} />}
          />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/category-detail/:id" element={<CategoryDetail />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/my-cart" element={<Cart />} />
          <Route path="/clinics" element={<Clinics />} />
          {user && <Route path="/my-lessons" element={<MyLessons />} />}
          <Route path="/media" element={<Media />} />
          <Route path="/media-details/:id" element={<MediaDetail />} />
          <Route path="/working-with-us" element={<Working />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/browse-category" element={<BrowseCategory />} />
          <Route path="/checkout" element={<Checkout />} />
          {user && user.user_type === "athlete" && (
            <Route path="/account" element={<Account />} />
          )}
          <Route path="/lesson-insight" element={<LessonInsight />} />
          <Route path="/search-result" element={<Search />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <FooterMain></FooterMain>
      </Router>
    </>
  );
}

export default App;
