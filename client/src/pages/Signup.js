import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

import { Form, Input, Button, Checkbox } from "antd";

const Signup = () => {
  const [form] = Form.useForm();
  const [addProfile, { error, data }] = useMutation(ADD_USER);

  // submit form
  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      const { data } = await addProfile({
        variables: { ...values },
      });

      Auth.login(data.addProfile.token);
    } catch (e) {
      console.error(e);
    }
  };



  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/Home">back to the homepage.</Link>
              </p>
            ) : (
              <Form
                form={form}
                onFinish={handleFormSubmit}
                style={{ maxWidth: 600 }}
                initialValues={{
                  remember: true,
                }}
              >
                <Form.Item
                  label="Your username"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Your email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Your password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
