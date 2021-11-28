import axios from 'axios';
import React from 'react';
import '../register.css'

const baseUrl = "https://localhost:8086/users";



const RegisterItem = () => {

    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
        axios.get("http://localhost:8086/users/getTestUser").then((res) => {
            console.log(res);
            setPost(res.data.data);
        })
    }, [])


    function createPost() {
        axios.post("http://localhost:8086/users/insertUserTest", {
            userId: post.userId,
            userPassword: post.userPassword,
            userRole: post.userRole,
            verifyCode: post.verifyCode,
            userName: post.userName,
            email: post.email,
            realName: post.realName

        })
            .then((res) => {
                console.log(res)
                setPost(res.data.data);
            });
    }



    return (
         <div className="spacing">

            <div className="email">
                <label form="email">E-mail </label>
                <input type="email" />

                <button className="verify">verify</button>
            </div>

            <div className="password">
                <label form="password">Password</label>
                <input type="password" />
            </div>

            <div className="password_repeat">
                <label>Password repeat</label>
                <input type="password" />
            </div>

            <div className="name">
                <label>Name</label>
                <input type="type" />
            </div>


            <h1>hello world! </h1>
            <button className="register_Button" onClick={createPost}>Register</button>

        </div>

    )
}

export default RegisterItem