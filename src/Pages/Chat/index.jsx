//React
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
            <main className="relative bg-white dark:bg-[#09090B] w-full h-screen max-h-screen flex overflow-hidden">
               
               

                {/* SIDEBAR */}
                <div className="relative z-30 flex flex-shrink-0">
                    <SideBarChart />
                </div>

                {/* CONTENIDO */}
                <div className="relative z-20 flex-1 flex flex-col h-screen overflow-hidden">
                    {/* NavBar fijo */}
                    <div className="flex-shrink-0">
                        <NavBarChat />
                    </div>
                    
                    {/* Contenido del chat con altura calculada - CAMBIO CLAVE AQUÍ */}
                    <div className="flex-1 min-h-0 overflow-hidden">
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