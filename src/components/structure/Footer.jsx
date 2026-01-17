import { FaLinkedin } from 'react-icons/fa'

function Footer() {
    return (
        <footer className="bg-slate-800 text-slate-300">
            <div className=" mx-auto px-6 py-10 gap-8 flex justify-around">

                {/* BRAND */}
                <div>
                    <div className="flex items-center gap-2 text-white mb-2">
                        <span className="font-semibold text-lg">
                            Pokémon Teams
                        </span>
                    </div>
                    <p className="text-sm text-slate-400">
                        Crea equipos, ordénalos estratégicamente y simula combates Pokémon.
                    </p>
                </div>



                {/* SOCIAL */}
                <div>
                    <h4 className="text-white font-semibold mb-3">
                        Contacto
                    </h4>
                    <div className="flex justify-center gap-4">
                        <a
                            href="https://www.linkedin.com/in/probablynotannie/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            <FaLinkedin size={22} />
                        </a>
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-slate-700 py-4 text-center text-xs text-slate-400">
                Prueba técnica — Frontend React + zustand + tanstack
            </div>
        </footer>
    )
}

export default Footer
