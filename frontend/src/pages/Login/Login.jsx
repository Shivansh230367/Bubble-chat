import React, { useState } from "react";
import "./Login.css";
import useLogin from "../../hooks/useLogin";
import useSignup from "../../hooks/useSignup";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("male"); 
  const [signState, setSignState] = useState("Sign In");

  const { login } = useLogin();
  const { signup } = useSignup();

  const handleAuth = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup({
          fullName: name,
          username: email,
          password,
          confirmPassword,
          gender,
        });
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSignState = () => {
    setSignState(signState === "Sign In" ? "Sign Up" : "Sign In");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setGender("male");
  };

  return (
    <div className="login">
      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : (
        <div className="login-form">
          <h1>{signState}</h1>
          <form onSubmit={handleAuth}>
            {signState === "Sign Up" && (
              <>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Your name"
                  required
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  required
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  required
                />
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
                <div className="gender-selection">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label>Male</label>

                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label>Female</label>
                </div>
              </>
            )}
            {signState === "Sign In" && (
              <>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  required
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  required
                />
              </>
            )}

            <button type="submit">{signState}</button>
          </form>
          <div className="form-switch">
            {signState === "Sign In" ? (
              <p>
                New to the platform?{" "}
                <span onClick={toggleSignState}>Sign Up Now</span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span onClick={toggleSignState}>Sign In Now</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
