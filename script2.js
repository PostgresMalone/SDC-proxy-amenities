import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 100,
  duration: "60s"
};

export default function() {
  const body = {
      "\"Air conditioning\"": true,
      "\"Bathroom essentials\"": false,
      "\"Bedroom comforts\"": false,
      "\"Carbon monoxide detector\"": false,
      "\"Coffee maker\"": true,
      "\"Dish washer\"": false,
      "\"Dryer\"": true,
      "\"Hair dryer\"": false,
      "\"Heating\"": true,
      "\"Indoor fireplace\"": true,
      "\"Iron\"": true,
      "\"Kitchen\"": false,
      "\"Pets allowed\"": true,
      "\"Pool\"": false,
      "\"roomname\"": "'roomPosted!'",
      "\"Self check-in\"": true,
      "\"Smoke detector\"": false,
      "\"TV\"": false,
      "\"Washer\"": false,
      "\"Wifi\"": false
};

  check(http.post('http://localhost:3000/amenities/rooms', body), {
    'status was 200': (r) => r.status === 200
  });
  // sleep(1);
};
