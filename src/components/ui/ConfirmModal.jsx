// Modal konfirmasi reusable untuk mencegah penghapusan data secara tidak sengaja.
export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="modal-backdrop-custom" onClick={onCancel}>
      <div
        className="modal-dialog modal-dialog-centered mb-0"
        style={{ maxWidth: 420, width: '90%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              onClick={onCancel}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <p className="mb-0">{message}</p>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Batal
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Ya, Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
