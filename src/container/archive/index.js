import React, { useState } from "react";
import Layout from "../../component/layout";
import GalleryTab from '../../component/galleryTab';
import VideoTab from '../../component/videoTab';
import AchievementTab from '../../component/achievementTab';
import './style.css';

/**
 * @author
 * @function Archive
 **/

const Archive = (props) => {

  const Items = [
    {title: 'Gallery'},
    {title: 'Video'},
    {title: 'Achievement'}
  ]
  const [active, setActive] = useState(Items[0].title);

  const switchTabs = () => {
    switch (active) {
      case "Gallery":
        return <GalleryTab/>;
        break;

      case "Video":
        return <VideoTab/>;
        break;

      case "Achievement":
        return <AchievementTab/>;
        break;

      default:
        break;
    }
  };

  return(
      <Layout>
          <div className="archive_main_div">
            <div className="archive_sub_main_div">
              {
                Items.map(itm => {
                  return <div 
                    className="tabs_Item"
                    key={itm.title}
                    active={active == itm.title ? active: ''}
                    onClick={() => setActive(itm.title)}
                  > 
                  {itm.title} 
                  </div>
                })
              }
            </div>


            <div className="main_tabs_div"> 
              {switchTabs()}
            </div>
          </div>
      </Layout>
  )
};

export default Archive;
