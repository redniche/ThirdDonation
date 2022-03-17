import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import auth, { authorUrl } from '../../core/auth';
import request from '../../core/auth/request';
import { navigate } from '@reach/router';
import api from '../../core/api';
import { fetchAuthorList } from '../../store/actions/thunks';
import * as selectors from '../../store/selectors';
import axios from 'axios';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
  }
  .mainside{
    .connect-wal{
      display: none;
    }
    .logout{
      display: flex;
      align-items: center;
    }
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

// 경고창
// 유저이름, 지갑주소 안적으면 경고창 날림
const validationSchema = Yup.object().shape({
  username: Yup.lazy(() => Yup.string().required('유저이름을 적어주세요')),
  wallet: Yup.lazy(() => Yup.string().required('지갑주소를 적어주세요')),
});

// 프로필
const Profile = ({ authorId }) => {
  const jwt = auth.getToken();
  const authorsState = useSelector(selectors.authorsState);
  const author = authorsState.data ? authorsState.data[0] : null;
  // 초기 항목(닉네임, 상세정보, SNS, 지갑)
  const initialValues = {
    username: author ? author.username : '',
    about: author ? author.about : '',
    social: author ? author.social : '',
    wallet: author ? author.wallet : '',
  };
  // 프로필이미지
  const initialProfilePicture = {
    profile_image: '',
  };
  // 프로필 배너
  const initialProfileBanner = {
    profile_banner: '',
  };

  // 디스패치 함수를 실행하는 Hooks 이다.
  // action을 발생시켜 state를 변하게함
  const dispatch = useDispatch();

  // navigate()
  // 새로 이동할 화면이 현재 화면과 같으면 새로운 화면을 쌓지 않고 파라미터만 변경한다.
  const redirectUser = (path) => {
    navigate(path);
  };

  // 폼 제출
  const handleSubmitForm = async (data) => {
    const requestURL = authorUrl(authorId);

    await request(requestURL, { method: 'PUT', body: data })
      .then((response) => {
        console.log(response);
        redirectUser(`/Author/${authorId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 프로필 사진 제출
  const handleSubmitProfilePicture = async (file, field) => {
    var formData = new FormData();

    formData.append('files', file);
    formData.append('ref', 'author'); // link the image to a content type
    formData.append('refId', authorId); // link the image to a specific entry
    formData.append('field', field); // link the image to a specific field

    await axios({
      method: 'post',
      url: `${api.baseUrl}/upload`,
      data: formData,
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        redirectUser(`/Author/${authorId}`);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // state
  const [profileImage, setProfileImage] = useState();
  const [profileImageTemp, setProfileImageTemp] = useState();
  const [profileBanner, setProfileBanner] = useState();
  const [profileBannerTemp, setProfileBannerTemp] = useState();

  // 사진 올리기
  const handleProfilePicture = (event) => {
    let file = event.target.files[0];
    setProfileImage(file);
    let reader = new FileReader();
    reader.onloadend = () => {
      setProfileImageTemp(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 배너 올리기
  const handleProfileBanner = (event) => {
    let file = event.target.files[0];
    setProfileBanner(file);
    let reader = new FileReader();
    reader.onloadend = () => {
      setProfileBannerTemp(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 실행할 수 있도록 하는 Hook
  // authorId(특정값)가 바뀔때 실행된다.
  useEffect(() => {
    dispatch(fetchAuthorList(authorId));
  }, [dispatch, authorId]);

  return (
    <div>
      <GlobalStyles />
      <section
        id="profile_banner"
        className="jumbotron breadcumb no-bg"
        style={{
          backgroundImage: `url(${
            api.baseUrl +
            (author && author.banner && author.banner.url
              ? author.banner.url
              : '../../img/author_single/author_banner.jpg')
          })`,
        }}>
        <div className="mainbreadcumb"></div>
      </section>

      <section id="section-main" aria-label="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 d-flex">
              <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={initialValues}
                validateOnMount={validationSchema.isValidSync(initialValues)}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  await handleSubmitForm(values);
                  setSubmitting(false);
                  resetForm();
                }}>
                {/* {({ values, isSubmitting, isValid }) => { */}
                {() => {
                  return (
                    <Form className="form-border w-100">
                      <div className="de_tab tab_simple">
                        <ul className="de_nav text-left m-0 mb-3">
                          <li className="active" style={{ opacity: 1 }}>
                            <span>
                              <i className="fa fa-user"></i>Profile
                            </span>
                          </li>
                        </ul>

                        <div className="de_tab_content">
                          <div className="tab-1">
                            <div
                              className="row wow fadeIn animated"
                              style={{
                                backgroundSize: 'cover',
                                visibility: 'visible',
                                animationName: 'fadeIn',
                              }}>
                              <div className="col-lg-8 mb-sm-20">
                                <div className="field-set">
                                  <h5>닉네임</h5>
                                  <Field
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="form-control"
                                    placeholder="예술가님의 활동명을 적어주세요"
                                  />
                                  <ErrorMessage name="username" component="div" />
                                  <div className="spacer-20"></div>

                                  <h5>상세정보</h5>
                                  <Field
                                    component="textarea"
                                    name="about"
                                    id="about"
                                    className="form-control"
                                    placeholder="예술가님에 대한 정보를 적어주세요"
                                  />
                                  <ErrorMessage name="about" component="div" />
                                  <div className="spacer-20"></div>

                                  <h5>SNS</h5>
                                  <Field
                                    type="text"
                                    name="social"
                                    id="social"
                                    className="form-control"
                                    placeholder="Instagram 또는 Twitter 같은 SNS 링크를 적어주세요"
                                  />
                                  <ErrorMessage name="social" component="div" />
                                  <div className="spacer-20"></div>

                                  <h5>지갑</h5>
                                  <Field
                                    type="text"
                                    name="wallet"
                                    id="wallet"
                                    className="form-control"
                                    placeholder="지갑주소를 적어주세요"
                                  />
                                  <ErrorMessage name="wallet" component="div" />
                                  <div className="spacer-20"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <input
                        type="submit"
                        id="submit"
                        className="btn-main"
                        value="Update profile"
                      />
                    </Form>
                  );
                }}
              </Formik>
              {/* different form for image and banner */}
              <div id="sidebar" className="col-lg-4">
                <Formik
                  initialValues={initialProfilePicture}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    await handleSubmitProfilePicture(profileImage, 'avatar');
                    setSubmitting(false);
                    resetForm();
                  }}>
                  {/* {({ values, isSubmitting, isValid }) => { */}
                  {() => {
                    return (
                      <Form>
                        <h5>
                          프로필 이미지{' '}
                          <i
                            className="fa fa-info-circle id-color-2"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Recommend 400 x 400. Max size: 50MB. Click the image to upload."
                            aria-label="Recommend 400 x 400. Max size: 50MB. Click the image to upload."></i>
                        </h5>
                        <img
                          src={
                            author && author.avatar && author.avatar.url
                              ? profileImageTemp
                                ? profileImageTemp
                                : api.baseUrl + author.avatar.url
                              : '../../img/author_single/author_thumbnail.jpg'
                          }
                          id="click_profile_img"
                          className="d-profile-img-edit img-fluid"
                          alt=""
                          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <input
                          name="profile_image"
                          type="file"
                          id="upload_profile_img"
                          onChange={(event) => {
                            handleProfilePicture(event);
                          }}
                        />
                        <input type="submit" className="btn-main mt-3" value="Save Profile Image" />
                      </Form>
                    );
                  }}
                </Formik>
                <div className="spacer-30"></div>
                <Formik
                  initialValues={initialProfileBanner}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    await handleSubmitProfilePicture(profileBanner, 'banner');
                    setSubmitting(false);
                    resetForm();
                  }}>
                  {/* {({ values, isSubmitting, isValid }) => { */}
                  {() => {
                    return (
                      <Form>
                        <h5>
                          프로필 배너{' '}
                          <i
                            className="fa fa-info-circle id-color-2"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Recommend 1500 x 500. Max size: 50MB. Click the image to upload."
                            aria-label="Recommend 1500 x 500. Max size: 50MB. Click the image to upload."></i>
                        </h5>
                        <img
                          src={
                            author && author.banner && author.banner.url
                              ? profileBannerTemp
                                ? profileBannerTemp
                                : api.baseUrl + author.banner.url
                              : '../../img/author_single/author_banner.jpg'
                          }
                          id="click_banner_img"
                          className="d-banner-img-edit img-fluid"
                          alt=""
                        />
                        <input
                          name="profile_banner"
                          type="file"
                          id="upload_banner_img"
                          onChange={(event) => {
                            handleProfileBanner(event);
                          }}
                        />
                        <ErrorMessage name="profile_banner" component="div" />
                        <input
                          type="submit"
                          className="btn-main mt-3"
                          value="Save Profile Banner"
                        />
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default memo(Profile);
