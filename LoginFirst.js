import { useState } from "react";
import { validateEmail } from "../Utils/utils";
import axios from "axios";
import logo from '../img/logo.jpg'

function LoginFirst() {

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
                var apiResponse = await axios.post("http://localhost:8080/api/user/fetch", {
                    'email': email,
                    'password': password
                })
                console.log(apiResponse);
                if (apiResponse.status == 200) {
                    setApiSuccessMessage("Login Successful");
                    setApiErrorResponse("");
                    localStorage.setItem("loggedInUserId", apiResponse.data.id);
                    window.location = "/";
                }
            } catch (e) {
                console.log(e);
                if (e.response.status == 400) {
                    setApiSuccessMessage("");
                    setApiErrorResponse("Invalid Credentials");
                }
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
                            <button className="btn btn-success">Register</button>
                        </div>
                        <div className='mt-3'>
                            {
                                apiSuccessMessage &&
                                <div class="alert alert-success">
                                    {apiSuccessMessage}
                                </div>
                            }
                            {
                                apiErrorResponse &&
                                <div class="alert alert-danger">
                                    {apiErrorResponse}
                                </div>
                            }

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
export default LoginFirst;