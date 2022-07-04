import React, {useState} from "react";
import ToDoList from "./components/ToDoList";
import "./App.css";
import User from "./components/User";
import {AiFillEyeInvisible} from "react-icons/ai"
import {AiFillEye} from "react-icons/ai"

function App() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isRegistered, setIsRegistered] = useState(true);
    const [users, setUsers] = useState([]);
    const [isFalseUsername, setIsFalseUsername] = useState(true);

    const errors = {
        uname: "Invalid Username",
        pass: "Invalid Password",
        hasUsername: "This Username Is Taken"
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        var {uname, pass} = document.forms[0];
        console.log(users);

        for (let i = 0; i < users.length; i++){
            if (users[i].username === uname.value){
                setIsFalseUsername(false);
                if (users[i].password === pass.value){
                    setIsSubmitted(true);
                    break;
                } else {
                    setErrorMessages({name: "pass", message: errors.pass});
                    break;
                }
            }
            setIsFalseUsername(true);
        }

        if (isFalseUsername){
            setErrorMessages({name: "uname", message: errors.uname});
        }
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = (event) => {
        event.preventDefault();
        setPasswordShown(!passwordShown)
    };

    const register = (event) => {
        event.preventDefault();

        let validUsername = true;
        for (let i = 0; i < users.length; i++){
            if (textUsername === users[i].username){
                validUsername = false;
                break;
            }
        }

        if (textUsername && validUsername){
            if (textPassword){
                if (textPassword === textPasswordValidation && textPassword){
                    setIsRegistered(true);
                    const newUsers = [new User(textUsername, textPassword), ...users];
                    setUsers(newUsers);
                } else {
                    alert("Password is incorrect");
                }
            } else {
                setErrorMessages({name: "passReg", message: errors.pass});
            }
        } else {
            if (validUsername) setErrorMessages({name: "unameReg", message: errors.uname});
            else setErrorMessages({name: "unameReg", message: errors.hasUsername})
        }
    }

    const [textUsername, setTextUsername] = useState();
    const [textPassword, setTextPassword] = useState();
    const [textPasswordValidation, setTextPasswordValidation] = useState();

    const handleChangeUsername = (event) => {
        setTextUsername(event.target.value)
    }
    
    const handleChangePassword = (event) => {
        setTextPassword(event.target.value)
    }

    const handleChangePasswordValidation = (event) => {
        setTextPasswordValidation(event.target.value)
    }

    const signup = (event) => {
        event.preventDefault()
        setIsRegistered(false)
    }

    const signin = (event) => {
        event.preventDefault()
        {isRegistered ? handleSubmit(event) : setIsRegistered(true)}
    }

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username</label>
                    <input type="text" name="uname" placeholder="Username" value={textUsername} onChange={handleChangeUsername} required/>
                    {isRegistered ? renderErrorMessage("uname") : renderErrorMessage("unameReg")}
                </div>
                <label>Password</label>
                {isRegistered ? <div>
                        <div className="password-container">
                            <input type={passwordShown ? "text" : "password"} name="pass" placeholder="Password"
                                   value={textPassword} onChange={handleChangePassword} required/>
                            <button className={"button-container"}
                                    onClick={togglePassword}> {passwordShown ?
                                <AiFillEye/> : <AiFillEyeInvisible/>}</button>
                        </div>
                        {renderErrorMessage("pass")}
                    </div>
                    : <div className="validation-container">
                        <input type={passwordShown ? "text" : "password"} name="pass" placeholder="Password"
                               value={textPassword} onChange={handleChangePassword} required/>
                        <input type={"password"} name="pass" placeholder="Password" value={textPasswordValidation}
                               onChange={handleChangePasswordValidation} required/>
                        {renderErrorMessage("passReg")}
                        <button className="register-button"
                                onClick={register}>Sign Up
                        </button>
                    </div>
                }
                {isRegistered ? <button className={"register-button"} onClick={signup}> {"Sign Up"} </button> : <button className={"signin-button"} onClick={signin}> {"Sign In"} </button>}
                {isRegistered ? <button type="submit" className={"signin-button"} onClick={signin}> {"Sign In"} </button> :  <div/>}
            </form>
        </div>
    );

    return(
        <div className = "todo-app">
            <div> </div>
            <div className="login-form">
                {isRegistered ? isSubmitted ? <div className="title"> To Do List <ToDoList setIsSubmitted={setIsSubmitted} textUsername={textUsername}></ToDoList></div> : <div className="title"> Sign In </div> : <div className="title"> Sign Up </div>}
                {isSubmitted ? <div/>: renderForm}
            </div>
        </div>
    )
}

export default App;