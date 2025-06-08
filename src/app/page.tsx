// import Hero from "@/components/landingPage/hero";
// import FeaturesPage from "@/components/landingPage/featurespage";
// import Pricing from "@/components/landingPage/pricing";
// import FooterWithGlobe from "@/components/landingPage/dreamjobpage";
// import NavBar from "@/components/landingPage/navbar";
// import DemoVideo from "@/components/landingPage/demovideo";
//
// export default function Home() {
//   return (
//     <main className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
//       <NavBar />
//
//       <section id="home">
//         <Hero />
//       </section>
//       <section id="about">
//         <DemoVideo />
//       </section>
//
//       <section id="features">
//         <FeaturesPage />
//       </section>
//
//       <section id="pricing">
//         <Pricing />
//       </section>
//
//       <FooterWithGlobe />
//     </main>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/landingPage/hero";
import FeaturesPage from "@/components/landingPage/featurespage";
import Pricing from "@/components/landingPage/pricing";
import FooterWithGlobe from "@/components/landingPage/dreamjobpage";
import NavBar from "@/components/landingPage/navbar";
import DemoVideo from "@/components/landingPage/demovideo";
import DeveloperNoteModal from "@/components/DeveloperNotes";

export default function Home() {
    const [showDeveloperModal, setShowDeveloperModal] = useState(false);

    // useEffect(() => {
    //     console.log("Home mounted");
    //
    //     if (typeof window !== "undefined") {
    //         const hasSeen = localStorage.getItem("hasSeenDeveloperNoteHome");
    //         console.log("localStorage check:", hasSeen);
    //
    //         if (!hasSeen) {
    //             console.log("Showing Developer Note");
    //             setShowDeveloperModal(true);
    //             localStorage.setItem("hasSeenDeveloperNoteHome", "true");
    //         }
    //     }
    // }, []);

    useEffect(() => {
        console.log("Home mounted");
        setShowDeveloperModal(true); // force open for now
    }, []);



    return (
        <main className="min-h-screen bg-white transition-colors duration-500">
            <NavBar />

            <section id="home">
                <Hero />
            </section>
            <section id="about">
                <DemoVideo />
            </section>
            <section id="features">
                <FeaturesPage />
            </section>
            <section id="pricing">
                <Pricing />
            </section>

            <FooterWithGlobe />

            <DeveloperNoteModal
                isOpen={showDeveloperModal}
                onClose={() => setShowDeveloperModal(false)}
            />
        </main>
    );
}
