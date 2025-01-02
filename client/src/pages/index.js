// eslint-disable-next-line no-unused-vars
import React,{useState,useEffect }  from 'react'
import {sessionV, tokenV,userID } from '../store/authuser';
import Login from './login';
import { useAtom } from 'jotai';



export default function Home() {
    const [sessionValue] = useAtom(sessionV);
   
  
    return  <Login />;
}
