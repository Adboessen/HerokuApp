import React from "react";
import logo from "./logo.svg";
import GoogleLogin from "react-google-login";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())

      .then((data) => setData(data.message));
  }, []);

  const responseGoogle = (response) => {
    console.log(response.tokenId);
    console.log(response.profileObj);

    const id_token = response.tokenId;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3001/users");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
      console.log("Signed in as: " + xhr.responseText);
    };
    xhr.send("idtoken=" + id_token);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>{!data ? "Loading..." : data}</p>

        <nav>
          <div>Test</div>
          <GoogleLogin
            clientId="1085897457627-09537qfb2nl4u3bosi9qoe5vlbagosk1.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        </nav>
      </header>
    </div>
  );
}

export default App;
