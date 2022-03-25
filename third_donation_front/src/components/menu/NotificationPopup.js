import { memo, useState } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';

const NotificationPopup = () => {
  const [notification, setNotification] = useState(false);
  const refNotification = useOnclickOutside(() => closeNotification());
  const closeNotification = () => setNotification(false);

  return (
    <div
      id="de-click-menu-notification"
      className="de-menu-notification"
      onClick={() => setNotification(!notification)}
      ref={refNotification}>
      <div className="d-count">8</div>
      <i className="fa fa-bell"></i>
      {notification && (
        <div className="popshow">
          <div className="de-flex">
            <h4>알림</h4>
            <span className="viewaall">전체보기</span>
          </div>
          <ul>
            <li>
              <div className="mainnot">
                <img className="lazy" src="../../img/author/author-2.jpg" alt="" />
                <div className="d-desc">
                  <span className="d-name">
                    <b>Mamie Barnett</b> started following you
                  </span>
                  <span className="d-time">1 hour ago</span>
                </div>
              </div>
            </li>
            <li>
              <div className="mainnot">
                <img className="lazy" src="../../img/author/author-3.jpg" alt="" />
                <div className="d-desc">
                  <span className="d-name">
                    <b>Nicholas Daniels</b> liked your item
                  </span>
                  <span className="d-time">2 hours ago</span>
                </div>
              </div>
            </li>
            <li>
              <div className="mainnot">
                <img className="lazy" src="../../img/author/author-4.jpg" alt="" />
                <div className="d-desc">
                  <span className="d-name">
                    <b>Lori Hart</b> started following you
                  </span>
                  <span className="d-time">18 hours ago</span>
                </div>
              </div>
            </li>
            <li>
              <div className="mainnot">
                <img className="lazy" src="../../img/author/author-5.jpg" alt="" />
                <div className="d-desc">
                  <span className="d-name">
                    <b>Jimmy Wright</b> liked your item
                  </span>
                  <span className="d-time">1 day ago</span>
                </div>
              </div>
            </li>
            <li>
              <div className="mainnot">
                <img className="lazy" src="../../img/author/author-6.jpg" alt="" />
                <div className="d-desc">
                  <span className="d-name">
                    <b>Karla Sharp</b> started following you
                  </span>
                  <span className="d-time">3 days ago</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default memo(NotificationPopup);
