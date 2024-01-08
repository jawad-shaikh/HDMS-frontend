import React from 'react'

const ConfirmModal = ({closeModal, onSubmit} : any) => {
  return (
    <div>
        <p>File will be deleted, proceed? Click to <strong>Confirm</strong> to agree this file will be deleted.</p>
        <div className="flex items-center justify-end mt-16">
        <button
          onClick={closeModal}
          type="button"
          className="py-3 px-10 font-semibold"
        >
          Cancel
        </button>
        <button onClick={onSubmit} className="bg-primary py-3 px-10 text-white font-semibold">
          Confirm
        </button>
      </div>
    </div>
  )
}

export default ConfirmModal