// Komponen navigasi halaman untuk menampilkan data list secara bertahap.
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = buildPages(currentPage, totalPages)

  return (
    <nav aria-label="Pagination">
      <ul className="pagination mb-0">
        <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous"
          >
            &laquo;
          </button>
        </li>

        {pages.map((p, i) =>
          p === '...' ? (
            <li key={`ellipsis-${i}`} className="page-item disabled">
              <span className="page-link">…</span>
            </li>
          ) : (
            <li
              key={p}
              className={`page-item${p === currentPage ? ' active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(p)}
              >
                {p}
              </button>
            </li>
          )
        )}

        <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  )
}

// Membatasi nomor halaman yang tampil dan menyisipkan elipsis pada daftar panjang.
function buildPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages = []
  const addPage = (p) => pages.push(p)
  const addDots = () => {
    if (pages[pages.length - 1] !== '...') pages.push('...')
  }

  addPage(1)
  if (current > 3) addDots()

  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    addPage(p)
  }

  if (current < total - 2) addDots()
  addPage(total)

  return pages
}
