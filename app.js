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
ocument.getElementById('tab-form').onclick = () => {
        document.getElementById('form-section').classList.add('active-tab');
        document.getElementById('list-section').classList.remove('active-tab');
        document.getElementById('tab-form').classList.add('active');
        document.getElementById('tab-list').classList.remove('active');
      };

      document.getElementById('tab-list').onclick = () => {
        document.getElementById('list-section').classList.add('active-tab');
        document.getElementById('form-section').classList.remove('active-tab');
        document.getElementById('tab-list').classList.add('active');
        document.getElementById('tab-form').classList.remove('active');
      };
