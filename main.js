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
  node.style.setProperty("--deg", `${360}deg`);

  const available = document.createElement("div");

  available.className = "available";
  available.textContent = "READY";

  const child = document.createElement("span");
  child.textContent = ability.name + ` - [${ability.key}]`;
  child.className = "name";
  node.appendChild(available);
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
  const ability = abilities.find((ability) => ability.key === e.key);

  if (!ability.ready) {
    return;
  }
  const node = getNode(e.key);

  let { cooldown } = node.dataset;
  let progress = cooldown;
  let angle = (progress / cooldown) * 360;
  let interval;

  interval = setInterval(() => {
    node.firstChild.classList.add("cooldowntext");
    node.firstChild.textContent = "";
    if (progress > 0) {
      ability.ready = false;
      progress -= decrementAmount;
      angle = (progress / cooldown) * 360;
      node.style.setProperty("--deg", `${360 - angle}deg`);
    } else {
      ability.ready = true;
      node.dataset.progress = cooldown;
      node.firstChild.textContent = "READY";
      node.firstChild.classList.remove("cooldowntext");
      clearInterval(interval);
    }
  }, intervalFrequency);
};

window.addEventListener("keydown", keyHandler);
