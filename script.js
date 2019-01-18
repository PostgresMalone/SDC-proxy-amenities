import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 100,
  duration: "30s"
};

export default function() {
  const roomId = Math.floor(Math.random() * 10000000) + 1;
  check(http.get(`http://localhost:3000/amenities/rooms/${roomId}`), {
    'status was 200': (r) => r.status === 200
  });
  // sleep(1);
};
