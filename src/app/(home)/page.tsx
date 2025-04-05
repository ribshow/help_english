"use client";

import { InputField } from "@/components/Input";
import { Button } from "@/components/Button";
import { BookOpen, SendHorizontal, Clipboard, Check } from "lucide-react";
import { useState } from "react";
import Loading from "@/app/loading";

interface ResponseProps {
  response: string;
}

const Home = () => {
  const [response, setResponse] = useState<ResponseProps | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [inputEmpty, setInputEmpty] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [copyResponse, setCopyResponse] = useState<boolean>(false);

  async function handleSearch() {
    // Check if the input is empty
    if (!inputValue.trim()) {
      setInputEmpty(true);
      setResponse(null); // Clear previous response
      return;
    }

    // clear alert and set loading
    setInputEmpty(false);
    setLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputValue }),
      });

      const data = await res.json();
      console.log(data);
      setResponse(data);
    } catch (error) {
      console.log("Error searching data", error);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (response?.response) {
      navigator.clipboard.writeText(response.response);
      setCopyResponse(true);
      //Copy and reset copyresonse after 2 seconds
      setTimeout(() => {
        setCopyResponse(false);
      }, 2000);
    }
  }

  return (
    <div className="flex flex-col bg-neutral-800 w-full justify-center items-center h-screen">
      <div className="w-full p-2 flex flex-row items-center justify-center">
        <h1 className="text-pink-600 text-2xl m-4 md:text-4xl">HELP ENGLISH</h1>
        <BookOpen className="text-pink-600 text-4xl" />
      </div>
      <div className="w-full flex flex-row max-w-2xl p-2 justify-center items-center">
        <InputField
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className=" focus:ring-pink-600 w-full md:w-[600px] placeholder:text-center text-sm"
          placeholder="Como eu posso te ajudar hoje?"
        />
        <Button
          className="flex justify-center items-center text-bold p-2 m-2"
          onClick={handleSearch}
        >
          <SendHorizontal className="text-white" />
        </Button>
      </div>

      {inputEmpty && (
        <p className="text-red-500 text-sm transition-all duration-300">
          Por favor, preencha o campo.
        </p>
      )}
      {loading ? (
        <Loading />
      ) : (
        response && (
          <div className="flex flex-col w-full max-w-2xl h-[60vh] p-4 text-white overflow-auto bg-neutral-900 rounded-xl shadow-md">
            {response.response.split("\n\n").map((para, idx) => (
              <p
                key={idx}
                className="mb-4 text-md whitespace-pre-line text-left"
              >
                {para}
              </p>
            ))}
            <Button onClick={handleCopy} className="m-2 font-bold">
              Copiar{" "}
              {copyResponse ? (
                <Check className="text-white cursor-pointer float-right" />
              ) : (
                <Clipboard className="text-white cursor-pointer float-right" />
              )}
            </Button>
          </div>
        )
      )}
    </div>
  );
};

export default Home;
