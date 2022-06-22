import React, {useState} from "react";
import ToDoList from "./components/ToDoList";
import "./App.css";

function App() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [usernames, setUsernames] = useState(["user1", "user2"]);
    const [passwords, setPasswords] = useState(["pass1", "pass2"]);

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        var {uname, pass} = document.forms[0];

        console.log(usernames);
        console.log(passwords);
        const userIndex = usernames.indexOf(uname.value);
        const correctPassword = passwords[userIndex];

        if (userIndex !== -1){
            if (correctPassword === pass.value){
                setIsSubmitted(true);
            } else {
                setErrorMessages({name: "pass", message: errors.pass});
            }
        } else {
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
        if (textUsername){
            if (textPassword){
                if (textPassword === textPasswordValidation && textPassword){
                    setIsRegistered(true);
                    const newUsernames = [textUsername, ...usernames];
                    setUsernames(newUsernames);
                    const newPasswords = [textPassword, ...passwords];
                    setPasswords(newPasswords);
                } else {
                    alert("Password is incorrect");
                }
            } else {
                setErrorMessages({name: "passReg", message: errors.pass});
            }
        } else {
            setErrorMessages({name: "unameReg", message: errors.uname});
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

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" placeholder="Username" value={textUsername} onChange={handleChangeUsername} required/>
                    {isRegistered ? renderErrorMessage("uname") : renderErrorMessage("unameReg")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type={passwordShown ? "text" : "password"} name = "pass" placeholder="Password" value={textPassword} onChange={handleChangePassword} required/>
                    {isRegistered ? <div/> : <input type={"password"} name = "pass" placeholder="Password" value={textPasswordValidation} onChange={handleChangePasswordValidation} required/>}
                    <button className={isRegistered ? "button-container": "register-button"} onClick={isRegistered ? togglePassword: register}> {isRegistered ? passwordShown ? "Hide Password" : "Show Password" : "Sign Up"}</button>
                    {isRegistered ? renderErrorMessage("pass") : renderErrorMessage("passReg")}
                </div>
                {isRegistered ?
                    <div>
                        <input type="submit"/>
                    </div> :  <div/>}
            </form>
        </div>
    );

    return(
        <div className = "todo-app">
            <div> </div>
            <div className="login-form">
                {isRegistered ? isSubmitted ? <div className="title"> To Do List <ToDoList/></div> : <div className="title"> Sign In </div> : <div className="title"> Sign Up </div>}
                {isSubmitted ? <div/>: renderForm}
            </div>
        </div>
    )
}

export default App;