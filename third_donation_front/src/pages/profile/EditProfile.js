import { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// JWT할거면 참고
// import auth, { authorUrl } from '../../core/auth';
// import request from '../../core/auth/request';
import { navigate } from '@reach/router';
import api from '../../core/api';
import { fetchAuthor } from '../../store/actions/thunks';
import * as selectors from '../../store/selectors';
import ProfileLayout from './../../components/layout/ProfileLayout';
import axios_apis, { Axios } from '../../core/axios';

/**
 * Yup 패키지로 유효성 체크
 */
const validationSchema = Yup.object().shape({
  userName: Yup.lazy(() => Yup.string().required('유저 이름이 필요합니다.')),
});

/**
 * authorId를 파라미터로 받아 해당 프로필을 편집할 수 있게 해주는 컴포넌트
 * @param {*} param0 authorId
 * @returns
 */
const EditProfile = ({ authorId }) => {
  // const jwt = auth.getToken();
  const authorsState = useSelector(selectors.authorsState);
  const author = authorsState.data ? authorsState.data : null;

  const initialValues = {
    userName: author ? author.username : '',
    description: author ? author.description : '',
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
    data.id = parseInt(authorId);
    console.log(data);
    await Axios.patch(axios_apis.users.profile, data)
      .then((response) => {
        console.log(response);
        redirectUser(`/editProfile/${authorId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitProfilePicture = async (file, userId) => {
    const formData = new FormData();
    formData.append('img', file);

    // await Axios({
    //   method: 'post',
    //   url: `${apis.users.img}`,
    //   data: formData,
    //   headers: {
    //     Authorization: `Bearer ${jwt}`,
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    await Axios.post(`${axios_apis.users.img}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: { userId: userId },
    })
      .then((res) => {
        redirectUser(`/editProfile/${authorId}`);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [profileImageFile, setProfileImageFile] = useState();
  const [profileImageTemp, setProfileImageTemp] = useState();

  const handleProfilePicture = (event) => {
    let tempFile = event.target.files[0];
    setProfileImageFile(tempFile);
    if (!tempFile) return;

    let maxSize = 3 * 1024 * 1024;
    if (maxSize <= tempFile.size) {
      alert('프로필 이미지 용량은 3MB 이내로 등록 가능합니다.');
      return;
    }

    // URL.revokeObjectURL(file);
    let reader = new FileReader();
    reader.onloadend = () => {
      setProfileImageTemp(reader.result);
    };
    reader.readAsDataURL(tempFile);
  };

  useEffect(() => {
    dispatch(fetchAuthor(authorId));
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
                                    name="userName"
                                    id="userName"
                                    className="form-control"
                                    placeholder="유저명(자신의 별명)을 입력합니다."
                                  />
                                  <ErrorMessage name="userName" component="div" />
                                  <div className="spacer-20"></div>

                                  <h5>설명</h5>
                                  <Field
                                    component="textarea"
                                    name="description"
                                    id="description"
                                    className="form-control"
                                    placeholder="자신을 마음껏 소개 해보세요!"
                                  />
                                  <ErrorMessage name="description" component="div" />
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
                    await handleSubmitProfilePicture(profileImageFile, authorId);
                    setSubmitting(false);
                    resetForm();
                  }}>
                  {({ handleSubmit }) => {
                    return (
                      <Form onSubmit={handleSubmit}>
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
                            profileImageTemp
                              ? profileImageTemp
                              : author &&
                                (author.imagePath
                                  ? author.imagePath
                                  : process.env.PUBLIC_URL + '/img/기본프로필이미지.png')
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
                          accept=".png,.jpg,.jpeg"
                          onChange={handleProfilePicture}
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
