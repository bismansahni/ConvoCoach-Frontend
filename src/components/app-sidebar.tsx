// // app-sidebar.jsx
// "use client";
//
// import * as React from "react";
// import { Command } from "lucide-react";
// import { useEffect, useState } from "react";
// import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
// import { NavUser } from "@/components/nav-user";
// import { auth, db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
// } from "@/components/ui/sidebar";
//
// export function AppSidebar({ ...props }) {
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     photoURL: "",
//   });
//   const [userId, setUserId] = useState(null);
//
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setUserId(user.uid);
//         try {
//           const userDocRef = doc(db, "users", user.uid);
//           const userDocSnap = await getDoc(userDocRef);
//
//           if (userDocSnap.exists()) {
//             const data = userDocSnap.data();
//             setUserData({
//               name: data.name || user.displayName || "User",
//               email: data.email || user.email,
//               photoURL: data.photoURL || user.photoURL || "",
//             });
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       }
//     });
//
//     return () => unsubscribe();
//   }, []);
//
//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader className="mb-6">
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg" asChild>
//               <a
//                   href="#"
//                   className="flex items-center gap-4 group-data-[collapsible=icon]:mt-2"
//               >
//                 {/*<div className="flex items-center justify-center w-14 h-14 transition-all duration-300 ease-in-out group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:mx-auto ">*/}
//                 {/*  <div className="flex aspect-square w-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">*/}
//                 {/*    <Command className="h-7 w-7 transition-all duration-300 ease-in-out group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7 " />*/}
//                 {/*  </div>*/}
//                 {/*</div>*/}
//                 <div
//                     className="flex aspect-square w-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
//                   <img
//                       src="/templogo.png"
//                       alt="Logo"
//                       className="h-7 w-7 transition-all duration-300 ease-in-out group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7"
//                   />
//                 </div>
//
//
//                 <div
//                     className="flex items-center overflow-hidden transition-all duration-300 ease-in-out group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0">
//                   <span className="text-2xl font-bold tracking-tight whitespace-nowrap">ConvoCoach
//                   </span>
//                 </div>
//               </a>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       <SidebarContent className="space-y-6 px-2">
//         {" "}
//         {/* Added vertical spacing */}
//         <NavMain/>
//         <NavProjects userId={userId}/>
//       </SidebarContent>
//       <SidebarFooter className="">
//         {" "}
//         {/* Added auto margin top */}
//         <NavUser user={userData}/>
//       </SidebarFooter>
//       <SidebarRail/>
//     </Sidebar>
//   );
// }

"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    photoURL: "",
  });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setUserData({
              name: data.name || user.displayName || "User",
              email: data.email || user.email,
              photoURL: data.photoURL || user.photoURL || "",
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mb-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a
                href="/dashboard"
                className="flex items-centergroup-data-[collapsible=icon]:mt-3 focus:outline-none focus:ring-0"
              >
                <div className="flex items-center justify-center w-14 h-14 transition-all duration-300 ease-in-out group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:mx-auto">
                  <div className="flex aspect-square w-20 items-center justify-center rounded-lg bg-transparent">
                    <img
                      src="/ConvoCoachLogo.png"
                      alt="Logo"
                      className="h-8 w-8 transition-all duration-300 ease-in-out group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8"
                    />
                  </div>
                </div>
                <div className="flex items-center overflow-hidden transition-all duration-300 ease-in-out group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0">
                  <span className="text-2xl font-bold tracking-tight whitespace-nowrap">
                    ConvoCoach
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="space-y-6 px-2">
        <NavMain />
        <NavProjects userId={userId} />
      </SidebarContent>
      <SidebarFooter className="">
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
