import { useState } from 'react'
import React from 'react'

//componentes
import SideBarChart from '../../Components/Chat/sideBarChat'
import NavBarChat from '../../Components/Chat/navBarChat'
import InitialChat from '../../Components/Chat/initialChat'
import ModalFaq from '../../Components/Chat/modalFAQ'
import ChatCurrent from '../../Components/Chat/chatCurrent'
//contexto
import { LogisticoContext } from '../../Context'
//navegacion
import { NavLink } from 'react-router-dom'

function Chat() {
    const { isDark, chatHistoryCurrent, setChatHistoryCurrent } = React.useContext(LogisticoContext);

    return (
        <>
            <main className="relative bg-white dark:bg-[#09090B] w-full min-h-0 h-full  flex overflow-hidden">
                {/* BACKGROUND DENTRO DEL MAIN */}
                {isDark ?
                    <div
                        className="h-full absolute inset-0 z-10 mask-[radial-gradient(75%_95%_at_bottom_center,white,transparent)]"
                        style={{ backgroundImage: ` linear-gradient(to right, rgba(255,255,255,0.02)  1px, transparent 1px),  linear-gradient(to bottom, rgba(255,255,255,0.02)  1px, transparent 1px)`, backgroundSize: "60px 60px", }}
                    /> :
                    <div
                        className="absolute inset-0 z-10 mask-[radial-gradient(75%_95%_at_bottom_center,white,transparent)]"
                        style={{ backgroundImage: ` linear-gradient(to right, #e5e7eb 1px, transparent 1px),linear-gradient(to bottom, #e5e7eb 1px, transparent 1px) `, backgroundSize: "60px 60px", }}
                    />}

                {isDark ?
                    <div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                            backgroundImage: `
                             radial-gradient( circle at top right, hsl(206,81.9%,65.3%,0.6),  transparent 70% ),
                             radial-gradient( circle at bottom left,  hsl(206,81.9%,65.3%,0.6),  transparent 70% )  `,
                            backgroundSize: "280px 280px, 280px 280px",
                            backgroundPosition: "top right, bottom left",
                            backgroundRepeat: "no-repeat",
                            filter: "blur(120px)"
                        }}
                    /> :
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: "radial-gradient(circle at top right, hsl(206,81.9%,65.3%,0.4), transparent 70%)",
                            backgroundSize: "320px 320px",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top right",
                            filter: "blur(80px)"
                        }} />

                        <div style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: "radial-gradient(circle at bottom left, hsl(206,81.9%,65.3%,0.4), transparent 70%)",
                            backgroundSize: "380px 380px",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "bottom  left",
                            filter: "blur(0px)"
                        }} />
                    </div>
                  }

                {/* SIDEBAR */}
                <div className="relative z-30 flex-shrink-0">
                    <SideBarChart />
                </div>

                {/* CONTENIDO - Altura fija para evitar scroll en toda la página */}
                <div className="relative z-20 flex-1 flex flex-col overflow-hidden">
                    {/* NavBar fijo */}
                    <div className="flex-shrink-0">
                        <NavBarChat />
                    </div>
                    
                    {/* Contenido del chat - Ocupa exactamente el espacio restante */}
                    <div className="flex-1 overflow-hidden">
                        {chatHistoryCurrent.length === 0 ? (
                            <InitialChat />
                        ) : (
                            <ChatCurrent />
                        )}
                    </div>
                </div>
            </main>

            <ModalFaq />
        </>
    );
}

export default Chat