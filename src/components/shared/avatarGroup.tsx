import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const avatarData = [
  {
    name: "CT",
    imgURL: "/assets/avatar/image1.png",
  },
  {
    name: "CT",
    imgURL: "/assets/avatar/image.png",
  },
  {
    name: "CT",
    imgURL: "/assets/avatar/image4.png",
  },

  {
    name: "CT",
    imgURL: "/assets/avatar/image3.png",
  },
  {
    name: "CT",
    imgURL: "/assets/avatar/image5.png",
  },
  {
    name: "CT",
    imgURL: "/assets/avatar/image.png",
  },
];
export function AvatarGroup() {
  return (
    <div className="w-full">
      <div
        dir="ltr"
        className="flex w-full items-center justify-center -space-x-2 overflow-hidden"
      >
        {avatarData.map((item, idx) => {
          return (
            <Avatar
              key={idx}
              className="z-50 my-2 flex size-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white hover:translate-y-1 md:size-14"
            >
              <AvatarImage
                src={item.imgURL}
                className="size-full object-contain"
              />
              <AvatarFallback delayMs={600}>{item.name}</AvatarFallback>
            </Avatar>
          );
        })}
        <div className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-blue-700  text-xs font-medium text-white hover:translate-y-1 md:size-14">
          +1000
        </div>
        <div className="hidden md:block">
          <p className="translate-x-5 text-sm font-medium text-gray-800 dark:text-gray-100">
            Join thousands of happy users improving their interview skills!{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
