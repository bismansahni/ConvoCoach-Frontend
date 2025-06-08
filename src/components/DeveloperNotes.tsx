"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeveloperNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DeveloperNoteModal = ({ isOpen, onClose }: DeveloperNoteModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md bg-[#1c1c1e] backdrop-blur-md border border-white/10 text-gray-100 rounded-xl p-6 space-y-4">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-white text-center">
                        Note from the Developers
                    </DialogTitle>

                    <DialogDescription className="text-sm leading-relaxed space-y-4 text-gray-100">
                        <p>Hi Visitor!</p>

                        <p>
                            Thank you for visiting <span className="text-blue-400 font-medium">ConvoCoach</span>.
                            The support and love we’ve received—especially from the student community—has meant the world to us.
                        </p>

                        <p>
                            Building this platform has been a passion project from day one. While the response was heartwarming,
                            sustaining and growing <span className="text-blue-400 font-medium">ConvoCoach</span> requires resources we currently don’t have.
                            With heavy hearts, we’ve decided to temporarily pause the project.
                        </p>

                        <p>
                            We’re actively working to find the right support to bring it back—stronger than ever.
                            Your encouragement keeps us going, and we’re truly <span className="text-yellow-300 font-medium">grateful</span>.
                        </p>



                        <div className="mt-6 text-center space-y-1">
                            <p className="text-gray-300">With gratitude,</p>
                            <p className="text-xl font-bold text-white">Bisman Sahni</p>
                            <p className="text-xl font-bold text-white">Vihaan Phal</p>
                            <p className="text-sm text-gray-400">
                                Co-creators of <span className="text-blue-400 font-medium">ConvoCoach</span>
                            </p>


                        </div>

                    </DialogDescription>


                </DialogHeader>

                <DialogFooter>
                    <Button onClick={onClose} className="bg-blue-600 text-white hover:bg-blue-700">
                      Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeveloperNoteModal;
