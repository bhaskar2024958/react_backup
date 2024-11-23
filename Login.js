import { useState } from "react";
import { validateEmail } from "../Utils/utils";
import axios from "axios";
import logo from '../img/logo.jpg'

function Login() {

    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");

    var [emailError, setEmailError] = useState("");
    var [passwordError, setPasswordError] = useState("");

    var [apiSuccessMessage, setApiSuccessMessage] = useState("");
    var [apiErrorResponse, setApiErrorResponse] = useState("");

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function passwordChange(event) {
        setPassword(event.target.value);
    }

    async function handleLogin() {
        var apiErrorCount = 0;
        if (validateEmail(email)) {
            setEmailError("");
        } else {
            apiErrorCount++;
            setEmailError("Email is not valid");
        }

        if (password.length < 8) {
            apiErrorCount++;
            setPasswordError("Password must be atleast 8 characters long");
        } else {
            setPasswordError("");
        }
        if (apiErrorCount == 0) {
            try {
                var response = await axios.post("https://dummyjson.com/auth/login", {
                    username: 'emilys',
                    password: 'emilyspass',
                });
                console.log(response.data);
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                localStorage.setItem("username", response.data.username);
                sessionStorage.setItem("username", response.data.username);
                window.location = "/";
            } catch (e) {

            }
        }
    }

    return (
        <div className="login-page">
            <div className="container">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-4 border shadow rounded p-3 bg-white">
                        <img src={logo} className="img-fluid" />
                        <div className="mt-3">
                            <lable>Email</lable>
                            <input type="text" placeholder="Email" onChange={e => handleEmailChange(e)} className="form-control" />
                            <div className="text-danger">{emailError}</div>
                        </div>
                        <div className="mt-3">
                            <lable>Password</lable>
                            <input type="password" placeholder="Password" onChange={e => passwordChange(e)} className="form-control" />
                            <div className="text-danger">{passwordError}</div>
                        </div>
                        <div className="mt-3 d-grid">
                            <button className="btn btn-warning " onClick={e => handleLogin(e)}>Login</button>
                        </div>
                        <div className="mt-3 d-grid">
                            <button className="btn btn-success"><a href="/register" className="text-white">Register</a></button>
                        </div>

                        {
                            email
                        } <br />
                        {
                            password
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;