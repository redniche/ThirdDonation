import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { navigate } from '@reach/router';
import * as Yup from 'yup';
import BasicLayout from '../../components/layout/BasicLayout';
import * as selectors from '../../store/selectors';
import apis, { Axios } from '../../core/axios';
// import { Axios } from '../../core/axios';

// 경고창
// 유저이름, 지갑주소 안적으면 경고창 날림
const validationSchema = Yup.object().shape({
  realName: Yup.lazy(() => Yup.string().required('예술가 이름을 안적어주셨습니다. ')),
  registNumber: Yup.lazy(() => Yup.string().required('장애인 등록번호를 안적어주셨습니다.')),
});

/**
 * authorId를 파라미터로 받아 예술가 등록을 할 수 있는 페이지 컴포넌트
 * @param {*} param0 authorId
 * @returns
 */
const ArtistRegistration = () => {
  // state
  const [file, setFile] = useState();
  const { data: account } = useSelector(selectors.accountState);
  const author = account;
  console.log(author);

  const initialValues = {
    realName: '',
    registNumber: '',
  };

  // 디스패치 함수를 실행하는 Hooks 이다.
  // action을 발생시켜 state를 변하게함
  // const dispatch = useDispatch();

  // navigate()
  // 새로 이동할 화면이 현재 화면과 같으면 새로운 화면을 쌓지 않고 파라미터만 변경한다.
  const redirectUser = (path) => {
    navigate(path);
  };

  // 폼 제출
  const handleSubmitForm = async (data) => {
    const formData = new FormData();
    formData.append('imageFile', file);

    await Axios.post(apis.users.artists, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        name: data.realName,
        registerNumber: data.registNumber,
      },
    })
      .then((response) => {
        console.log(response);
        alert('등록 신청이 완료되었습니다!');
        redirectUser('/');
      })
      .catch((err) => {
        alert('등록 신청이 실패했습니다!');
        console.log(err);
      });
  };

  // 파일 올리기
  const handleProfilePicture = (event) => {
    let file = event.target.files[0];
    setFile(file);

    if (!file) return;

    let maxSize = 5 * 1024 * 1024;
    if (maxSize <= file.size) {
      alert('파일 용량은 5MB 이내로 등록 가능합니다.');
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(file);
  };

  // const { data: wallet } = useSelector(selectors.accountState);
  // const [name, setName] = useState('');
  // const [regNum, setRegNum] = useState('');

  // const onChangeName = (e) => {
  //   setName(e.target.value);
  // };

  // const onChangeRegNum = (e) => {
  //   setRegNum(e.target.value);
  // };

  // console.log(wallet);

  // function artistRegist() {
  //   Axios.post(
  //     '/users/artists',
  //     {
  //       filePath: 'string',
  //       name: name,
  //       registerNumber: regNum,
  //       userId: wallet.id,
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       withCredentials: true,
  //     },
  //   )
  //     .then(() => {
  //       window.alert(name + '은 자선단체 등록을 성공하였습니다.');
  //     })
  //     .catch((err) => {
  //       console.log('에러발생' + err);
  //       window.alert('자선단체 등록을 실패하였습니다.');
  //     });
  //   // console.log(name);
  //   // console.log(url);
  //   // console.log(wallet.walletAddress);
  // }
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
                                    name="realName"
                                    id="realName"
                                    className="form-control"
                                    placeholder="예술가님의 이름을 적어주세요"
                                    // onChange={onChangeName}
                                  />
                                  <ErrorMessage name="realName" component="div" />
                                  <div className="spacer-20"></div>

                                  <h5>등록번호</h5>
                                  <Field
                                    type="text"
                                    name="registNumber"
                                    id="registNumber"
                                    className="form-control"
                                    placeholder="장애인 등록번호를 적어주세요"
                                    // onChange={onChangeRegNum}
                                  />
                                  <ErrorMessage name="registNumber" component="div" />
                                  <div className="spacer-20"></div>

                                  <h5>장애인 인증서 제출</h5>

                                  <Field
                                    name="certificationImg"
                                    type="file"
                                    id="certificationImg"
                                    accept=".png,.jpg,.jpeg"
                                    onChange={(event) => {
                                      handleProfilePicture(event);
                                    }}
                                  />
                                  <div className="spacer-40"></div>
                                  <button type="submit" id="submit" className="btn btn-main">
                                    등록하기
                                  </button>
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
