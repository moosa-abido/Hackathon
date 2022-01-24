let searchButton = document.querySelector("#search");

var base_url = "https://api.nasa.gov/mars-photos/api/v1/rovers";
var api_key = "55KfZoChBZOdrEZ1YEN4dRSUY5OXSr2TspkZkyhu";

function getLink(rover, para, paraval) {
  return base_url + "/" + rover + "/photos?page=1&" + para + "=" + paraval + "&api_key=" + api_key;
}

async function sendApiRequest(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

async function onClickBtn(e) {
  let rover = e.currentTarget.getAttribute("rover");

  let is_sol = document.getElementById("id_sol").checked;
  let para = "earth_date";
  let paraval = document.getElementById("id_date_text").value;
  if (is_sol) {
    para = "sol";
    paraval = document.getElementById("id_sol_text").value;
  }
  let link = getLink(rover, para, paraval);

  let data = await sendApiRequest(link);
  injectData(data.photos);
}
function injectData(photos) {
  let car = document.getElementById("id_carphoto");
  if (photos.length > 0) {
    console.log(photos.length);
    let classname = "carousel-item active";
    car.innerHTML = "";
    photos.forEach((photo) => {
      let div = document.createElement("div");
      div.active = true;
      div.className = classname;
      let img = document.createElement("img");
      img.className = "d-block";
      img.setAttribute("src", photo.img_src);
      console.log(img);
      div.appendChild(img);
      car.appendChild(div);
      classname = "carousel-item";
    });
    console.log(car);
  } else {
    alert("No data found.");
  }
}

function init(e) {
  let ids = ["id_curiosity", "id_opportunity", "id_spirit"];

  ids.forEach((id) => {
    let btn = document.getElementById(id);
    btn.addEventListener("click", onClickBtn);
  });
}

init();
