const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios");

const http = require("http");

const path = require("path");
const { allowedNodeEnvironmentFlags } = require("process");

class Ranking {
  constructor() {
    this.sourceUrl;
    this.sourceName;
    this.teams = [];
    this.sourceLogoUrl;
  }
}

class TeamRanking {
  constructor() {
    this.rank;
    this.name;
    this.points;
    this.logoUrl;
  }
}

var corsOptions = {
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
const port = 3001;

app.use(express.static(__dirname + '/dist/csgo-stats'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port, console.log("Running..."));

app.use(cors(corsOptions));

app.listen(8000, () => {
  console.log("Server started!");
});

app.route("/api/hltvStats").get((req, res) => {
  var ranking = new Ranking();

  ranking.sourceName = "HLTV";
  ranking.sourceUrl = "";

  ranking.teams = [];

  axios.get("https://www.hltv.org/ranking/teams").then((response) => {
    let $ = cheerio.load(response.data);

    ranking.sourceLogoUrl = "https://www.hltv.org/img/static/openGraphHltvLogo.png";

    let head = $("head").children("link").last();
    let url = $(head).attr("href");
    ranking.sourceUrl = url;

    axios.get(url).then((statResponse) => {
      $ = cheerio.load(statResponse.data);
      let teamRanks = $("div.ranked-team")
        .toArray()
        .map((_rank) => {
          var teamRank = new TeamRanking();

          const rank = $(_rank);

          var teamLine = rank.find("div.ranking-header").find("div.teamLine");
          var logoUrl = rank.find("div.ranking-header").find("span.team-logo").children("img").first().attr("src");

          let teamName = teamLine.find("span.name").text();
          let teamPoints = teamLine.find("span.points").text().replace("(", "").replace(")", "").replace(" points", "");

          teamRank.name = teamName;
          teamRank.points = teamPoints;
          teamRank.logoUrl = logoUrl;
          teamRank.rank = ranking.teams.length + 1;

          ranking.teams.push(teamRank);
        });

      res.send(ranking);
    });
  });
});

app.route("/api/eslStats").get((req, res) => {
  var ranking = new Ranking();

  ranking.sourceName = "ESL";
  ranking.sourceUrl = "https://pro.eslgaming.com/worldranking/csgo/rankings/";

  ranking.teams = [];

  axios.get("https://cdn1.api.esl.tv/csgo/worldranking/team/list").then((response) => {
    var teams = response.data.items.filter((x) => x.power_rank > 0);

    var orderedTeams = teams.slice().sort(sortPowerRank);

    for (let team of orderedTeams) {
      let teamRank = new TeamRanking();

      teamRank.logoUrl = team.logo;
      teamRank.name = team.name;
      teamRank.points = parseInt(team.power_points).toString();
      teamRank.rank = team.power_rank;

      ranking.teams.push(teamRank);
    }

    res.send(ranking);
  });
});

app.route("/api/csppaStats").get(async (req, res) => {
  var ranking = new Ranking();

  ranking.sourceName = "CSPPA";
  ranking.sourceUrl = "";
  ranking.teams = [];
  ranking.sourceUrl = "https://www.csppa.gg/ranking";

  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(ranking.sourceUrl);

  const results = await page.$$eval(".txtNew", (rows) => {
    console.log(rows);
  });
});

function sortPowerRank(a, b) {
  let powerRankA = parseInt(a.power_rank);
  let powerRankB = parseInt(b.power_rank);
  let comparison = 0;
  if (powerRankA > powerRankB) {
    comparison = 1;
  } else if (powerRankA < powerRankB) {
    comparison = -1;
  }
  return comparison;
}
