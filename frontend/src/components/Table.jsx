
export default function Table({ columns, data, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
          {(onEdit || onDelete) && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
              {(onEdit || onDelete) && (
                <td>
                  {onEdit && (
                    <button onClick={() => onEdit(row)}>Edit</button>
                  )}
                  {onDelete && (
                    <button onClick={() => onDelete(row.id)}>Delete</button>
                  )}
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + 1}>No records found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
