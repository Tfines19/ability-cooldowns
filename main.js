import "./style.css";

const intervalFrequency = 16.6;
const decrementAmount = intervalFrequency / 1000;

const abilities = [
  { key: "q", name: "meteor", cooldown: 2, ready: true },
  { key: "w", name: "glacial spike", cooldown: 4, ready: true },
  { key: "e", name: "backstab", cooldown: 2, ready: true },
  { key: "r", name: "iceblock", cooldown: 3, ready: true },
];

const keybinds = abilities.map((ability) => ability.key);

const abilitiesContainer = document.querySelector(".abilities");

let nodes = [];

abilities.forEach((ability) => {
  const node = document.createElement("div");
  node.classList = "ability";
  node.dataset.cooldown = ability.cooldown;
  node.dataset.key = ability.key;
  node.dataset.ready = ability.ready;
  node.setAttribute("style", "--deg: 360deg");

  const child = document.createElement("span");
  child.textContent = ability.name;
  child.className = "name";
  // child.style.color = "var(--ready)";
  node.appendChild(child);

  nodes.push(node);
  abilitiesContainer.appendChild(node);
});

const getNode = (key) => {
  const node = nodes.find((node) => node.dataset.key === key);

  return node;
};

const keyHandler = (e) => {
  if (!keybinds.includes(e.key)) {
    return;
  }
  const node = getNode(e.key);
  const ability = abilities.find((ability) => ability.key === e.key);

  if (!ability.ready) {
    return;
  }

  let { cooldown } = node.dataset;
  let progress = cooldown;
  let angle = (progress / cooldown) * 360;
  let interval;

  node.classList.add("cooldowntext");

  interval = setInterval(() => {
    if (progress > 0) {
      ability.ready = false;
      progress -= decrementAmount;
      angle = (progress / cooldown) * 360;
      node.setAttribute("style", `--deg: ${360 - angle}deg;`);
    } else {
      progress = cooldown;
      ability.ready = true;
      node.classList.remove("cooldowntext");
      clearInterval(interval);
    }
  }, intervalFrequency);
};

window.addEventListener("keydown", keyHandler);
