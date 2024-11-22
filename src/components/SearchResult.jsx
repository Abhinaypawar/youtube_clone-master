import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResult = () => {
  const [result, setResult] = useState([]);
  const { searchQuery } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
  }, [searchQuery]);

  const fetchSearchResults = () => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${searchQuery}`)
      .then((res) => {
        console.log("API Response:", res);
        if (res?.contents && Array.isArray(res.contents)) {
          setResult(res.contents);
        } else {
          setResult([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setResult([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 gap-2 p-5">
          {result && result.length > 0 ? (
            result.map((item, index) => {
              if (item?.type !== "video") return null;
              const video = item?.video;
              return (
                <SearchResultVideoCard
                  key={video?.videoId || index}
                  video={video}
                />
              );
            })
          ) : (
            <p className="text-white">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
