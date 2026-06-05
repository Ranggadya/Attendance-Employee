export default function SortButton({ label, sortKey, sortConfig, onSort }) {
  const isActive = sortConfig.key === sortKey
  const icon = isActive
    ? sortConfig.direction === 'asc'
      ? ' ▲'
      : ' ▼'
    : ' ⇅'

  return (
    <span
      className="sort-btn"
      onClick={() => onSort(sortKey)}
      title={`Sort by ${label}`}
    >
      {label}
      <span style={{ fontSize: 10, color: isActive ? '#467FD0' : '#adb5bd' }}>
        {icon}
      </span>
    </span>
  )
}
