import React from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  // GOOGLE RESPONSE
  const responseGoogle = (response) => {
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl, email } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
      email,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  // FACEBOOK RESPONSE
  const responseFacebook = (response) => {
     localStorage.setItem("user", JSON.stringify(response));
     const { name, id, picture, email } = response;
     const doc = {
       _id: id,
       _type: "user",
       userName: name,
       image: picture,
       email,
     };
     client.createIfNotExists(doc).then(() => {
       navigate("/", { replace: true });
     });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>
          {/* Google Login Button */}
          <div className="shadow-2xl">
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>

          {/* facebook Login Button */}
          <div className="shadow-2xl">
            <FacebookLogin
              appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none mt-4"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FaFacebookF className="mr-4" /> Sign in with facebook
                </button>
              )}
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass="my-facebook-button-class"
              cookiePolicy="single_host_origin"
            />
          </div>
          {/* facebook Login button ends */}
        </div>
      </div>
    </div>
  );
};

export default Login;
