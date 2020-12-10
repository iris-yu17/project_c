import React, { useState, useEffect } from 'react';
import 'Ru/Components/RuCards/RuCustom/Style.scss';
import RuArrowLeft from 'Ru/Components/RuArrowLeft/RuArrowLeft';
import RuArrowRight from 'Ru/Components/RuArrowRight/RuArrowRight';
import RuButtonB from 'Ru/Components/RuButtonB/RuButtonB';
import RuButtonC from 'Ru/Components/RuButtonC/RuButtonC';
import RuCounter from 'Ru/Components/RuCounter/RuCounter';
import RuAddCart from 'Ru/Components/RuAddCart/RuAddCart';
import RuSelection from 'Ru/Components/RuSelection/RuSelection';
import RuPriceA from 'Ru/Components/RuPriceA/RuPriceA'; // 資訊區價格 網頁版
import RuCalA from 'Ru/Components/RuCalA/RuCalA'; // 資訊區熱量 網頁版
import RuRiceA from 'Ru/Components/RuFoodItems/RuRiceA/RuRiceA';
import RuMeetA from 'Ru/Components/RuFoodItems/RuMeetA/RuMeetA';
import RuVegetableA from 'Ru/Components/RuFoodItems/RuVegetableA/RuVegetableA';
import RuEggA from 'Ru/Components/RuFoodItems/RuEggA/RuEggA';
import RuCutsomHint from 'Ru/Components/RuCutsomHint/RuCutsomHint';

// 引用共用元件
import Card from 'Share/Components/Card/Card';
import cauliflower from './Images/cauliflower.svg'; // rwd暫放(待刪)
// 品項放置後s
import cauliflowerAfter from './Images/cauliflowerAfter.svg';
import cabageAfter from './Images/cabageAfter.svg';
import cornAfter from './Images/cornAfter.svg';
import qingjiangAfter from './Images/qingjiangAfter.svg';
import eggplantAfter from './Images/eggplantAfter.svg';
import eggAfter from './Images/eggAfter.svg';
import poachedEggAfter from './Images/poachedEggAfter.svg';
import riceAfter from './Images/riceAfter.svg';
import grainRiceAfter from './Images/grainRiceAfter.svg';
import redQuinoaAfter from './Images/redQuinoaAfter.svg';
import chickenBreastAfter from './Images/chickenBreastAfter.svg';
import chickenLegAfter from './Images/chickenLegAfter.svg';
import shrimpAfter from './Images/shrimpAfter.svg';

// 品項放置後 e
import hintA from './Images/hintA.svg';
import hintB from './Images/hintB.svg';
import hintC from './Images/hintC.svg';
import hintD from './Images/hintD.svg';
import hintE from './Images/hintE.svg';
import hintF from './Images/hintF.svg';

// 引用圖片
import background from './Images/background.png';
import { ReactComponent as LunchBox } from './Images/lunchBox.svg'; // 將svg以元件方式引入

