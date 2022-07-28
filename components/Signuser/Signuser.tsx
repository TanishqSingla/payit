import { useState } from "react";

type AuthProps = {
  type: string;
};

const AuthForm = ({ type }: AuthProps) => {
  const [userState, setUserState] = useState({
    email: "",
    password: "",
  });
  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(userState);
  };
  return (
    <div className="w-3/12 h-fit-content mx-auto mt-20">
      <h1 className="text-center text-4xl font-semibold uppercase">{type}</h1>
      <form onSubmit={(e) => onSubmit(e)} className="h-fit-content w-full mt-8">
        <label className="sr-only" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-primary"
          value={userState.email}
          onChange={({ currentTarget: ct }) =>
            setUserState({ ...userState, email: ct.value })
          }
        />
        <label className="sr-only" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-primary"
          value={userState.password}
          onChange={({ currentTarget: ct }) =>
            setUserState({ ...userState, password: ct.value })
          }
        />
        {type === "signup" ? (
          <>
            <label className="sr-only" htmlFor="password">
              Confirm Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Confirm Password"
              className="input-primary"
            />
          </>
        ) : (
          ""
        )}
        <div className="w-full">
          <button
            type="submit"
            className="btn-primary w-full hover:opacity-90 capitalize"
          >
            {type}
          </button>
        </div>
      </form>
    </div>
  );
};

const Signup = () => <AuthForm type="signup" />;

const Signin = () => <AuthForm type="signin" />;

const Signuser = {
  Signup,
  Signin,
};

export default Signuser;
