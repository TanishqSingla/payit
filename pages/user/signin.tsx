import { useState } from "react";

const Signin = ({ type = "login" }) => {
  const [userState, setUserState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [togglePassword, setTogglePassword] = useState(false);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const { password, confirmPassword } = userState;
    try {
      if (type === "register" && password !== confirmPassword)
        throw new Error("Password mismatched");
      console.log("status 200", password);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <div className="w-5/12 h-formContainerHeight px-2 mt-2 mx-auto flex items-center">
      <form
        onSubmit={onSubmit}
        className="flex flex-col flex-1 bg-[#f9f9f9] py-8 items-center justify-center rounded-md"
      >
        <p className="pb-4 text-xl">Please set your password</p>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          className="auth-input"
          required
          name="password"
          type={togglePassword ? "text" : "password"}
          placeholder="Password"
          onChange={({ currentTarget: ct }) =>
            setUserState({ ...userState, password: ct.value })
          }
        />
        <label htmlFor="confirmPassword" className="sr-only">
          Confirm Password
        </label>
        <input
          className="auth-input"
          required
          name="confirmPassword"
          type={togglePassword ? "text" : "password"}
          placeholder="Confirm Password"
          onChange={({ currentTarget: ct }) =>
            setUserState({ ...userState, confirmPassword: ct.value })
          }
        />
        <label htmlFor="togglepassword" className="sr-only">
          Toggle Password
        </label>
        <div className="pt-2 flex w-100 gap-2 text-sm items-center">
          <input
            type="checkbox"
            onChange={(e) => setTogglePassword(!togglePassword)}
          />
          Toggle Password
        </div>
        <div className="mt-4">
          <button className="btn-primary" type="submit">
            Set Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
