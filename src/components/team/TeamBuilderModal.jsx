import { useState } from 'react'
import Modal from './Modal'
import TeamBuilder from './TeamBuilder'

export default function TeamBuilderModal() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
                Ver equipo
            </button>

            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <TeamBuilder onClose={() => setOpen(false)} />
            </Modal>
        </>
    )
}
