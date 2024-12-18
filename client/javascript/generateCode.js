document.addEventListener("DOMContentLoaded", function () {
  var generateCodeButton = document.getElementById("generateCodeButton");
  var logo = document.getElementById("logo");
  var logout = document.getElementById("logout");
  const back = document.getElementById("back");
  const copyCode = document.getElementById("copyCode");

  copyCode.addEventListener("click", function () {
    const code = document.getElementById("codePlaceholder");
    //check if code is empty
    if (!(code.value === "")) {
      code.select();
      code.setSelectionRange(0, 99999); /* For mobile devices */
      document.execCommand("copy");
      var alert = document.getElementById("alert");
      alert.style.display = "block";
      alert.innerText = "User code copied ";
      alert.className =
        "bg-green-100 border hidden border-green-400 text-green-700 px-2 py-2 rounded-2xl text-center mb-[4%]";
    }
  });

  back.addEventListener("click", function () {
    window.location.href = "/admin";
  });

  logout.addEventListener("click", function () {
    //get request to /clear
    fetch("/clear")
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        window.location.href = "/";
      });
  });

  logo.addEventListener("click", function () {
    window.location.href = "/admin";
  });

  generateCodeButton.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Generate Code button clicked");

    var role = document.getElementById("role").value;

    //show loader while waiting for response
    var loader = document.getElementById("loaderGenerateCode");
    loader.style.display = "flex";

    // post request to generate code
    fetch("/api/auth/generateCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        //hide loader when response is received
        loader.style.display = "none";

        if (data.error) {
          //Show error message
          var alert = document.getElementById("alert");
          alert.style.display = "block";
          alert.innerText = data.error;
          alert.className =
            "bg-red-100 border hidden border-red-400 text-red-700 px-2 py-2 rounded-2xl text-center mb-[4%]";
        } else if (data.message) {
          //Show success message
          var alert = document.getElementById("alert");
          alert.style.display = "block";
          alert.innerText = "Code generated successfully";
          alert.className =
            "bg-green-100 border hidden border-green-400 text-green-700 px-2 py-2 rounded-2xl text-center mb-[4%]";

          //Place code inside textbox
          var code = document.getElementById("codePlaceholder");
          code.value = data.message;
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        loader.style.display = "none";
        alert("An error occurred. Please try again");
      });
  });
});
