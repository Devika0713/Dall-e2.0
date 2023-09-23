/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  //used to change the navigation links (from create-post to home)
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImage, setgeneratingImage] = useState(false);
  const [loading, setloading] = useState(false);

  const generateImg = async () => {
    if (form.prompt) {
      try {
        setgeneratingImage(true);
        const response = await fetch(
          "https://dall-e2-0.vercel.app/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );
        //console.log("Hello");
        //console.log(JSON.stringify({ prompt: form.prompt }));
        const data = await response.json();

        setform({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
        //console.log("In the error block");
      } finally {
        setgeneratingImage(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setloading(true);

      try {
        const response = await fetch(
          "https://dall-e2-0.vercel.app/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );

        await response.json();
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setloading(false);
      }
    } else {
      alert("Please enter prompt and generate image");
    }
  };

  const handleChange = (e) => {
    //display form as it is and set name as name entered in the form
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const RandomPrompt = getRandomPrompt(form.prompt);
    setform({ ...form, prompt: RandomPrompt });
  };

  return (
    <section className=" mx-auto w-full">
      <div>
        <h1 className="font-extrabold text-[30px] text-slate-800">Create</h1>
        <p className="mt-2 font-semibold text-slate-600 text-[20px] max-w-full">
          Create imaginative and visually stunning images through DALL-E AI and
          share them with the community.
        </p>
      </div>

      <form className="mt-10 max-w-3xl" onSubmit={handleOnSubmit}>
        <div className="flex flex-col gap-3">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          {/* Not able to type inside the field */}
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="panda mad scientist mixing sparkling chemicals, digital art"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          {/*  */}
          {/* place where ai generated image will be shown or a preview will be shown */}
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-950 focus:border-sky-950 w-64 p-3 h-64 flex justify-center items-center">
            {/* Check if the form has a photo */}
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-50"
              />
            )}
            {generatingImage && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        {/* button to generate the image */}
        <button
          type="button"
          onClick={generateImg}
          className="font-semibold text-[20px] bg-sky-950 p-2 mt-3  rounded-[5px] text-slate-100 w-full"
        >
          {generatingImage ? "Generating" : "Generate"}
        </button>

        <div className="mt-10">
          <p className="mt-2 font-semibold text-slate-600 text-[20px] max-w-full">
            Once you have created the image you want , you can share it with
            others in the community
          </p>
          <button
            type="submit"
            className="font-semibold text-[20px]  p-2 mt-3 bg-slate-300 text-gray-900 rounded-[5px]  w-full hover:bg-sky-950 hover:text-slate-100"
          >
            {loading ? "Sharing..." : "Share with community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
