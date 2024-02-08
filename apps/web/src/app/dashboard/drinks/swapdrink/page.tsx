"use client";
import React, { useState, useEffect } from "react";
import { GetItems } from "@/app/graphqlRequest/queries";
import { SwapBeer } from "@/app/graphqlRequest/mutation";
import LoadingSpinner from "@/app/components/Loading";
import ErrorDiv from "@/app/components/ErrorDiv";
import { request } from "graphql-request";

const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;

interface Beer {
  _id?: string;
  name?: string;
}

const SwapDrinks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [beer, setBeer] = useState<Beer[]>([]);
  const [swapFrom, setSwapFrom] = useState<null | Beer>(null);
  const [swapTo, setSwapTo] = useState<null | Beer>(null);

  const loadBeerDataFromDB = async () => {
    try {
      setLoading(true);
      const response = await request({
        url: graphqlURL,
        document: GetItems,
        variables: { request: null },
      });
      const { getItems } = response as any;
      if (getItems) {
        setBeer(getItems);
      }
    } catch (error) {
      console.log("Error => ", error);
    } finally {
      setLoading(false);
    }
  };

  //Effects:

  useEffect(() => {
    loadBeerDataFromDB();
  }, []);

  const selectedBeerChange = (e: any) => {
    const { value, name } = e.target;
    const nameSplit = value.split(":");
    if (name == "beerToReturn") {
      if (swapTo?.name != nameSplit[1]) {
        setSwapFrom({
          _id: nameSplit[0],
          name: nameSplit[1],
        });
      }
    } else {
      if (swapFrom?.name != nameSplit[1]) {
        setSwapTo({
          _id: nameSplit[0],
          name: nameSplit[1],
        });
      }
    }
  };

  const handleSwapBeer = async () => {
    const swapFromBeerID = swapFrom?._id;
    const swapToBeerID = swapTo?._id;
    if (!swapFromBeerID && !swapToBeerID) {
      alert("Select the beer you are swapping");
      return;
    }
    try {
      setProcessing(true);
      const requestVariables = {
        swapFromBeerID,
        swapToBeerID,
      };
      const response = await request({
        url: graphqlURL,
        document: SwapBeer,
        variables: { request: requestVariables },
      });
      if (response) {
        alert("Swap was succesful");
        setSwapFrom(null);
        setSwapTo(null);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-10">
      <div className="text-center mt-20 text-xl">
        <h2 className="text-xl text-gray-500 bg-black">Swap Beer for Members</h2>
      </div>

      {error && <ErrorDiv errorMessage={error} />}
      {processing ? (
        <LoadingSpinner />
      ) : (
        <div className="w-1/2 mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select beer to return
            </label>
            <select
              name="beerToReturn"
              // value={formData.employmentType}
              onChange={selectedBeerChange}
              className="w-full px-3 py-2 border rounded">
              {processing ? (
                <option value="" disabled>
                  Loading
                </option>
              ) : (
                <>
                  <option value="">select beer to swap</option>
                  {beer?.map(({ _id, name }) => {
                    return (
                      <option key={_id} value={`${_id}:${name}`}>
                        {name?.toUpperCase()}
                      </option>
                    );
                  })}
                </>
              )}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select beer to return
            </label>
            <select
              name="beerToGive"
              // value={formData.employmentType}
              onChange={selectedBeerChange}
              className="w-full px-3 py-2 border rounded">
              {processing ? (
                <option value="" disabled>
                  Loading
                </option>
              ) : (
                <>
                  <option value="">select beer to take</option>
                  {beer?.map(({ _id, name }) => {
                    return (
                      <option key={_id} value={`${_id}:${name}`}>
                        {name?.toUpperCase()}
                      </option>
                    );
                  })}
                </>
              )}
            </select>
          </div>

          <div className="mb-4 text-center">
            <button
              disabled={processing}
              onClick={handleSwapBeer}
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">
              {processing ? "Swapping......" : "Save supply details"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapDrinks;
