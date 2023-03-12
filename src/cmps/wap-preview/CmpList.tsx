import React from 'react'
import { Cmp } from '../../interfaces/dynamic-element'
import DynEl from '../general/DynEl'

const CmpList = (props:any) => {
    console.log(props);
    
  return (
    <div>
        {props.cmps.map((cmp:Cmp) => {
            <DynEl tag={cmp.tag} children={cmp.txt} styles={cmp.styles.large}></DynEl>
        })}
    </div>
  )
}

export default CmpList