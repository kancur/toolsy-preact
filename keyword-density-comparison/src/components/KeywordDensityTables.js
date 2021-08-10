import Table from './Table';

export function KeywordDensityTables({dataFromAPI, critical_density}) {
  return <div class="columns is-desktop">

    <div class="column is-4">
      <Table data={dataFromAPI.single} title="One-word keywords" getRowProps={row => ({
        style: {
          color: row.values.density > critical_density ? '#f14668' : '',
        },
      })} />
    </div>

    <div class="column is-4">
      <Table data={dataFromAPI.double} title="Two-word keywords" getRowProps={row => ({
        style: {
          color: row.values.density > critical_density ? '#f14668' : '',
        },
      })} />
    </div>

    <div class="column is-4">
      <Table data={dataFromAPI.triple} title="Three-word keywords" getRowProps={row => ({
        style: {
          color: row.values.density > critical_density ? '#f14668' : '',
        },
      })} />
    </div>

  </div>;
}
