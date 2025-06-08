"use client";

import { useState, useEffect } from "react";
import {usePathname, useRouter} from "next/navigation";
import { db, auth } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserCircle,
  Building,
  Briefcase,
  Target,
  ChevronRight,
  ChevronLeft,
  Lock,
  Info,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";



const steps = [
  {
    id: "welcome",
    title: "Complete Your Profile to Get Started",
    description: "Help us personalize your interview experience",
  },
  {
    id: "personal",
    title: "Personal Information",
    description: "Tell us about yourself",
  },
  {
    id: "professional",
    title: "Professional Background",
    description: "Share your work experience",
  },
  {
    id: "preferences",
    title: "Interview Preferences",
    description: "Help us tailor your practice sessions",
  },
];

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Consulting",
  "Other",
];

const positionLevels = [
  "Entry Level",
  "Junior",
  "Mid-Level",
  "Senior",
  "Lead",
  "Manager",
  "Director",
  "Executive",
];

export default function ProfileCreationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    currentRole: "",
    experience: "",
    industry: "",
    currentCompany: "",
    responsibilities: [] as string[],
    skills: [] as string[],
    highlights: "",
    preferredRole: "",
    targetLevel: "",
    interests: [] as string[],
    technologies: [] as string[],
  });
  const [skillInput, setSkillInput] = useState("");
  const [showSkillsSuggestions, setShowSkillsSuggestions] = useState(false);
  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setFormData({
            name: userData.name || "",
            currentRole: userData.currentRole || "",
            experience: userData.experience || "",
            industry: userData.industry || "",
            currentCompany: userData.currentCompany || "",
            responsibilities: userData.responsibilities || [],
            skills: userData.skills ? userData.skills.split(", ") : [],
            highlights: userData.highlights || "",
            preferredRole: userData.preferredRole || "",
            targetLevel: userData.targetLevel || "",
            interests: userData.interests || [],
            technologies: userData.technologies || [],
          });
        }
      } else {
        setUser(null);
        router.push("/signup");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {

    if (user) {
      await setDoc(
        doc(db, "users", user.uid),
        {
          ...formData,
          skills: formData.skills.join(", "),
        },
        { merge: true }
      );
      onClose();
      window.location.reload();

    }
  };

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle> Complete Profile</DialogTitle>
        <DialogContent className="sm:max-w-2xl w-full p-0 bg-transparent border-0 shadow-none">
          <Card className="w-full bg-black border border-dashed border-indigo-400/30 rounded-lg overflow-hidden">
            <CardHeader className="p-4 sm:p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-1 sm:gap-2">
                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`h-1 w-8 sm:w-12 rounded-full transition-all duration-300 ${
                        index <= currentStep
                          ? "bg-blue-600"
                          : "bg-indigo-400/20"
                      }`}
                    />
                  ))}
                </div>
                <div className="hidden sm:flex items-center gap-2 text-indigo-400">
                  <Lock className="w-4 h-4" />
                  <span className="text-xs">Private & Secure</span>
                </div>
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-400 bg-clip-text text-transparent">
                  {steps[currentStep].title}
                </CardTitle>
                <CardDescription className="text-sm text-indigo-400/70 mt-1">
                  {steps[currentStep].description}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-6">
              <ScrollArea className="h-[calc(100vh-16rem)] sm:h-[50vh] pr-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {currentStep === 0 && <WelcomeStep />}
                    {currentStep === 1 && (
                      <PersonalInfoStep
                        formData={formData}
                        updateFormData={updateFormData}
                        industries={industries}
                      />
                    )}
                    {currentStep === 2 && (
                      <ProfessionalStep
                        formData={formData}
                        updateFormData={updateFormData}
                        skillInput={skillInput}
                        setSkillInput={setSkillInput}
                        showSkillsSuggestions={showSkillsSuggestions}
                        setShowSkillsSuggestions={setShowSkillsSuggestions}
                      />
                    )}
                    {currentStep === 3 && (
                      <PreferencesStep
                        formData={formData}
                        updateFormData={updateFormData}
                        positionLevels={positionLevels}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </ScrollArea>
            </CardContent>

            <CardFooter className="flex justify-between p-4 sm:p-6 border-t border-dashed border-indigo-400/30">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="bg-black border border-dashed border-indigo-400/30 hover:bg-indigo-400/10 text-indigo-400 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Complete Profile
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function WelcomeStep() {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-600/10 rounded-lg border border-dashed border-blue-600/30">
        <h3 className="flex items-center gap-2 text-blue-600 font-medium mb-2">
          <Info className="w-4 h-4" />
          Why do we need your information?
        </h3>
        <p className="text-sm text-indigo-400/70 leading-relaxed">
          Your information helps us create personalized interview experiences
          tailored to your background and aspirations. This allows our AI to
          provide more relevant questions and meaningful feedback during your
          practice sessions.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-black border border-dashed border-indigo-400/30">
          <Lock className="w-5 h-5 text-indigo-400 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-indigo-400">
              Private & Secure
            </h4>
            <p className="text-xs text-indigo-400/70 mt-1">
              Your information is stored securely and is only used to enhance
              your interview practice experience.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-lg bg-black border border-dashed border-indigo-400/30">
          <Target className="w-5 h-5 text-indigo-400 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-indigo-400">
              Personalized Practice
            </h4>
            <p className="text-xs text-indigo-400/70 mt-1">
              We'll tailor interview questions and scenarios to match your
              experience level and career goals.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-lg bg-black border border-dashed border-indigo-400/30">
          <Briefcase className="w-5 h-5 text-indigo-400 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-indigo-400">
              Industry Context
            </h4>
            <p className="text-xs text-indigo-400/70 mt-1">
              Get practice with scenarios and questions relevant to your
              industry and role.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonalInfoStep({ formData, updateFormData, industries }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm text-indigo-400">Full Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => updateFormData("name", e.target.value)}
          placeholder="Enter your full name"
          className="border border-dashed border-indigo-400/30 bg-black text-white focus-visible:ring-1 focus-visible:ring-blue-600 placeholder:text-indigo-400/50"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-indigo-400">Current Role/Title</Label>
        <Input
          value={formData.currentRole}
          onChange={(e) => updateFormData("currentRole", e.target.value)}
          placeholder="e.g., Software Engineer, Product Manager"
          className="border border-dashed border-indigo-400/30 bg-black text-white focus-visible:ring-1 focus-visible:ring-blue-600 placeholder:text-indigo-400/50"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-indigo-400">Years of Experience</Label>
        <Input
          type="number"
          value={formData.experience}
          onChange={(e) => updateFormData("experience", e.target.value)}
          placeholder="Enter number of years"
          min="0"
          max="50"
          className="border border-dashed border-indigo-400/30 bg-black text-white focus-visible:ring-1 focus-visible:ring-blue-600 placeholder:text-indigo-400/50"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-indigo-400">Industry</Label>
        <Select
          value={formData.industry}
          onValueChange={(value) => updateFormData("industry", value)}
        >
          <SelectTrigger className="border border-dashed border-indigo-400/30 bg-black text-white focus:ring-1 focus:ring-blue-600">
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent className="bg-black border border-dashed border-indigo-400/30">
            {industries.map((industry) => (
              <SelectItem
                key={industry}
                value={industry}
                className="text-indigo-400 focus:bg-indigo-400/10"
              >
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function ProfessionalStep({
  formData,
  updateFormData,
  skillInput,
  setSkillInput,
  showSkillsSuggestions,
  setShowSkillsSuggestions,
}) {
  const predefinedSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Java",
    "SQL",
    "AWS",
    "Docker",
  ];

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      updateFormData("skills", [...formData.skills, skill]);
    }
    setSkillInput("");
    setShowSkillsSuggestions(false);
  };

  const removeSkill = (skillToRemove: string) => {
    updateFormData(
      "skills",
      formData.skills.filter((skill) => skill !== skillToRemove)
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm text-indigo-400">Current Company</Label>
        <Input
          value={formData.currentCompany}
          onChange={(e) => updateFormData("currentCompany", e.target.value)}
          placeholder="Where do you currently work?"
          className="border border-dashed border-indigo-400/30 bg-black text-white focus-visible:ring-1 focus-visible:ring-blue-600 placeholder:text-indigo-400/50"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-indigo-400">Key Skills</Label>
        <div className="relative">
          <Input
            value={skillInput}
            onChange={(e) => {
              setSkillInput(e.target.value);
              setShowSkillsSuggestions(true);
            }}
            placeholder="Type to add skills"
            className="border border-dashed border-indigo-400/30 bg-black text-white focus-visible:ring-1 focus-visible:ring-blue-600 placeholder:text-indigo-400/50"
          />
          {showSkillsSuggestions && skillInput && (
            <div className="absolute z-10 w-full mt-1 bg-black border border-dashed border-indigo-400/30 rounded-md shadow-lg">
              {predefinedSkills
                .filter((skill) =>
                  skill.toLowerCase().includes(skillInput.toLowerCase())
                )
                .map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-2 text-indigo-400 hover:bg-indigo-400/10 cursor-pointer"
                    onClick={() => addSkill(skill)}
                  >
                    {skill}
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.skills.map((skill) => (
            <span
              key={skill}
              className="bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-1 border border-dashed border-blue-600/30"
            >
              {skill}
              <X
                className="w-4 h-4 cursor-pointer hover:text-blue-400"
                onClick={() => removeSkill(skill)}
              />
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-indigo-400">Career Highlights</Label>
        <Textarea
          value={formData.highlights}
          onChange={(e) => updateFormData("highlights", e.target.value)}
          placeholder="Share your key achievements and experiences"
          className="min-h-[100px] border border-dashed border-indigo-400/30 bg-black text-white focus-visible:ring-1 focus-visible:ring-blue-600 placeholder:text-indigo-400/50"
        />
      </div>
    </div>
  );
}

function PreferencesStep({ formData, updateFormData, positionLevels }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm text-indigo-400">Preferred Role Type</Label>
        <Input
          value={formData.preferredRole}
          onChange={(e) => updateFormData("preferredRole", e.target.value)}
          placeholder="What role are you targeting?"
          className="border border-dashed border-indigo-400/30 bg-black text-white focus-visible:ring-1 focus-visible:ring-blue-600 placeholder:text-indigo-400/50"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-indigo-400">Target Position Level</Label>
        <Select
          value={formData.targetLevel}
          onValueChange={(value) => updateFormData("targetLevel", value)}
        >
          <SelectTrigger className="border border-dashed border-indigo-400/30 bg-black text-white focus:ring-1 focus:ring-blue-600">
            <SelectValue placeholder="Select target level" />
          </SelectTrigger>
          <SelectContent className="bg-black border border-dashed border-indigo-400/30">
            {positionLevels.map((level) => (
              <SelectItem
                key={level}
                value={level}
                className="text-indigo-400 focus:bg-indigo-400/10"
              >
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-indigo-400">Key Areas of Interest</Label>
        <Textarea
          value={formData.interests.join("\n")}
          onChange={(e) =>
            updateFormData(
              "interests",
              e.target.value.split("\n").filter((x) => x.trim())
            )
          }
          placeholder="Enter your areas of interest (one per line)"
          className="min-h-[100px] border border-dashed border-indigo-400/30 bg-black text-white focus-visible:ring-1 focus-visible:ring-blue-600 placeholder:text-indigo-400/50"
        />
      </div>
    </div>
  );
}
