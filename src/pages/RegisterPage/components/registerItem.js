import '../register.css'

const RegisterItem = () => {
    return <div className="spacing">

        <div className="email">
            <label form="email">E-mail </label>
            <input type="email"/>

            <button className="verify">verify</button>
        </div>

        <div className="password">
            <label form="password">Password</label>
            <input type="password"/>
        </div>

        <div className="password_repeat">
            <label>Password repeat</label>
            <input type="password"/>
        </div>

        <div className="name">
            <label>Name</label>
            <input type="type"/>
        </div>

        <button className="register_Button">Register</button>

    </div>

}

export default RegisterItem