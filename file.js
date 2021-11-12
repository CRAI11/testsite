function getParameterByName(e, t) {
  e = e.replace(/[\[\]]/g, "\\$&");
  let n = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
  return n ? (n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "") : null;
}


const getQueryParameter = (e, t) => {
  for (let n = 0; n < e.length; n++) {
    const s = getParameterByName(t, e[n].src);
    if (s) return s;
  }
};


let highestElements = [];
const maxZIndex = 2147483647;
let isOpen = !1,
  intervalId = "",
  maxIntervals = 20;

const endInterval = () => {
    clearInterval(intervalId);
  },
  findHighestElements = () => {
    let e = [];
    $("div").each(function () {
      parseInt($(this).css("z-index")) >= maxZIndex &&
        "tdn-container" !== $(this).attr("id") &&
        e.push({ name: $(this).attr("class"), value: $(this).css("z-index") });
    }),
      (highestElements = e);
  },

  
  changeElementsIndex = (e, t) => {
    for (let n = 0; n < e.length; n++) {
      document.getElementsByClassName(e[n].name)[0].style.zIndex =
        "open" === t ? 2147483646 : maxZIndex;
    }
  };


let scripts = document.getElementsByTagName("script"),
  rt = getQueryParameter(scripts, "rt"),
  bottomValue = getQueryParameter(scripts, "bottom"),
  leftValue = getQueryParameter(scripts, "left"),
  rightValue = getQueryParameter(scripts, "right"),
  sideValue = leftValue ? `left:${leftValue}px;` : "right:80px",
  style = '<link rel="stylesheet" href="file.css">',
  urlMaster = `https://test-drive-dealers.vercel.app/`,
  // urlMaster = `http://localhost:3000/`,
  fontcss =
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">',
  floatbutton = `<button href="#"  onclick="show()" class="floatbutton" style="${
    bottomValue ? `bottom:${bottomValue}px;` : "bottom: 20px;"
  }${(sideValue = rightValue
    ? `right:${rightValue}px`
    : sideValue)}" id="tdn-float-btn"></button>`,
  custpopup = `\n  <div class="popup" id="popup2">\n    <a href="#" onclick="hide()" class="close-btn-container"><i class="fa fa-times-thin fa-2x closebutton"></i></a>\n    <div id="iframe_container">\n    <iframe class ="myiframe" src=${urlMaster} name="ifr" scrolling="yes" frameborder="0"></iframe>\n    </div>\n  </div>\n  `,
  template = style + fontcss + floatbutton + custpopup,
  render = function (e, t) {
    t.innerHTML = e;
  },


  show = function () {
    (isOpen = !0),
      (document.getElementById("popup2").style.display = "block"),
      document
        .getElementById("tdn-container")
        .setAttribute(
          "style",
          "position:fixed;top:5px;left:0px;height:100%;width:100%;z-index:2147483647"
        ),
      (document.getElementById("tdn-float-btn").style.display = "none"),
      findHighestElements(),
      changeElementsIndex(highestElements, "open"),
      (intervalId = setInterval(() => {
        isOpen & (maxIntervals > 0)
          ? (maxIntervals--,
            findHighestElements(),
            changeElementsIndex(highestElements, "open"))
          : endInterval();
      }, 500));
  },


  hide = function () {
    (isOpen = !1),
      (document.getElementById("popup2").style.display = "none"),
      document
        .getElementById("tdn-container")
        .setAttribute(
          "style",
          "position:fixed;top:5px;left:0px;z-index:2147483647;"
        ),
      (document.getElementById("tdn-float-btn").style.display = "block"),
      changeElementsIndex(highestElements),
      endInterval();
  };


window.onload = function () {
  let e = document.createElement("div");
  if (
    ((e.innerHTML = template),
    (e.id = "tdn-container"),
    e.setAttribute("style", "position:fixed;top:5px;left:0px;z-index:9999;"),
    document.querySelector("body").appendChild(e),
    "undefined" == typeof jQuery)
  ) {
    console.warn("jquery not found, adding it to document");
    var t = document.createElement("script");
    (t.type = "text/javascript"),
      (t.src =
        "https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"),
      document.getElementsByTagName("head")[0].appendChild(t);
  } else console.warn("jquery exists");
};
