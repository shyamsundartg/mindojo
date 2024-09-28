function createTab(name, idx) {
  var tab_anchor = document.createElement('a');
  tab_anchor.href = '#';
  tab_anchor.id=`tab_${name}`
  tab_anchor.onclick = () => updateSelection(name);
  tab_anchor.classList.add(
    'tabs',
    'group',
    'relative',
    'min-w-0',
    'flex-1',
    'overflow-hidden',
    'bg-white',
    'px-4',
    'py-4',
    'text-center',
    'text-sm',
    'font-medium',
    'text-gray-900',
    'hover:bg-gray-50',
    'focus:z-10'
  );
  tab_anchor.innerHTML = `<span>${name}</span><span aria-hidden="true" class="absolute inset-x-0 bottom-0 h-0.5 ${
    idx === 0 ? 'bg-indigo-500' : 'bg-transparent'
  }"></span>`;
  return tab_anchor;
}

function toggleTabSelection(currentTab){
    const tabs = document.getElementsByClassName('tabs');
    Array.from(tabs).forEach(tab => {
        const secondChild = tab.querySelector('span:nth-of-type(2)');
        secondChild.classList.remove('bg-indigo-500')
        secondChild.classList.add('bg-transparent')
    });
    const visibleTab = document.getElementById(currentTab);
    console.log("visibleTabvisibleTab",visibleTab)
    const secondChild = visibleTab.querySelector('span:nth-of-type(2)');
    secondChild.classList.add('bg-indigo-500')
    secondChild.classList.remove('bg-transparent')
}

function updateSelection(id) {
  var tables = document.getElementsByTagName('table');
  const display_result = document.getElementById('display_result');
  display_result.textContent = ''
  toggleTabSelection(`tab_${id}`)
  var new_table = document.getElementById(`table_${id}`);
  if (new_table) {
    const visible_tables = Array.from(tables).filter(
      (table) => !table.classList.contains('hidden')
    );
    visible_tables.forEach((visible_table) =>
      visible_table.classList.add('hidden')
    );
    new_table.classList.remove('hidden');
  }
}
function createRow(cells) {
  var row = document.createElement('tr');
  row.classList.add('divide-x', 'divide-gray-200');
  cells.forEach((cell) => {
    var table_cell = document.createElement('td');
    table_cell.classList.add(
      'whitespace-nowrap',
      'p-4',
      'text-sm',
      'text-gray-500'
    );
    table_cell.innerHTML = cell;
    row.appendChild(table_cell);
  });
  return row;
}

function createTable(id) {
  var table = document.createElement('table');
  table.id = `table_${id}`;
  table.classList.add('hidden', 'min-w-full', 'divide-y', 'divide-gray-300');
  return table;
}
function createTableBody() {
  var table_body = document.createElement('tbody');
  table_body.classList.add('divide-y', 'divide-gray-200', 'bg-white');
  return table_body;
}
