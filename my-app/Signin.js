import * as Yup from "yup";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {Formik, ErrorMessage} from "formik";
import {Form, Input, Button} from 'antd'
import "./singin.scss"
import {useDispatch} from "react-redux";
import {setToken} from "../../redux/reducers/AuthReducer";
import queryString from "query-string";

const SignIn = (props) => {

  const dispatch = useDispatch();
  const history = props.history;

  const validationSchema = Yup.object().shape({
    email: Yup
      .string()
      .email("올바른 이메일 형식이 아닙니다!")
      .required("이메일을 입력하세요!"),
    password: Yup
      .string()
      .required("패스워드를 입력하세요!")
  })
  const submit = async (values) => {
    const {email, password} = values;
    try {
      const {data} = await axios.post('/api/auth/signin', {email, password});
      console.log(data);
      dispatch(setToken(data.jwt));
      // 원래 페이지로 돌아가는 부분
      const redirectUrl = queryString.parse(history.location.search).redirectUrl;
      if (redirectUrl){
        history.push(redirectUrl.toString());
      } else{
        history.push('/');
      }
    } catch(e) {
      toast.error(
          <div>로그인에 실패하였습니다!<br/>아이디와 패스워드를 확인해주세요!</div>
      , {
        position: "top-center",
      });
    }
  }
  useEffect(()=>{
    props.setMenu('/signin');
  }, [props])

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({values, handleSubmit, handleChange}) => (
        <div className="signin-wrapper">
          <ToastContainer/>
          <Form
            layout="vertical"
            autoComplete="off"
            onFinish={handleSubmit}
          >
            <Form.Item className="input-form" label="Email">
              <Input value={values.email} name="email" onChange={handleChange}/>
              <div className="error-message">
                <ErrorMessage name="email"/>
              </div>
            </Form.Item>
            <Form.Item className="input-form" label="Password">
              <Input.Password value={values.password} name="password" onChange={handleChange}/>
              <div className="error-message">
                <ErrorMessage name="password"/>
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default SignIn;