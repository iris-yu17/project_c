import React, { useState } from 'react';
import RuShowWidth from 'Ru/Components/Ru-ShowWidth/RuShowWidth';
import RuSalad from 'Ru/Components/RuCards/RuSalad/RuSalad';
import RuButton from 'Ru/Components/RuButton/RuButton';
import RuSearchBar from 'Ru/Components/RuSearchBar/RuSearchBar';
import 'Ru/Components/RuComps/Style.scss';

// 引用共用元件
import ScrollButton from 'Share/Components/ToTopButton/ScrollButton';
// 引用圖片
import line from './Images/line.png';

function RuCompSalad(props) {
  // console.log(props);
  const { handleCartNumber, currentUser, count, setCount } = props;
  const [searchInput, setSearchInput] = useState('');
  const [openBento, setOpenBento] = useState(false); // 判斷便當按鈕是否要亮
  const [openSalad, setOpenSalad] = useState(false); // 判斷沙拉按鈕是否要亮
  const [openCustom, setOpenCustom] = useState(false); // 判斷客製化按鈕是否要亮
  // console.log(searchInput);

  // JSX
  return (
    <>
      <div style={{ height: '100px', backgroundColor: '#FF5151' }}></div>
      {/* <RuShowWidth /> */}

      <div className="ru-mainImg-warp">
        <h1>享受美食 不需要理由</h1>
        <div className="ru-mainImg"></div>
      </div>

      <div className="ru-productList-container">
        <div className="ru-optionWarp">
          {/* 搜尋欄s */}
          <RuSearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          {/* 搜尋欄e */}

          {/* 選項按鈕 s */}
          <section className="ru-buttonWarpA">
            <RuButton
              text={'低GI便當'}
              className={'ru-button-btn'}
              id={'ru-button-btn-1'}
              openBento={openBento}
              setOpenBento={setOpenBento}
              openSalad={openSalad}
              setOpenSalad={setOpenSalad}
              openCustom={openCustom}
              setOpenCustom={setOpenCustom}
            />
            <RuButton
              text={'鮮蔬沙拉'}
              className={'ru-button-btn'}
              id={'ru-button-btn-2'}
              openBento={openBento}
              setOpenBento={setOpenBento}
              openSalad={openSalad}
              setOpenSalad={setOpenSalad}
              openCustom={openCustom}
              setOpenCustom={setOpenCustom}
            />
            <RuButton
              text={'客製化便當'}
              className={'ru-button-btn'}
              id={'ru-button-btn-3'}
              openBento={openBento}
              setOpenBento={setOpenBento}
              openSalad={openSalad}
              setOpenSalad={setOpenSalad}
              openCustom={openCustom}
              setOpenCustom={setOpenCustom}
            />
            <RuButton
              text={'蔬菜箱'}
              className={'ru-button-btn-g'}
              id={'ru-button-btn-4'}
              openBento={openBento}
              setOpenBento={setOpenBento}
              openSalad={openSalad}
              setOpenSalad={setOpenSalad}
              openCustom={openCustom}
              setOpenCustom={setOpenCustom}
            />
          </section>

          <section className="ru-buttonWarpB">
            <div>
              <RuButton
                text={'低GI便當'}
                className={'ru-button-btn'}
                id={'ru-button-btn-1'}
                openBento={openBento}
                setOpenBento={setOpenBento}
                openSalad={openSalad}
                setOpenSalad={setOpenSalad}
                openCustom={openCustom}
                setOpenCustom={setOpenCustom}
              />
              <RuButton
                text={'客製化便當'}
                className={'ru-button-btn'}
                id={'ru-button-btn-2'}
                openBento={openBento}
                setOpenBento={setOpenBento}
                openSalad={openSalad}
                setOpenSalad={setOpenSalad}
                openCustom={openCustom}
                setOpenCustom={setOpenCustom}
              />
            </div>
            <div>
              <RuButton
                text={'鮮蔬沙拉'}
                className={'ru-button-btn'}
                id={'ru-button-btn-3'}
                openBento={openBento}
                setOpenBento={setOpenBento}
                openSalad={openSalad}
                setOpenSalad={setOpenSalad}
                openCustom={openCustom}
                setOpenCustom={setOpenCustom}
              />
              <RuButton
                text={'蔬菜箱'}
                className={'ru-button-btn-g'}
                id={'ru-button-btn-4'}
                openBento={openBento}
                setOpenBento={setOpenBento}
                openSalad={openSalad}
                setOpenSalad={setOpenSalad}
                openCustom={openCustom}
                setOpenCustom={setOpenCustom}
              />
            </div>
          </section>
          {/* 選項按鈕 e */}
        </div>

        {/* 分隔曲線 s*/}
        <div className="ru-line">
          <img src={line}></img>
        </div>
        {/* 分隔曲線 e*/}
      </div>

      {/* 商品卡片區 s */}
      <RuSalad
        searchInput={searchInput}
        handleCartNumber={handleCartNumber} // localStorage函式
        currentUser={currentUser}
        count={count}
        setCount={setCount}
      />
      {/* 商品卡片區 e */}

      {/* to top s */}
      <ScrollButton />
      {/* to top e */}

      {/* <div style={{ height: '222px', backgroundColor: '#FF5151' }}>
        我是footer
      </div> */}
    </>
  );
}

export default RuCompSalad;
