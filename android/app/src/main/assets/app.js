const storageKey = "mbm.members.v1";

const defaultMembers = [
  {
    id: "mbm-001",
    name: "Ava Reed",
    plan: "Premium",
    status: "active",
    location: "London, UK",
    joined: "2025-09-12"
  },
  {
    id: "mbm-002",
    name: "Noah Patel",
    plan: "Standard",
    status: "inactive",
    location: "Austin, US",
    joined: "2024-11-08"
  },
  {
    id: "mbm-003",
    name: "Sophia Martinez",
    plan: "Enterprise",
    status: "active",
    location: "Madrid, ES",
    joined: "2025-01-19"
  },
  {
    id: "mbm-004",
    name: "Liam Chen",
    plan: "Premium",
    status: "active",
    location: "Singapore, SG",
    joined: "2024-07-30"
  },
  {
    id: "mbm-005",
    name: "Emma Johnson",
    plan: "Standard",
    status: "inactive",
    location: "Toronto, CA",
    joined: "2025-03-03"
  }
];

const elements = {
  membersBody: document.getElementById("members-body"),
  statTotal: document.getElementById("stat-total"),
  statActive: document.getElementById("stat-active"),
  statInactive: document.getElementById("stat-inactive"),
  statUpdated: document.getElementById("stat-updated"),
  searchInput: document.getElementById("search-input"),
  statusFilter: document.getElementById("status-filter"),
  form: document.getElementById("member-form"),
  formMessage: document.getElementById("form-message"),
  nameInput: document.getElementById("member-name"),
  planInput: document.getElementById("member-plan"),
  statusInput: document.getElementById("member-status"),
  locationInput: document.getElementById("member-location"),
  resetButton: document.getElementById("reset-data")
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric"
});
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit"
});

const state = {
  members: loadMembers(),
  query: "",
  status: "all"
};

function loadMembers() {
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
      return [...defaultMembers];
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [...defaultMembers];
  } catch (error) {
    return [...defaultMembers];
  }
}

function saveMembers(members) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(members));
  } catch (error) {
    // Local storage might be unavailable; keep in-memory state.
  }
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }
  return dateFormatter.format(date);
}

function updateStats() {
  const total = state.members.length;
  const active = state.members.filter((member) => member.status === "active")
    .length;
  const inactive = total - active;

  elements.statTotal.textContent = total;
  elements.statActive.textContent = active;
  elements.statInactive.textContent = inactive;
}

function updateTimestamp() {
  const now = timeFormatter.format(new Date());
  elements.statUpdated.textContent = `Updated ${now}`;
}

function applyFilters() {
  const query = state.query.toLowerCase();
  return state.members.filter((member) => {
    const matchesQuery = member.name.toLowerCase().includes(query);
    const matchesStatus =
      state.status === "all" ? true : member.status === state.status;
    return matchesQuery && matchesStatus;
  });
}

function createCell(content, className) {
  const cell = document.createElement("td");
  if (className) {
    cell.className = className;
  }
  cell.textContent = content;
  return cell;
}

function createStatusBadge(status) {
  const badge = document.createElement("span");
  badge.className = `badge badge--${status}`;
  badge.textContent = status;
  return badge;
}

function toggleStatus(memberId) {
  state.members = state.members.map((member) => {
    if (member.id !== memberId) {
      return member;
    }
    return {
      ...member,
      status: member.status === "active" ? "inactive" : "active"
    };
  });
  saveMembers(state.members);
  render();
}

function removeMember(memberId) {
  state.members = state.members.filter((member) => member.id !== memberId);
  saveMembers(state.members);
  render();
}

function renderMembers(members) {
  const rows = members.map((member) => {
    const row = document.createElement("tr");

    row.append(
      createCell(member.name, "cell--name"),
      createCell(member.plan),
      createStatusCell(member.status),
      createCell(member.location || "Unknown"),
      createCell(formatDate(member.joined)),
      createActionsCell(member)
    );

    return row;
  });

  if (rows.length === 0) {
    const emptyRow = document.createElement("tr");
    const emptyCell = document.createElement("td");
    emptyCell.colSpan = 6;
    emptyCell.className = "empty-state";
    emptyCell.textContent = "No members match the current filters.";
    emptyRow.append(emptyCell);
    rows.push(emptyRow);
  }

  elements.membersBody.replaceChildren(...rows);
}

function createStatusCell(status) {
  const cell = document.createElement("td");
  cell.append(createStatusBadge(status));
  return cell;
}

function createActionsCell(member) {
  const cell = document.createElement("td");
  cell.className = "cell--actions";

  const toggleButton = document.createElement("button");
  toggleButton.type = "button";
  toggleButton.className = "button button--small";
  toggleButton.textContent =
    member.status === "active" ? "Deactivate" : "Activate";
  toggleButton.addEventListener("click", () => toggleStatus(member.id));

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "button button--ghost button--small";
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => removeMember(member.id));

  cell.append(toggleButton, removeButton);
  return cell;
}

function setFormMessage(message) {
  elements.formMessage.textContent = message;
}

function handleSubmit(event) {
  event.preventDefault();
  const name = elements.nameInput.value.trim();
  if (!name) {
    setFormMessage("Please enter a name.");
    return;
  }

  const newMember = {
    id: `mbm-${Date.now().toString(36)}`,
    name,
    plan: elements.planInput.value,
    status: elements.statusInput.value,
    location: elements.locationInput.value.trim(),
    joined: new Date().toISOString().slice(0, 10)
  };

  state.members = [newMember, ...state.members];
  saveMembers(state.members);
  elements.form.reset();
  setFormMessage(`Added ${name}.`);
  render();
}

function handleReset() {
  state.members = [...defaultMembers];
  saveMembers(state.members);
  setFormMessage("Demo data restored.");
  render();
}

function render() {
  const filtered = applyFilters();
  renderMembers(filtered);
  updateStats();
  updateTimestamp();
}

elements.searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});

elements.statusFilter.addEventListener("change", (event) => {
  state.status = event.target.value;
  render();
});

elements.form.addEventListener("submit", handleSubmit);
elements.resetButton.addEventListener("click", handleReset);

render();
