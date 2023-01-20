const calc = (p, c, a) => {
  if ([p, c, a].every((x) => +x === 0)) return [0, 0, 0];

  const numSeats = 2;

  const getQuot = (V, s) => V / (s + 1);

  const allVotes = [p, c, a];
  const endVotes = [0, 0, 0];

  for (let i = numSeats; i > 0; i--) {
    const quots = allVotes.map((v, i) => getQuot(v, endVotes[i]));

    let index;
    if (i > 1) {
      index = quots.indexOf(Math.max(...quots));
    } else {
      const indices = quots.reduce(
        (acc, curr, j, arr) => (curr === Math.max(...arr) ? [...acc, j] : acc),
        [],
      );
      index = indices[Math.floor(Math.random() * indices.length)];
    }
    endVotes[index]++;
  }
  return endVotes;
};

const votesDiv = document.querySelector("#votes");
const setVotes = (votes) => {
  votesDiv.innerHTML = `${votes[0]}/${votes[1]}/${votes[2]}`;
};

let pro = 0;
const setPro = (value) => {
  pro = value;
  setVotes(calc(value, con, abs));
};

let con = 0;
const setCon = (value) => {
  con = value;
  setVotes(calc(pro, value, abs));
};

let abs = 0;
const setAbs = (value) => {
  abs = value;
  setVotes(calc(pro, con, value));
};

const proField = document
  .querySelector("#pro")
  .addEventListener("input", (e) => setPro(e.target.value));

const conField = document
  .querySelector("#con")
  .addEventListener("input", (e) => setCon(e.target.value));

const absField = document
  .querySelector("#abs")
  .addEventListener("input", (e) => setAbs(e.target.value));
