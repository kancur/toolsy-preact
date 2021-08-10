import { useTable } from 'react-table'
import { useMemo } from 'preact/hooks'
const defaultPropGetter = () => ({})


export default function Table({ data, title, getRowProps = defaultPropGetter }) {

   console.log('table received this data:')
   console.log(data)
  /* const data = useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
    ],
    []
  ) */

  const columns = useMemo(
    () => [
/*       {
        Header: "",
        id: "row",
        filterable: false,
        Cell: ({ row }) => {
          return <span>{row.index}</span>;
        }
      }, */
      {
        Header: 'Keyword',
        accessor: 'kw', // accessor is the "key" in the data
      },
      {
        Header: 'Count',
        accessor: 'count', // accessor is the "key" in the data
      },
      {
        Header: 'Density',
        accessor: 'density',
        Cell: ({ value }) => String(`${(value).toFixed(2)} %`) //display with fixed 2 decimal places and add a % symbol
      },
      

    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <div class="box" style={{ maxWidth: "500px" }}>
      <h2 class="title is-4 has-text-centered has-text-primary">{title}</h2>

      <table {...getTableProps()} class="table is-striped kwdensity-table" style={{ width: "100%" }} >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps(getRowProps(row))}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}