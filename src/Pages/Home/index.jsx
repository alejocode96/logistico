import React from 'react';


//componentes
import Header from '../../Components/Home/header';
import WhoIsLogistico from '../../Components/Home/whoIsLogistico';

function Home() {

    return (
        <>

            <main className='bg-white dark:bg-[#09090B]'>
                {/* Header */}
                <Header />

                {/* fondo azul */}
                <div className="h-[200%] absolute inset-0 z-10 bg-[image:radial-gradient(80%_50%_at_50%_-20%,hsl(206,81.9%,65.3%,0.5),rgba(255,255,255,0))]"></div>
                {/* svg a cuadros */}
                <svg className="absolute inset-0 z-10 h-[200%] w-full text-zinc-900/15 dark:text-white/10 
                            [mask-image:radial-gradient(90%_50%_at_top_center,white,transparent)]"
                    width="100%" height="100%" aria-hidden="true">

                    <defs>
                        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>

                        <pattern id="highlightGrid" width="560" height="480" patternUnits="userSpaceOnUse">

                            <rect x="160" y="80" width="80" height="80" fill="rgba(100,100,100,0.2)" />
                            <rect x="400" y="240" width="80" height="80" fill="rgba(100,100,100,0.15)" />
                            <rect x="80" y="320" width="80" height="80" fill="rgba(100,100,100,0.1)" />
                            <rect x="320" y="160" width="80" height="80" fill="rgba(100,100,100,0.12)" />
                            <rect x="480" y="0" width="80" height="80" fill="rgba(100,100,100,0.14)" />
                            <rect x="0" y="240" width="80" height="80" fill="rgba(100,100,100,0.11)" />
                            <rect x="240" y="400" width="80" height="80" fill="rgba(100,100,100,0.13)" />
                        </pattern>

                        <radialGradient id="fade" cx="50%" cy="0%" r="75%">
                            <stop offset="0%" stopColor="white" stopOpacity="1" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </radialGradient>

                        <mask id="fadeMask">
                            <rect width="100%" height="100%" fill="url(#fade)" />
                        </mask>
                    </defs>

                    <rect width="100%" height="100%" fill="url(#highlightGrid)" mask="url(#fadeMask)" opacity="0.6" className="animate-pulse" />

                    <rect width="100%" height="100%" fill="url(#grid)" mask="url(#fadeMask)" />
                </svg>


                {/* Conece a logistico */}
                <WhoIsLogistico/>


            </main>

        </>
    )
}

export default Home