"use client";

import React, { useCallback, useState, useEffect, useRef } from "react";
import classes from "./PasswordGenerator.module.scss";

function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [alpha, setAlpha] = useState(false);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    if (alpha) str += "qwertyuioplkjhgfdszxcvbnmQWERTPLKJHGSAZXCVBNM";
    if (number) str += "1234567890";
    if (character) str += '`~!@#$%^&*()_-+=][{}":;?/>.<,|';
    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, alpha, number, character, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, alpha, number, character, passwordGenerator]);

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20); // to select only 20 letters
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className={` ${classes.container}`}>
      <h1 className=" text-4xl mt-20">Password Generator</h1>
      <div
        className={`flex justify-center rounded-lg mt-40  ${classes.inner_container}`}
      >
        <input
          type="text"
          value={password}
          className={`bg-white p-2 rounded-md text-black rounded-tr-none rounded-br-none ${classes.pass_input}`}
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="text-3xl shadow-md rounded-lg rounded-tl-none rounded-bl-none bg-blue-500 p-2"
        >
          Copy
        </button>
      </div>
      <div className={`flex gap-4 mt-10 ${classes.more_input}`}>
        <div className={`flex gap-2 ${classes.len_input}`}>
          <input
            min={8}
            max={20}
            type="range"
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length : {length}</label>
        </div>
        <div className={`flex gap-2 ${classes.alpha_input}`}>
          <input
            defaultChecked={alpha}
            type="checkbox"
            onChange={() => {
              setAlpha((prev) => !prev);
            }}
          />
          <label>Alphabets</label>
        </div>
        <div className={`flex gap-2 ${classes.num_input}`}>
          <input
            defaultChecked={number}
            type="checkbox"
            onChange={() => {
              setNumber((prev) => !prev);
            }}
          />
          <label>Numbers</label>
        </div>
        <div className={`flex gap-2 ${classes.char_input}`}>
          <input
            defaultChecked={character}
            type="checkbox"
            onChange={() => {
              setCharacter((prev) => !prev);
            }}
          />
          <label>Characters</label>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
