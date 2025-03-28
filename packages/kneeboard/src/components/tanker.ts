import { translate } from "@dcs-web-editor-mono/utils";
import { Component, Context } from "../types";
import "./tanker.css";
import { load } from "../cache";
const component: Component = {
  id: "tanker",
  render: (c: Context) => {
    const { country, dictionary } = c;
    const title = `<h4 class="center">TANKER</h4>`;
    const _checked = load("use-group-names");

    const tankers = `<div contenteditable><ul>${
      country.plane?.group
        .map((group) => renderTanker(group, dictionary, _checked))
        .filter((i) => i)
        .join("") || "No tanker available"
    }</ul></div>`;

    return title + tankers;
  },
  hasContent: (c: Context) => {
    const { country } = c;

    country.plane?.group.filter((g) => g.task === "Refueling").length;
  },
};

function renderTanker(group, dictionary, _checked) {
  if (group.task === "Refueling") {
    const tasks = group.route?.points
      ?.flatMap(
        (p) =>
          p.task?.params?.tasks?.filter &&
          p.task?.params?.tasks?.filter((t) => t.id === "WrappedAction")
      )
      .filter((t) => t?.params?.action?.id === "ActivateBeacon")
      .map((t) => t?.params?.action?.params);
    const task = tasks[0] || {};
    // console.log(task);

    const unit = group.units[0];

    const callsign = unit.callsign?.name || unit.callsign;
    const tacan = `<span class="tacan">TACAN ${task.callsign} ${task.channel}${task.modeChannel}</span>`;
    return `<li><span class="callsign">${_checked ? group.name : callsign}</span> <b>${translate(
      group.name,
      dictionary
    )}</b> <span class="type">${unit.type}</span> <span class="freq">${
      group.frequency
    }</span> ${tacan}</li>`;
  } else return false;
}

export default component;
