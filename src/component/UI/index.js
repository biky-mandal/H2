import React from 'react';
import './style.css';
import { FiEdit3 } from 'react-icons/fi';


/**
* @author
* @function DetailSection
**/

const DetailSection = (props) => {
    return (
        <div className="detail_section">
            <div className="left_detail_section">
                <label className="detail_heading_lbl">{props.heading}<span onClick={props.trigger} className="edit-btn1"><FiEdit3/></span></label>
            </div>
            <div className="right_detail_section">
                <label className="detail_body_lbl">
                    {props.body}
                </label>
            </div>
        </div>
    )

}

export default DetailSection