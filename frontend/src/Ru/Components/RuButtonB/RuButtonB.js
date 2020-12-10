import React, { useState, useEffect } from 'react'
import './Style.scss'

function RuButtonB(props) {
  // text 按鈕文字
  // className 橘色樣式為button-btn 綠色樣式為button-btn-g
  const {
    text,
    id,
    selection,
    setSelection,
    moveX,
    setMoveX,
    btnBClassName,
    setBtnBClassName,
    limitX,
    setLimitX,
    isShowHintA,
    setIsShowHintA,
    isShowHintB,
    setIsShowHintB,
    isShowHintC,
    setIsShowHintC,
    isShowHintD,
    setIsShowHintD,
    isShowHintE,
    setIsShowHintE,
    isShowHintF,
    setIsShowHintF,
  } = props

  function handleSelection() {
    const $rice = document.getElementById('ru-buttonB-rice')
    const $meet = document.getElementById('ru-buttonB-meet')
    const $vegetable = document.getElementById('ru-buttonB-vegetable')
    const $egg = document.getElementById('ru-buttonB-egg')

    $rice.className = 'ru-buttonB'
    $meet.className = 'ru-buttonB'
    $vegetable.className = 'ru-buttonB'
    $egg.className = 'ru-buttonB'

    switch (id) {
      case 'ru-buttonB-rice':
        setSelection('rice') // 開啟白飯選區
        setMoveX(0) // 選擇品項按鈕點擊時退回原位
        $rice.className = 'ru-buttonB ru-buttonB-active'
        setIsShowHintA(false)
        setIsShowHintB(false)
        setIsShowHintC(false)
        setIsShowHintD(true)
        setIsShowHintE(false)
        setIsShowHintF(false)
        setLimitX(-100) // 這邊調配右滑極限值
        break
      case 'ru-buttonB-meet':
        setSelection('meet') // 開啟主菜選區
        setMoveX(0)
        $meet.className = 'ru-buttonB ru-buttonB-active'
        setIsShowHintA(false)
        setIsShowHintB(false)
        setIsShowHintC(false)
        setIsShowHintD(false)
        setIsShowHintE(false)
        setIsShowHintF(true)
        setLimitX(-100) // 這邊調配右滑極限值
        break
      case 'ru-buttonB-vegetable':
        setSelection('vegetable') // 開啟配菜選區
        setMoveX(0)
        $vegetable.className = 'ru-buttonB ru-buttonB-active'
        setIsShowHintA(true)
        setIsShowHintB(true)
        setIsShowHintC(true)
        setIsShowHintD(false)
        setIsShowHintE(false)
        setIsShowHintF(false)
        setLimitX(-760) // 這邊調配右滑極限值
        break
      case 'ru-buttonB-egg':
        setSelection('egg') // 開啟蛋選區
        setMoveX(0)
        $egg.className = 'ru-buttonB ru-buttonB-active'
        setIsShowHintA(false)
        setIsShowHintB(false)
        setIsShowHintC(false)
        setIsShowHintD(false)
        setIsShowHintE(true)
        setIsShowHintF(false)
        setLimitX(0) // 這邊調配右滑極限值
        break
    }
  }

  useEffect(() => {
    // 一開始就亮副食選區
    const $rice = document.getElementById('ru-buttonB-rice')
    $rice.className = 'ru-buttonB ru-buttonB-active'
    return () => {}
  }, [])

  return (
    <>
      <button className="ru-buttonB" id={id} onClick={handleSelection}>
        {text}
      </button>
    </>
  )
}

export default RuButtonB
