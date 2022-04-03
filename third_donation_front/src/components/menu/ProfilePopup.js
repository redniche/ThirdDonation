import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useOnclickOutside from 'react-cool-onclickoutside';
import Wallet from '../accounts/Wallet';
import { clearAccount } from '../../store/actions';
import * as selectors from '../../store/selectors';

const ProfilePopup = () => {
  const dispatch = useDispatch();
  const [profilePopup, setProfilePopup] = useState(false);
  const closeProfilePopup = () => setProfilePopup(false);
  const refProfilePopup = useOnclickOutside(() => closeProfilePopup());

  const { data: account } = useSelector(selectors.accountState);
  const onLogout = () => {
    dispatch(clearAccount());
  };

  function Profile() {
    window.location.href = `/profile/${account.id}`;
  }
  function EditProfile() {
    window.location.href = `/editProfile/${account.id}`;
  }

  return (
    <div
      id="de-click-menu-profile"
      className="de-menu-profile"
      onClick={() => setProfilePopup(!profilePopup)}
      ref={refProfilePopup}>
      <img
        src={
          account.imageBase64
            ? account.imageBase64
            : process.env.PUBLIC_URL + '/img/기본프로필이미지.png'
        }
        alt="프로필"
      />
      {profilePopup && (
        <div className="popshow">
          <div className="d-name">
            <h4>Unnamed</h4>
            <span className="name" onClick={() => window.open('', '_self')}>
              이름 변경
            </span>
          </div>

          <Wallet />

          <div className="d-line"></div>

          <ul className="de-submenu-profile">
            <li onClick={() => Profile()}>
              <span>
                <i className="fa fa-user"></i> 나의 프로필
              </span>
            </li>
            <li onClick={() => EditProfile()}>
              <span>
                <i className="fa fa-pencil"></i> 프로필 수정하기
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
