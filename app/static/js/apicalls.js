
async function getData() {
    const url = "/api/data";
    loader = document.getElementById('loader');
    result_sections = document.getElementById('result_sections');
    try {
        loader.classList.remove("hidden");
        result_sections.classList.add("hidden");
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const sheeddata = await response.json();
      loader.classList.add("hidden");
      result_sections.classList.remove("hidden");
      tabs_nav = document.getElementById('tabs_nav');
      tabs_content = document.getElementById('tab_content_sections');
      Object.keys(sheeddata).forEach((data, idx) => {
        tabs_nav.appendChild(createTab(data, idx))
        var table = createTable(data, idx)
        var table_body = createTableBody()
        sheeddata[data].forEach((row)=> {
            var table_row = createRow(row)
            table_body.appendChild(table_row)
        })
        table.appendChild(table_body)
        table.setAttribute("data-points", JSON.stringify(sheeddata[data]))
        tabs_content.appendChild(table)
        if(idx === 0){
            table.classList.remove('hidden')
        }
      });
      
    } catch (error) {
      console.error(error.message);
      loader.classList.add("hidden");
    }
}


async function getCellFlow() {
    var tables = document.getElementsByTagName('table');
    const visible_tables = Array.from(tables).filter(
        (table) => !table.classList.contains('hidden')
        );
    let data = []
    if(visible_tables.length > 0){
        data = JSON.parse(visible_tables[0].getAttribute('data-points'))
    }
    const url = "/api/findpath";
    try {
      const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data})
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      result_span = document.getElementById('display_result');
      result_span.textContent = result["data"]

      
    } catch (error) {
      console.error(error.message);
      loader.classList.add("hidden");
    }
}