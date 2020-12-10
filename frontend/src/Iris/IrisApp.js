// ------test-----  //

import React, { useState, useEffect } from 'react';
import VNavbar from './../Share/Components/VNavbar/VNavbar';
import IrisMemberMenuSect from './Components/IrisMemberMenuSect/IrisMemberMenuSect';
import IrisDataEditSect from './Components/IrisDataEditSect/IrisDataEditSect';
import IrisBeastiePointSect from './Components/IrisBeastiePointSect/IrisBeastiePointSect';
import IrisMyFavSect from './Components/IrisMyFavSect/IrisMyFavSect';
import IrisGetCouponSect from './Components/IrisGetCouponSect/IrisGetCouponSect';
import IrisOrderCommentSect from './Components/IrisOrderCommentSect/IrisOrderCommentSect';
import IrisBeastieRuleBox from './Components/IrisBeastieRuleBox/IrisBeastieRuleBox';
import IrisGetCouponBox from './Components/IrisGetCouponBox/IrisGetCouponBox';
import './IrisApp.scss';
import ChaOrderManagement from './../Cha/Components/Cha-Order-Management/ChaOrderManagement'

import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import ScrollButton from 'Share/Components/ToTopButton/ScrollButton';

function IrisApp(props) {
  const { isLogin, setShowBar } = props;

  // for profile edit page
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showGetCouponBox, setShowGetCouponBox] = useState(false);
  const [beastiePointAdd, setBeastiePointAdd] = useState();

  if (showUpdateModal === true) {
    document.querySelector('.iris-update-success-mask').style.display = 'block';
    document.querySelector('.iris-update-success-box').style.display = 'block';
  } else {
    if (
      document.querySelector('.iris-update-success-mask') &&
      document.querySelector('.iris-update-success-box')
    ) {
      document.querySelector('.iris-update-success-mask').style.display =
        'none';
      document.querySelector('.iris-update-success-box').style.display = 'none';
    }
  }

  if (showGetCouponBox === true) {
    document.querySelector('.IrisGetCouponBox').style.display = 'block';
  } else {
    if (document.querySelector('.IrisGetCouponBox')) {
      document.querySelector('.IrisGetCouponBox').style.display = 'none';
    }
  }

  // for order comment sect
  const [commentDelete, setCommentDelete] = useState('');

  // for fav sect
  const [userFavDelete, setUserFavDelete] = useState('');

  // for beastie point sect
  const [showRuleBox, setShowRuleBox] = useState(false);

  // for vnbar
  useEffect(() => {
    setShowBar(true);
  }, []);

  // 在此頁面按登出的話直接導到首頁
  if (isLogin === false) {
    // setShowLoginModal(true)
    return <Redirect to="/" />;
  }

  return (
    <>
      <VNavbar {...props} />
      <div className="iris-member-page-wrapper">
        <div className="container iris-memberpage-container pl-0 pr-0">
          <IrisMemberMenuSect
            {...props}
            commentDelete={commentDelete}
            userFavDelete={userFavDelete}
            beastiePointAdd={beastiePointAdd}
          />
          <Switch>
            <Route exact path="/member/userprofile">
              <IrisDataEditSect
                {...props}
                setShowUpdateModal={setShowUpdateModal}
                setShowGetCouponBox={setShowGetCouponBox}
                setBeastiePointAdd={setBeastiePointAdd}
              />
            </Route>
            <Route exact path="/member/beastiePoint">
              <IrisBeastiePointSect
                {...props}
                setShowRuleBox={setShowRuleBox}
              />
            </Route>
            <Route exact path="/member/myFav">
              <IrisMyFavSect
                {...props}
                userFavDelete={userFavDelete}
                setUserFavDelete={setUserFavDelete}
              />
            </Route>
            <Route exact path="/member/getCoupon">
              <IrisGetCouponSect {...props} />
            </Route>
            <Route exact path="/member/orderManagement">
              <ChaOrderManagement {...props} />
            </Route>
            <Route exact path="/member/orderComment">
              <IrisOrderCommentSect
                {...props}
                commentDelete={commentDelete}
                setCommentDelete={setCommentDelete}
              />
            </Route>
          </Switch>
        </div>

        {/* toTopBtn */}
        <ScrollButton />

        {/* 怪獸幣規則光箱 */}
        <IrisBeastieRuleBox
          showRuleBox={showRuleBox}
          setShowRuleBox={setShowRuleBox}
        />

        {/* 成功獲得怪獸幣光箱 */}
        <div className="IrisGetCouponBox">
          <IrisGetCouponBox
            showGetCouponBox={showGetCouponBox}
            setShowGetCouponBox={setShowGetCouponBox}
          />
        </div>

        {/* 會員資料更新成功光箱 */}
        <div
          className="iris-update-success-mask"
          onClick={() => {
            setShowUpdateModal(false);
          }}
        ></div>
        <div class="iris-update-success-box">
          <div class="iris-update-success-checkmark">
            <div class="iris-check-icon">
              <span class="icon-line line-tip"></span>
              <span class="icon-line line-long"></span>
              <div class="icon-circle"></div>
              <div class="icon-fix"></div>
            </div>
            <div class="iris-update-sucess">會員資料更新成功</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(IrisApp);
