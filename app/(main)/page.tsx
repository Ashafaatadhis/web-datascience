"use client";

import Container from "@/components/Container";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MdFavorite } from "react-icons/md";
import { Poppins } from "next/font/google";
import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import TopAnime from "@/components/TopAnime";
import { title } from "process";
import CardAnime from "@/components/CardAnime";
import ContentNav from "@/components/ContentNav";
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"] });

// type Anime = {
//   data: any[];
// };

export default function MainPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [page, setPage] = useState<number>(1);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const get = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND}/api?page=${page}`
        );
        const anime = get.data;
        setData((prev) => [...prev, ...anime.data]);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const get = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND}/api?page=${page}`
        );
        const anime = get.data;
        setData((prev) => [...prev, ...anime.data]);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    if (inView) {
      setPage((page) => page + 1);
    }
  }, [inView]);

  const handlerLoadMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <div className={`${poppins.className}`}>
      <section className="w-full">
        <img
          src="/assets/wp1965845-konosuba-wallpapers.png"
          className="w-full object-cover h-[400px]"
        />
      </section>
      {/* <div>
        <iframe src="https://animeku.org/player.php?id=eyJjdCI6ImZKT0xhXC9UVWdQXC8rMSt6d0RkdHBCbUJEWTZ2RGFmaThYNTBZYnpwK0RHZGVoQ3NNWEEzK1hTUUFaRUorV3RFWHMxRXU2d01MMU53bnNQc0lzZ2M2TFN3eE9BZWVqYWNzNVVGdkZGSDl1YU1uTDZ6QUxpakR5WUxnQnE0SzZqZ2dDQXF4RkpoSlpQM2xQXC8yeFpFWE0rYUU1cEI2YzMyWXdiMDRQcE52dk5WMHNmRXJkNnk3ZjZOU09XSWJRcmUzUkFyeUhPVnZCZkhmcXpEMVkxUE1VMXI0dnpDZHA3Q2I0Nk83NmtnVzBDNDlEaElucFBseWgrU1wvVzMwa2NWQlFpa1wvaGkwbnJMU3M0SldoU2R5eGp1RFdUdThQWWRiNVlBbXUyQ2lYb21kZHZSYllwTVVOWFlrNUkxaUNMdlNTZzdaY3VZRVlJTWdIVkc1bEFjQStcLzNvUT09IiwiaXYiOiJkZGQ5ZmY0NWRlMTE2ZWNkMmYzYjFmMDNmMTBkMTYxMCIsInMiOiIwMjk5ZDMxODI0OTY1NWU4In0="></iframe>
      </div> */}

      <Container className="mx-auto gap-8 mt-[60px] block md:flex px-4">
        <article className="w-full md:w-3/4">
          <ContentNav />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4    gap-3 mt-10">
            <CardAnime isLoading={isLoading} data={data} />
            <div className="hidden md:block" ref={ref}>
              <Skeleton className="w-full h-[250px]" />
              <div className="space-y-2 mt-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex gap-1 mt-1">
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </div>
            </div>
          </div>
        </article>
        <div className="mt-5 justify-center   md:hidden flex w-full ">
          <Button
            onClick={handlerLoadMore}
            disabled={isLoading ? true : false}
            className="rounded-sm"
          >
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </div>
        <TopAnime />
      </Container>
    </div>
  );
}