function RuCustom(props) {
  const {
    searchInput,
    handleCartNumber,
    amount,
    setAmount,
    count,
    setCount,
  } = props;
  const [moveX, setMoveX] = useState(0); // 選項區滑動變亮(RuArrowRight / RuArrowLeft 調整)
  const [isPrice, setIsPrice] = useState(true); // 是否開啟價格標示
  const [isCal, setIsCal] = useState(false); // 是否開啟營養標示
  const [selection, setSelection] = useState('rice'); // 選擇開啟哪個菜色選區
  const [limitX, setLimitX] = useState(-100); // 右滑極限值 => 白飯選區為初始值 (RuButtonB可以調不同選項區的極限值)
  const [imgA, setImgA] = useState();
  const [imgB, setImgB] = useState();
  const [imgC, setImgC] = useState();
  const [imgD, setImgD] = useState();
  const [imgE, setImgE] = useState();
  const [imgF, setImgF] = useState();
  // 設定飯類容器的優先權
  const [priority, setPriority] = useState('');

  // 開啟提示區
  const [isShowHint, setIsShowHint] = useState(true);
  const [isShowHintA, setIsShowHintA] = useState(false);
  const [isShowHintB, setIsShowHintB] = useState(false);
  const [isShowHintC, setIsShowHintC] = useState(false);
  const [isShowHintD, setIsShowHintD] = useState(true);
  const [isShowHintE, setIsShowHintE] = useState(false);
  const [isShowHintF, setIsShowHintF] = useState(false);

  // 設定 今日菜色(價格) 資訊
  const [riceName, setRiceName] = useState('');
  const [ricePrice, setRicePrice] = useState(0);
  const [riceCal, setRiceCal] = useState(0);
  const [meetName, setMeetName] = useState('');
  const [meetPrice, setMeetPrice] = useState(0);
  const [meetCal, setMeetCal] = useState(0);
  const [eggName, setEggName] = useState('');
  const [eggPrice, setEggPrice] = useState(0);
  const [eggCal, setEggCal] = useState(0);
  const [vegNameA, setVegNameA] = useState('');
  const [vegPriceA, setVegPriceA] = useState(0);
  const [vegCalA, setVegCalA] = useState(0);
  const [vegNameB, setVegNameB] = useState('');
  const [vegPriceB, setVegPriceB] = useState(0);
  const [vegCalB, setVegCalB] = useState(0);
  const [vegNameC, setVegNameC] = useState('');
  const [vegPriceC, setVegPriceC] = useState(0);
  const [vegCalC, setVegCalC] = useState(0);

  // 配菜區還可否被選擇
  const [veg1available, setVeg1available] = useState(true);
  const [veg2available, setVeg2available] = useState(true);
  const [veg3available, setVeg3available] = useState(true);
  const [veg4available, setVeg4available] = useState(true);
  const [veg5available, setVeg5available] = useState(true);

  // 標記入box內的是哪種蔬菜
  const [putAclass, setPutAclass] = useState('ru-put');
  const [putBclass, setPutBclass] = useState('ru-put');
  const [putCclass, setPutCclass] = useState('ru-put');

  // 是否可以購買
  const [isCanBuy, setIsCanBuy] = useState(false);

  // 包後端資料的state
  const [data, setData] = useState('');

  // 給localStorage的id
  let today = +new Date();
  const [todayId, setTodayId] = useState(today);

  // 切換售價與營養標示
  function switchPrice() {
    setIsPrice(true);
    setIsCal(false);
  }
  function switchCal() {
    setIsPrice(false);
    setIsCal(true);
  }

  // 向後端請求資料
  useEffect(() => {
    fetch('http://localhost:5000/product/custom_list') // 非同步
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        // console.log(myJson)
        const copyJson = [...myJson];
        setData(copyJson);
      });

    return () => {};
  }, []);

  useEffect(() => {
    // console.log(data)
    // console.log('執行useEffect')
    // 品項置入便當盒 邏輯
    if (!data) {
      // 以下都等抓完fetch才執行
      return;
    }
    const items = document.querySelectorAll('.ru-items');
    //  console.log(items)
    const puts = document.querySelectorAll('.ru-put');
    const img = document.querySelector('#ru-areaF .ru-put');
    // console.log(puts)
    const $dropTarget = document.getElementById('ru-dropArea');
    console.log($dropTarget);
    const boxA = document.getElementById('ru-areaA');
    const boxB = document.getElementById('ru-areaB');
    const boxC = document.getElementById('ru-areaC');
    const boxD = document.getElementById('ru-areaD');
    const boxE = document.getElementById('ru-areaE');
    const boxF = document.getElementById('ru-areaF');
    // console.log($dragSource)
    // console.log($dropTarget)

    items.forEach((i) => {
      i.addEventListener('dragstart', dragStart); // drag
    });
    puts.forEach((i) => {
      i.addEventListener('dragstart', dragStart); // drag
    });
    // $dragSource.addEventListener('drag', drag) // drag
    // $dragSource.addEventListener('dragend', dragend) // drag
    $dropTarget.addEventListener('dragenter', dragenter); // drop
    $dropTarget.addEventListener('dragover', dragover); // drop
    $dropTarget.addEventListener('dragleave', dragleave); // drag
    $dropTarget.addEventListener('drop', dropped); // drop

    // 來源 - 開始拖曳時
    function dragStart(e) {
      // console.log('dragStart', e.target.id)
      if (e.target.classList.contains('ru-rice')) {
        // 如果是白飯選區內的選項
        setPriority('100'); // 白飯容器就優先
      }
      e.dataTransfer.setData('text/plain', e.target.id); // 把 source 的id往drop事件傳遞
    }

    // 來源 - 拖曳中時
    function drag(e) {}

    // 來源 - 拖曳結束時
    function dragend(e) {}

    // 目的地 - 進到放置區時
    function dragenter(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // 目的地 - 進到放置區時拖動(反覆觸發)
    function dragover(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // 目的地 - 離開放置區時
    function dragleave(e) {}

    // 目的地 - 放下時
    function dropped(e) {
      //增刪元素
      // console.log(e.dataTransfer.getData('text/plain', e.target.id)) // 拿到dragStart事件的id
      setPriority('0'); // 白飯容器優先結束
      // 宣告已經放在配菜區內的元素

      const boxer = document.getElementById(
        e.dataTransfer.getData('text/plain', e.target.id)
      );
      // 丟棄邏輯 - 放到這些區域可以丟棄該品項
      if (
        e.target !== boxA &&
        e.target !== boxB &&
        e.target !== boxC &&
        e.target !== boxD &&
        e.target !== boxE &&
        e.target !== boxF
      ) {
        switch (e.dataTransfer.getData('text/plain', e.target.id)) {
          case 'ru-put-1': // 觸發事件在第一個盒子
            // console.log(e.target.className)
            setImgA();
            setVegNameA();
            setVegPriceA(0);
            setVegCalA(0);
            // 復原可控物件邏輯
            // 宣告待會從盒子內取出的目標含有哪些class
            if (
              // 如果配菜區內的既有菜色者的classList包含('ru-put-veg-1')
              boxer.classList.contains('ru-put-veg-1')
            ) {
              setVeg1available(true); // 那被丟棄後就讓選菜區變回可控物件
            } else if (boxer.classList.contains('ru-put-veg-2')) {
              setVeg2available(true);
            } else if (boxer.classList.contains('ru-put-veg-3')) {
              setVeg3available(true);
            } else if (boxer.classList.contains('ru-put-veg-4')) {
              setVeg4available(true);
            } else if (boxer.classList.contains('ru-put-veg-5')) {
              setVeg5available(true);
            }
            break;
          case 'ru-put-2': // 觸發事件在第二個盒子
            setImgB();
            setVegNameB();
            setVegPriceB(0);
            setVegCalB(0);
            // 復原可控物件邏輯
            if (boxer.classList.contains('ru-put-veg-1')) {
              // 如果目標classList含有'ru-put-veg-1'
              setVeg1available(true); // 那被丟棄後就讓選菜區變回可控物件
            } else if (boxer.classList.contains('ru-put-veg-2')) {
              setVeg2available(true);
            } else if (boxer.classList.contains('ru-put-veg-3')) {
              setVeg3available(true);
            } else if (boxer.classList.contains('ru-put-veg-4')) {
              setVeg4available(true);
            } else if (boxer.classList.contains('ru-put-veg-5')) {
              setVeg5available(true);
            }
            break;
          case 'ru-put-3': // 觸發事件在第三個盒子
            setImgC();
            setVegNameC();
            setVegPriceC(0);
            setVegCalC(0);
            // 復原可控物件邏輯
            if (boxer.classList.contains('ru-put-veg-1')) {
              // 如果目標classList含有'ru-put-veg-1'
              setVeg1available(true); // 那被丟棄後就讓選菜區變回可控物件
            } else if (boxer.classList.contains('ru-put-veg-2')) {
              setVeg2available(true);
            } else if (boxer.classList.contains('ru-put-veg-3')) {
              setVeg3available(true);
            } else if (boxer.classList.contains('ru-put-veg-4')) {
              setVeg4available(true);
            } else if (boxer.classList.contains('ru-put-veg-5')) {
              setVeg5available(true);
            }
            break;
          case 'ru-put-4': // 觸發事件在第四個盒子
            setImgD();
            setRiceName();
            setRicePrice(0);
            setRiceCal(0);
            break;
          case 'ru-put-5': // 觸發事件在第五個盒子
            setImgE();
            setEggName();
            setEggPrice(0);
            setEggCal(0);
            break;
          case 'ru-put-6': // 觸發事件在第六個盒子
            setImgF();
            setMeetName();
            setMeetPrice(0);
            setMeetPrice(0);
            setMeetCal(0);
            break;
        }
      } else if (e.target === boxA) {
        setIsShowHint(false); // 東西放完就關閉示字樣
        // 配菜A區
        // 如果放開滑鼠的地方是在 boxA 身上
        switch (e.dataTransfer.getData('text/plain', e.target.id)) {
          case 'ru-veg-1': // 'ru-veg-1'
            setImgA(cauliflowerAfter);
            // setVegNameA(data[6].productName)
            // setVegPriceA(data[6].price)
            // setVegCalA(data[6].calories)
            setVegNameA(data[8].productName);
            setVegPriceA(data[8].price);
            setVegCalA(data[8].calories);
            setVeg1available(false);
            setPutAclass('ru-put ru-put-veg-1');
            break;
          case 'ru-veg-2':
            setImgA(cabageAfter);
            setVegNameA(data[9].productName);
            setVegPriceA(data[9].price);
            setVegCalA(data[9].calories);
            setVeg2available(false);
            setPutAclass('ru-put ru-put-veg-2');
            break;
          case 'ru-veg-3':
            setImgA(cornAfter);
            setVegNameA(data[10].productName);
            setVegPriceA(data[10].price);
            setVegCalA(data[10].calories);
            setVeg3available(false);
            setPutAclass('ru-put ru-put-veg-3');
            break;
          case 'ru-veg-4':
            setImgA(qingjiangAfter);
            setVegNameA(data[11].productName);
            setVegPriceA(data[11].price);
            setVegCalA(data[11].calories);
            setVeg4available(false);
            setPutAclass('ru-put ru-put-veg-4');
            break;
          case 'ru-veg-5':
            setImgA(eggplantAfter);
            setVegNameA(data[12].productName);
            setVegPriceA(data[12].price);
            setVegCalA(data[12].calories);
            setVeg5available(false);
            setPutAclass('ru-put ru-put-veg-5');
            break;
        }
      } else if (e.target === boxB) {
        setIsShowHint(false); // 東西放完就關閉示字樣
        // 配菜B區
        // 如果放開滑鼠的地方是在 boxB 身上
        switch (e.dataTransfer.getData('text/plain', e.target.id)) {
          case 'ru-veg-1': // 'ru-veg-1'
            setImgB(cauliflowerAfter);
            setVegNameB(data[8].productName);
            setVegPriceB(data[8].price);
            setVegCalB(data[8].calories);
            setVeg1available(false);
            setPutBclass('ru-put ru-put-veg-1');
            break;
          case 'ru-veg-2':
            setImgB(cabageAfter);
            setVegNameB(data[9].productName);
            setVegPriceB(data[9].price);
            setVegCalB(data[9].calories);
            setVeg2available(false);
            setPutBclass('ru-put ru-put-veg-2');
            break;
          case 'ru-veg-3':
            setImgB(cornAfter);
            setVegNameB(data[10].productName);
            setVegPriceB(data[10].price);
            setVegCalB(data[10].calories);
            setVeg3available(false);
            setPutBclass('ru-put ru-put-veg-3');
            break;
          case 'ru-veg-4':
            setImgB(qingjiangAfter);
            setVegNameB(data[11].productName);
            setVegPriceB(data[11].price);
            setVegCalB(data[11].calories);
            setVeg4available(false);
            setPutBclass('ru-put ru-put-veg-4');
            break;
          case 'ru-veg-5':
            setImgB(eggplantAfter);
            setVegNameB(data[12].productName);
            setVegPriceB(data[12].price);
            setVegCalB(data[12].calories);
            setVeg5available(false);
            setPutBclass('ru-put ru-put-veg-5');
            break;
        }
      } else if (e.target === boxC) {
        setIsShowHint(false); // 東西放完就關閉示字樣
        // 配菜C區
        // 如果放開滑鼠的地方是在 boxC 身上
        switch (
          e.dataTransfer.getData('text/plain', e.target.id) // 當source的id是
        ) {
          case 'ru-veg-1': // 'ru-veg-1'
            setImgC(cauliflowerAfter); // 就改變state值
            setVegNameC(data[8].productName);
            setVegPriceC(data[8].price);
            setVegCalC(data[8].calories);
            setVeg1available(false);
            setPutCclass('ru-put ru-put-veg-1');
            break;
          case 'ru-veg-2':
            setImgC(cabageAfter);
            setVegNameC(data[9].productName);
            setVegPriceC(data[9].price);
            setVegCalC(data[9].calories);
            setVeg2available(false);
            setPutCclass('ru-put ru-put-veg-2');
            break;
          case 'ru-veg-3':
            setImgC(cornAfter);
            setVegNameC(data[10].productName);
            setVegPriceC(data[10].price);
            setVegCalC(data[10].calories);
            setVeg3available(false);
            setPutCclass('ru-put ru-put-veg-3');
            break;
          case 'ru-veg-4':
            setImgC(qingjiangAfter);
            setVegNameC(data[11].productName);
            setVegPriceC(data[11].price);
            setVegCalC(data[11].calories);
            setVeg4available(false);
            setPutCclass('ru-put ru-put-veg-4');
            break;
          case 'ru-veg-5':
            setImgC(eggplantAfter);
            setVegNameC(data[12].productName);
            setVegPriceC(data[12].price);
            setVegCalC(data[12].calories);
            setVeg5available(false);
            setPutCclass('ru-put ru-put-veg-5');
            break;
        }
      } else if (
        e.target === boxD ||
        e.target === boxE ||
        e.target === boxF ||
        e.target === img
      ) {
        // 白飯區
        setIsShowHint(false); // 東西放完就關閉示字樣
        switch (
          e.dataTransfer.getData('text/plain', e.target.id) // 當source的id是
        ) {
          case 'ru-rice-1': // 'ru-rice-1'
            setImgD(riceAfter); // 就放入放置後圖片
            setRiceName(data[0].productName);
            setRicePrice(data[0].price);
            setRiceCal(data[0].calories);
            break;
          case 'ru-rice-2':
            setImgD(grainRiceAfter);
            setRiceName(data[1].productName);
            setRicePrice(data[1].price);
            setRiceCal(data[1].calories);
            break;
          case 'ru-rice-3':
            setImgD(redQuinoaAfter);
            setRiceName(data[2].productName);
            setRicePrice(data[2].price);
            setRiceCal(data[2].calories);
            break;
          case 'ru-egg-1': // 'ru-egg-1'
            setImgE(eggAfter); // 就放入放置後圖片
            setEggName(data[6].productName);
            setEggPrice(data[6].price);
            setEggCal(data[6].calories);
            break;
          case 'ru-egg-2':
            setImgE(poachedEggAfter);
            setEggName(data[7].productName);
            setEggPrice(data[7].price);
            setEggCal(data[7].calories);
            break;
          case 'ru-meet-1': // 'ru-meet-1'
            setImgF(chickenBreastAfter); // 就放入放置後圖片
            setMeetName(data[3].productName);
            setMeetPrice(data[3].price);
            setMeetCal(data[3].calories);
            break;
          case 'ru-meet-2':
            setImgF(chickenLegAfter);
            setMeetName(data[4].productName);
            setMeetPrice(data[4].price);
            setMeetCal(data[4].calories);
            break;
          case 'ru-meet-3':
            setImgF(shrimpAfter);
            setMeetName(data[5].productName);
            setMeetPrice(data[5].price);
            setMeetCal(data[5].calories);
            break;
        }
      }
    }

    function dragleave(e) {
      // console.log('dragleave')
    }

    return () => {};
  }, [imgA, imgB, imgC, imgD, imgE, imgF, selection, isCanBuy, data]); // 要加入selection, 不然切換菜色選區後抓不到真實DOM

  // 購物車選購完畢開啟加入購物車按鈕邏輯
  useEffect(() => {
    // console.log(ricePrice !== 0)
    if (
      // 開啟邏輯
      ricePrice !== 0 &&
      meetPrice !== 0 &&
      eggPrice !== 0 &&
      vegPriceA !== 0 &&
      vegPriceB !== 0 &&
      vegPriceC !== 0
    ) {
      setIsCanBuy(true);
    } else if (
      // 關閉邏輯
      ricePrice === 0 ||
      meetPrice === 0 ||
      eggPrice === 0 ||
      vegPriceA === 0 ||
      vegPriceB === 0 ||
      vegPriceC === 0
    ) {
      setIsCanBuy(false);
    }

    return () => {};
  }, [ricePrice, meetPrice, eggPrice, vegPriceA, vegPriceB, vegPriceC]);

  if (!data) {
    // 以下都等抓完fetch才執行
    return <></>;
  }
  return (
    <>
      {/* <div>{data[3].sid}</div> */}
      {/* 商品區 - 網頁版 s */}
      <div className="ru-custom-containerA" id="ru-dropArea">
        <div className="ru-custom-warp" id="ru-dropOutAreaA">
          <div className="ru-drop-container" id="ru-dropOutAreaB">
            <div className="ru-drop-warp" id="ru-dropOutAreaC">
              <div className="ru-box-container">
                <div className="ru-box-warp">
                  {isShowHint && <RuCutsomHint />}
                  {/* 放置菜色A區vegA s*/}
                  <div id="ru-hintA">
                    {isShowHintA && <img src={hintA}></img>}
                  </div>
                  <div id="ru-areaA">
                    <img
                      src={imgA}
                      draggable="true"
                      className={putAclass}
                      id="ru-put-1"
                    ></img>
                  </div>
                  {/* 放置菜色A區vegA e*/}
                  {/* 放置菜色B區vegB s*/}
                  <div id="ru-hintB">
                    {isShowHintB && <img src={hintB}></img>}
                  </div>

                  <div id="ru-areaB">
                    <img
                      src={imgB}
                      draggable="true"
                      className={putBclass}
                      id="ru-put-2"
                    ></img>
                  </div>
                  {/* 放置菜色B區vegB e*/}
                  {/* 放置菜色C區vegC s*/}
                  <div id="ru-hintC">
                    {isShowHintC && <img src={hintC}></img>}
                  </div>

                  <div id="ru-areaC">
                    <img
                      src={imgC}
                      draggable="true"
                      className={putCclass}
                      id="ru-put-3"
                    ></img>
                  </div>
                  {/* 放置菜色C區vegC e*/}
                  {/* 放置菜色D區rice s*/}
                  <div id="ru-hintD">
                    {isShowHintD && <img src={hintD}></img>}
                  </div>
                  <div id="ru-areaD" style={{ zIndex: priority }}>
                    <img
                      src={imgD}
                      draggable="true"
                      className="ru-put"
                      id="ru-put-4"
                    ></img>
                  </div>
                  {/* 放置菜色D區rice e*/}
                  {/* 放置菜色E區egg s*/}
                  <div id="ru-hintE">
                    {isShowHintE && <img src={hintE}></img>}
                  </div>

                  <div id="ru-areaE">
                    <img
                      src={imgE}
                      draggable="true"
                      className="ru-put"
                      id="ru-put-5"
                    ></img>
                  </div>
                  {/* 放置菜色E區egg e*/}
                  {/* 放置菜色F區meet s*/}
                  <div id="ru-hintF">
                    {isShowHintF && <img src={hintF}></img>}
                  </div>

                  <div id="ru-areaF">
                    <img
                      src={imgF}
                      draggable="true"
                      className="ru-put"
                      id="ru-put-6"
                    ></img>
                  </div>
                  {/* 放置菜色F區meet e*/}
                  <LunchBox />
                </div>
              </div>
              <div className="ru-detail-container" id="ru-dropOutAreaD">
                <div className="ru-switchBtn-container">
                  {/* 是否開啟價格標示 */}
                  <button id={isPrice && 'ru-active'} onClick={switchPrice}>
                    今日菜色
                  </button>
                  {/* 是否開啟營養標示 */}
                  <button id={isCal && 'ru-active'} onClick={switchCal}>
                    營養標示
                  </button>
                </div>
                <div className="ru-info-container">
                  {isPrice && (
                    <RuPriceA
                      riceName={riceName}
                      ricePrice={ricePrice}
                      meetName={meetName}
                      meetPrice={meetPrice}
                      eggName={eggName}
                      eggPrice={eggPrice}
                      vegNameA={vegNameA}
                      vegPriceA={vegPriceA}
                      vegNameB={vegNameB}
                      vegPriceB={vegPriceB}
                      vegNameC={vegNameC}
                      vegPriceC={vegPriceC}
                    />
                  )}
                  {isCal && (
                    <RuCalA
                      data={data}
                      riceName={riceName}
                      riceCal={riceCal}
                      meetName={meetName}
                      meetCal={meetCal}
                      eggName={eggName}
                      eggCal={eggCal}
                      vegNameA={vegNameA}
                      vegCalA={vegCalA}
                      vegNameB={vegNameB}
                      vegCalB={vegCalB}
                      vegNameC={vegNameC}
                      vegCalC={vegCalC}
                    />
                  )}
                </div>
                <div className="ru-checkout-container">
                  <div className="ru-checkout-warp">
                    <RuCounter
                      setAmount={setAmount}
                      count={count}
                      setCount={setCount}
                    />
                    {isCanBuy ? (
                      <RuAddCart
                        id={'addCart-btn-custom'}
                        parentId={'addCart-btn-warp-custom'}
                        handleCartNumber={handleCartNumber}
                        proudctId={todayId}
                        imgId={'23_custom'}
                        price={
                          ricePrice +
                          meetPrice +
                          eggPrice +
                          vegPriceA +
                          vegPriceB +
                          vegPriceC
                        }
                        title={'客製化便當'}
                        amount={amount}
                        setIsShowHintA={setIsShowHintA}
                        setIsShowHintB={setIsShowHintB}
                        setIsShowHintC={setIsShowHintC}
                        setIsShowHintD={setIsShowHintD}
                        setIsShowHintE={setIsShowHintE}
                        setIsShowHintF={setIsShowHintF}
                        count={count}
                      />
                    ) : (
                      <div
                        class="ru-isCanBuy"
                        style={{
                          width: '100%',
                          pointerEvents: 'none',
                          filter: 'grayscale(100%)',
                        }}
                      >
                        <RuAddCart
                          id={'addCart-btn-custom'}
                          parentId={'addCart-btn-warp-custom'}
                          handleCartNumber={handleCartNumber}
                          proudctId={todayId}
                          imgId={'23_custom'}
                          price={
                            ricePrice +
                            meetPrice +
                            eggPrice +
                            vegPriceA +
                            vegPriceB +
                            vegPriceC
                          }
                          title={'客製化便當'}
                          amount={amount}
                          setIsShowHintA={setIsShowHintA}
                          setIsShowHintB={setIsShowHintB}
                          setIsShowHintC={setIsShowHintC}
                          setIsShowHintD={setIsShowHintD}
                          setIsShowHintE={setIsShowHintE}
                          setIsShowHintF={setIsShowHintF}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ru-drag-container">
            <div className="ru-drag-warp">
              <div className="ru-selection-container">
                <div className="ru-selection-warp">
                  <RuButtonB
                    text={'副食'}
                    id={'ru-buttonB-rice'}
                    selection={selection}
                    setSelection={setSelection}
                    moveX={moveX}
                    setMoveX={setMoveX}
                    limitX={limitX} // 調配右滑極限值
                    setLimitX={setLimitX} // 調配右滑極限值
                    isShowHintA={isShowHintA}
                    setIsShowHintA={setIsShowHintA}
                    isShowHintB={isShowHintB}
                    setIsShowHintB={setIsShowHintB}
                    isShowHintC={isShowHintC}
                    setIsShowHintC={setIsShowHintC}
                    isShowHintD={isShowHintD}
                    setIsShowHintD={setIsShowHintD}
                    isShowHintE={isShowHintE}
                    setIsShowHintE={setIsShowHintE}
                    isShowHintF={isShowHintF}
                    setIsShowHintF={setIsShowHintF}
                  />
                  <RuButtonB
                    text={'主食'}
                    id={'ru-buttonB-meet'}
                    selection={selection}
                    setSelection={setSelection}
                    moveX={moveX}
                    setMoveX={setMoveX}
                    limitX={limitX} // 調配右滑極限值
                    setLimitX={setLimitX} // 調配右滑極限值
                    isShowHintA={isShowHintA}
                    setIsShowHintA={setIsShowHintA}
                    isShowHintB={isShowHintB}
                    setIsShowHintB={setIsShowHintB}
                    isShowHintC={isShowHintC}
                    setIsShowHintC={setIsShowHintC}
                    isShowHintD={isShowHintD}
                    setIsShowHintD={setIsShowHintD}
                    isShowHintE={isShowHintE}
                    setIsShowHintE={setIsShowHintE}
                    isShowHintF={isShowHintF}
                    setIsShowHintF={setIsShowHintF}
                  />
                  <RuButtonB
                    text={'配菜'}
                    id={'ru-buttonB-vegetable'}
                    selection={selection}
                    setSelection={setSelection}
                    moveX={moveX}
                    setMoveX={setMoveX}
                    limitX={limitX} // 調配右滑極限值
                    setLimitX={setLimitX} // 調配右滑極限值
                    isShowHintA={isShowHintA}
                    setIsShowHintA={setIsShowHintA}
                    isShowHintB={isShowHintB}
                    setIsShowHintB={setIsShowHintB}
                    isShowHintC={isShowHintC}
                    setIsShowHintC={setIsShowHintC}
                    isShowHintD={isShowHintD}
                    setIsShowHintD={setIsShowHintD}
                    isShowHintE={isShowHintE}
                    setIsShowHintE={setIsShowHintE}
                    isShowHintF={isShowHintF}
                    setIsShowHintF={setIsShowHintF}
                  />
                  <RuButtonB
                    text={'蛋'}
                    id={'ru-buttonB-egg'}
                    selection={selection}
                    setSelection={setSelection}
                    moveX={moveX}
                    setMoveX={setMoveX}
                    limitX={limitX} // 調配右滑極限值
                    setLimitX={setLimitX} // 調配右滑極限值
                    isShowHintA={isShowHintA}
                    setIsShowHintA={setIsShowHintA}
                    isShowHintB={isShowHintB}
                    setIsShowHintB={setIsShowHintB}
                    isShowHintC={isShowHintC}
                    setIsShowHintC={setIsShowHintC}
                    isShowHintD={isShowHintD}
                    setIsShowHintD={setIsShowHintD}
                    isShowHintE={isShowHintE}
                    setIsShowHintE={setIsShowHintE}
                    isShowHintF={isShowHintF}
                    setIsShowHintF={setIsShowHintF}
                  />
                </div>
              </div>

              <div className="ru-species-container">
                <RuArrowLeft moveX={moveX} setMoveX={setMoveX} />
                {/* 副食 / 主食 / 配菜 / 蛋 的元件 s*/}
                <div className="ru-species-warp">
                  {/* 移動區 s */}
                  <ul
                    id="moveArea1"
                    style={{ transform: `translateX(${moveX}px)` }}
                  >
                    {selection === 'rice' && <RuRiceA data={data} />}
                    {selection === 'meet' && <RuMeetA data={data} />}
                    {selection === 'vegetable' && (
                      <RuVegetableA
                        data={data}
                        veg1available={veg1available}
                        veg2available={veg2available}
                        veg3available={veg3available}
                        veg4available={veg4available}
                        veg5available={veg5available}
                      />
                    )}
                    {selection === 'egg' && <RuEggA data={data} />}
                    {/*  副食 / 主食 / 配菜 / 蛋 的元件 e*/}
                  </ul>
                  {/* 移動區 e */}
                </div>
                <RuArrowRight
                  moveX={moveX}
                  setMoveX={setMoveX}
                  limitX={limitX}
                  setLimitX={setLimitX}
                />
              </div>
            </div>
          </div>
        </div>
        {/* 背景米圖 s */}
        <img src={background}></img>
        {/* 背景米圖 e */}
      </div>
      {/* 商品區 - 網頁版 e */}

      {/* 商品區 - 手機版 s */}
      {/* <div className="ru-custom-containerC">
        <div className="ru-custom-warp">
          <div className="ru-drop-container">
            <div className="ru-drop-warp">
              <div className="ru-box-container">
                <div className="ru-box-warp">
                  <LunchBox />
                </div>
              </div>
            </div>
          </div>
          <div className="ru-drag-container">
            <div className="ru-drag-warp">
              <div className="ru-selection-container">
                <div className="ru-selection-warp">
                  <div className="ru-selectionBtn-warp ru-selectionBtn-warp1">
                    <RuButtonB
                      text={'副食'}
                      id={'ru-buttonB-rice'}
                    />
                    <RuButtonB
                      text={'主食'}
                      id={'ru-buttonB-meet'}
                    />
                  </div>
                  <div className="ru-selectionBtn-warp ru-selectionBtn-warp2">
                    <RuButtonB
                      text={'配菜'}
                      id={'ru-buttonB-vegetable'}
                    />
                    <RuButtonB
                      text={'蛋'}
                      id={'ru-buttonB-egg'}
                    />
                  </div>
                </div>
              </div>

              <div className="ru-species-container">
                <RuArrowLeft />
                <div className="ru-species-warp">
                  <ul> */}
      {/* 品項1 s*/}
      {/* <li className="ru-species-item ru-species-item1">
                      <div className="ru-species-img">
                        <img src={cauliflower}></img>
                      </div>
                      <div className="ru-species-info">
                        <ul>
                          <li>
                            <h4>
                              綠色嫩花椰<span>$10</span>
                            </h4>
                          </li>
                          <li className="ru-species-calories">
                            熱量: <span>50大卡</span>
                          </li>
                          <li className="ru-species-carbohydrates">
                            碳水化合物: <span>10大卡</span>
                          </li>
                          <li className="ru-species-protein">
                            蛋白質: <span>10大卡</span>
                          </li>
                          <li className="ru-species-fat">
                            脂肪: <span>10大卡</span>
                          </li>
                        </ul>
                      </div>
                      <div className="ru-species-btn">
                        <RuButtonC text={'選擇'} />
                      </div>
                    </li> */}
      {/* 品項1 e*/}

      {/* 品項2 s*/}
      {/* <li className="ru-species-item ru-species-item2">
                      <div className="ru-species-img">
                        <img src={cauliflower}></img>
                      </div>
                      <div className="ru-species-info">
                        <ul>
                          <li>
                            <h4>
                              綠色嫩花椰<span>$10</span>
                            </h4>
                          </li>
                          <li className="ru-species-calories">
                            熱量: <span>50大卡</span>
                          </li>
                          <li className="ru-species-carbohydrates">
                            碳水化合物: <span>$10</span>
                          </li>
                          <li className="ru-species-protein">
                            蛋白質: <span>$10</span>
                          </li>
                          <li className="ru-species-fat">
                            脂肪: <span>$10</span>
                          </li>
                        </ul>
                      </div>
                      <div className="ru-species-btn">
                        <RuButtonC text={'選擇'} />
                      </div>
                    </li> */}
      {/* 品項2 e*/}

      {/* 品項3 s*/}
      {/* <li className="ru-species-item ru-species-item3">
                      <div className="ru-species-img">
                        <img src={cauliflower}></img>
                      </div>
                      <div className="ru-species-info">
                        <ul>
                          <li>
                            <h4>
                              綠色嫩花椰: <span>$10</span>
                            </h4>
                          </li>
                          <li className="ru-species-calories">
                            熱量: <span>50大卡</span>
                          </li>
                          <li className="ru-species-carbohydrates">
                            碳水化合物: <span>$10</span>
                          </li>
                          <li className="ru-species-protein">
                            蛋白質: <span>$10</span>
                          </li>
                          <li className="ru-species-fat">
                            脂肪: <span>$10</span>
                          </li>
                        </ul>
                      </div>
                    </li> */}
      {/* 品項3 e*/}

      {/* 品項4 s*/}
      {/* <li className="ru-species-item ru-species-item4">
                      <div className="ru-species-img">
                        <img src={cauliflower}></img>
                      </div>
                      <div className="ru-species-info">
                        <ul>
                          <li>
                            <h4>
                              綠色嫩花椰: <span>$10</span>
                            </h4>
                          </li>
                          <li className="ru-species-calories">
                            熱量: <span>50大卡</span>
                          </li>
                          <li className="ru-species-carbohydrates">
                            碳水化合物: <span>$10</span>
                          </li>
                          <li className="ru-species-protein">
                            蛋白質: <span>$10</span>
                          </li>
                          <li className="ru-species-fat">
                            脂肪: <span>$10</span>
                          </li>
                        </ul>
                      </div>
                    </li> */}
      {/* 品項4 e*/}

      {/* 品項5 s*/}
      {/* <li className="ru-species-item ru-species-item5">
                      <div className="ru-species-img">
                        <img src={cauliflower}></img>
                      </div>
                      <div className="ru-species-info">
                        <ul>
                          <li>
                            <h4>
                              綠色嫩花椰:<span>$10</span>
                            </h4>
                          </li>
                          <li className="ru-species-calories">
                            熱量:<span>50大卡</span>
                          </li>
                          <li className="ru-species-carbohydrates">
                            碳水化合物:<span>$10</span>
                          </li>
                          <li className="ru-species-protein">
                            蛋白質:<span>$10</span>
                          </li>
                          <li className="ru-species-fat">
                            脂肪:<span>$10</span>
                          </li>
                        </ul>
                      </div>
                    </li> */}
      {/* 品項5 e*/}
      {/* </ul>
                </div>
                <RuArrowRight />
              </div>

              <div className="ru-detail-container">
                <div className="ru-switchBtn-container">
                  <button>今日菜色</button>
                  <button>營養標示</button>
                </div>

                <div className="ru-info-container">
                  <div className="ru-info-item-container">
                    <ul className="ru-info-item-warp"> */}
      {/* 詳細資料品項1 s */}
      {/* <li className="ru-info-item ru-info-item1">
                        <div className="ru-category-container">
                          <p className="ru-category">副食</p>
                        </div>
                        <p className="ru-selectionName">香甜白飯</p>
                        <p className="ru-number">$10</p>
                      </li> */}
      {/* 詳細資料品項1 e */}

      {/* 詳細資料品項2 s */}
      {/* <li className="ru-info-item ru-info-item2">
                        <div className="ru-category-container">
                          <p className="ru-category">主食</p>
                        </div>
                        <p className="ru-selectionName">慢煮嫩雞胸-蒜味香草</p>
                        <p className="ru-number">$55</p>
                      </li> */}
      {/* 詳細資料品項2 e */}

      {/* 詳細資料品項3 s */}
      {/* <li className="ru-info-item ru-info-item3">
                        <div className="ru-category-container">
                          <p className="ru-category">配菜</p>
                        </div>
                        <p className="ru-selectionName">清炒高麗菜</p>
                        <p className="ru-number">$10</p>
                      </li> */}
      {/* 詳細資料品項3 e */}

      {/* 詳細資料品項4 s */}
      {/* <li className="ru-info-item ru-info-item4">
                        <div className="ru-category-container">
                          <p className="ru-category">配菜</p>
                        </div>
                        <p className="ru-selectionName">綠色嫩花椰</p>
                        <p className="ru-number">$10</p>
                      </li> */}
      {/* 詳細資料品項4 e */}

      {/* 詳細資料品項5 s */}
      {/* <li className="ru-info-item ru-info-item5">
                        <div className="ru-category-container">
                          <p className="ru-category">配菜</p>
                        </div>
                        <p className="ru-selectionName">黃金玉米</p>
                        <p className="ru-number">$15</p>
                      </li> */}
      {/* 詳細資料品項5 e */}

      {/* 詳細資料品項6 s */}
      {/* <li className="ru-info-item ru-info-item6">
                        <div className="ru-category-container">
                          <p className="ru-category">蛋</p>
                        </div>
                        <p className="ru-selectionName">水煮蛋</p>
                        <p className="ru-number">$10</p>
                      </li> */}
      {/* 詳細資料品項 e */}
      {/* </ul>
                  </div>
                  <div className="ru-info-total-container">
                    <div className="ru-info-total-warp">
                      <h3>總金額</h3>
                      <p>$110</p>
                    </div>
                  </div>
                </div>

                <div className="ru-checkout-container">
                  <div className="ru-checkout-warp">
                    <RuSelection />
                    <RuAddCart
                      id={'addCart-btn-custom'}
                      parentId={'addCart-btn-warp-custom'}
                      setAmount={setAmount}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src={background}></img>
      </div> */}
      {/* 商品區 - 手機版 e */}
      {/* <Selecton /> */}

      {/* 背景米圖 s */}
      {/* <img src={background}></img> */}
      {/* 背景米圖 e */}
    </>
  );
}

export default RuCustom;
