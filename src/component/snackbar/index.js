import React,{forwardRef, useImperativeHandle} from 'react';
import './style.css'

/**
* @author
* @function Snackbar
**/

const Snackbar = forwardRef((props, ref) => {

  useImperativeHandle(ref, () => ({
    showSnackBar(){
      const snackbar = document.querySelector(".snackbar");
      snackbar.classList.add("show");

      setTimeout(() => snackbar.classList.remove("show"), 3000);
    }
  }))
    
  return(
    <div className="snackbar">
        <div>{props.message}</div>
    </div>
   )

})

export default Snackbar