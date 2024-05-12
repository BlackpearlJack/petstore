import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import images from "../../constants/images";

const Register = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
        navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
        } else {
          try {
            const res = await register({ username, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
            toast.success("User successfully registered");
          } catch (err) {
            console.log(err);
            toast.error(err.data.message);
          }
        }
    };
  return (
    <div className="w-full h-screen flex items-start">
      <div className="sm:block hidden w-full md:w-1/2 h-full flex-col">
        <img src={images.login_image} alt="" className="hidden md:block w-full h-full object-cover" />
      </div>
      <div className="w-full md:w-1/2 h-full bg-[#fffff] items-center flex flex-col p-8 md:p-20 justify-between">
        <h1 className="w-full max-w-[500px] mx-auto text-xl text-gray-blue font-semibold">Pawsupplies</h1>

        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col mb-8 md:mb-10">
            <h3 className="text-2xl text-dark-magenta font-semibold mb-2">Sign Up</h3>
            <p className="text-sm mb-2 text-dark-magenta">Welcome! Please Enter your Details</p>
          </div>

          <form onSubmit={submitHandler} className="container">
            <div className="w-full flex flex-col mb-8 md:mb-0">
              <input
                  type="text"
                  name="name"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Name"
                  className="w-full text-dark-magenta py-2 my-2 bg-none border-b border-gray-blue outline-none focus:outline-none"
              />
              <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full text-dark-magenta py-2 my-2 bg-none border-b border-gray-blue outline-none focus:outline-none"
              />

              <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full text-dark-magenta py-2 my-2 bg-none border-b border-gray-blue outline-none focus:outline-none"
              />

              <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full text-dark-magenta py-2 my-2 bg-none border-b border-gray-blue outline-none focus:outline-none"
              />
            </div>

            <div className="w-full flex items-center justify-between mb-8 md:mb-0">
              <div className="w-full flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2"/>
                <p className="text-sm text-dark-magenta">I agree to the terms and conditions</p>
              </div>

              <p className="text-sm text-dark-magenta hover:text-magenta font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">Forgot Password ?</p>
            </div>

            <div className="w-full flex flex-col items-center">
              <button
                disabled={isLoading} 
                type="submit" 
                className="w-full md:w-full my-2 font-semibold text-[white] bg-[#1f2f16] rounded-md p-4 text-center flex items-center justify-center">

                {isLoading ? "Registering..." : "Register"}
              </button>

              {isLoading && <Loader />}
            </div>
          </form>
        </div>

        <div className="w-full flex items-center justify-center mt-4 md:mt-0">
          <p className="text-sm font-normal text-magenta">Already have an account? 
          <Link 
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            className="font-semibold underline underline-offset-2 cursor-pointer">
              Login
          </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register