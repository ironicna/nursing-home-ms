import React, { useState, useEffect, useRef } from "react";
import { Form, Message, Button, Segment, Divider } from "semantic-ui-react";
import { HeaderMessage, FooterMessage } from "../components/Common/WelcomeMessage";
import ImageDropDiv from "../components/Common/ImageDropDiv";
import CommonInputs from "../components/Common/CommonInputs";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import uploadPic from "../utils/uploadPicToCloudinary";
import {registerUser} from "../utils/authUser";
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
// let cancel;

// const options = [
//     { key: 's', text: 'Staff', value: 'staff' },
//     { key: 'g', text: 'Guardian', value: 'guardian' },
//     { key: 'r', text: 'Admin', value: 'root' },
// ]

function Registration() {
    const [user,setUser] = useState({
        name: "",
        email: "",
        password: "",
        bio: ""
    });
    
    const { name, email, password, bio } = user;

    const handleChange = e => {
        const { name, value, files } = e.target;
       
        if (name === "media") {
            setMedia(files[0]);
            setMediaPreview(URL.createObjectURL(files[0]));
        }

        setUser(prev => ({ ...prev, [name]: value}));
    };

    // const [role1, setRole1] = useState("");
    // const handleChange2 = e => {
    //     setRole1(e.target.value);
    //     console.log(e.target.value);

    // }

    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const [username, setUsername] = useState("");
    const [usernameLoading, setUsernameLoading] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState(false);
    
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [highlighted, setHighlighted] = useState(false);
    const inputRef = useRef();
    
    useEffect(() => {
        const isUser = Object.values({ name, email, password, bio }).every(item =>
          Boolean(item)
        );
        isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
    }, [user]);

    const handleSubmit = async e => {
        e.preventDefault();
        setFormLoading(true);
    
        let profilePicUrl;
        if (media !== null) {
          profilePicUrl = await uploadPic(media);
        }
    
        if (media !== null && !profilePicUrl) {
          setFormLoading(false);
          return setErrorMsg("Error Uploading Image");
        }
    
        await registerUser(user, profilePicUrl, setErrorMsg, setFormLoading);
    };
    

    useEffect(() => {
        username === "" ? setUsernameAvailable(false) : checkUsername();
    }, [username]);   

    const checkUsername = async () => {
        setUsernameLoading(true);
        try {
            // cancel && cancel(); 
    
            // const CancelToken = axios.CancelToken;
    
            const res = await axios.get(`${baseUrl}/api/signup/${username}`
            // , {
            //     cancelToken: new CancelToken(canceler => {
            //         cancel = canceler;
            //     })
            // }
            );
        
            if (errorMsg !== null) {
                setErrorMsg(null);
            }

            if (res.data === "Available") {
                setUsernameAvailable(true);
                setUser(prev => ({ ...prev, username }));
            }
        } catch (error) {
            setErrorMsg("Username Not Available");
            setUsernameAvailable(false);
        }
        setUsernameLoading(false);
    };

    return (
        <>
            <HeaderMessage />
            <Form loading = {formLoading} error = {errorMsg !== null} onSubmit = {handleSubmit}>
                <Message 
                    error
                    header = "Oops!"
                    content = {errorMsg}
                    onDismiss = {() => setErrorMsg(null)}
                />
            
                <Segment>
                    <ImageDropDiv
                        mediaPreview={mediaPreview}
                        setMediaPreview={setMediaPreview}
                        setMedia={setMedia}
                        inputRef={inputRef}
                        highlighted={highlighted}
                        setHighlighted={setHighlighted}
                        handleChange={handleChange}
                    />
                    <Form.Input 
                        label = "Name" 
                        placeholder = "Name"
                        name = "name" 
                        defaultValue = {name}  
                        onChange = {handleChange} 
                        fluid 
                        icon = "user" 
                        iconPosition = "left"
                        required 
                    />

                    <Form.Input 
                        label = "Email" 
                        placeholder = "Email "
                        name = "email" 
                        defaultValue = {email}  
                        onChange = {handleChange} 
                        fluid 
                        icon = "envelope" 
                        iconPosition = "left" 
                        type = "email"
                        required
                    />

                    <Form.Input 
                        label = "Password" 
                        placeholder = "Password "
                        name = "password" 
                        defaultValue = {password}  
                        onChange = {handleChange} 
                        fluid 
                        icon = {{
                            name: "eye",
                            circular: true,
                            link: true,
                            onClick: () => setShowPassword(!showPassword)
                        }} 
                        iconPosition = "left" 
                        type = { showPassword ? "text" : "password" }
                        required
                    />
                
                    <Form.Input
                        loading = {usernameLoading}
                        error = {!usernameAvailable}
                        label = "Username" 
                        placeholder = "Username "
                        value = {username}
                        onChange = {e => {
                            setUsername(e.target.value)
                            if(regexUserName.test(e.target.value)) {
                                setUsernameAvailable(true);
                            } else {
                                setUsernameAvailable(false);
                            }
                        }} 
                        fluid 
                        icon = {usernameAvailable ? "check" : "close"} 
                        iconPosition = "left" 
                        required
                    />

                    <CommonInputs
                        user={user}

                        handleChange={handleChange}
                    />

                    {/* <Form.Field
                        control={Select}
                        label='Role'
                        options={options}
                        placeholder='Role'
                        onChange={handleChange}
                    /> */}

                    <Divider hidden />
                    <Button 
                        content = "Register"
                        icon = "signup" 
                        type = "submit" 
                        color = "orange" 
                        disabled = {submitDisabled || !usernameAvailable} 
                    />
                </Segment>
            </Form>
            <FooterMessage />
        </>
    );
}

export default Registration;
