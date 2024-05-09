import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default async function Loading() {
  return (
    <>
      <div className="relative py-6 xl:py-14">
        <Image
          src="/background.jpg"
          alt="imagem de fundo!"
          fill
          className="hidden object-cover object-center -z-10 brightness-50 opacity-10 lg:block"
        />

        <div className="max-w-screen-xl mx-auto space-y-6 lg:flex xl:gap-24 lg:space-y-0">
          <div className="lg:w-6/12 lg:max-w-[500px]">
            <div className="px-5 space-y-6">
              <div className="space-y-2">
                <Skeleton className="w-24 h-6" />
                <Skeleton className="w-40 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-12 h-10" />
              </div>
            </div>

            <div className="mt-6">
              <>
                <Skeleton className="mx-5 h-4 w-32 mb-3.5" />

                <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="min-w-full w-[480px] h-[126px] sm:min-w-[480px] lg:min-w-full"
                    />
                  ))}
                </div>
              </>
            </div>
          </div>

          <div className="lg:w-6/12 md:grow">
            <Skeleton className="mx-5 h-4 w-32 mb-3.5" />

            <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="min-w-[167px] h-[275px] rounded-2xl lg:min-w-[220px] lg:max-w-[295px]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto pb-6 md:py-12 xl:py-14">
        <Skeleton className="mx-5 h-4 w-32 mb-3.5" />

        <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              key={index}
              className="min-w-[167px] h-[275px] rounded-2xl lg:min-w-[220px] lg:max-w-[295px]"
            />
          ))}
        </div>
      </div>
    </>
  );
}
