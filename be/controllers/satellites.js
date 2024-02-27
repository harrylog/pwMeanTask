const url = require("url");
const querystring = require("querystring");
const axios = require("axios");
const sentinelHub = "https://apps.sentinel-hub.com/sentinel-playground/";
let gain = 1.0;
let satellitesImages = [];
const numOfImgs = 2;

let frozenState = [];

function handleRes(response) {
  let html = response.data;
  const patternStart = "https://services.*";
  const matchedStringStart = html.match(patternStart);
  afterSplit = matchedStringStart[0].split('"><meta');
  imageUrl = afterSplit[0].split('"><meta')[0];
  return imageUrl;
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function randomizeLatLngCc() {
  lat = getRandomNumber(31, 33);
  lng = getRandomNumber(34, 35);
  maxcc = getRandomNumber(29, 30);

  return { lat, lng, maxcc };
}

async function handleSingleReq(ind) {
  let { lat, lng, maxcc } = randomizeLatLngCc();
  finalRes = await axios.get(sentinelHub, {
    params: {
      source: "S2L2A",
      lat, 
      lng,
      zoom: 12,
      preset: "1_TRUE_COLOR",
      layers: "B01,B02,B03",
      maxcc, //: 30,
      gain: 1.0,
      gamma: 1.0,
      time: "2022-07-01|2023-01-14",
      atmFilter: "",
      showDates: false,
      showImage: true,
    },
  });

  image = handleRes(finalRes);
  imageStringified = JSON.stringify(image);
  singleImg = { image, ind };
  return singleImg;
}

exports.getSatellites = async (req, res, next) => {
  satellitesImages = [];
  for (i = 0; i < numOfImgs; i++) {
    singleImgData = await handleSingleReq(i);
    satellitesImages.push(singleImgData);
  }
  frozenState = [...satellitesImages];


  res.status(200).send(satellitesImages);
};

let bright = 1;
exports.getBrightedSatelliteImage = async (req, res, next) => {
  id = req.params.brightId;
  chosenImg = frozenState.find((item) => item["ind"] == id);
  const urlString = chosenImg["image"];
  afterSplit = urlString.split("?")[0];

  const longUrl = urlString;
  const urlObject = new URL(longUrl);
  const newValue = parseInt(urlObject.searchParams.get("gain")) * 1.1 * bright; //1+0.1*bright
  urlObject.searchParams.set("gain", newValue);

  const newUrl = urlObject.toString();



  frozenState[id].image = newUrl;
  bright++;
  res.status(200).send(frozenState);
};

//http://localhost:3000/api/v1/satellites
//http://localhost:3000/api/v1/satellites/1
