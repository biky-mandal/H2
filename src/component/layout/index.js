import React from 'react'
import Header from '../header'

/**
* @author
* @function Layout
**/

const Layout = (props) => {
    return (
        <>
            <Header color={props.color}/>
            {
                props.children
            }
        </>
    )

}

export default Layout