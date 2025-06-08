import { jobListings } from "@/lib/data";
import { InfiniteMovingCards } from "../infinite-moving-card";

export function JobCardsDemo() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex gap-10 px-4">
        <InfiniteMovingCards
          items={jobListings}
          direction="up"
          speed="fast"
          className="max-w-[300px]"
        />
        <InfiniteMovingCards
          items={[...jobListings].reverse()}
          direction="down"
          speed="slow"
          className="max-w-[300px]"
        />
        <InfiniteMovingCards
          items={jobListings}
          direction="up"
          speed="slow"
          className="max-w-[300px]"
        />
        <InfiniteMovingCards
          items={jobListings}
          direction="down"
          speed="slow"
          className="max-w-[300px]"
        />
      </div>
    </div>
  );
}
