import React, { Component } from 'react'
import Loading from './Loading.gif';

// export class Spinner extends Component {
const Spinner=()=> {

  // render() {
    return (
      <div className='text-center my-3'>
        <img src={Loading} alt="trying to figue out"/>
      </div>
    )
  }
// }

export default Spinner
