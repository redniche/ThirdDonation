import { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useOnclickOutside from 'react-cool-onclickoutside';
import * as selectors from '../../store/selectors';
import { Axios } from '../../core/axios';

const NotificationPopup = () => {
  const [notification, setNotification] = useState(false);
  const [data, setData] = useState([]);
  const refNotification = useOnclickOutside(() => closeNotification());
  const closeNotification = () => setNotification(false);

  const { data: account } = useSelector(selectors.accountState);

  const fetchNotifications = async () => {
    await Axios.get(`/notifications/${account.id}`)
      .then(({ data }) => data)
      .then(({ data }) => setData(data));
  };

  const readNotifications = async () => {
    await Axios.patch(`/notifications/read/${account.id}`).then(() => setData([]));
  };

  const onIconClick = () => {
    notification && readNotifications();
    !notification && fetchNotifications();
    setNotification(!notification);
  };

  const formatDate = (date) => {
    let nDate = new Date(date);
    let month = nDate.getMonth() + 1;
    let day = nDate.getDay();
    let hour = nDate.getHours();
    let min = nDate.getMinutes();

    return `${month}월 ${day}일 ${hour < 13 ? ` 오전 ${hour}` : ` 오후 ${hour - 12}`}시 ${min}분`;
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div
      id="de-click-menu-notification"
      className="de-menu-notification"
      onClick={() => onIconClick()}
      ref={refNotification}>
      {data.length ? <div className="d-count">{data.length}</div> : null}
      <i className="fa fa-bell"></i>
      {notification && (
        <div className="popshow">
          <div className="de-flex">
            <h4>알림</h4>
          </div>
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                <div className="mainnot">
                  <div className="d-desc">
                    <span className="d-name">{item.description}</span>
                    <span className="d-time">{formatDate(item.dateCreated)}</span>
                  </div>
                </div>
              </li>
            ))}
            {!data.length && (
              <li>
                <div className="mainnot">
                  <div className="d-desc">
                    <span className="d-name">등록된 알림이 없습니다.</span>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default memo(NotificationPopup);
