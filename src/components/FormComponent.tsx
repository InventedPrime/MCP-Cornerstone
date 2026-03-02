
import { Form } from "react-router-dom";

const FormComponent = ({typeOfForm}: {typeOfForm: string}) => {
  const title = typeOfForm === "SignIn" ? "Sign In Form" : "Log In Form";

  return (
    <div className="form-container">
        <Form method="post" action={`/${typeOfForm}`}>
              <p>{title}</p>
              {typeOfForm === "LogIn" ?  null : <input type="text" name="username" placeholder="Username" required /> }
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              <button type="submit">{typeOfForm === "SignIn" ? "Sign In" : "Log In"}</button>
        </Form>
    </div>
  );
};

export default FormComponent;