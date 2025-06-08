"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Pencil, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast, Toaster } from "sonner";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setProfileData(userDocSnap.data());
            setEditedData(userDocSnap.data());
          } else {
            const defaultData = {
              name: user.displayName || "",
              email: user.email || "",
              photoURL: user.photoURL || "",
              currentCompany: "",
              currentRole: "",
              bio: "",
              skills: "",
              experience: "",
              completedInterviews: 0,
              inProgressInterviews: 0,
              averageScore: "0%",
              totalInterviewTime: "0h",
            };
            setProfileData(defaultData);
            setEditedData(defaultData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to load profile data. Please refresh the page.");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!editedData.name?.trim()) {
      toast.error("Name is required");
      return;
    }

    setLoading(true);

    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, editedData);
      setProfileData(editedData);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!profileData) {
    return (
      <div className="flex h-[600px] w-full items-center justify-center">
        <div className="h-32 w-32 animate-pulse rounded-full bg-muted" />
      </div>
    );
  }

  const stats = [
    {
      label: "Completed Interviews",
      value: profileData.completedInterviews || 0,
    },
    { label: "In Progress", value: profileData.inProgressInterviews || 0 },
    { label: "Average Score", value: profileData.averageScore || "0%" },
    { label: "Total Time", value: profileData.totalInterviewTime || "0h" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-8 py-8">
        <Toaster />
        <Card className="w-full overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative h-48 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400 via-indigo-500 to-purple-600 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)] before:mix-blend-overlay">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)] mix-blend-overlay"></div>
              <div className="absolute bottom-0 left-8 transform translate-y-1/2">
                <Avatar className="h-32 w-32 border-4 border-background">
                  <AvatarImage
                    src={profileData.photoURL}
                    alt={profileData.name}
                  />
                  <AvatarFallback>
                    {profileData.name?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h1 className="text-3xl font-bold">{profileData.name}</h1>
              {isEditing ? (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedData(profileData);
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Changes
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="min-w-0">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground truncate">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold truncate">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">
                  Basic Information
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="min-w-0">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profileData.email}
                      disabled
                      className="truncate"
                    />
                  </div>
                  <div className="min-w-0">
                    <Label htmlFor="company">Current Company</Label>
                    {isEditing ? (
                      <Input
                        id="company"
                        value={editedData.currentCompany}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            currentCompany: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <Input
                        id="company"
                        value={profileData.currentCompany}
                        disabled
                        className="truncate"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <Label htmlFor="role">Current Role</Label>
                    {isEditing ? (
                      <Input
                        id="role"
                        value={editedData.currentRole}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            currentRole: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <Input
                        id="role"
                        value={profileData.currentRole}
                        disabled
                        className="truncate"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <Label htmlFor="experience">Years of Experience</Label>
                    {isEditing ? (
                      <Input
                        id="experience"
                        type="number"
                        value={editedData.experience}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            experience: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <Input
                        id="experience"
                        value={`${profileData.experience} years`}
                        disabled
                        className="truncate"
                      />
                    )}
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold mb-4">
                  Professional Summary
                </h2>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={editedData.bio}
                      onChange={(e) =>
                        setEditedData({ ...editedData, bio: e.target.value })
                      }
                      className="min-h-[100px]"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-muted-foreground break-words">
                      {profileData.bio || "No bio provided"}
                    </p>
                  )}
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold mb-4">
                  Skills & Expertise
                </h2>
                <div>
                  <Label htmlFor="skills">Skills</Label>
                  {isEditing ? (
                    <Textarea
                      id="skills"
                      value={editedData.skills}
                      onChange={(e) =>
                        setEditedData({ ...editedData, skills: e.target.value })
                      }
                      placeholder="Enter skills separated by commas (e.g., JavaScript, React, Node.js)"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profileData.skills?.split(",").map(
                        (skill, index) =>
                          skill.trim() && (
                            <Badge key={index} variant="secondary">
                              {skill.trim()}
                            </Badge>
                          )
                      )}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


//
// "use client"
//
// import { useState, useEffect } from "react"
// import { auth, db } from "@/lib/firebase"
// import { doc, getDoc, updateDoc } from "firebase/firestore"
// import { onAuthStateChanged } from "firebase/auth"
// import { Pencil, Save, X, Briefcase, Mail, Clock } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { toast, Toaster } from "sonner"
// import { motion } from "framer-motion"
//
// export default function Profile() {
//   const [profileData, setProfileData] = useState(null)
//   const [isEditing, setIsEditing] = useState(false)
//   const [editedData, setEditedData] = useState(null)
//   const [loading, setLoading] = useState(false)
//
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         try {
//           const userDocRef = doc(db, "users", user.uid)
//           const userDocSnap = await getDoc(userDocRef)
//
//           if (userDocSnap.exists()) {
//             setProfileData(userDocSnap.data())
//             setEditedData(userDocSnap.data())
//           } else {
//             const defaultData = {
//               name: user.displayName || "",
//               email: user.email || "",
//               photoURL: user.photoURL || "",
//               currentCompany: "",
//               currentRole: "",
//               bio: "",
//               skills: "",
//               experience: "",
//             }
//             setProfileData(defaultData)
//             setEditedData(defaultData)
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error)
//           toast.error("Failed to load profile data. Please refresh the page.")
//         }
//       }
//     })
//
//     return () => unsubscribe()
//   }, [])
//
//   const handleSave = async () => {
//     if (!editedData.name?.trim()) {
//       toast.error("Name is required")
//       return
//     }
//
//     setLoading(true)
//
//     try {
//       const userDocRef = doc(db, "users", auth.currentUser.uid)
//       await updateDoc(userDocRef, editedData)
//       setProfileData(editedData)
//       setIsEditing(false)
//       toast.success("Profile updated successfully!")
//     } catch (error) {
//       console.error("Error updating profile:", error)
//       toast.error("Failed to save changes. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }
//
//   if (!profileData) {
//     return (
//         <div className="flex h-[600px] w-full items-center justify-center">
//           <div className="h-32 w-32 animate-pulse rounded-full bg-muted" />
//         </div>
//     )
//   }
//
//   return (
//       <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
//         <Toaster />
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//           <Card className="overflow-hidden bg-white dark:bg-gray-800 shadow-xl rounded-lg">
//             <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
//               <div className="absolute inset-0 bg-black opacity-30"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
//                 <motion.div
//                     initial={{ scale: 0.8, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{ delay: 0.2, duration: 0.3 }}
//                 >
//                   <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
//                     <AvatarImage src={profileData.photoURL} alt={profileData.name} />
//                     <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
//                       {profileData.name?.[0]?.toUpperCase()}
//                     </AvatarFallback>
//                   </Avatar>
//                 </motion.div>
//                 {isEditing ? (
//                     <div className="flex gap-2">
//                       <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => {
//                             setIsEditing(false)
//                             setEditedData(profileData)
//                           }}
//                       >
//                         <X className="mr-2 h-4 w-4" />
//                         Cancel
//                       </Button>
//                       <Button size="sm" onClick={handleSave} disabled={loading}>
//                         {loading ? (
//                             <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                         ) : (
//                             <Save className="mr-2 h-4 w-4" />
//                         )}
//                         Save
//                       </Button>
//                     </div>
//                 ) : (
//                     <Button
//                         size="sm"
//                         onClick={() => setIsEditing(true)}
//                         className="bg-white text-blue-600 hover:bg-blue-50"
//                     >
//                       <Pencil className="mr-2 h-4 w-4" />
//                       Edit Profile
//                     </Button>
//                 )}
//               </div>
//             </div>
//             <CardContent className="p-6">
//               <div className="mb-6">
//                 <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profileData.name}</h1>
//                 <p className="text-lg text-gray-600 dark:text-gray-300">{profileData.currentRole}</p>
//               </div>
//
//               <div className="space-y-6">
//                 <div className="flex items-center text-gray-600 dark:text-gray-300">
//                   <Briefcase className="h-5 w-5 mr-2" />
//                   <span>{profileData.currentCompany || "Not specified"}</span>
//                 </div>
//                 <div className="flex items-center text-gray-600 dark:text-gray-300">
//                   <Mail className="h-5 w-5 mr-2" />
//                   <span>{profileData.email}</span>
//                 </div>
//                 <div className="flex items-center text-gray-600 dark:text-gray-300">
//                   <Clock className="h-5 w-5 mr-2" />
//                   <span>
//                   {profileData.experience
//                       ? `${profileData.experience} years of experience`
//                       : "Experience not specified"}
//                 </span>
//                 </div>
//
//                 <Separator />
//
//                 <div>
//                   <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">About</h2>
//                   {isEditing ? (
//                       <Textarea
//                           value={editedData.bio}
//                           onChange={(e) => setEditedData({ ...editedData, bio: e.target.value })}
//                           className="min-h-[100px]"
//                           placeholder="Tell us about yourself..."
//                       />
//                   ) : (
//                       <p className="text-gray-600 dark:text-gray-300">{profileData.bio || "No bio provided"}</p>
//                   )}
//                 </div>
//
//                 <Separator />
//
//                 <div>
//                   <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Skills</h2>
//                   {isEditing ? (
//                       <Textarea
//                           value={editedData.skills}
//                           onChange={(e) => setEditedData({ ...editedData, skills: e.target.value })}
//                           placeholder="Enter skills separated by commas (e.g., JavaScript, React, Node.js)"
//                       />
//                   ) : (
//                       <div className="flex flex-wrap gap-2">
//                         {profileData.skills?.split(",").map(
//                             (skill, index) =>
//                                 skill.trim() && (
//                                     <Badge
//                                         key={index}
//                                         variant="secondary"
//                                         className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
//                                     >
//                                       {skill.trim()}
//                                     </Badge>
//                                 ),
//                         )}
//                       </div>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//   )
// }
//
