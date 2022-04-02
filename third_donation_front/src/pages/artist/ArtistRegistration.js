import { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { navigate } from '@reach/router';
import * as Yup from 'yup';
import auth, { authorUrl } from '../../core/auth';
import request from '../../core/auth/request';
import api from '../../core/api';
import BasicLayout from '../../components/layout/BasicLayout';
import { fetchAuthor } from '../../store/actions/thunks';
import * as selectors from '../../store/selectors';
import axios from 'axios';

// 경고창
// 유저이름, 지갑주소 안적으면 경고창 날림
const validationSchema = Yup.object().shape({
  username: Yup.lazy(() => Yup.string().required('예술가 이름을 안적어주셨습니다. ')),
  wallet: Yup.lazy(() => Yup.string().required('장애인 등록번호를 안적어주셨습니다.')),
});

/**
 * authorId를 파라미터로 받아 예술가 등록을 할 수 있는 페이지 컴포넌트
 * @param {*} param0 authorId
 * @returns
 */
const ArtistRegistration = ({ authorId }) => {
  const jwt = auth.getToken();
  const authorsState = useSelector(selectors.authorsState);
  const author = authorsState.data ? authorsState.data[0] : null;
  const initialValues = {
    username: author ? author.username : '',
    wallet: author ? author.wallet : '',
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

  // 사진 올리기
  const handleProfilePicture = (event) => {
    let file = event.target.files[0];
    setProfileImage(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
  };

  // 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 실행할 수 있도록 하는 Hook
  // authorId(특정값)가 바뀔때 실행된다.
  useEffect(() => {
    dispatch(fetchAuthor(authorId));
  }, [dispatch, authorId]);

  return (
    <BasicLayout>
      <section id="section-main" aria-label="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-4 d-flex">
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
                      <div style={{ height: 100 }}></div>
                      <div className=" ">
                        <ul className="de_nav text-left m-0 mb-3">
                          <li className="active" style={{ opacity: 1 }}>
                            <h1>
                              <i className="fa fa-user"></i> 예술가 등록
                            </h1>
                          </li>
                        </ul>
                        <div className="spacer-20"></div>

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
                                  <h5>이름</h5>
                                  <Field
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="form-control"
                                    placeholder="예술가님의 이름을 적어주세요"
                                  />
                                  <ErrorMessage name="username" component="div" />
                                  <div className="spacer-20"></div>

                                  <h5>등록번호</h5>
                                  <Field
                                    type="text"
                                    name="regist-number"
                                    id="regist-number"
                                    className="form-control"
                                    placeholder="장애인 등록번호를 적어주세요"
                                  />
                                  <ErrorMessage name="wallet" component="div" />
                                  <div className="spacer-20"></div>

                                  <h5>장애인 인증서 제출</h5>
                                  <Formik
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
                                          <input
                                            name="profile_image"
                                            type="file"
                                            id="upload_profile_img"
                                            onChange={(event) => {
                                              handleProfilePicture(event);
                                            }}
                                          />
                                        </Form>
                                      );
                                    }}
                                  </Formik>
                                  <div className="spacer-40"></div>
                                  <input
                                    type="submit"
                                    id="submit"
                                    className="btn btn-main"
                                    value="등록"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </BasicLayout>
  );
};

export default memo(ArtistRegistration);
