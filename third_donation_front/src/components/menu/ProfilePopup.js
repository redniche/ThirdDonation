import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useOnclickOutside from 'react-cool-onclickoutside';
import Wallet from '../accounts/Wallet';
import { clearAccount } from '../../store/actions';
import * as selectors from '../../store/selectors';
import auth from '../../core/auth';
import { NavLink } from 'react-bootstrap';

const ProfilePopup = () => {
  const dispatch = useDispatch();
  const [profilePopup, setProfilePopup] = useState(false);
  const closeProfilePopup = () => setProfilePopup(false);
  const refProfilePopup = useOnclickOutside(() => closeProfilePopup());

  const { data: account } = useSelector(selectors.accountState);

  const onLogout = () => {
    dispatch(clearAccount());
    auth.clearToken();
  };

  return (
    <div
      id="de-click-menu-profile"
      className="de-menu-profile"
      onClick={() => setProfilePopup(!profilePopup)}
      ref={refProfilePopup}>
      <img src={account.imagePath ? account.imagePath : '/img/기본프로필이미지.png'} alt="프로필" />
      {profilePopup && (
        <div className="popshow">
          <div className="d-name">
            <h4>{account.username}</h4>
          </div>

          <Wallet />

          <div className="d-line"></div>

          <ul className="de-submenu-profile">
            <li>
              <span className="profile-popup-content">
                <NavLink to={'/profile/' + account.id}>
                  <i className="fa fa-user profile"></i>프로필 보기
                </NavLink>
              </span>
            </li>
            <li>
              <span className="profile-popup-content">
                <NavLink to={'/editProfile/' + account.id}>
                  <i className="fa fa-pencil"></i>프로필 수정하기
                </NavLink>
              </span>
            </li>
            <li onClick={() => onLogout()}>
              <span>
                <i className="fa fa-sign-out"></i> 로그아웃
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default memo(ProfilePopup);
