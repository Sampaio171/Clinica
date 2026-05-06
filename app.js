const form = document.getElementById('protocol-form');
const nameInput = document.getElementById('protocol-name');
const clientNameInput = document.getElementById('client-name');
const clientCpfInput = document.getElementById('client-cpf');
const clientPhoneInput = document.getElementById('client-phone');
const clientDobInput = document.getElementById('client-dob');
const clientPlanInput = document.getElementById('client-plan');
const descriptionInput = document.getElementById('protocol-description');
const stepsInput = document.getElementById('protocol-steps');
const protocolList = document.getElementById('protocol-list');
const clearButton = document.getElementById('clear-protocols');
const searchInput = document.getElementById('search-input');
const totalCount = document.getElementById('record-count');
const filteredCount = document.getElementById('filtered-count');
const lastAdded = document.getElementById('last-added');
const tabForm = document.getElementById('tab-form');
const tabList = document.getElementById('tab-list');
const formSection = document.getElementById('form-section');
const listSection = document.getElementById('list-section');

const STORAGE_KEY = 'odontologia-protocolos';

function loadProtocols() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveProtocols(protocols) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(protocols));
}

function renderProtocols(filter = '') {
  const protocols = loadProtocols();
  protocolList.innerHTML = '';
  const normalizedFilter = filter.trim().toLowerCase();
  const filteredProtocols = normalizedFilter
    ? protocols.filter((protocol) => {
        return (
          protocol.name.toLowerCase().includes(normalizedFilter) ||
          protocol.clientName.toLowerCase().includes(normalizedFilter) ||
          protocol.clientCpf.toLowerCase().includes(normalizedFilter) ||
          protocol.clientPhone.toLowerCase().includes(normalizedFilter) ||
          protocol.clientPlan.toLowerCase().includes(normalizedFilter)
        );
      })
    : protocols;

  updateSummary(protocols.length, filteredProtocols.length, protocols[0]);

  if (filteredProtocols.length === 0) {
    protocolList.innerHTML = `<div class="empty-state">${protocols.length === 0 ? 'Nenhuma ficha cadastrada ainda. Preencha o formulário e clique em "Salvar Ficha".' : 'Nenhuma ficha encontrada para essa pesquisa.'}</div>`;
    return;
  }

  filteredProtocols.forEach((protocol, index) => {
    const item = document.createElement('article');
    item.className = 'protocol-item';
    item.innerHTML = `
      <h3>${protocol.name}</h3>
      <p><strong>Paciente:</strong> ${protocol.clientName}</p>
      <p><strong>CPF:</strong> ${protocol.clientCpf}</p>
      <p><strong>Telefone:</strong> ${protocol.clientPhone}</p>
      <p><strong>Data de Nascimento:</strong> ${protocol.clientDob}</p>
      <p><strong>Plano / Convênio:</strong> ${protocol.clientPlan || 'Particular'}</p>
      <p><strong>Observações:</strong> ${protocol.description}</p>
      <p><strong>Anotações:</strong> ${protocol.steps}</p>
      <small>Cadastrado em ${new Date(protocol.createdAt).toLocaleString('pt-BR')}</small>
      <div style="margin-top: 0.75rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button class="secondary" data-action="remove" data-index="${index}">Excluir</button>
      </div>
    `;

    protocolList.appendChild(item);
  });
}

function addProtocol(protocol) {
  const protocols = loadProtocols();
  protocols.unshift(protocol);
  saveProtocols(protocols);
  renderProtocols(searchInput.value);
}

function updateSummary(total, filtered, lastRecord) {
  totalCount.textContent = total;
  filteredCount.textContent = filtered;
  lastAdded.textContent = lastRecord ? `${lastRecord.clientName}` : 'Nenhuma';
}

function removeProtocol(index) {
  const protocols = loadProtocols();
  protocols.splice(index, 1);
  saveProtocols(protocols);
  renderProtocols(searchInput.value);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const protocol = {
    name: nameInput.value.trim(),
    clientName: clientNameInput.value.trim(),
    clientCpf: clientCpfInput.value.trim(),
    clientPhone: clientPhoneInput.value.trim(),
    clientDob: clientDobInput.value,
    clientPlan: clientPlanInput.value.trim(),
    description: descriptionInput.value.trim(),
    steps: stepsInput.value.trim(),
    createdAt: new Date().toISOString(),
  };

  if (!protocol.name || !protocol.clientName || !protocol.clientCpf || !protocol.clientPhone || !protocol.clientDob || !protocol.description || !protocol.steps) {
    alert('Preencha todos os campos obrigatórios para salvar a ficha.');
    return;
  }

  addProtocol(protocol);
  form.reset();
  nameInput.focus();
});

searchInput.addEventListener('input', () => {
  renderProtocols(searchInput.value);
});

protocolList.addEventListener('click', (event) => {
  const target = event.target;
  if (target.dataset.action === 'remove') {
    const index = Number(target.dataset.index);
    removeProtocol(index);
  }
});

clearButton.addEventListener('click', () => {
  if (confirm('Deseja limpar todas as fichas cadastradas?')) {
    saveProtocols([]);
    renderProtocols(searchInput.value);
  }
});

function showTab(tab) {
  if (tab === 'form') {
    tabForm.classList.add('active');
    tabList.classList.remove('active');
    formSection.classList.add('active-tab');
    listSection.classList.remove('active-tab');
  } else {
    tabList.classList.add('active');
    tabForm.classList.remove('active');
    listSection.classList.add('active-tab');
    formSection.classList.remove('active-tab');
  }
}

tabForm.addEventListener('click', () => showTab('form'));
tabList.addEventListener('click', () => showTab('list'));

renderProtocols();
showTab('form');
