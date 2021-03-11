import Notification from "./Notification";

const LoginForm = ({
                     message,
                     username,
                     password,
                     handleUsernameChange,
                     handlePasswordChange,
                     handleSubmit
                   }) => (
  <div>
    <h2>log in to application</h2>
    <Notification text={message} type="error"/>
    <form onSubmit={handleSubmit}>
      <div>
        username <input value={username}
                        type="text"
                        onChange={handleUsernameChange}/>
      </div>
      <div>
        password <input value={password}
                        type="password"
                        onChange={handlePasswordChange}/>
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

export default LoginForm
