import { useState } from 'react';
import { validateEmail } from '../Utils/utils';
import axios from 'axios';
import customAxios from '../Utils/apis';
import logo from '../img/logo.jpg';

function Signup() {

    let [email, setEmail] = useState("");
    let [name, setName] = useState("");
    let [mobile, setMobile] = useState("");
    let [password, setPassword] = useState("");

    let [nameError, setNameError] = useState("");
    let [emailError, setEmailError] = useState("");
    let [mobileError, setMobileError] = useState("");
    let [passwordError, setPasswordError] = useState("");

    var [apiSuccessMessage, setApiSuccessMessage] = useState("");
    var [apiErrorResponse, setApiErrorResponse] = useState("");

    function handleNameChange(event) {
        // console.log("handleNameChange");
        // console.log(event.target.value)
        setName(event.target.value);
    }

    function handleEmailChange(event) {
        //console.log("handleEmailChange");
        //console.log(event.target.value)
        setEmail(event.target.value);
    }

    function handleMobileChange(event) {
        //console.log("handleMobileChange");
        //console.log(event.target.value)
        setMobile(event.target.value);
    }

    function handlePasswordChange(event) {
        //console.log("handlePasswordChange");
        //console.log(event.target.value);
        setPassword(event.target.value);
    }

    async function handleRegister(e) {
        var errorCount = 0;
        console.log("handleRegister");
        if (name.length < 3) {
            setNameError("Name must be atleast 3 characters long");
            errorCount++;
        } else {
            setNameError("");
        }

        if (validateEmail(email)) {
            setEmailError("");
        } else {
            errorCount++;
            setEmailError("Email is not valid");
        }

        if (mobile.length < 10) {
            errorCount++;
            setMobileError("Mobile must be atleast 10 characters long");
        } else {
            setMobileError("");
        }

        if (password.length < 8) {
            errorCount++;
            setPasswordError("Password must be atleast 8 characters long");
        } else {
            setPasswordError("");
        }
        console.log("errorCount", errorCount);
        if (errorCount === 0) {

            var userRequestBody = {
                'name': name,
                'email': email,
                'mobile': mobile,
                'password': password
            }
            console.log(userRequestBody)

            try {
                // call api call
                var apiResponse = await customAxios.post('http://localhost:8080/api/user', userRequestBody);
                console.log(apiResponse);

                if (apiResponse.status == 200) {
                    setApiSuccessMessage("User Registered Successfully");
                    setApiErrorResponse("");
                    localStorage.setItem("loggedInUserId", apiResponse.data.id);
                    localStorage.setItem("loggedInUserName", apiResponse.data.name);
                    window.location = "/";
                } 
            } catch (error) {
                console.log("error", error);
                if(error.response.status == 400){
                    setApiErrorResponse("User Already Exists");
                    setApiSuccessMessage("");
                }
            }

        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-4 border shadow p-3">
                <img src={logo} className="img-fluid" />
                    <h3>Register</h3>
                    <div className="mt-3">
                        <lable>Name</lable>
                        <input type="text" placeholder="Name" onChange={e => handleNameChange(e)} className="form-control" />
                        <div className='text-danger'>{nameError}</div>
                    </div>

                    <div className="mt-3">
                        <lable>Email</lable>
                        <input type="text" placeholder="Email" onChange={e => handleEmailChange(e)} className="form-control" />
                        <div className='text-danger'>{emailError}</div>
                    </div>

                    <div className="mt-3">
                        <lable>Password</lable>
                        <input type="password" placeholder="Password" onChange={e => handlePasswordChange(e)} className="form-control" />
                        <div className='text-danger'>{passwordError}</div>
                    </div>

                    <div className="mt-3">
                        <lable>Mobile</lable>
                        <input type="number" placeholder="MobileNumber" onChange={e => handleMobileChange(e)} className="form-control" />
                        <div className='text-danger'>{mobileError}</div>
                    </div>

                    <div className="mt-3 d-grid">
                        <button className="btn btn-warning" onClick={e => handleRegister(e)}>Register</button>
                    </div>
                    <div className="mt-3 d-grid">
                        <button className="btn btn-warning"><a href="/login" className='text-white'>Login</a></button>
                    </div>
                    {/* <div className='mt-3'>
                        <div class="alert alert-success">
                            {apiSuccessMessage}
                        </div>
                        <div class="alert alert-danger" >
                            {apiErrorResponse}
                        </div>
                    </div> */}

                    {/* {
                        email
                    } <br />
                    {
                        name
                    }<br />
                    {
                        mobile
                    }<br />
                    {
                        password
                    } */}
                </div>
            </div>
        </div>
    );
}

export default Signup;