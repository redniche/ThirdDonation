import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import auth, { authorUrl } from '../../core/auth';
import request from '../../core/auth/request';
import { navigate } from '@reach/router';
import api from '../../core/api';
import { fetchAuthorList } from '../../store/actions/thunks';
import * as selectors from '../../store/selectors';
import axios from 'axios';
import ProfileLayout from './../../components/layout/ProfileLayout';

/**
 * Yup 패키지로 유효성 체크
 */
const validationSchema = Yup.object().shape({
  username: Yup.lazy(() => Yup.string().required('Username is required')),
  wallet: Yup.lazy(() => Yup.string().required('Wallet is required')),
});

/**
 * authorId를 파라미터로 받아 해당 프로필을 편집할 수 있게 해주는 컴포넌트
 * @param {*} param0 authorId
 * @returns
 */
const EditProfile = ({ authorId }) => {
  const jwt = auth.getToken();
  const authorsState = useSelector(selectors.authorsState);
  const author = authorsState.data ? authorsState.data[0] : null;

  const initialValues = {
    username: author ? author.username : '',
    about: author ? author.about : '',
    social: author ? author.social : '',
    wallet: author ? author.wallet : '',
  };

  const initialProfilePicture = {
    profile_image: '',
  };

  const dispatch = useDispatch();

  /**
   * path를 받아 리다이렉트
   * @param {*} path
   */
  const redirectUser = (path) => {
    navigate(path);
  };

  /**
   * form에서 submit 데이터 핸들링
   * @param {*}} data
   */
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

  const [profileImage, setProfileImage] = useState();
  const [profileImageTemp, setProfileImageTemp] = useState();

  const handleProfilePicture = (event) => {
    let file = event.target.files[0];
    setProfileImage(file);
    let reader = new FileReader();
    reader.onloadend = () => {
      setProfileImageTemp(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    dispatch(fetchAuthorList(authorId));
  }, [dispatch, authorId]);

  return (
    <ProfileLayout>
      <section
        id="profile_banner"
        className="jumbotron breadcumb no-bg"
        style={{
          backgroundImage: `url(${
            api.baseUrl +
            (author && author.banner && author.banner.url
              ? author.banner.url
              : '/uploads/테스트배너1.jpg')
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
                              <i className="fa fa-user"></i> 프로필 변경
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
                                  <h5>유저명</h5>
                                  <Field
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="form-control"
                                    placeholder="유저명(자신의 별명)을 입력합니다."
                                  />
                                  <ErrorMessage name="username" component="div" />
                                  <div className="spacer-20"></div>

                                  <h5>설명</h5>
                                  <Field
                                    component="textarea"
                                    name="about"
                                    id="about"
                                    className="form-control"
                                    placeholder="자신을 마음껏 소개 해보세요!"
                                  />
                                  <ErrorMessage name="about" component="div" />
                                  <div className="spacer-20"></div>

                                  <h5>소셜태그</h5>
                                  <Field
                                    type="text"
                                    name="social"
                                    id="social"
                                    className="form-control"
                                    placeholder="인스타그램, 트위터 등에서 사용하는 태그를 입력하세요!"
                                  />
                                  <ErrorMessage name="social" component="div" />
                                  <div className="spacer-20"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <input type="submit" id="submit" className="btn-main" value="프로필 갱신" />
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
                          소개용 이미지{' '}
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
                              : api.baseUrl + '/mock_data/uploads/예술가1.jpg'
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
                        <input type="submit" className="btn-main mt-3" value="프로필 이미지 저장" />
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ProfileLayout>
  );
};

export default memo(EditProfile);
