// 導入其它的模組
import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import './Navbar.scss';
import 'antd/dist/antd.css';
// import { Popover } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { ReactComponent as Logo } from '../../Images/SVG/navbar-logo.svg';
import { ReactComponent as BackArrow } from '../../Images/SVG/navbar-back arrow.svg';
import { ReactComponent as Monster } from '../../Images/SVG/navbar-monster.svg';
import { ReactComponent as ShoppingCart } from '../../Images/SVG/navbar-shopping-cart.svg';
import { ReactComponent as ShoppingAmount } from '../../Images/SVG/navbar-cartNumber.svg';
// 選單連結要使用NavLink取代Link
import { NavLink, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

function NavBar(props) {
  const [count, setCount] = useState(0);
  const [shoppingList, setShoppingList] = useState('0');
  const [showNav, setShowNav] = useState(true);
  const {
    isLogin,
    setShowLoginModal,
    showLoginModal,
    cartNumber,
    setIsLogin,
    SetShowLoginCard,
  } = props;

  function myFunction() {
    const x = document.getElementById('NavBar');
    if (x.className === 'nav') {
      x.className += ' responsive';
    } else {
      x.className = 'nav';
    }
  }

  // 在登入狀態
  if (isLogin === true) {
    // 登入選項消失
    document.querySelector('.iris-login-option').style.display = 'none';
    // 顯示登出選項
    document.querySelector('.iris-logout-option').style.display = 'block';
  }

  // 在未登入的狀態點擊會員相關選項
  const disableLink = (e) => {
    if (isLogin === false) {
      e.preventDefault(); //不跳轉頁面
      setShowLoginModal(true); //秀登入光箱
    }
  };

  // 點擊登出
  const showLoginOption = () => {
    // 顯示登入選項,隱藏登出選項
    setIsLogin(false);
    document.querySelector('.iris-login-option').style.display = 'block';
    document.querySelector('.iris-logout-option').style.display = 'none';
  };

  const clearUserStorage = () => {
    localStorage.clear('currentUser');
  };

  return (
    <>
      <div className="nav" id="NavBar">
        {/* <span id="ru-target">123</span> */}
        <div
          className="navBar-jess-container"
          onClick={() => {
            if (showLoginModal === true) {
              setShowLoginModal(false);
            }
          }}
        >
          <div className="navBar-jess-navCollapse ">
            <ul className="navBar-jess-navigation">
              <li className="navBar-jess-navigation_item">
                <Nav.Link
                  as={NavLink}
                  to="/groupOrder/groupOrderCreate"
                  onClick={(e) => {
                    disableLink(e);
                  }}
                >
                  作伙揪團
                </Nav.Link>
              </li>
              <li className="navBar-jess-navigation_item">
                <Nav.Link as={NavLink} to="/farmMap">
                  哈囉小農
                </Nav.Link>
              </li>
              <li className="navBar-jess-navigation_item">
                <Nav.Link as={NavLink} to="/menu">
                  尋找美味 <BackArrow className="backArrow" />{' '}
                </Nav.Link>
                <div className="navBar-jess-emptydiv">
                  <ul className="navBar-jess-dropdown">
                    <div className="navBar-jess-triangle"></div>
                    <li className="navBar-jess-dropdown_item">
                      <Nav.Link as={NavLink} to="/productList">
                        低GI便當
                      </Nav.Link>
                    </li>
                    <li className="navBar-jess-dropdown_item">
                      <Nav.Link as={NavLink} to="/productListSalad">
                        美味沙拉
                      </Nav.Link>
                    </li>
                    <li className="navBar-jess-dropdown_item">
                      <Nav.Link as={NavLink} to="/vegBox">
                        蔬菜箱
                      </Nav.Link>
                    </li>
                    <li className="navBar-jess-dropdown_item">
                      <Nav.Link as={NavLink} to="/productListCustom">
                        客製化便當
                      </Nav.Link>
                    </li>
                    <li className="navBar-jess-dropdown_item">
                      <Nav.Link as={NavLink} to="/">
                        外送服務
                      </Nav.Link>
                    </li>
                  </ul>
                </div>
              </li>
              <Nav.Link
                as={NavLink}
                to="/"
                exact
                className="navBar-jess-nav_brand"
              >
                <Logo />
              </Nav.Link>

              <li className="navBar-jess-navigation_item">
                <Nav.Link
                  as={NavLink}
                  to="/member/getcoupon"
                  onClick={(e) => {
                    disableLink(e);
                  }}
                >
                  專屬優惠
                </Nav.Link>
              </li>
              <li className="navBar-jess-navigation_item">
                <Nav.Link as={NavLink} to="/">
                  關於我們
                </Nav.Link>
              </li>
              <li className="navBar-jess-navigation_item">
                <Nav.Link
                  as={NavLink}
                  to="/member/Userprofile"
                  onClick={(e) => {
                    disableLink(e);
                  }}
                >
                  會員中心 <BackArrow className="backArrow" />
                </Nav.Link>
                {/* </div> */}
                <div className="navBar-jess-emptydiv">
                  <ul className="navBar-jess-dropdown2">
                    <div className="navBar-jess-triangle2"></div>
                    <li className="navBar-jess-dropdown_item">
                      <Nav.Link
                        as={NavLink}
                        to="/member/orderManagement"
                        onClick={(e) => {
                          disableLink(e);
                        }}
                      >
                        訂單管理
                      </Nav.Link>
                    </li>
                    <li className="navBar-jess-dropdown_item">
                      <Nav.Link
                        as={NavLink}
                        to="/member/Userprofile"
                        onClick={(e) => {
                          disableLink(e);
                        }}
                      >
                        修改會員資料
                      </Nav.Link>
                    </li>
                    <li className="navBar-jess-dropdown_item">
                      <Nav.Link
                        as={NavLink}
                        to="/member/myFav"
                        onClick={(e) => {
                          disableLink(e);
                        }}
                      >
                        我的最愛
                      </Nav.Link>
                    </li>
                    <li className="navBar-jess-dropdown_item">
                      <Nav.Link
                        as={NavLink}
                        to="/member/beastiePoint"
                        onClick={(e) => {
                          disableLink(e);
                        }}
                      >
                        我的怪獸
                      </Nav.Link>
                      <Monster className="navBar-jess-monster4" />
                    </li>

                    <li
                      className="navBar-jess-dropdown_item iris-login-option"
                      onClick={() => {
                        setShowLoginModal(true);
                      }}
                    >
                      登入/註冊
                    </li>
                    {/* 11/9 新增登出選項 */}
                    <li
                      className="navBar-jess-dropdown_item iris-logout-option"
                      onClick={() => {
                        setIsLogin(false);
                        showLoginOption();
                        clearUserStorage();
                      }}
                    >
                      登出
                    </li>
                  </ul>
                </div>
              </li>

              <li id="ru-target">
                <span className="jess-navbarCartNum" id="jess-navbarCartNum">
                  {cartNumber}
                </span>
                {/* <Popover
                  placement="bottomLeft"
                  content={shoppingList}
                  title="我的購買清單"
                  trigger="hover"
                  className="navbar-jess-popover"
                > */}
                <Nav.Link
                  as={NavLink}
                  to="/cart"
                  onClick={(e) => {
                    disableLink(e);
                  }}
                >
                  <ShoppingCart className="navbar-jess-ShopingCart" />
                </Nav.Link>
                <div className="navbar-tag-wrap">
                  <div className="navbar-tag">
                    <ShoppingAmount className="jess-navbarCartAmount" />
                    <span
                      className="jess-navbarCartNum"
                      id="jess-navbarCartNum"
                    >
                      {cartNumber}
                    </span>
                  </div>
                </div>
                {/* </Popover> */}
              </li>
            </ul>
          </div>
        </div>
        <div className="icons-list nav_toggle" onClick={myFunction}>
          <MenuOutlined />
        </div>
      </div>
    </>
  );
}

// 輸出元件(函式)

export default NavBar;
