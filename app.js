const form = document.getElementById('protocol-form');
const protocolList = document.getElementById('protocol-list');
const tabForm = document.getElementById('tab-form');
const tabList = document.getElementById('tab-list');
const formSection = document.getElementById('form-section');
const listSection = document.getElementById('list-section');
tabForm.addEventListener('click', () => {
  tabForm.classList.add('active');
  tabList.classList.remove('active');
  formSection.classList.add('active-tab');
  listSection.classList.remove('active-tab');
});
tabList.addEventListener('click', () => {
  tabList.classList.add('active');
  tabForm.classList.remove('active');
  listSection.classList.add('active-tab');
  formSection.classList.remove('active-tab');
});
